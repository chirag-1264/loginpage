"use client";

import { useRef, useState ,useEffect} from "react";
import { useRouter } from "next/navigation";

export default function Otpform() {
  const[otp,Setotp]=useState("");
  const[error,Seterror]=useState("");
  const [signupData, setSignupData] = useState(null);
   const router=useRouter();
  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("signupData")
    );
    setSignupData(data);
  }, []);

const handle= async(e)=>{
e.preventDefault();

try {
        const res= await fetch("/api/register",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                  ...signupData,
                  otp,
            })
        });
        if(res.ok){
           const form= e.target;
            form.reset();
            router.push("/");
        }
        else{
           console.log("user registrartion failed");
          if(res.status==500){
              Seterror("otp-invalid");
          }
          if(res.status==400){
            Seterror("otp-expired");
          }

        }
     } catch (error) {
        console.log("user registration failed",error);
     }
    }

  return (
    <div className="grid place-items-center h-screen">
   <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
      
      <h1 className="text-xl font-bold my-4">Register</h1>

       <form  onSubmit={handle} className="flex flex-col gap-3">
    
        <input  onChange={(e) => Setotp(e.target.value)}type="text" placeholder="enter otp"/>
        <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">verify and register</button>


{error&&(
        <div className="bg-red-600 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
)}

       </form>
    </div>
    </div>
  );
}