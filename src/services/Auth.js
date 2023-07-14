import { getUserData, removeUserData } from "./Store"

export const isAuthenticated = ()=>{
   return getUserData()!= null?true:false;
  
}

export const logout = ()=>{
   removeUserData();
}