import { Outlet, Navigate } from "react-router-dom";
import React from 'react'
import AuthContext from '../context/authContext';

const PrivateRoute = ({children}) => {
    const {isAuthenticated} =  React.useContext(AuthContext)

    console.log(isAuthenticated)

    if (!isAuthenticated){
     return window.location.replace("/") 
    } return children


    return 
        
    

    
}
export default PrivateRoute