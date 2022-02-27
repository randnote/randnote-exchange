import type { NextPage } from "next";
import {
	Container,
	Button,
	Input,
	Row,
	Col,
	Alert,
	FormGroup,
	Label,
} from "reactstrap";
import MainNavbar, { AuthenticatedNavbar } from "./components/Navbar";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import Cards from "react-credit-cards";
import AddedCardsSection from "./components/bankCards/AddedCardsSection";

const PaymentForm = () =>{

	return (
		<div>
			hellow
		</div>
	)



}


const Deposit: NextPage = () => {
	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<AddedCardsSection> </AddedCardsSection>

			<PaymentForm></PaymentForm>
		</div>
	);
};

const PaymentFormInputStyle = {
	margin: "5px",
};

export default Deposit;
