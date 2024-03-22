import { useState,useEffect } from 'react'
import { FiPlus,FiSearch } from 'react-icons/fi'

import {Container,Brand,Menu,Search,Content,NewNote} from './style'

import {Header} from '../../components/header'


import { Input } from '../../components/input'

import { Note } from '../../components/Note'

import {Section} from'../../components/section'

import {ButtonText} from '../../components/buttonText'
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'


export function Home(){

    const [search,setSearch]=useState("");
    const [notes,setNotes]=useState([]);
    const [tags,setNewTags]=useState([]);
    const [tagsSelected,setTagsSelected]=useState([]);


    const navigate=useNavigate()

    function handleTagSelected(tagName){
        if(tagName==="all"){
             return setTagsSelected([])
        }
        const alreadySelected=tagsSelected.includes(tagName)

        if(alreadySelected){
            /**seleciona todas as tags q Não está sendo selecionada e atualiza  */
            const filteredTags=tagsSelected.filter(tag=>tag !==tagName)
            setTagsSelected(filteredTags)
        }else{
            setTagsSelected(prevState => [...prevState, tagName]);
        }
    }

    function handleDetails(id){
        navigate(`/details/${id}`)

    }
    
    /**carrega apenas 1 vez */
    useEffect(()=>{
        async function fetchTags(){
            const response = await api.get("/tags")
            setNewTags(response.data)
        }
        fetchTags()
    },[])

    /**carrega quando tagsSelected ou search mudar */
    useEffect(()=>{

        async function fetchNotes(){
        const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
        }
        fetchNotes();

    },[tagsSelected,search])
    return(
        <Container>
        <Brand>
            <h1>Notes</h1>
        </Brand>
        
        <Header/>

        <Menu>
       
        <li>
            <ButtonText 
            title="Todos" 
            onClick={()=>handleTagSelected("all")}
            isActive={tagsSelected.length === 0}
            />
        </li>

            {
                tags && tags.map(tag=>(

                    <li key={String (tag.id)}> 
                        <ButtonText 
                        title={tag.name}
                        onClick={()=>handleTagSelected(tag.name)}
                        isActive={tagsSelected.includes(tag.name)}
                        />

                    </li>
                ))
            }

        </Menu>

        <Search>
            <Input 
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Pesquisar pelo Titulo"
            icon={FiSearch}/>
        </Search>

        <Content>
            <Section title="Minhas Notas">
              {
                notes.map(note=>(
                    <Note
                     key={String(note.id)}
                     data={note}
                     onClick={()=>handleDetails(note.id)}
                    />
                ))
              }  
            </Section>

        </Content>

        <NewNote to="/new">

        <FiPlus />
        
           Criar Nota

        </NewNote>

        </Container>

    )
}