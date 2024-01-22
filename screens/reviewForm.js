import { Formik } from "formik";
import { StyleSheet, Text, View, Pressable, TextInput, ImageBackground } from "react-native";
import { useState, useEffect } from "react";
import background from '../assets/formBackGround.png'

export default function AddForm({ setModalOpen, addProject }) {
  return (
    <ImageBackground
    source={background}
      resizeMode="cover"
      style={styles.image}>
    <View style={styles.modalContainer}>
        <Text style={styles.title}>Add new project:</Text>
      <Formik
        initialValues={{ title: "", description: "", notes: "", language: "" }}
        onSubmit={(values) => {
            addProject(values)
        }}
      >
        {(formProps) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Add title"
              onChangeText={formProps.handleChange("title")}
              value={formProps.values.title}
            />

            <TextInput
              style={styles.longinput}
              placeholder="Add description"
              onChangeText={formProps.handleChange("description")}
              value={formProps.values.description}
              multiline
              numberOfLines={4}
            />

            <TextInput
              style={styles.longinput}
              placeholder="Add progress notes"
              onChangeText={formProps.handleChange("notes")}
              value={formProps.values.notes}
              multiline
              numberOfLines={4}
            />

            <TextInput
              style={styles.input}
              placeholder="Add tech stack"
              onChangeText={formProps.handleChange("language")}
              value={formProps.values.language}
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
    marginTop: 20,
    marginBottom: 20
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
