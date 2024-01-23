import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Modal
} from "react-native";
import background from "../assets/background.jpg";
import ProjectButton from "../componants/buttons";
import { useState, useEffect} from "react";
import AddForm from "./reviewForm";
import * as SQLite from 'expo-sqlite'
import Details from "./Details";
import { DB } from "../global";
import Calendar from "./Calendar";

export default function Home({ navigation }) {

  const pressHandler = () => {
    navigation.push("Details");
  };

  const [modalOpen, setModalOpen] = useState(false);

  // sqlite database
  
  const [projects, setProjects] = useState(null)

//   const MyContext = createContext(setProjects)

    // const DB = SQLite.openDatabase('projects.db')

    useEffect(() => {
        DB.transaction(tx => {

            tx.executeSql(`CREATE TABLE IF NOT EXISTS projects
            ( id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                notes TEXT,
                language TEXT,
                completed BOOLEAN)`);

            tx.executeSql(`INSERT INTO projects
            (title, description, notes, language)
            VALUES('On Track', 'This is an app', 'Its going ok', 'React Native')`);
            
            tx.executeSql(`SELECT * FROM projects`, null,
            (txObj, resultSet) => setProjects(resultSet.rows._array),
            (txObj, resultSet) => console.log(resultSet.rows._array),
            (txObj, error) => console.log(error));

            tx.executeSql('DROP TABLE projects', null);
        });
    }, []);

    // sqlite database

  // Form Logic

  function addProject(values){

    DB.transaction( tx => {

            tx.executeSql(`INSERT INTO projects
            (title, description, notes, language)
            VALUES(?, ?, ?, ?)`, [values.title, values.description, values.notes, values.language]);

            tx.executeSql(`SELECT * FROM projects`, null,
            (txObj, resultSet) => setProjects(resultSet.rows._array),
            (txObj, error) => console.log(error));
    }

    
    )
  }

  // Form Logic

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <Modal visible={modalOpen} animationType="slide" setModalOpen={setModalOpen}>
            <AddForm setModalOpen={setModalOpen} addProject={addProject}/>
        </Modal>
        <Text style={styles.title}>On Track</Text>
        <StatusBar style="auto" />
        <View style={styles.projectBtnContainer}>
            {projects ? <Text></Text> : <Text style={styles.noprojtxt}>You do not currently have any projects.</Text> }
          <FlatList
            data={projects}
            renderItem={({ item }) => (
              <View style={styles.projectBtns}>
                <ProjectButton id={item.id} style={styles.projectComp} item={item} />
                <Pressable
                  onPress={() => {
                    navigation.navigate("Details", item);
                  }}
                  style={styles.projBtn}
                >
                  <Text style={styles.projBtnText}>Open</Text>
                </Pressable>
              </View>
            )}
          />
<Pressable
onPress={() => {
    navigation.navigate("Calendar");
  }}
  ><Text>Calendar</Text></Pressable>
          <Pressable
            style={styles.addBtn}
            onPress={() => {
              setModalOpen(true);
            }}
          >
            <Text style={styles.addBtnTxt}>Add Project</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    width: "100%",
  },
  title: {
    color: "#F4DDC2",
    fontSize: 50,
    marginTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  projectBtnContainer: {
    flex: 1,
    marginTop: 30,
    height: "auto",
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
  projectBtns: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
    margin: 3,
  },
  projBtnText: {
    textAlign: "center",
    color: "#93A1D4",
    fontSize: 30,
  },
  projBtn: {
    backgroundColor: "#F1E3D6",
    borderRadius: 10,
    padding: 10,
  },
  projectComp: {
    flex: 1,
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
  addCancelBttns: {
    display: 'flex',
    flexDirection: 'row'
  }, 
  noprojtxt: {
    color: '#F4DDC2',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 40
  }
});
