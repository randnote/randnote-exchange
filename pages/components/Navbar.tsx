import React, { useState, useEffect } from "react";
import GetLocalStorage from "./authentication/localstorage";
import Link from "next/link";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
	Button,
} from "reactstrap";

// style imports:
import styles from "../../styles/Navbar.module.scss";



export const AuthenticatedNavbar = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);
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
		<div>
			<Navbar className={styles.authNavStyles} responsive>
				<NavbarBrand href="/">
					<b>RANDNOTE</b>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>

					

					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink
								style={{ color: "white" }}
								href="/dashboard/"
							>
								Dashboard
							</NavLink>
						</NavItem>
					</Nav>

					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink
								style={{ color: "white" }}
								href="/deposit/"
							>
								Deposits
							</NavLink>
						</NavItem>
					</Nav>

					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink
								style={{ color: "white" }}
								href="/transactions/"
							>
								Transactions
							</NavLink>
						</NavItem>
					</Nav>

					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink style={{ color: "white" }} href="/chart/">
								Chart
							</NavLink>
						</NavItem>
					</Nav>

					{isAuthenticated ? (
						""
					) : (
						<Nav className="navbar-nav ms-auto">
							<NavItem className="ms-auto">
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
										styles={AuthNavbarButtonStyles}
										color="primary"
									>
										SignUp
									</Button>
								</Link>
							</NavItem>
						</Nav>
					)}
				</Collapse>
			</Navbar>
		</div>
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


