import { SignupInput } from "@ishonpanda/medium-common";
import { ChangeEventHandler, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";
 

 export const Auth = ({type}: {type: "signup" | "signin"})=>{

    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupInput>({
        email:"",
        password:"",
        name:"",
    });

    async function sendRequest()
    {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
             const jwt = response.data.token;
             localStorage.setItem("token",jwt);
             navigate("/blogs");
        }catch(e)
        {
            //alert
            alert("Error While Signing up");
        }
        
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold text-left">
                    Create an account
                </div>

                <div className="text-slate-400">
                    {type =="signup" ? "Already have an account?" : "Don't have an account?"}
                    <Link className="pl-2 underline" to={type == "signup" ? "/signin" : "/signup"}>
                    {type == "signup" ? "Sign in" : "Sign up"}</Link>
                </div>
            </div>
            <div className="mt-4">
            {type === "signup" ? <LabeledInput label="Name" placeholder="Ishon Panda..." onChange={(e: { target: { value: any; }; })=>{
                setPostInputs(postInputs=>({
                    ...postInputs,
                    name: e.target.value
                }))
            }}/> : null}
            <LabeledInput label="Email" placeholder="ishon@gmail.com" onChange={(e: { target: { value: any; }; })=>{
                setPostInputs(postInputs=>({
                    ...postInputs,
                    email: e.target.value
                }))
            }}/>
            <LabeledInput label="Password" type={"password"} placeholder="ad9a7@#hjgj#" onChange={(e: { target: { value: any; }; })=>{
                setPostInputs(postInputs=>({
                    ...postInputs,
                    password: e.target.value
                }))
            }}/>
            <div className="mt-8 flex justify-center">
            <button onClick={sendRequest} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                {type =="signup" ? "Sign up" : "Sign in"}
                </span>
                </button>

            </div>

            </div>
            </div>
        </div>
    </div>
 }

interface LabelledType {
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>,
    type?: string;
}
 function LabeledInput({label,placeholder,onChange,type}: LabelledType) {
    return <div>
    <label className="block mb-2 text-sm text-black font-bold pt-4">{label}</label>
    <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
     focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
</div>
 }