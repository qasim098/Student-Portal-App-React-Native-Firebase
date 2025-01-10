import axios from "axios";
const Apikey="";////use your own firebase api key
export async function Createuser(email,password){
   const response=await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+Apikey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
    )
    const token=response.data.idToken;
    return  token;
}
export async function Checkuser(email,password){
    const response=await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+Apikey,
         {
             email:email,
             password:password,
             returnSecureToken:true
         }
     )
     const token=response.data.idToken;
     return  token;
 }