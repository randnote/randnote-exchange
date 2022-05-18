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
import Axios from "axios";

import { useForm } from "react-hook-form";

import MainNavbar, { AuthenticatedNavbar } from "./components/Navbar";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
// import Cards from "react-credit-cards";
import AddedCardsSection from "./components/bankCards/AddedCardsSection";
import validate from "./components/authentication/validate";

const PaymentForm = () => {
	const { register, handleSubmit } = useForm();
	const [isOpen, setIsOpen] = React.useState(false);

	const onSubmit = (data: any) => {
		Axios.post(`http://localhost:8024/card`, {
			cardnumber: data.cardnumber,
			user_id: "1",
			carddetails: data.carddetails,
			month: data.month,
			year: data.year,
			cvc: data.cvc,
		})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Container>
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
							<input
								style={cardnumberInputStyle}
								{...register("cardnumber")}
								type="text"
								name="cardnumber"
								id=""
								class=""
							/>
						</FormGroup>

						<FormGroup>
							<Label for="">Card details</Label>
							<input
								style={carddetailsInputStyle}
								{...register("carddetails")}
								type="text"
								name="carddetails"
								id=""
							/>
						</FormGroup>

						<FormGroup>
							<Label for="">Expiry month</Label>
							<input
								style={monthInputStyle}
								{...register("month")}
								type="text"
								name="month"
								id=""
							/>
						</FormGroup>

						<FormGroup>
							<Label for="">Expiry year</Label>
							<input
								style={yearInputStyle}
								{...register("year")}
								type="text"
								name="year"
								id=""
							/>
						</FormGroup>

						<FormGroup>
							<Label for="">CVC</Label>
							<input
								style={CVCInputStyle}
								{...register("cvc")}
								type="text"
								name="cvc"
								id=""
							/>
						</FormGroup>

						<Button type="submit" color="success">
							Add Card
						</Button>
					</form>
				</Collapse>
			</Container>
		</div>
	);
};

const Deposit: NextPage = () => {
	validate();
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
