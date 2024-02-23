
import {Input} from '../../components/input'

import { Link } from 'react-router-dom'
import {Button} from '../../components/button'

import {FiUser,FiMail,FiLock} from 'react-icons/fi'

import {Container, Form,BackgroundImg} from './style'



export function SignUp() {
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
        />

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
        <Link to="/">
        Voltar para Login

        </Link>
        </Form>
    </Container>
    )
}