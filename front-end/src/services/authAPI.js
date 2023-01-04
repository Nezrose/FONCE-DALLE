import React, { useState } from 'react';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const URL_AUTH = "http://localhost:1337/api/auth/local";


function authentification(credential) {
  
    return axios.post("http://localhost:1337/api/auth/local",credential)
    .then(res => res.data)
    .then(data =>{
        console.log(data)
        window.localStorage.setItem("authToken", data.jwt)
        window.localStorage.setItem("id", data.user.id)
        window.localStorage.setItem("userName", data.user.username)
        window.localStorage.setItem("firstname", data.user.firstname)
        window.localStorage.setItem("lastname", data.user.lastname)
        window.localStorage.setItem("email", data.user.email)
        axios.defaults.headers["Authorization"]= "Bearer" + data.jwt
        window.location.replace("/")
         }
        )
    
}

const order = async (order) => {
  const stripePromise = loadStripe(
    "pk_test_51MFEBFAimxFdAEyI7kzF1yygRzYHf6yxM6BDlGKtBDz4Lroc1kKlurmRHDIPSMUoctHEfvgynzmxcxi4gbiqigR200FjgnuWxZ"
  );
 
    const stripe = await stripePromise;
    return axios.post("http://localhost:1337/api/orders",order)
    .then(res => res.data,
      )
    .then(data =>{
    console.log(data)
    stripe.redirectToCheckout({
      sessionId:  data.stripeSession.id,
    })
  })

}

function isAuthenticated() { 
  const token = window.localStorage.getItem("authToken")
  if (token){
  const {exp} = jwt_decode(token)
    if (exp * 1000 > new Date().getTime()){ 
      
      return true      
    } return false
  }return false
}

const deconnexion = () => {
  return (
    window.localStorage.removeItem("authToken"),
    window.localStorage.clear(),
    window.location.replace("/")
    )
}



function profilUser (profil, id) {
  console.log({id})
  const token = window.localStorage.getItem("authToken")
  return axios.put(`http://localhost:1337/api/users/${id}`,profil,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then(res => res.data)
  .then(data =>{
      console.log(data)
      window.localStorage.setItem("userName", data.username)
      window.localStorage.setItem("firstname", data.firstname)
      window.localStorage.setItem("lastname", data.lastname)
      window.localStorage.setItem("email", data.email)
    
       }
      )

}


function inscription (uncredential,credential) {
    return (axios.post("http://localhost:1337/api/auth/local/register",uncredential))
    .then(res => res.data)
    .then(data =>{
        console.log(data)
         window.localStorage.setItem("authToken", data.jwt)
        window.localStorage.setItem("id", data.user.id)
        window.localStorage.setItem("userName", data.user.username)
        window.localStorage.setItem("firstname", data.user.firstname)
        window.localStorage.setItem("lastname", data.user.lastname)
        window.localStorage.setItem("email", data.user.email)
        axios.defaults.headers["Authorization"]= "Bearer" + data.jwt
        window.location.replace("http://localhost:3000/confirm-inscription")
        window.location.replace("/")

    }
        )


}

export default {authentification, inscription, isAuthenticated, deconnexion,profilUser, order,};



