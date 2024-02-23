
import {Input} from '../../components/input'

import { Link } from 'react-router-dom'

import {Button} from '../../components/button'

import {FiMail,FiLock} from 'react-icons/fi'

import {Container, Form,BackgroundImg} from './style'


export function SignIn() {
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
        />
         <Input
        placeholder="Senha"
        type="password"
        icon={FiLock}
        />

        <Button title="Entrar"/>
        
        <Link to="/register">
        Criar Conta

        </Link>
        </Form>
        <BackgroundImg/>

    </Container>
    )
}