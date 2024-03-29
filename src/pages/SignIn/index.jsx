import {Input} from '../../components/input'

import { Link } from 'react-router-dom'

import {Button} from '../../components/button'

import { useAuth } from '../../hooks/auth'

import {FiMail,FiLock} from 'react-icons/fi'

import {Container, Form,BackgroundImg} from './style'
    
import { useState } from 'react'

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signIn} =useAuth()

    function handleSignIn(){
        signIn({email,password})
    }

    return(    
    <Container>
        <Form>
        <h1>Notes</h1>

        <p>Aplicação para salvar e gerenciar links úteis</p>

        <h2>Faça seu login </h2>

        <Input
        placeholder="Email"
        type="text"
        icon={FiMail}
        onChange={e => setEmail(e.target.value)}
        />
         <Input
        placeholder="Senha"
        type="password"
        icon={FiLock}
        onChange={e=>setPassword(e.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn}/>
        
        <Link to="/register">
        Criar Conta

        </Link>
        </Form>
        <BackgroundImg/>

    </Container>
    )
}