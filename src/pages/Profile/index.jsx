import {FiArrowLeft,FiUser,FiMail,FiLock,FiCamera} from 'react-icons/fi'

import { useState } from 'react';

import { useAuth } from '../../hooks/auth';

import avatarPlacehoalder from '../../assets/avatar_placeholder.svg'

import { api } from '../../services/api';

import { Link } from "react-router-dom";

import {Input} from '../../components/input'

import {Button} from '../../components/button'

import { Container,Form,Avatar} from "./style";


export function Profile(){

    const {user,updateProfile}=useAuth()

    const [name,setName]=useState(user.name)
    const [email,setEmail]=useState(user.email)
    const [passwordOld,setPasswordOld]=useState()
    const [passwordNew,setPasswordNew]=useState()

    const avatarUrl=user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlacehoalder

    const [avatar,setAvatar]=useState(avatarUrl)
    const [avatarFile,setAvatarFile]=useState(null)


   async function handleUpdate(){
    const user={
        name,
        email,
        password: passwordNew,
        old_password:passwordOld
         }
    await updateProfile({user,avatarFile}) 

    }

    async function handleChangeAvatar(event){
        const file=event.target.files[0]
        setAvatarFile(file)

        const imagePreview=URL.createObjectURL(file)

        setAvatar(imagePreview)

    }

    return(
    <Container>
        <header>
            <Link to="/">
            <FiArrowLeft/>
            </Link>
        </header>

        <Form>
            <Avatar>
                <img src={avatar}alt="foto do usuario"/>

                <label htmlFor="avatar">
                <FiCamera/>

                <input 
                 id="avatar"
                 type="file" 
                 onChange={handleChangeAvatar}/>

                </label>

            </Avatar>
            <Input
            placeholder="Nome"
            type="text"
            icon={FiUser}
            value={name}
            onChange={e=>setName(e.target.value)}
            />
             <Input
            placeholder="Email"
            type="text"
            icon={FiMail}
            value={email}
            onChange={e=>setEmail(e.target.value)}

            />

            <Input
            placeholder="Senha Atual"
            type="password"
            icon={FiLock}
            onChange={e=>setPasswordOld(e.target.value)}

            />
            <Input
            placeholder="Nova Senha "
            type="password"
            icon={FiLock}
            onChange={e=>setPasswordNew(e.target.value)}

            />

            <Button
            title="Salvar"
            onClick={handleUpdate}
            />
        </Form>

    </Container>
    )
}
