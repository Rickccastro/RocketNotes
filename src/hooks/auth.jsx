import { createContext,useContext,useState,useEffect } from "react";

import { api } from "../services/api";

export const AuthContext=createContext({})

function AuthProvider({children}){
    const[data,setData]=useState({})
    
    async function signIn({email,password}){
        try{
            const response=await api.post("/sessions",{email,password})
            const {user,token}=response.data
            
            localStorage.setItem("@rocketnotes:user",JSON.stringify(user));
            localStorage.setItem("@rocketnotes:token",token);

            api.defaults.headers.common['Authorization']=`Bearer ${token}`;

            setData({user,token})
        }
        catch(error){
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("não foi possivel entrar")
            }
        }
     }

     function signOut(){
        const token =localStorage.removeItem("@rocketnotes:token");
        const user = localStorage.removeItem("@rocketnotes:user");

        setData({});
     }

     async function updateProfile({user,avatarFile}){
        try{
            if(avatarFile){
                const fileUpdloadForm=new FormData();

                fileUpdloadForm.append("avatar",avatarFile)

                const response =await api.patch("/users/avatar",fileUpdloadForm)

                user.avatar =response.data.avatar
            }

            
            await api.put("/users",user);
            localStorage.setItem("@rocketnotes:user",JSON.stringify(user))
            
           setData({user, token: data.token})
           alert("perfil atualizado")
            
        }
        catch(error){
            if(error.response){
                console.log(data.token)
                console.error(error);
                alert(error.response.data.message)
            }else{
                alert("não foi possivel entrar")
            }
        }

     }

     useEffect(()=>{
            const token =localStorage.getItem("@rocketnotes:token");
            const user = localStorage.getItem("@rocketnotes:user");

            if(token && user){
                api.defaults.headers.common['Authorization']=`Bearer ${token}`;
                setData({
                    token,
                    user:JSON.parse(user)
                })
            }

     },[])
    return(
        <AuthContext.Provider value={
            {signIn,
            signOut,
            updateProfile,
            user:data.user,
            }}>
        {children}

        </AuthContext.Provider>
    )
}

function useAuth(){
   const context= useContext(AuthContext)
   return context
}

export {AuthProvider,useAuth}