import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Timetable() {
  const [subjects, setSubjects] = useState([]); 

  const addNewSubject = () => {
    setSubjects([...subjects, { name: "", startTime: "", endTime: "" }]);
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value; 
    setSubjects(updatedSubjects);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={addNewSubject}>
          <Ionicons style={styles.iconStyle} name="add" size={26} color="#1DB954" />
        </Pressable>
        <Text style={styles.headerText}>Add Subject</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text>Enter class:</Text>
        <TextInput style={styles.classStyle} placeholder="Enter class name" />
      </View>

      {subjects.map((subject, index) => (
        <View key={index} style={styles.addSubjectContainer}>
          <Text style={styles.Textstyle}>Subject Name:</Text>
          <TextInput
            style={styles.classStyle}
            placeholder="Enter subject name"
            value={subject.name}
            onChangeText={(text) => handleSubjectChange(index, "name", text)}
          />

          <Text  style={styles.Textstyle}>Start Time:</Text>
          <TextInput
            style={styles.classStyle}
            placeholder="Enter start time"
            value={subject.startTime}
            onChangeText={(text) => handleSubjectChange(index, "startTime", text)}
          />

          <Text  style={styles.Textstyle}>End Time:</Text>
          <TextInput
            style={styles.classStyle}
            placeholder="Enter end time"
            value={subject.endTime}
            onChangeText={(text) => handleSubjectChange(index, "endTime", text)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

export default Timetable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconStyle: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    color: "#1DB954",
    fontWeight: "bold",
  },
  inputContainer: {
    marginBottom: 16,
  },
  classStyle: {
    borderWidth: 1,
    borderColor: "#1DB954",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    color: "#E0E0E0",
  },
  addSubjectContainer: {
    backgroundColor: "#1C1C1C",
    padding: 12,
    borderRadius: 8,
    borderColor: "#1DB954",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 10,
  },
  Textstyle:{
    color: "#E0E0E0",
  }
});