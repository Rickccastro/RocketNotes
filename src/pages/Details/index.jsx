import { Container,Links,Content} from './styles'
import { Header } from '../../components/header'
import { Button } from '../../components/button'
import { Section } from '../../components/section'
import { ButtonText } from '../../components/buttonText'

import { Tags } from '../../components/tags'

export function Details(){
  
  return(
  <Container>

   <Header />

    <main>
      <Content>
        <ButtonText title="Excluir Nota"/>

          <h1>Introdução ao React</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Animi molestias ex debitis possimus enim aperiam, qui,
             deleniti voluptates ducimus repellendus nostrum,
              reiciendis dolorem velit facilis?
             Pariatur quasi atque vero sit?</p>

        <Section title="Links úteis">
        <Links>
            <li>
              <a href="#">https://legacy.reactjs.org/docs/getting-started.html</a>
            </li>
            <li>
            <a href="#">https://legacy.reactjs.org/docs/getting-started.html</a>
            </li>
        </Links>
        </Section>

        <Section title="marcadores">
          <Tags title="express"/>
          <Tags title="nodejs"/>
        </Section>

        <Button title="Voltar" />

      </Content>
    </main>

  </Container>
  )
}