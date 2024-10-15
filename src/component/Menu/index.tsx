import React from "react";
import { NavLink } from "react-router-dom";
import './style.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Menu: React.FC = React.memo((): JSX.Element => {
    return (
        <div className="menu">
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand >Groups Students</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto nav">
                            <NavLink to={'/'} className={'nav-link'}>Groups </NavLink>
                            <NavLink to={'/add-group'} className={"nav-link"}> Add Group</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

    );
});
