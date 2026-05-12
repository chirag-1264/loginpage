"use client";
import { POST } from "@/app/api/register/route";
import Link from "next/link";
import { useState } from "react";

export default function Registerform(){
    const[name,Setname]=useState("");
    const[email,Setemail]=useState("");
    const[password,Setpassword]=useState("");
    const[error,Seterror]=useState("");
    console.log(name);
    const handle= async(e)=>{
      e.preventDefault();

      if(!name||!email||!password){
        Seterror("All fields are neccessary!");
        return 
      }
    

     try {
        const res= await fetch("api/register",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                name,email,password
            })
        });
        if(res.ok){
           const form= e.target;
            form.reset();
        }
        else{
            console.log("user registrartion failed")
        }
     } catch (error) {
        console.log("user registration failed",error);
     }
    }
    return(
       <div className="grid place-items-center h-screen">
   <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
      
      <h1 className="text-xl font-bold my-4">Register</h1>

       <form onSubmit={handle} className="flex flex-col gap-3">
         <input onChange={(e)=> Setname(e.target.value)} type="text" placeholder="Full name"/>
        <input  onChange={(e) => Setemail(e.target.value)}type="text" placeholder="email"/>
        <input   onChange={(e) => Setpassword(e.target.value)} type="text" placeholder="password"/>
        <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">Register</button>
{error&&(
        <div className="bg-red-600 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
)}
        <Link href={'/'} className="text-sm mt-3 text-right"> Already have a account? <span className="underline">Login</span> </Link>
       </form>
    </div>
    </div>
    )
}