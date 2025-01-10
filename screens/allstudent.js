import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { db } from "../firebasestore";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {Ionicons} from '@expo/vector-icons'
function Allstudent({navigation}) {
  const [allStudents, setAllStudents] = useState([]);
  useEffect(() => {
    readStudents();
  }, []);

  async function readStudents() {
    const studentsSnapshot = await getDocs(collection(db, "studentinfo"));
    const studentList = studentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllStudents(studentList);
  }

  return (<>
   <View style={styles.headcontainer}>
      <Pressable style={styles.headericonstyle} onPress={()=>navigation.navigate("adminpanel")}> 
        <Ionicons name="arrow-back" size={28} color={"#1DB954"}/>
      </Pressable>
      <Text style={styles.headertext}>All Students</Text>
   </View>
    <ScrollView style={styles.container}>
      {allStudents.map((data) => (
        <View key={data.id} style={styles.studentBox}>
          <Text style={styles.studentName}>Name: {data.name}</Text>
          <Text style={styles.studentInfo}>Class: {data.stdclass}</Text>
          <Text style={styles.studentInfo}>Email: {data.email}</Text>
          <Text style={styles.studentInfo}>Password: {data.password}</Text>
          <Text style={styles.studentInfo}>Gender: {data.gender}</Text>
          <Text style={styles.studentInfo}>Phone Num: {data.phonenumber}</Text>
        </View>
      ))}
    </ScrollView>
    </>
  );
}

export default Allstudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 10,
  
  },
  headcontainer:{
    flexDirection:"row",
    backgroundColor: "#121212",
    alignItems:"center"
  },
  headertext:{
    color: "#E0E0E0",
    marginTop:48,
    fontSize:22,
    fontWeight:"500",
    marginLeft:80,
    marginBottom:24
  },
  headericonstyle:{
     marginTop:32,
     marginLeft:24
  },
  studentBox: {
    backgroundColor: "#1C1C1C",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: "#1DB954",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E0E0E0",
    marginBottom: 5,
  },
  studentInfo: {
    fontSize: 16,
    color: "#A0A0A0",
    marginBottom: 3,
  },
});
