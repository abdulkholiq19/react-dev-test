import React from 'react';
import {
  Navbar,
  Container
} from "react-bootstrap";

export const NavbarComponent = () => {
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="none" variant="dark">
      <Container>
      <Navbar.Brand className="text-warning"><b>React Movies</b></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
    </Navbar>
  </>
  )
}
