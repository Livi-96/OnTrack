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


export default function Calendar() {

//adding an event start
    //control open and close of event form 
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState()
  function handleDateClick(day){
    setModalOpen(true)
    setClickedDay(day)
    }

const [eventsList, setEventslist] = useState([{event: 'oneEwvent'}])

//adding an event end

//calendar structure start
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(currentDate.getDate());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear()
  const firstDayOfMonth = currentDate.getDay();
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


  //need to either set up ATS expecions to allow requests to HTTP (apple does not allow) 
  //or set up express sever with HTTPS - need to use openSSL to certify localhost in order to have https though 
  //and xCode 
  useEffect(()=>{
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:7002/', {headers: {
        "accept": "application/json"
      }});
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }  
  fetchData()
}, [])

  //function to set up rows for calendar
  function collums(row, x) {
    columnElements = [];
    for (let i = 0; i < 7; i++) {
        //returns a coloured button to indicate it is the current day
      if (i + row * 7 + x == currentDay) {
        columnElements.push(
          <Pressable key={i + row * 7 + x} style={styles.currDay} onPress={()=>handleDateClick(i + row * 7 + x)}>
            <Text>{i + row * 7 + x}</Text>
          </Pressable>
        );
      } else if (
        i + row * 7 + x > 0 &&
        i + row * 7 + x < 32 &&
        i + row * 7 + x != currentDay
      ) {
        columnElements.push(
          <Pressable key={i + row * 7 + x} style={styles.day} onPress={()=>handleDateClick(i + row * 7 + x)}>
            <Text>{i + row * 7 + x}</Text>
          </Pressable>
        );
      } else {
        //returns blank squares
        columnElements.push(
          <View key={i + row * 7 + x} style={styles.emptyday}></View>
        );
      }
    }
    return columnElements;
  }

  //function to move to next month
  function nextMonth() {
    const newDate = new Date(currentDate);
    // Update the month of the new Date object
    newDate.setMonth(newDate.getMonth() + 1);
    // Set the new Date object as the current date
    setCurrentDate(newDate);
    const currDate = new Date();
    if (newDate.getMonth() != currDate.getMonth()) {
      setCurrentDay(null);
    } else {
      setCurrentDay(currDate.getDate());
    }
  }

  //function to move to prev month
  function prevMonth() {
    const newDate = new Date(currentDate);
    // Update the month of the new Date object
    newDate.setMonth(newDate.getMonth() - 1);
    // Set the new Date object as the current date
    setCurrentDate(newDate);
    setCurrentDate(newDate);
    const currDate = new Date();
    console.log(newDate.getMonth());
    if (newDate.getMonth() != currDate.getMonth()) {
      setCurrentDay(null);
    } else {
      setCurrentDay(currDate.getDate());
    }
  }

  const back = "<";
  const next = ">";
//calendar structure end




  return (
    <ImageBackground
    source={background}
    resizeMode="cover"
    style={styles.image}>
    <View style={styles.container}>
      <Modal
        visible={modalOpen}
        animationType="slide"
        setModalOpen={setModalOpen}
      >
      <CalendarForm date={clickedDay + " " + months[currentMonth]} setModalOpen={setModalOpen} addEvent={setEventslist}/>
    </Modal>


    <FlatList
            data={eventsList}
            renderItem={({ item }) => (
              <View >
                <Text>{item.id}</Text>
              </View>
            )}
          />


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
        <View style={styles.column}>{collums(0, 3 - firstDayOfMonth)}</View>
        <View style={styles.column}>{collums(1, 3 - firstDayOfMonth)}</View>
        <View style={styles.column}>{collums(2, 3 - firstDayOfMonth)}</View>
        <View style={styles.column}>{collums(3, 3 - firstDayOfMonth)}</View>
        <View style={styles.column}>{collums(4, 3 - firstDayOfMonth)}</View>
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
    height: 50,
    width: 50,
    backgroundColor: "#F1E3D6",
    borderRadius: 10,
  },
  emptyday: {
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 10,
    height: 50,
    width: 50,
  },
  currDay: {
    backgroundColor: "#6C7AAD",
    borderRadius: 10,
    height: 50,
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
});
