import React from 'react'
import { Container,Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Navs() {
  const logout=()=>{
    localStorage.removeItem("expenses")
    localStorage.removeItem("budget")
  }
    return (
        <>
            <Navbar bg="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home"style={{color:"white"}}>Budget App</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Link to="/"><button onClick={logout}>Logout </button></Link>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </>
    )
}
