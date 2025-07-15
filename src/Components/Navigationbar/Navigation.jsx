import React,{useEffect, useState} from 'react'
import {Container, Navbar, Nav} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Navigation.css'


function Navigation() {
  const[email, setEmail] = useState(null);
  useEffect(()=>{
   const localEmail = localStorage.getItem("email");
   if(localEmail !== null){
    setEmail(localEmail)
   }
  },[])

  const handleLogout = (e)=>{
    e.preventDefault();
    localStorage.removeItem("email");
    setEmail(null)
  }
  return (
    <>
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='ms-auto'>
            {email ?(
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Logout</Nav.Link>
            )}
            <FontAwesomeIcon icon={faCartShopping} className='cart-icon' />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Navigation