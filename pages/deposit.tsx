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
	Collapse,
} from "reactstrap";
import { useForm } from "react-hook-form";

import MainNavbar, { AuthenticatedNavbar } from "./components/Navbar";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import Cards from "react-credit-cards";
import AddedCardsSection from "./components/bankCards/AddedCardsSection";

const PaymentForm = () => {
	const { register, handleSubmit } = useForm();
	const [isOpen, setIsOpen] = React.useState(false);

	const onSubmit = (data: any) => {
		Axios.post(`${process.env.REACT_APP_SERVER}/signup`, {
			cardnumber: data.cardnumber,
			details: data.details,
			month: data.month,
			year: data.year,
			cvc: data.cvc,
		});
		// .then((res)=>{
		// 	console.log(res.data);
		// 	createSession(res.data);
		// 	history.push("/create");
		// })
		// .catch( err =>{
		// 	console.log(err);
		// })
	};

	return (
		<div>
			<Button
				color="primary"
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				Add a payments card
			</Button>

			<Collapse isOpen={isOpen}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<Label for="">Card number</Label>
						<Input
							style={cardnumberInputStyle}
							{...register("cardnumber")}
							type="text"
							name="cardnumber"
							id=""
						/>
					</FormGroup>

					<FormGroup>
						<Label for="">Card details</Label>
						<Input
							style={carddetailsInputStyle}
							{...register("carddetails")}
							type="text"
							name="carddetails"
							id=""
						/>
					</FormGroup>

					<FormGroup>
						<Label for="">Expiry month</Label>
						<Input
							style={monthInputStyle}
							{...register("month")}
							type="text"
							name="month"
							id=""
						/>
					</FormGroup>

					<FormGroup>
						<Label for="">Expiry year</Label>
						<Input
							style={yearInputStyle}
							{...register("year")}
							type="text"
							name="year"
							id=""
						/>
					</FormGroup>

					<FormGroup>
						<Label for="">CVC</Label>
						<Input
							style={CVCInputStyle}
							{...register("cvc")}
							type="text"
							name="cvc"
							id=""
						/>
					</FormGroup>
				</form>
			</Collapse>
		</div>
	);
};

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

const carddetailsInputStyle = {
	margin: "5px",
};

const yearInputStyle = {
	margin: "5px",
};

const monthInputStyle = {
	margin: "5px",
};

const CVCInputStyle = {
	margin: "5px",
};

const cardnumberInputStyle = {
	margin: "5px",
};

export default Deposit;
