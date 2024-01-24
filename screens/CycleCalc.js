import { Formik } from "formik";
import { StyleSheet, Text, View, Pressable, TextInput, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import background from '../assets/formBackGround.png'

export default function CycleCalculator({ setModalOpen, date, day, month, year, setEventslist }) {

const [cycleLength, setCycleLength] = useState()

  return (
    <ImageBackground
    source={background}
      resizeMode="cover"
      style={styles.image}>
    <View style={styles.modalContainer}>
        <Text>In order to predict your cycle, we will need you to provide some information on your previous cycles:</Text>
      <Formik
        initialValues={{ one: "", two: "", three: ""}}
        onSubmit={(values) => {
         let days =  (+values.one) + (+values.two) + (+values.three)
         let av = days/3
         setCycleLength(Math.round(av))
        }}
      >
        {(formProps) => (
          <View>
            <Text>Days between cycle: {cycleLength}</Text>
            <Text>1:</Text>
            <TextInput
              style={styles.input}
              placeholder="eg 28"
              onChangeText={formProps.handleChange("one")}
              value={formProps.values.one}
              keyboardType="numeric"
            />
            <Text>2:</Text>
            <TextInput
              style={styles.input}
              placeholder="eg 28"
              onChangeText={formProps.handleChange("two")}
              value={formProps.values.two}
              keyboardType="numeric"
            />

            <Text>3:</Text>
            <TextInput
              style={styles.input}
              placeholder="eg 28"
              onChangeText={formProps.handleChange("three")}
              value={formProps.values.three}
              keyboardType="numeric"
            />

            <View style={styles.addCancelBttns}>
        <Pressable
          style={styles.addBtn}
          onPress={()=>{formProps.handleSubmit(); 
            // setModalOpen(false)
        }
        }
        >
          <Text style={styles.addBtnTxt}>Add</Text>
        </Pressable>
        <Pressable
          style={styles.addBtn}
        //   onPress={() => {
        //     setModalOpen(false);
        //   }}
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
    marginTop: 200
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
