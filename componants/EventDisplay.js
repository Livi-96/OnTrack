import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';
import background from '../assets/formBackGround.png'


export default function EventDisplay({ event, setOpenEvent }){

return (
    <ImageBackground
    source={background}
      resizeMode="cover"
      style={styles.image}>
    <View style={styles.container}>
         <Text style={styles.title}>
           {event.event}
        </Text>
        <Text style={styles.notesCont} >Event details: {event.notes}</Text>
        <View style={styles.bttnsCont}>
        <Pressable  style={styles.addBtn} onPress={()=>{setOpenEvent(false)}}> 
        <Text style={styles.addBtnTxt}>
           Close
        </Text>
        </Pressable>
        <Pressable
            style={styles.addBtn}
            
          >
            <Text style={styles.addBtnTxt}>Delete</Text>
          </Pressable>
          </View>
    </View>
    </ImageBackground>
)

}  


  const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        padding: 40
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

  },
  bttnsCont: {
    display: 'flex',
    flexDirection: "row",
    gap: 6
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

});
