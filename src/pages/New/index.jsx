import { Header } from '../../components/header'
import {Input} from '../../components/input'
import {TextArea} from '../../components/TextArea'
import { NoteItem } from '../../components/NotesItem'
import {Section}from '../../components/section'
import {Button}from '../../components/button'
import { Link } from 'react-router-dom'

import { Container,Form } from './style'

export function New() {
  return (
    <Container>
    <Header />

    <main>
      <Form>
        <header>
          <h1>Criar nota</h1>
          <Link to="/">voltar</Link>
        </header>

        <Input placeholder="Título" />
        <TextArea placeholder="Observações"/>

        <Section title="Links Úteis">
          
            <NoteItem
              value="https://legacy.reactjs.org/docs/getting-started.html"
            />
            <NoteItem
              isNew
              placeholder="Novo Link"
            /> 

        </Section>

        <Section title="Marcadores">
            <div className='tags'>

            <NoteItem
              value="React"
            />
            <NoteItem
              isNew
              placeholder="Node"
            /> 
            </div>
        </Section>
          
        <Button title="Salvar"/>

      </Form>
    </main>
  </Container>
  )
}