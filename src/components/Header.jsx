import React, {useState, useEffect} from 'react'
import {Navbar, Nav, Button, Container} from "react-bootstrap";
import {signInWithGoogle} from "../utils/firebase"
import {Redirect} from "react-router-dom"
// import jwt_decode from "jwt-decode";
import axios from "axios";

function Header() {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        let user = localStorage.getItem("user");
        if(user != "undefined" && user != null){
            user = JSON.parse(user);
            const now = Date.now();
            if(now > user.stsTokenManager.expirationTime){
                localStorage.removeItem("user");
            }
        }
    }, [])
    

    const handleLogin = async () => {
        let user = localStorage.getItem("user");
        if(user != "undefined" && user != null){
            user = JSON.parse(user);
            const now = Date.now();
            console.log((user.stsTokenManager.expirationTime-now)/60000);
            if(now <= user.stsTokenManager.expirationTime){
                setRedirect(true);
            }
            else{
                try {
                    const user = await signInWithGoogle();
                    localStorage.setItem("user", JSON.stringify(user));
                    const data = await axios.post("https://quizhub-api.herokuapp.com/signup",{
                        user_id: user.uid,
                        name: user.displayName,
                        email:user.email
                    })
                    console.log(data);
                    console.log(user.uid)
                } catch (error) {
                    console.log(error);
                }
                console.log(user);
                if(user.uid !== undefined) setRedirect(true);
            }
        }
        else{
            const user = await signInWithGoogle();
            localStorage.setItem("user", JSON.stringify(user));
            try {
                const data = await axios.post("https://quizhub-api.herokuapp.com/signup",{
                    user_id: user.uid,
                    name: user.displayName,
                    email:user.email
                })
                console.log(data);
            } catch (error) {
                console.log(error);
            }
            console.log(user);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Redirect to="/admin" />
    }

    return (
        <Navbar className='header'>
            <Container>
                <Navbar.Brand className="header-brand" href="/">
                    QuizHub
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button
                        className='customButton-white'
                        onClick={() => handleLogin()}
                    >
                        Admin Dashboard
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header