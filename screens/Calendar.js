import { Modal, Pressable, View, Image } from "react-native";
import {
  Text,
  Switch,
  TextInput,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import background from "../assets/background.jpg";
import * as SQLite from "expo-sqlite";
import { DB } from "../global";
import CalendarForm from "./calendarForm";
import EventDisplay from "../componants/EventDisplay";
import FlowForm from "./flowForm";
import Droplet from "../assets/Droplet.png"
import dottedDroplet from "../assets/DottedDroplet.png"

export default function Calendar() {

  const [cycleLength, setCycleLength] = useState(28)

  ////////////////////////////////////////////////adding an event start//////////////////////////////////////////////
    //holds list of events - will eventually be hooked up to database
    const [eventsList, setEventslist] = useState([]);
    //control open and close of event form
    const [addEventOpen, setaddEventOpen] = useState(false);
    //holds the currently clicked so date can be added to event in the eventlist array
    const [clickedDay, setClickedDay] = useState();
    function handleDateClick(day) {
      setaddEventOpen(true);
      setClickedDay(day);
    }
  ////////////////////////////////////////////////adding an event end//////////////////////////////////////////////

  ////////////////////////////////////////////////calendar structure start//////////////////////////////////////////////
    //Holds current date information
    const currentDate = new Date();
    //Holds the date that you are currently viewing (so you can flick through months - function controlling this further down )
    const [viewableDate, setViewableDate] = useState(new Date());
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "September",
      "October",
      "November",
      "December",
    ];
    //gets day of the week that months start on (ie Monday == 0)
    let firstDay = new Date(viewableDate.getFullYear(), viewableDate.getMonth(), 0).getDay();
    console.log(firstDay)

  //function to set up rows for calendar - rendered in rows of 7 days, so row indicates which row is being rendered so that the correct day number can be rendered for each day block 
  function collums(row) {
    //function to check if there are any events on the day being rendered
    function checkEventsToday(day) {
      //each event object contains info for the day, month and year it was added to, so this is filtered on
      const eventToday = eventsList.filter((e) => {
        if (e.day == day && e.month == viewableDate.getMonth() && e.year == viewableDate.getFullYear()) {
          return e;
        }
      });
      return eventToday;
    }

    //function to work out the number of days in the current month
    function numDays(y, m){
     return new Date(y, m, 0).getDate()}

    // empty array to push day blocks into to complete each row for the calendar
    columnElements = [];
    //cycles through 7 days to add 7 day-blocks to the row
    for (let i = 0; i < 7; i++) {
      // (-firstDay + 1) is the offset needed to ensure that day 1 starts on the right weekday (ie if the month starts on Saturday (firstDay = 6) you need 5 blank days before you start counting)
      const monthDay = i + row * 7 + (-firstDay + 1);
      if (monthDay == currentDate.getDate() && viewableDate.getMonth() == currentDate.getMonth() && viewableDate.getFullYear() == currentDate.getFullYear()) {
        //returns a coloured button to indicate it is the current day
        checkEventsToday(monthDay);
        columnElements.push(
          <Pressable
            key={monthDay}
            style={styles.currDay}
            onPress={() => handleDateClick(monthDay)}
          >
            <Text>{monthDay}</Text>
            <FlatList
              data={checkEventsToday(monthDay)}
              renderItem={({ item, index: number }) => (
                <Pressable
                  style={styles.eventMarker}
                  onPress={() => handleEventClick(eventsList.indexOf(item))}
                ></Pressable>
              )}
            />
          </Pressable>
        );
      } else if (
        monthDay > 0 &&
        monthDay <= numDays(viewableDate.getFullYear(), viewableDate.getMonth() + 1)
      ) {
        //returns a neutral button to indicate normal day
        checkEventsToday(monthDay);
        columnElements.push(
          <Pressable
            key={monthDay}
            style={styles.day}
            onPress={() => handleDateClick(monthDay)}
          >
            <Text>{monthDay}</Text>
            <FlatList
              data={checkEventsToday(monthDay)}
              renderItem={({ item, index: number }) => (
                <Pressable
                style={styles.eventMarker}
                onPress={() => handleEventClick(eventsList.indexOf(item))}
                >
                <Image source={Droplet} style={styles.flowImage}></Image>
                  {/* <Text style={styles.markerText}>{item.event}</Text> */}
                </Pressable>
              )}
            />
          </Pressable>
        );
      } else {
        //returns blank squares
        columnElements.push(
          <View key={monthDay} style={styles.emptyday}></View>
        );
      }
    }
    return columnElements;
  }

  //function to move to next month
  function nextMonth() {
    const newDate = new Date(viewableDate);
    // Update the month of the new Date object
    newDate.setMonth(newDate.getMonth() + 1);
    //set viewable date to the new date object
    setViewableDate(newDate);
  }

  //function to move to prev month
  function prevMonth() {
    const newDate = new Date(viewableDate);
    // Update the month of the new Date object
    newDate.setMonth(newDate.getMonth() - 1);
    //set viewable date to the new date object
    setViewableDate(newDate);
  
  }

  const back = "<";
  const next = ">";
  //calendar structure end

  //handle event click open
  const [openEvent, setOpenEvent] = useState(false);
  const [eventId, setEventId] = useState();

  function handleEventClick(id) {
    setOpenEvent(true);
    setEventId(id);
  }

  //handle event click close

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
      
        <Modal
          visible={addEventOpen}
          animationType="slide"
          setModalOpen={setaddEventOpen}
        >
          <FlowForm
            date={clickedDay + " " + months[viewableDate.getMonth()]}
            day={clickedDay}
            month={viewableDate.getMonth()}
            year={viewableDate.getFullYear()}
            setModalOpen={setaddEventOpen}
            setEventslist={setEventslist}
          />
        </Modal>
        <Modal
          visible={openEvent}
          animationType="slide"
          setModalOpen={setaddEventOpen}
        >
          <EventDisplay
            event={eventsList[eventId]}
            setOpenEvent={setOpenEvent}
          />
        </Modal>
        <View style={styles.header}>
          <Pressable onPress={prevMonth}>
            <Text style={styles.arrows}>{back}</Text>
          </Pressable>
          <Text style={styles.monthTitle}>
            {months[viewableDate.getMonth()] + " " + viewableDate.getFullYear()}
          </Text>
          <Pressable onPress={nextMonth}>
            <Text style={styles.arrows}>{next}</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <View style={styles.daytitle}>
              <Text style={styles.dayTxt}>Mon</Text>
            </View>
            <View style={styles.daytitle}>
              <Text style={styles.dayTxt}>Tues</Text>
            </View>
            <View style={styles.daytitle}>
              <Text style={styles.dayTxt}>Weds</Text>
            </View>
            <View style={styles.daytitle}>
              <Text style={styles.dayTxt}>Thurs</Text>
            </View>
            <View style={styles.daytitle}>
              <Text style={styles.dayTxt}>Fri</Text>
            </View>
            <View style={styles.daytitle}>
              <Text style={styles.dayTxt}>Sat</Text>
            </View>
            <View style={styles.daytitle}>
              <Text style={styles.dayTxt}>Sun</Text>
            </View>
          </View>
          <View style={styles.column}>{collums(0)}</View>
          <View style={styles.column}>{collums(1)}</View>
          <View style={styles.column}>{collums(2)}</View>
          <View style={styles.column}>{collums(3)}</View>
          <View style={styles.column}>{collums(4)}</View>
          {firstDay >= 6 ? (
            <View style={styles.column}>{collums(5)}</View>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flowImage: {
    height: 30,
    width: 14
  },
  container: {
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  arrows: {
    fontSize: 30,
    color: "#6C7AAD",
  },
  column: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 2,
    padding: 10,
  },
  daytitle: {
    backgroundColor: "#6C7AAD",
    borderRadius: 10,
    height: 25,
    width: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  dayTxt: {
    alignSelf: "center",
    color: "#F1E3D6",
  },
  row: {
    display: "flex",
    flexDirection: "column",
  },
  day: {
    height: 70,
    width: 50,
    backgroundColor: "#F1E3D6",
    borderRadius: 10,
  },
  emptyday: {
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 10,
    height: 70,
    width: 50,
  },
  currDay: {
    backgroundColor: "#6C7AAD",
    borderRadius: 10,
    height: 70,
    width: 50,
  },
  monthTitle: {
    fontSize: 30,
    color: "#F1E3D6",
    textAlign: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.8,
  },
  eventMarker: {
    height: 'fit-content',
    width: "80%",
    borderRadius: 100,
    // backgroundColor: "#6C7AAD",
    margin: 3,
    // overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 2,
    alignItems: "center",
  },
  markerText: {
    fontSize: 11,
    color: "#F1E3D6",
  },
});
