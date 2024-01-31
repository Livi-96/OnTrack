import React, { FC, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";

const Dropdown = ({ label, setDropDown }) => {
  const [visible, setVisible] = useState(false);
    const [opetionSelected, setOptionSelected] = useState(false)
  const [options, setOptions] = useState([
    "Start of period",
    "End of period",
    "Day X",
    "Other",
  ]);
  const [title, setTitle] = useState(label);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  function handleDropDownClick(id) {
    setTitle(options[id]);
    setVisible(false);
    setOptionSelected(true)
    setDropDown(options[id])
  }

  const renderDropdown = () => {
    if (visible) {
      return (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <Pressable style={styles.dropDownOption}
                onPress={() => handleDropDownClick(options.indexOf(item))}
              >
                <Text style={{color: '#93A1D4'}}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
      );
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={opetionSelected ? [styles.buttonText, {color: 'white', textAlign: 'left'}] : [styles.buttonText, {color: 'rgba(0, 0, 0, .5)', textAlign: 'left'}]}>{title}</Text>
      <Text>\/</Text>
      {/* <Icon type='font-awesome' name='chevron-down'/> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    dropDownOption:{
        width: '100%',
        margin: 0,
        padding: 10,
        backgroundColor: "rgba(255, 255, 255, .8)",
        marginTop: 2,
        borderRadius: 20,
        color: "#93A1D4"
    },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .4)",
    borderRadius: 20,
    height: 50,
    width: "90%",
    paddingHorizontal: 10,
    zIndex: 1,
    color: 'rgba(0, 0, 0, .4)',
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 300,
    borderRadius: 10,
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    top: 50,
    width: '100%'
  },
});

export default Dropdown;
