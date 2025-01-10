import { StyleSheet, View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebasestore"; 
import { doc, getDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
function Adminpage({ navigation }) {
    const [emails, setemail] = useState("");
    const [passwords, setpassword] = useState("");
    const [logindata, setlogindata] = useState({});
    useEffect(() => {
        gettingadmininfo();
    }, []);
    function backarrowhandle() {
        navigation.navigate("Welcome");
    }
    function signupbutton() {
        navigation.navigate("Signup");
    }
    function emailhandle(email) {
        setemail(email);
    }
    function passwordhandle(password) {
        setpassword(password);
    }
    async function loginbutton() {
        if (emails === logindata.email && passwords === logindata.password) {
            Alert.alert("Login Successful", "You are now logged in as a teacher!");
            navigation.navigate("adminpanel");
        } else {
            Alert.alert("Login Failed", "Incorrect email or password.");
        }
    }
    async function gettingadmininfo() {
        try {
            const docRef = doc(db, "adminlogin", "FeuKZ8EMG2uUnSFNOZXr");
            const docSnap = await getDoc(docRef);
            const { email, password } = docSnap.data();
            setlogindata({ email, password });
            setemail("");
            setpassword("");
        } catch (error) {
            Alert.alert("Error", "Admin data not found: " + error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={backarrowhandle}>
                    <Ionicons name="arrow-back" size={25} color="#1DB954" />
                </Pressable>
                <Text style={styles.headerText}>Teacher Login</Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image style={styles.imageStyle} source={require("../assets/login.png")} />
                </View>
                <View style={styles.multiLoginButton}>
                    <Pressable style={styles.loginOption} onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginOptionText}>Student Login</Text>
                    </Pressable>
                    <Pressable style={styles.loginOption}>
                        <Text style={styles.loginOptionText}>Teacher Login</Text>
                    </Pressable>
                </View>
                <View>
                    <Text style={styles.label}>Teacher Email:</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            value={emails}
                            onChangeText={emailhandle}
                            placeholder="Enter your email"
                            placeholderTextColor="#A0A0A0"
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.label}>Password:</Text>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.inputText}
                            value={passwords}
                            onChangeText={passwordhandle}
                            placeholder="Enter your password"
                            secureTextEntry
                            placeholderTextColor="#A0A0A0"
                        />
                    </View>
                </View>
                <View>
                    <Pressable style={styles.loginButton} onPress={loginbutton}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </Pressable>
                </View>
            </View>
           <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Pressable onPress={signupbutton}>
                    <Text style={[styles.footerText, styles.signupText]}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    );
}
export default Adminpage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 48,
        paddingHorizontal: 24,
    },
    headerText: {
        fontSize: 22,
        color: "#E0E0E0",
        fontWeight: "500",
        marginLeft: 84,
    },
    mainContainer: {
        padding: 24,
    },
    imageContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    imageStyle: {
        width: 250,
        height: 250,
    },
    multiLoginButton: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
    },
    loginOption: {
        backgroundColor: "#1DB954",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    loginOptionText: {
        fontSize: 17,
        color: "#FFFFFF",
        fontWeight: "500",
    },
    label: {
        fontSize: 17,
        color: "#E0E0E0",
        marginBottom: 12,
    },
    inputBox: {
        backgroundColor: "#1C1C1C",
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    inputText: {
        color: "#E0E0E0",
    },
    loginButton: {
        backgroundColor: "#1DB954",
        padding: 12,
        borderRadius: 18,
        alignItems: "center",
        marginVertical: 16,
    },
    loginButtonText: {
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    footerText: {
        fontSize: 16,
        color: "#A0A0A0",
    },
    signupText: {
        color: "#1DB954",
        marginLeft: 8,
    },
});