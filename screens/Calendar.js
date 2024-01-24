import { Modal, Pressable, View } from "react-native";
import {
  Text,
  Switch,
  TextInput,
  StyleSheet,
  ImageBackground,
  FlatList
} from "react-native";
import { useEffect, useState } from "react";
import background from "../assets/background.jpg";
import * as SQLite from "expo-sqlite";
import { DB } from "../global";
import CalendarForm from "./calendarForm";
import axios from "axios";
import EventDisplay from "../componants/EventDisplay";


export default function Calendar() {

//adding an event start
    //control open and close of event form 
  const [addEventOpen, setaddEventOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState()
  function handleDateClick(day){
    setaddEventOpen(true)
    setClickedDay(day)
    }

const [eventsList, setEventslist] = useState([])

//adding an event end

//calendar structure start
  //holds todays date
  const currentDate = new Date()
  //holds currently viewed dates (so you can flick through months)
    const [viewableDate, setViewableDate] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(viewableDate.getDate());
    const currentMonth =   viewableDate.getMonth();
    const currentYear =   viewableDate.getFullYear()
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
    let firstDay = new Date(currentYear, currentMonth, 1).getDay()
    firstDay = (firstDay===0) ? 7 : firstDay
    //need to either set up ATS expecions to allow requests to HTTP (apple does not allow) 
    //or set up express sever with HTTPS - need to use openSSL to certify localhost in order to have https though 
    //and xCode 
  //   useEffect(()=>{
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('http://localhost:7002/', {headers: {
  //         "accept": "application/json"
  //       }});
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }  
  //   fetchData()
  // }, [])

    //function to set up rows for calendar
    function collums(row, x) {

      //function to check if there are any events on the day being rendered 
      function checkEventsToday(day){
        const eventToday = eventsList.filter((e) => { if(e.day == day && e.month == currentMonth && e.year == currentYear){return e}})
        return eventToday
      }

      columnElements = [];
      for (let i = 0; i < 7; i++) {
        const monthDay = i + row * 7 + x
        if (monthDay == currentDay) {
          //returns a coloured button to indicate it is the current day
          checkEventsToday(monthDay)
          columnElements.push(
            <Pressable key={monthDay} style={styles.currDay} onPress={()=>handleDateClick(monthDay)}>
              <Text>{monthDay}</Text>
              <FlatList
              data={checkEventsToday(monthDay)}
              renderItem={({ item, index: number }) => (
                <Pressable style={styles.eventMarker} onPress={()=>handleEventClick(eventsList.indexOf(item))}>
           
                </Pressable>
              )}
            />
            </Pressable>
          );
        } else if ( monthDay > 0 &&  monthDay < 32 &&  monthDay != currentDay ) {
          //returns a neutral button to indicate normal day
          checkEventsToday(monthDay)
          columnElements.push(
            <Pressable key={monthDay} style={styles.day} onPress={()=>handleDateClick(monthDay)}>
              <Text>{monthDay}</Text>
              <FlatList
              data={checkEventsToday(monthDay)}
              renderItem={({ item, index: number }) => (
                <Pressable style={styles.eventMarker} onPress={()=>handleEventClick(eventsList.indexOf(item))}>
              <Text style={styles.markerText}>{item.event}</Text>
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
      // Set the new Date object as the current date and check if the month your viewing is the current month 'today' can be highlighted
      if (newDate.getMonth() != currentDate.getMonth()) {
        setCurrentDay(null);
      } else {
        setCurrentDay(currentDate.getDate());
      }
    }

    //function to move to prev month
    function prevMonth() {
      const newDate = new Date(viewableDate);
      // Update the month of the new Date object
      newDate.setMonth(newDate.getMonth() - 1);
      //set viewable date to the new date object
      setViewableDate(newDate);
      // Set the new Date object as the current date and check if the month your viewing is the current month 'today' can be highlighted
      if (newDate.getMonth() != currentDate.getMonth()) {
        setCurrentDay(null);
      } else {
        setCurrentDay(currentDate.getDate());
      }
    }

    const back = "<";
    const next = ">";
//calendar structure end

//handle event click open
const [openEvent, setOpenEvent] = useState(false)
const [eventId, setEventId] = useState()


function handleEventClick(id){
setOpenEvent(true)
setEventId(id)
}

//handle event click close


  return (
    <ImageBackground
    source={background}
    resizeMode="cover"
    style={styles.image}>
    <View style={styles.container}>
      <Modal
        visible={addEventOpen}
        animationType="slide"
        setModalOpen={setaddEventOpen}
      >
      <CalendarForm date={clickedDay + " " + months[currentMonth]} day={clickedDay} month={currentMonth} year={currentYear} setModalOpen={setaddEventOpen} setEventslist={setEventslist}/>
    </Modal>
    <Modal
        visible={openEvent}
        animationType="slide"
        setModalOpen={setaddEventOpen}
      >
     <EventDisplay event={eventsList[eventId]} setOpenEvent={setOpenEvent}/>
    </Modal>
      <View style={styles.header}>
        <Pressable onPress={prevMonth}>
          <Text style={styles.arrows}>{back}</Text>
        </Pressable>
        <Text style={styles.monthTitle}>{months[currentMonth] + ' ' + currentYear}</Text>
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
        <View style={styles.column}>{collums(0, 2 - firstDay)}</View>
        <View style={styles.column}>{collums(1, 2 - firstDay)}</View>
        <View style={styles.column}>{collums(2, 2 - firstDay)}</View>
        <View style={styles.column}>{collums(3, 2 - firstDay)}</View>
        <View style={styles.column}>{collums(4, 2 - firstDay)}</View>
        {firstDay >= 6 ? <View style={styles.column}>{collums(5, 2 - firstDay)}</View> : <View></View>}
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
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
    opacity: 0.8
  },
  eventMarker: {
    height: 20,
    width: '80%',
    borderRadius: 100,
    backgroundColor: '#6C7AAD',
    margin: 3,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    padding: 2,
    alignItems: 'center'
  },
  markerText: {
    fontSize: 11,
    color: "#F1E3D6"
  }
});
