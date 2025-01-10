import { createContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Authcontext = createContext({
    token: '',
    isauthtoken: false,
    authenicate: (token) => {},
    logout: () => {},
    studentid:'',
    studentidtaker:(id)=>{}
});

function Authcontextprovider({ children }) {
    const [authtoken, setauthtoken] = useState("");
    const [studentid,setstudentid]=useState("");
     useEffect(()=>{
        async function fetchtoken(){
        const storetoken=await AsyncStorage.getItem("token")
        if(storetoken){
            setauthtoken(storetoken);
        }
        }
      fetchtoken();
    },[]);
    useEffect(()=>{
        async function fetchid(){
            const storeid=await AsyncStorage.getItem("id")
            if(storeid){
                setstudentid(storeid);
            }
        }
        fetchid();
    },[])
    function authenticate(token){
      setauthtoken(token)
      AsyncStorage.setItem("token",token)
    };

    function logout() {
        setauthtoken('');
    }
    function studentidtaker(id){
             setstudentid(id);
             AsyncStorage.setItem("id",id)
         }
    const value = {
        token: authtoken,
        isauthtoken: !!authtoken,
        authenicate: authenticate,
        logout: logout,
        studentid:studentid,
      studentidtaker:studentidtaker
    };

    return <Authcontext.Provider value={value}>{children}</Authcontext.Provider>;
}
export default Authcontextprovider;