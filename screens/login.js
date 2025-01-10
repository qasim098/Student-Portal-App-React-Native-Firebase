import { StyleSheet, View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Checkuser } from "../fireauth";
import { Authcontext } from "../contextstore";

function Loginscreen({ navigation }) {
  const authctx = useContext(Authcontext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  function backarrowhandel() {
    navigation.navigate("Welcome");
  }

  function signupbutton() {
    navigation.navigate("Signup");
  }

  function emailhandel(email) {
    setemail(email);
  }

  function passwordhandel(password) {
    setpassword(password);
  }

  async function loginbutton() {
    try {
      const token = await Checkuser(email, password);
      if (token) {
        authctx.authenicate(token);
        setemail("");
        setpassword("");
        Alert.alert("Authentication successful");
      }
    } catch (error) {
      Alert.alert("Student not found!", "Enter correct email password");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={backarrowhandel}>
          <View  style={styles.arrawiconstyle}>
          <Ionicons name="arrow-back" size={25} color="#1DB954" />
          </View>
         
        </Pressable>
        <Text style={styles.logintexthead}>Student Login</Text>
      </View>

      <View style={styles.maincontainer}>
        <View style={styles.imagecontainer}>
          <Image style={styles.imagestyle} source={require("../assets/login.png")} />
        </View>

        <View style={styles.multiloginbutton}>
          <Pressable style={styles.togglebutton}>
            <Text style={styles.togglebuttontext}>Student Login</Text>
          </Pressable>
          <Pressable style={styles.togglebutton} onPress={() => navigation.navigate("adminlogin")}>
            <Text style={styles.togglebuttontext}>Teacher Login</Text>
          </Pressable>
        </View>

        <Text style={styles.textstyle}>Student email:</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.inputtext}
            value={email}
            onChangeText={emailhandel}
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
          />
        </View>

        <Text style={styles.textstyle}>Password:</Text>
        <View style={styles.inputbox}>
          <TextInput
            style={styles.inputtext}
            value={password}
            onChangeText={passwordhandel}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#A0A0A0"
          />
        </View>

        <Pressable style={styles.buttonstyle} onPress={loginbutton}>
          <Text style={styles.buttontext}>Login</Text>
        </Pressable>
      </View>

      <View style={styles.footerstyle}>
        <Text style={styles.textstyle}>Don't have an account? </Text>
        <Pressable onPress={signupbutton}>
          <Text style={[styles.textstyle, styles.signuptext]}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Loginscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  logintexthead: {
    fontSize: 23,
    fontWeight: "500",
    color: "#1DB954",
    marginLeft: 16,
    marginTop:30
  },
  maincontainer: {
    padding: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
  },
  imagecontainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagestyle: {
    width: 250,
    height: 250,
  },
  multiloginbutton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  togglebutton: {
    backgroundColor: "#1DB954",
    borderRadius: 8,
    padding: 10,
    width: "48%",
    alignItems: "center",
  },
  togglebuttontext: {
    color: "#E0E0E0",
    fontWeight: "500",
    fontSize: 17,
  },
  textstyle: {
    fontSize: 17,
    color: "#E0E0E0",
    marginBottom: 12,
  },
  inputbox: {
    backgroundColor: "#333333",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  inputtext: {
    color: "#E0E0E0",
  },
  buttonstyle: {
    backgroundColor: "#1DB954",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  buttontext: {
    color: "#E0E0E0",
    fontSize: 20,
    fontWeight: "600",
  },
  footerstyle: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  signuptext: {
    color: "#1DB954",
    fontSize: 18,
    fontWeight: "500",
  },
  arrawiconstyle:{
    marginTop:30
  }
});