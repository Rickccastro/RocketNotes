import { Container,Profile,Logout} from "./style";
import {RiShutDownLine} from'react-icons/ri'

export function Header(){
    return(

        <Container>
            <Profile to="/profile">
                <img src="https://github.com/rickccastro.png" alt="foto do usuario" />
                <div>
                    <span>bem vindo</span>
                    <strong>Ricardo Castro</strong>
                </div>
            </Profile>
            <Logout>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}
