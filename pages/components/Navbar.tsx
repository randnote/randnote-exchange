import React, { useState, useEffect } from "react";
import GetLocalStorage from "./authentication/localstorage";
import Link from "next/link";


import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {Button} from 'react-bootstrap';

// style imports:
import styles from "../../styles/Navbar.module.scss";

export const AuthenticatedNavbar = (props: any) => {
	const [isOpen, setIsOpen] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	useEffect(() => {
		if (localStorage) {
			if (GetLocalStorage("randnoteUser") === null) {
				setIsAuthenticated(false);
			} else {
				setIsAuthenticated(true);
			}
		}
	}, []);


	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">
					<b>RANDNOTE</b>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/transactions">Transactions</Nav.Link>
						<Nav.Link href="/deposit">Deposit</Nav.Link>
						<Nav.Link href="/chart">Chart</Nav.Link>
					</Nav>

					{isAuthenticated ? (
						""
					) : (
						<Nav className="navbar-nav ms-auto">
							<Nav.Link className="ms-auto">
								<Link href="signin">
									<button
										className="btn "
										// styles={AuthNavbarButtonStyles}
										color=""
									>
										SignIn
									</button>
								</Link>

								<Link href="signup">
									<Button
										style={AuthNavbarButtonStyles}
										color="primary"
									>
										SignUp
									</Button>
								</Link>
							</Nav.Link>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

const mainNavbarBrandStyle = {
	color: "white",
};

const mainNavbarStyle = {
	backgroundColor: "#364f6b",
	color: "white",
};

const AuthNavStyles = {
	backgroundColor: "#2cb978",
};

const AuthNavbarButtonStyles = {
	color: "red",
	margin: "5px",
	borderRadius: "10px",
};
