import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Pressable, StyleSheet, Alert } from 'react-native';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../firebasestore';
function AddResult() {
    const [stage, setStage] = useState('initialForm'); 
    const [month, setMonth] = useState('');
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [subjects, setSubjects] = useState([{ name: '', totalMarks: '', obtainedMarks: '' }]); 
    const [loading, setLoading] = useState(false);  
    useEffect(() => {
        const fetchStudents = async () => {
            setLoading(true);
            try {
                const studentsSnapshot = await getDocs(collection(db, 'studentinfo'));
                const studentsList = studentsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setStudents(studentsList);
            } catch (error) {
                console.error("Error fetching students:", error);
                Alert.alert('Error', 'Failed to fetch students. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

  
    const handleInitialFormSubmit = () => {
        if (!month) {
            Alert.alert('Error', 'Please fill in the month.');
            return;
        }
        setStage('selectStudent'); 
    };

 
    const handleSubjectChange = (index, field, value) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index][field] = value;
        setSubjects(updatedSubjects);
    };

  
    const handleAddSubject = () => {
        setSubjects([...subjects, { name: '', totalMarks: '', obtainedMarks: '' }]);
    };


    const handleSaveResult = async () => {
       
        if (!selectedStudent) {
            Alert.alert('Error', 'Please select a student before saving the result.');
            return;
        }

        if (subjects.some(sub => !sub.name || !sub.totalMarks || !sub.obtainedMarks)) {
            Alert.alert('Error', 'Please fill in all fields for each subject.');
            return;
        }

        try {
 
            for (const subject of subjects) {
                await addDoc(collection(db, 'studentResults'), {
                    studentId: selectedStudent.id,
                    studentName: selectedStudent.name,
                    subject: subject.name,
                    month: month,
                    totalMarks: subject.totalMarks,
                    obtainedMarks: subject.obtainedMarks,
                });
            }
            Alert.alert('Success', 'Results saved successfully!');
         
            resetForm();
        } catch (error) {
            console.error("Error saving result:", error);
            Alert.alert('Error', 'Failed to save the results. Please try again.');
        }
    };
    const resetForm = () => {
        setStage('initialForm');
        setMonth('');
        setSubjects([{ name: '', totalMarks: '', obtainedMarks: '' }]);
        setSelectedStudent(null);
    };
    return (
        <View style={styles.container}>
            {stage === 'initialForm' && (
                <View>
                    <Text style={styles.title}>Enter Month</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Month"
                        placeholderTextColor="#A0A0A0"
                        value={month}
                        onChangeText={setMonth}
                    />
                    <Button title="Next" onPress={handleInitialFormSubmit} color="#1DB954" />
                </View>
            )}
            {stage === 'selectStudent' && (
                <View>
                    <Text style={styles.title}>Select a Student</Text>
                    {loading ? (
                        <Text style={styles.loadingText}>Loading students...</Text>
                    ) : (
                        <FlatList
                            data={students}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={styles.studentItem}
                                    onPress={() => {
                                        setSelectedStudent(item);
                                        setStage('enterSubjects');
                                    }}
                                >
                                    <Text style={styles.studentName}>{item.name}</Text>
                                </Pressable>
                            )}
                        />
                    )}
                </View>
            )}
            {stage === 'enterSubjects' && (
                <View>
                    <Text style={styles.title}>Enter Subjects</Text>
                    {subjects.map((subject, index) => (
                        <View key={index} style={styles.subjectContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Subject Name"
                                placeholderTextColor="#A0A0A0"
                                value={subject.name}
                                onChangeText={(value) => handleSubjectChange(index, 'name', value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Total Marks"
                                placeholderTextColor="#A0A0A0"
                                value={subject.totalMarks}
                                onChangeText={(value) => handleSubjectChange(index, 'totalMarks', value)}
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Obtained Marks"
                                placeholderTextColor="#A0A0A0"
                                value={subject.obtainedMarks}
                                onChangeText={(value) => handleSubjectChange(index, 'obtainedMarks', value)}
                                keyboardType="numeric"
                            />
                        </View>
                    ))}
                    <Button title="Add Subject" onPress={handleAddSubject} color="#1DB954" />
                    <Button title="Save Results" onPress={handleSaveResult} color="#1DB954" />
                </View>
            )}
        </View>
    );
}

export default AddResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#1DB954",
        marginBottom: 16,
    },
    input: {
        backgroundColor: "#1C1C1C",
        color: "#E0E0E0",
        padding: 10,
        marginBottom: 12,
        borderRadius: 5,
    },
    subjectContainer: {
        marginBottom: 16,
    },
    studentItem: {
        padding: 16,
        backgroundColor: "#1C1C1C",
        borderBottomWidth: 1,
        borderBottomColor: "#333",
    },
    studentName: {
        color: "#E0E0E0",
        fontSize: 18,
    },
    loadingText: {
        color: "#A0A0A0",
        fontSize: 16,
        textAlign: 'center',
    },
});