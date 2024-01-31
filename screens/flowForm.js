import { Formik } from "formik";
import { StyleSheet, Text, View, Pressable, TextInput, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import background from '../assets/formBackGround.png'
import Slider from '@react-native-community/slider';
import Dropdown from "../componants/dropdown";

export default function FlowForm({ setModalOpen, date, day, month, year, setEventslist }) {

const [fillHeight, setFillHeight] = useState(0)
const [dropDown, setDropDown] = useState()
function flowRate(){
  let flowPercent = Math.round(fillHeight/200 * 100)
  console.log(fillHeight)
  if (flowPercent > 60) {
    return 'Heavy';
} else if (flowPercent < 40) {
    return 'Light';
} else {
    return 'Medium';
}
}

  return (
    <ImageBackground
    source={background}
      resizeMode="cover"
      style={styles.image}>
    <View style={styles.modalContainer}>
        <Text style={styles.title}>{date}</Text>
      <Formik
        initialValues={{notes: ""}}
        onSubmit={(values) => {
          values = {...values,event: dropDown, flow: fillHeight, day: day, month: month, year: year}
          setEventslist((curr) => [...curr, values])
        }}
      >
        {(formProps) => (
          
          <View>

<Dropdown label='Select event option' setDropDown={setDropDown} />

<View style={styles.sliderContainer}>
    <View style={styles.circle} ><View style={[styles.circlefill, {height: fillHeight}]} /><Text style={styles.flowText}>{flowRate()}</Text></View>
    <Slider
  style={[{width: 200, height: 30}, styles.slider]}
  minimumValue={0}
  maximumValue={200}
  minimumTrackTintColor="#F4DDC2"
  maximumTrackTintColor="#F1E3D6"
  onValueChange={(e)=>{setFillHeight(e)}}
  thumbTintColor="#F1E3D6"
  tapToSeek
  value={fillHeight}
/></View>


            <TextInput
              style={styles.longinput}
              placeholder="Add notes"
              onChangeText={formProps.handleChange("notes")}
              value={formProps.values.notes}
              multiline
              numberOfLines={4}
            />

            <View style={styles.addCancelBttns}>
        <Pressable
          style={styles.addBtn}
          onPress={()=>{formProps.handleSubmit(); setModalOpen(false)}}
        >
          <Text style={styles.addBtnTxt}>Add</Text>
        </Pressable>
        <Pressable
          style={styles.addBtn}
          onPress={() => {
            setModalOpen(false);
          }}
        >
          <Text style={styles.addBtnTxt}>Cancel</Text>
        </Pressable>
      </View>
          </View>
        )}
        </Formik>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flowText: {
    position: 'absolute',
    top: '35%',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 40,
    margin: 0,
    padding: 0
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  slider: {
    borderWidth: 20
  },
  circle: {
    marginTop: 10,
    height: 200,
    width: 200,
    borderRadius: 300,
    backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'red',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  circlefill: {
    width: 300,
    backgroundImage: 'linear-gradient(to bottom, #ff0000, #0000ff)',
    backgroundColor: 'red'
  },
    modalContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
  },
  title: {
    color: "#F4DDC2",
    fontSize: 40,
    marginTop: 2
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 300,
    backgroundColor: "rgba(0, 0, 0, .4)",
    borderRadius: 10,
    color: "white",
  },
  longinput: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 300,

    backgroundColor: "rgba(0, 0, 0, .4)",
    borderRadius: 10,
    color: "white",
  },
  input_container: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  addCancelBttns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    margin: 3,
  },
  addBtnTxt: {
    textAlign: "center",
    color: "#93A1D4",
    fontSize: 30
  },
  projBtn: {
    backgroundColor: "#F1E3D6",
    borderRadius: 10,
    padding: 10,
  },
  addBtn: {
    backgroundColor: "white",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    flex: 1
  },

});
