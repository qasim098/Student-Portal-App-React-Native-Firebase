import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";
import { db } from "../firebasestore";
import { Ionicons } from '@expo/vector-icons';
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { Authcontext } from "../contextstore";
function Profile() {
    const authctx = useContext(Authcontext);
    const [studentdata, setstudentdata] =useState("");
    useEffect(() => {
      gettingstudentinfo();
        }
    , []);
 const id=authctx.studentid;
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
    function logout() {
        authctx.logout("");
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.profileImage}
                    source={studentdata.gender === "Male" ? require("../assets/character.png") : require("../assets/fcharacter.png")}
                />
            </View>
            <View style={styles.profileContainer}>
                {[
                    { label: 'Name', value: studentdata.name, icon: 'person-outline' },
                    { label: 'Class', value: studentdata.stdclass, icon: 'school-outline' },
                    { label: 'Email', value: studentdata.email, icon: 'mail-outline' },
                    { label: 'Gender', value: studentdata.gender, icon: 'male-female-outline' },
                    { label: 'Phone No', value: studentdata.phonenumber, icon: 'call-outline' },
                ].map((item, index) => (
                    <View key={index} style={styles.infoBox}>
                        <Ionicons name={item.icon} size={24} color={"#1DB954"} />
                        <Text style={styles.label}>{item.label}:</Text>
                        <Text style={styles.value}>{item.value}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.logoutContainer}>
                <Pressable style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Profile;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#121212",
        padding: 16,
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40,
    },
    headerText: {
        marginLeft: 16,
        fontSize: 24,
        fontWeight: "bold",
        color: "#1DB954",
    },
    imageContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    profileImage: {
        width: 132,
        height: 132,
        borderRadius: 70,
        borderWidth: 2,
        borderColor: "#1DB954",
        shadowColor: "#000",
        marginTop:18,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    profileContainer: {
        marginTop: 48,
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#1C1C1C",
        elevation: 5,
    },
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: "#A0A0A0",
        marginLeft: 12,
        width: 80,
    },
    value: {
        fontSize: 18,
        color: "#E0E0E0",
    },
    logoutContainer: {
        marginTop: 40,
        alignItems: "center",
    },
    logoutButton: {
        backgroundColor: "#FF6F61",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 5,
        marginTop:38
    },
    logoutText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});