import { createContext,useContext,useState,useEffect } from "react";

import { api } from "../services/api";

export const AuthContext=createContext({})

function AuthProvider({children}){
    const[data,setData]=useState({})
    
    async function signIn({email,password}){
        try{
            /**conectando com o back sessions passando email e senha */
            const response=await api.post("/sessions",{email,password})

            /**pegando usuario e token da resposta */
            const {user,token}=response.data
            
            /**armazenando no localStorage */
            localStorage.setItem("@rocketnotes:user",JSON.stringify(user));
            localStorage.setItem("@rocketnotes:token",token);

            /**deixando o token padrao para as requisicoes */
            api.defaults.headers.common['Authorization']=`Bearer ${token}`;

            /**armazenando no estado o usuario e o token */
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
        /**retira o token e usuario do localstorage e reseta o setData */
        const token =localStorage.removeItem("@rocketnotes:token");
        const user = localStorage.removeItem("@rocketnotes:user");

        setData({});
     }

     async function updateProfile({user,avatarFile}){
        try{
            /**se o usuario envia o arquivo for true */
            if(avatarFile){
                /**construindo dados do formulario */
                const fileUpdloadForm=new FormData();

                /**vincula o arquivo com a chave avatar */
                fileUpdloadForm.append("avatar",avatarFile)

                /**envia formulario formData para o corpo da requisicao*/
                const response =await api.patch("/users/avatar",fileUpdloadForm)

                /**atualiza o usuario local */
                user.avatar =response.data.avatar
                }

            /**manda o put */
            await api.put("/users",user);
            /**joga no localstorage o usuario com conversao de texto*/
            localStorage.setItem("@rocketnotes:user",JSON.stringify(user))
            
           /**atribue no setData o usuario e token */ 
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
        /**recuperando os itens do localStorage que foram previamente armazenados */
            const token =localStorage.getItem("@rocketnotes:token");
            const user = localStorage.getItem("@rocketnotes:user");

            if(token && user){
                api.defaults.headers.common['Authorization']=`Bearer ${token}`;
                /**define os dados recuperados do localStorage no estado do component*/
                setData({
                    token,
                    user:JSON.parse(user)
                })
            }

     },[])
    return(
        /**define os metodos do contexto */
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