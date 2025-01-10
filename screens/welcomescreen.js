import { StyleSheet, View, Text, Pressable, Image } from "react-native";
function Welcomescreen({ navigation }) {
  function loginbuttonhandel() {
    navigation.navigate("Login");
  }
  function signupbuttonhandel() {
    navigation.navigate("Signup");
  }
  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        <Image style={styles.imagestyle} source={require("../assets/welcome1.png")} />
      </View>

      <View style={styles.textcontainer}>
        <Text style={styles.welcometext}>Welcome to your Student Portal!</Text>
        <Text style={styles.descriptiontext}>
          Easily access academic information and stay connected for an optimized learning experience.
        </Text>
      </View>

      <View style={styles.buttoncontainer}>
        <Pressable style={styles.buttonstyle} onPress={loginbuttonhandel}>
          <Text style={styles.buttontext}>Login</Text>
        </Pressable>

        <Pressable style={styles.buttonstyle} onPress={signupbuttonhandel}>
          <Text style={styles.buttontext}>Signup</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default Welcomescreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    alignItems: "center",
    padding: 20,
  },
  imagecontainer: {
    marginBottom: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop:38
  },
  imagestyle: {
    width: 380,
    height: 300,
    resizeMode: "contain",
  },
  textcontainer: {
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcometext: {
    color: "#1DB954", 
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  descriptiontext: {
    color: "#E0E0E0", 
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  buttoncontainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonstyle: {
    backgroundColor: "#1DB954",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttontext: {
    color: "#E0E0E0", 
    fontSize: 20,
    fontWeight: "bold",
  },
});