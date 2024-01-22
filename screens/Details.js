import { Pressable, View } from "react-native";
import { Text, Switch, TextInput, StyleSheet, ImageBackground } from "react-native";
import { useState } from "react";
import background from "../assets/detailBckGrnd.jpg";
import * as SQLite from 'expo-sqlite'
import { DB } from '../global'

export default function Details({ navigation }) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

function deleteProj(id){
alert('are you sure?' + id)
DB.transaction((tx) => {
    tx.executeSql(`DELETE FROM projects
        WHERE id = ?`, [id]);

    tx.executeSql(`SELECT * FROM projects`, null,
    (txObj, resultSet) => console.log(resultSet.rows._array))
}
)

}

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>{navigation.getParam("title")}</Text>

        <View >
        <Text style={styles.notesCont} >Description: {navigation.getParam('description')}</Text>
        <Text style={styles.notesCont} >Project Notes: {navigation.getParam('notes')}</Text>
        </View>
        <View style={styles.tags}> 
       <Text style={styles.tagsTxt}>Tech stack: {navigation.getParam('language')}</Text>
       <View style={styles.switchCont}>
       <Text style={styles.tagsTxt} >Completed:</Text>
       <Switch
        trackColor={{false: 'rgba(50, 50, 50, 0.2)', true: '#F1E3D6'}}
        thumbColor={isEnabled ? '#93A1D4' : '#F1E3D6'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      </View>
      <Pressable
            style={styles.addBtn}
            onPress={()=>{deleteProj(navigation.getParam('id'))}}
          >
            <Text style={styles.addBtnTxt}>Delete</Text>
          </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    padding: 10
  },
  titleText: {
    color: "#F4DDC2",
        fontSize: 50,
        textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: "50%",
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
  notesCont: {
    borderWidth: 1,
    borderColor: "#777",
    width: '100%',
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
    height: 'auto',
    marginTop: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    color: 'rgb(50, 50, 50)'
  },
  tags: {
    display: "flex",
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10
  }, 
  tagsTxt: {
    fontSize: 20,
    color: 'rgb(50, 50, 50)'
  },  
  switchCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center"
  }, 
  addBtn: {
    backgroundColor: "#F1E3D6",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
  },
  addBtnTxt: {
    color: "#6C7AAD",
    fontSize: 30,
  },
});
