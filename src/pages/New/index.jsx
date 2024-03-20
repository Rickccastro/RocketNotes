import {useState} from 'react'
import { Header } from '../../components/header'
import {Input} from '../../components/input'
import {TextArea} from '../../components/TextArea'
import { NoteItem } from '../../components/NotesItem'
import {Section}from '../../components/section'
import { ButtonText } from '../../components/buttonText'
import {Button}from '../../components/button'

import { useNavigate } from 'react-router-dom'
import {api} from '../../services/api'

import { Container,Form } from './style'

export function New() {
  const navigate =useNavigate()
  const [title,setTitle]= useState("")

  const [description,setDescription]= useState("")

  const [links,setLinks]= useState([])
  const [newLink,setNewLink]= useState("")

  const [tags,setTags]= useState([])
  const [newTag,setNewTag]= useState("")


  function handleAddLink(){
    /**listar conteudo previo e adicionar newlink */
    setLinks(prevState=>[...prevState,newLink])
    /**resetar conteudo do set */
    setNewLink("")
  }

  function handleRemoveLink(deleted){
      /**seleciona os links q não vão ser deletados */
      setLinks(prevState=>prevState.filter(link=> link !== deleted))

  }

  function handleAddTag(){
    /**despejando todo conteudo anterior do prevState + a nova tag fazendo uma nova lista*/
    setTags(prevState =>[...prevState,newTag]);

    setNewTag("")
  }

  function handleRemoveTag(deleted){

    setTags(prevState=>prevState.filter(tag=> tag !== deleted))

  }

  function handleBack(){
    navigate(-1)
  }

  /**função que manda para o backend */
  async function handleNewNote(){ 

    if(!title){
      return alert("Preencha o titulo")
 
    }

    if(newLink){
      return alert("Você preencheu o campo Link , mas não adicionou")
    }

    if(newTag){
        return alert("Você preencheu o campo tag , mas não adicionou")
      }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota cadastrada com sucesso!");
  }

  return (
    <Container>
    <Header />

    <main>
      <Form>
        <header>
          <h1>Criar nota</h1>

        <ButtonText 
         title="Voltar"
         onClick={handleBack}/>

        </header>

        <Input 
        placeholder="Título"
        onChange={e=>setTitle(e.target.value)}
         />
        <TextArea
         placeholder="Observações"
         onChange={e=>setDescription(e.target.value)}
         />

        <Section title="Links Úteis">
          { /**listagem */
            links.map((link,index)=>(
              <NoteItem
                key={String(index)}
                value={link}
                onClick={()=>handleRemoveLink(link)}
              /> 
            ))
          }
           <NoteItem
           /**adicionando novo link */
                isNew
                placeholder="Novo Link"
                value={newLink}
                onChange={e=>setNewLink(e.target.value)}
                onClick={handleAddLink}
              /> 
        </Section>

        <Section title="Marcadores">
            <div className='tags'>

           { 
              tags.map((tag,index)=>(

              <NoteItem 
              key={String(index)}
              value={tag}
              onClick={()=>{handleRemoveTag(tag)}}/>
              ))
           } 

            <NoteItem 
            isNew 
            placeholder= "Nova Tag" 
            onChange={e=>setNewTag(e.target.value)}
            value={newTag}
            onClick={handleAddTag}
            /> 

            </div>
        </Section>
          
        <Button 
        title="Salvar"
        onClick={handleNewNote}/>

      </Form>
    </main>
  </Container>
  )
}