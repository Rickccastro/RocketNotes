import { Container,Links,Content} from './styles'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { Section } from '../../components/section'
import { ButtonText } from '../../components/buttonText'

import { useParams,useNavigate } from 'react-router-dom'

import { Tags } from '../../components/tags'
import { useState,useEffect } from 'react'
import { api } from '../../services/api'

export function Details(){

    const [data,setData]=useState(null)
    const params=useParams()
    const navigate=useNavigate()

    function handleBack(){
      navigate(-1)
    }

 async function removeNote(){

      const confirm =window.confirm("Deseja realmente remover a nota?")

      if(confirm){
        await api.delete(`/notes/${params.id}`);
        handleBack()
      }

    }
      
  useEffect(()=>{
      async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`)
        
      setData(response.data)
      }

      fetchNote()
  },[]);

  return(
  <Container>

   <Header />

    {
      
    data &&
    <main>
      <Content>
        <ButtonText title="Excluir Nota" onClick={removeNote}/>

          <h1>{data.title}</h1>
          <p>{data.description}</p>

        <Section title="Links úteis">
            {
              data.links &&
              <Links>
                 {
                  data.links &&  data.links.map(link=>(

                  <li key={String(link.id)}>
                    <a href={link.url} target='_blank'>
                      {link.url}</a>
                  </li>

                  ))

                 } 
              </Links>
            }
        </Section>

        {
          data.tags &&
        <Section title="marcadores">
          {
            data.tags && data.tags.map(tags=>(
              <Tags 
              key={String(tags.id)}
              title={tags.name}/>
            )) 
          }
        </Section>

        }

        <Button title="Voltar" onClick={handleBack}/>

      </Content>
    </main>

    }

  </Container>
  )
}