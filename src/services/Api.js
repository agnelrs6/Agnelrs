import axios from "axios";
import { getUserData } from "./Store";


axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1';
const API_KEY = "AIzaSyAawZ43ktmM17ByAJ4ERmuqqUtHkVvY3LY";
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS = `/accounts:lookup?key=${API_KEY}`



export const RegisterApi = (inputs)=>{
let data = {displayName:inputs.name,email:inputs.email,password:inputs.password}
return axios.post(REGISTER_URL,data)
}

export const LoginApi = (inputs)=>{
    let data = {email:inputs.email,password:inputs.password}
    return axios.post(LOGIN_URL,data)
    }

export const UserDetails =()=>{
    let data ={idToken:getUserData()}
    return axios.post(USER_DETAILS,data)

}