import React, { useState, useEffect } from "react";
import GetLocalStorage from "./authentication/localstorage";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { DeleteLocalStorage } from "./authentication/localstorage";
import { useRouter } from "next/router";

// style imports:
import styles from "../../styles/Navbar.module.scss";

export const AuthenticatedNavbar = (props: any) => {
	const [isOpen, setIsOpen] = useState(true);
	const [username, setUsername] = useState<string>("");
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const router = useRouter();

	useEffect(() => {
		if (localStorage) {
			if (GetLocalStorage("randnoteUser") === null) {
				setIsAuthenticated(false);
			} else {
				setIsAuthenticated(true);
				let data = JSON.parse(localStorage.randnoteUser);
				setUsername(`${data.firstname} ${data.lastname}`);
			}
		}
	}, []);

	const logout = () => {
		DeleteLocalStorage("randnoteUser");
		router.push("/signin");
	};

	return (
		<Navbar expand="lg" className={`${styles.authNavStyles}`}>
			<Container>
				<Navbar.Brand className={styles.navbarBrand} href="/">
					<b>RANDNOTE</b>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />

				<Navbar.Collapse
					className={styles.collapse}
					id="basic-navbar-nav"
				>
					<Nav className={`${styles.nav} me-auto`}>
						{isAuthenticated && username ? (
							<>
								<Nav.Link
									className={styles.navLink}
									href="/transactions"
								>
									Transactions
								</Nav.Link>
								<Nav.Link
									className={styles.navLink}
									href="/deposit"
								>
									Deposit
								</Nav.Link>
							</>
						) : (
							<></>
						)}

						<Nav.Link className={styles.navLink} href="/chart">
							Chart
						</Nav.Link>
					</Nav>

					{isAuthenticated && username ? (
						// <></>
						<Dropdown>
							<Dropdown.Toggle
								variant="success"
								id="dropdown-basic"
							>
								{username}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item>
									<Button
										// className={}
										// variant="outline-primary"
										onClick={() => {
											logout();
										}}
									>
										Logout
									</Button>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					) : (
						<Nav className="navbar-nav ms-auto">
							{/* <Nav.Link className="ms-auto"> THIS THING CAUSES HYDRATION ISSUES */}
							<Link href="/signin">
								<Button className={`${styles.buttonSignin}`}>
									Sign In
								</Button>
							</Link>

							<Link href="/signup">
								<Button
									
									className={`${styles.buttonSignup}`}
								>
									Sign Up
								</Button>
							</Link>
							{/* </Nav.Link> */}
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

// const AuthNavbarButtonStyles = {
// 	color: "red",
// 	margin: "5px",
// 	borderRadius: "10px",
// };

export default AuthenticatedNavbar;
