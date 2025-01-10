import { View, Text, StyleSheet, Image, Pressable, Alert, ActivityIndicator } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { Authcontext } from "../contextstore";
import { useContext, useEffect, useState } from "react";
import { db } from "../firebasestore";
import { getDoc, doc } from "firebase/firestore";
function Home({ navigation }) {
    const [studentdata, setstudentdata] = useState("");
    const [timetable, settimetable] = useState("");
    const [loading, setloading] = useState(true);
    const authctx = useContext(Authcontext);
    const [id, setid] = useState("");

    useEffect(() => {
        if (id) {
            gettingstudentinfo();
            fetchingtimetable();
        }
    }, [id]);
    useEffect(() => {
        setid(authctx.studentid);
    }, [authctx.studentid]);

    function logout() {
        authctx.logout("");
    }
    async function gettingstudentinfo() {
        try {
            if (id) {
                const docref = doc(db, "studentinfo", id);
                const docsnap = await getDoc(docref);
                const { email, gender, name, stdclass, phonenumber } = docsnap.data();
                setstudentdata({ email, gender, name, stdclass, phonenumber });
            }
        } catch (error) {
            Alert.alert("Data not found", error);
        }
    }

    async function fetchingtimetable() {
        try {
            const docref = doc(db, "timetable",studentdata.stdclass === "10th"?"jffaIsoScjkqn2IGzFWc":"kyYmxRszNtMA1MxApxiR");
            const docsnap = await getDoc(docref);
            const { subject, start, end, subject1, subject2, subject3, subject4,subject5,subject6,subject7,subject8, start1, start2, start3, start4,start5 ,start6,start7,start8,end1, end2, end3, end4 ,end5,end6,end7,end8} = docsnap.data();
            settimetable({ subject, start, end, subject1, subject2, subject3, subject4,subject5,subject6,subject7,subject8 ,start1, start2, start3, start4,start5 ,start6,start7,start8 ,end1, end2, end3, end4 ,end5,end6,end7,end8});
        } catch (error) {
            Alert.alert("Data not found", error);
        } finally {
            setloading(false);
        }
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1DB954" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.maincontainer}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Home</Text>
                <Pressable onPress={logout}>
                    <Ionicons name="exit-outline" size={28} color="#FF6F61" />
                </Pressable>
            </View>

            <View style={styles.profileSection}>
                <Image
                    style={styles.profileImage}
                    source={studentdata.gender === "Male" ? require("../assets/character.png") : require("../assets/fcharacter.png")}
                />
                <View style={styles.profileInfo}>
                    <View style={styles.profileRow}>
                        <Ionicons name="person-outline" size={18} color="#1DB954" />
                        <Text style={styles.profileText}>Name: {studentdata.name}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <Ionicons name="mail-outline" size={18} color="#1DB954" />
                        <Text style={styles.profileText}>Email: {studentdata.email}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <Ionicons name="school-outline" size={18} color="#1DB954" />
                        <Text style={styles.profileText}>Class: {studentdata.stdclass}</Text>
                    </View>
                    <View style={styles.profileRow}>
                        <Ionicons name="call-outline" size={18} color="#1DB954" />
                        <Text style={styles.profileText}>Phone No: {studentdata.phonenumber}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <MaterialIcons name="schedule" size={24} color="#1DB954" />
                            <Text style={styles.cardTitle}>Timetable</Text>
                        </View>
                    
                    <View>
                        <Text style={styles.sunjecttital}>{timetable.subject}</Text>
                        <Text style={styles.subjecttime}>{timetable.start}to{timetable.end}</Text>

                        <Text style={styles.sunjecttital}>{timetable.subject1}</Text>
                        <Text  style={styles.subjecttime}>{timetable.start1} To {timetable.end1}</Text>

                        <Text style={styles.sunjecttital}>{timetable.subject2}</Text>
                        <Text  style={styles.subjecttime}>{timetable.start2}to{timetable.end2}</Text>

                        <Text style={styles.sunjecttital}>{timetable.subject3}</Text>
                        <Text  style={styles.subjecttime}>{timetable.start3}to{timetable.end3}</Text>

                        <Text style={styles.sunjecttital}>{timetable.subject4}</Text>
                        <Text  style={styles.subjecttime}>{timetable.start4}to{timetable.end4}</Text>


                        <Text style={styles.sunjecttital}>{timetable.subject5}</Text>
                        <Text  style={styles.subjecttime}>{timetable.start5}{timetable.end5}</Text>
                    
                        </View>
                    </View>
                </View>
                <View style={styles.rightContainer}>                
                    <Pressable style={[styles.card, styles.resultCard]} onPress={() => navigation.navigate("result")}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="analytics-outline" size={24} color="#1DB954" />
                            <Text style={styles.cardTitle}>Acdemic performance</Text>
                        </View>
                        <View style={styles.resultContent}>
                            <View style={styles.resultRow}>
                                <Text style={styles.resultMonth}>January:</Text>
                                <Text style={styles.resultPercentage}>In Progress</Text>
                            </View>
                        </View>
                    </Pressable>

                    <View style={[styles.card, styles.attendanceCard]}>
                        <View style={styles.cardHeader}>
                            <FontAwesome5 name="clipboard-list" size={24} color="#1DB954" />
                            <Text style={styles.cardTitle}>Student behaviour</Text>
                        </View>
                        <View style={styles.resultContent}>
                            <View style={styles.resultRow}>
                            <Text style={styles.resultMonth}>January:</Text>
                            <Text style={styles.resultPercentage}>Monitoring</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Home;

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 32
    },
    headertext: {
        fontSize: 24,
        color: "#1DB954",
        fontWeight: "bold",
        marginLeft: 150
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#1C1C1C",
        borderRadius: 16,
        marginBottom: 24,
        elevation: 4,
        marginTop: 18
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileInfo: {
        marginLeft: 16,
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    profileText: {
        color: "#E0E0E0",
        fontSize: 15,
        marginLeft: 8,
    },
    contentContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18
    },
    leftContainer: {
        flex: 1,
        marginRight: 10,
    },
    rightContainer: {
        flex: 1,
    },
    card: {
        backgroundColor: "#1C1C1C",
        padding: 16,
        borderRadius: 16,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 20,
        color: "#1DB954",
        fontWeight: "bold",
        marginLeft: 6,
    },
    cardContent: {
        padding: 12,
    },
    timetableItem: {
        marginBottom: 12,
    },
    subjectText: {
        fontSize: 18,
        color: "#E0E0E0",
    },
    timeText: {
        fontSize: 16,
        color: "#A0A0A0",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
    },
    loadingText: {
        marginTop: 10,
        color: "#A0A0A0",
    },
    resultCard: {
        marginTop: 8,
        height: "30%",
    },
    attendanceCard: {
        marginTop: 48,
        height: "35%",
    },
    resultContent: {
        padding: 12,
    },
    resultRow: {
        
        justifyContent: "space-between",
        marginBottom:2,
        marginTop:-6
    },
    resultMonth: {
        color: "#E0E0E0",
        fontSize: 18,
    },
    resultPercentage: {
        color: "#1DB954",
        fontSize: 18,
        fontWeight: "bold",
    },
    sunjecttital:{
        fontSize:19,
        color:"white",
         marginLeft:28,
         marginTop:12,
         marginBottom:8
    },
    subjecttime:{
      marginLeft:18,
      color:"white"
    }
});