import { StyleSheet, Text, View, ImageBackground, Pressable } from 'react-native';


export default function ProjectButton({ item }){

return (
    <View style={styles.projBtn} ><Text style={styles.projBtnText}>{item.title}</Text></View>
)

}

const styles = StyleSheet.create({
    projBtnText: {
        textAlign: 'center',
        color: '#93A1D4',
        fontSize: 30
    },
    projBtn: {
        backgroundColor: '#F1E3D6',
        borderRadius: 10,
        padding: 10,
    
    }
}
  );
  