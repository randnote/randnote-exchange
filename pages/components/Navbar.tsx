import React, { useState } from "react";
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

const MainNavbar = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">
				<b>RANDNOTE</b></NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/components/">Components</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://github.com/reactstrap/reactstrap">
								GitHub
							</NavLink>
						</NavItem>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>Option 1</DropdownItem>
								<DropdownItem>Option 2</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>Reset</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>

					<Nav className="navbar-nav ms-auto">
						<NavItem className="ms-auto">
							<Button className="primary">
								<Link href="signin">SignIn</Link>
							</Button>
							<Button>
								<Link href="signup">SignUp</Link>
							</Button>
						</NavItem>
					</Nav>

					<Nav className="navbar-nav ms-auto">
						<NavItem className="ms-auto">
							<Button className="primary">
								<Link href="signin">Buy/Sell</Link>
							</Button>
							<Button>
								<Link href="signup">Send/Receive</Link>
							</Button>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export const AuthenticatedNavbar = (props: any) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar style={AuthNavStyles} expand="md">
				<NavbarBrand href="/"><b>RANDNOTE</b></NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink
								style={{ color: "white" }}
								href="/components/"
							>
								Components
							</NavLink>
						</NavItem>

						
						
					</Nav>

					<Nav className="navbar-nav ms-auto">
						<NavItem className="ms-auto">
							<Link href="signin">
								<button
									class="btn "
									styles={AuthNavbarButtonStyles}
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
				</Collapse>
			</Navbar>
		</div>
	);
};

const AuthNavStyles = {
	backgroundColor: '#2cb978',
};

const AuthNavbarButtonStyles = {
	color: "red",
	margin: "5px",
	borderRadius: "10px",
};

export default MainNavbar;
