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
				<NavbarBrand href="/">reactstrap</NavbarBrand>
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
export default MainNavbar;
