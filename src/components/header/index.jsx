import { Container,Profile,Logout} from "./style";
import {RiShutDownLine} from'react-icons/ri'
import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import avatarPlacehoalder from '../../assets/avatar_placeholder.svg'
import { useNavigate } from "react-router-dom";

export function Header(){
    const {signOut,user}=useAuth();
    const navigate=useNavigate();

    function handleSignOut(){
        navigate("/");
        signOut();
        
    }

    const avatarUrl=user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlacehoalder

    return(
        <Container>
            <Profile to="/profile">
                <img src={avatarUrl} alt={user.name} />
                <div>
                    <span>bem vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <Logout onClick={handleSignOut}>
                <RiShutDownLine />
            </Logout>
        </Container>
    )
}
