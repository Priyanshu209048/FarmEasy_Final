import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const BankNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/bank/dashboard">
          FarmEasy - Bank
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="bank-navbar-nav" />
        <Navbar.Collapse id="bank-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/bank/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/bank/my-schemes">My Schemes</Nav.Link>
            <Nav.Link as={Link} to="/bank/add-scheme">Add Scheme</Nav.Link>
            <Nav.Link as={Link} to="/bank/scheme-rules">Scheme Rules</Nav.Link>
            <Nav.Link as={Link} to="/bank/apply-requests">Loan Applications</Nav.Link>
            <Nav.Link as={Link} to="/bank/view-grievances">Grievances</Nav.Link>
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BankNavbar;
