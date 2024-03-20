import {FiArrowLeft,FiUser,FiMail,FiLock,FiCamera} from 'react-icons/fi'

import { useState } from 'react';

import { useAuth } from '../../hooks/auth';

import avatarPlacehoalder from '../../assets/avatar_placeholder.svg'

import { api } from '../../services/api';


import {Input} from '../../components/input'


import {Button} from '../../components/button'

import { Container,Form,Avatar} from "./style";

import { useNavigate } from 'react-router-dom';


export function Profile(){
    const navigate=useNavigate()

    const {user,updateProfile}=useAuth()
    
    /**declarando campos e sets */
    const [name,setName]=useState(user.name)
    const [email,setEmail]=useState(user.email)
    const [passwordOld,setPasswordOld]=useState()
    const [passwordNew,setPasswordNew]=useState()

    /**foto de perfil padrão */
    const avatarUrl=user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlacehoalder

    const [avatar,setAvatar]=useState(avatarUrl)
    const [avatarFile,setAvatarFile]=useState(null)

/**atualizando usuario */
   async function handleUpdate(){
    /**atualizando no back */
    const updated={
        name,
        email,
        password: passwordNew,
        old_password:passwordOld
        }
    
        const userUpdated=Object.assign(user,updated)
    /**jogando no auth a informacao do user e o arquivo do avatar */    
    await updateProfile({user:userUpdated,avatarFile}) 

    }

    async function handleChangeAvatar(event){
        /**setando apenas 1 arquivo */
        const file=event.target.files[0]
        setAvatarFile(file)

        /**criando URL do arquivo e atribuindo a preview */
        const imagePreview=URL.createObjectURL(file)

        /**jogando no set do avatar , a preview */
        setAvatar(imagePreview)

    }
    function handleBack(){
        navigate(-1)
      }

    return(
    <Container>
        <header>
            <button type='button' onClick={handleBack}>
            <FiArrowLeft/>
            </button>
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
