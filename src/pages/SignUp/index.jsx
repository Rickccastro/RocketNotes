import { useState } from 'react'

import {Input} from '../../components/input'

import {api} from "../../services/api"

import { Link,useNavigate } from 'react-router-dom'
import {Button} from '../../components/button'

import {FiUser,FiMail,FiLock} from 'react-icons/fi'

import {Container, Form,BackgroundImg} from './style'


export function SignUp() {
    const [name,setName] =useState("");
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");

    const navigate= useNavigate();

     function handleSingUp(){

        if(!name|| !email || !password){

         return alert("Preencha todos os campos")
        }

        api.post("/users", { name,email,password } )
        .then(() => {
            alert("Usuario cadastrado com sucesso")
            navigate("/")
        })
        .catch(error=>{
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("Não foi possivel Cadastrar")
            }
        })
    }

    return(    
    <Container>
    <BackgroundImg/>

        <Form>
        <h1>Notes</h1>

        <p>Aplicação para salvar e gerenciar links úteis</p>

        <h2>Crie seu login</h2>
        <Input
        placeholder="Nome"
        type="text"
        icon={FiUser}
        onChange={e=>setName(e.target.value)}
        />

        <Input
        placeholder="Email"
        type="text"
        icon={FiMail}
        onChange={e=>setEmail(e.target.value)}

        />
         <Input
        placeholder="Senha"
        type="password"
        icon={FiLock}
        onChange={e=>setPassword(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSingUp} />

        <Link to="/">
            Voltar para Login
        </Link>

        </Form>
    </Container>
    )
}