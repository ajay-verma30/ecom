import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userDetails = {
        email: "ajay@gmail.com",
        password:"Test@1234"
    }

    const handleLogin = (e)=>{
        e.preventDefault()
        if(email === userDetails.email && password === userDetails.password){
            localStorage.setItem("email", email)
            navigate('/')
        }
        else{
            alert('Wrong Credentials')
        }
    }
    
   return (
    <div className="form-container">
        <Container>
            <Form onSubmit={handleLogin}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <br/>
                <Button type="submit">Login</Button>
            </Form>
        </Container>
    </div>
  )
}

export default Login