import type { NextPage } from "next";
import { useState } from "react";
import { Container, Button, FormGroup, Label, Collapse } from "reactstrap";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { AuthenticatedNavbar } from "./components/Navbar";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";
import validate from "./components/authentication/validate";
import { AlertDismissible } from "./components/alerts/dismissableAlerts";
import AddedCardsSection from "./components/bankCards/AddedCardsSection";
import GetLocalStorage from "./components/authentication/localstorage";

const PaymentForm = () => {
	const { register, handleSubmit } = useForm();
	const [isOpen, setIsOpen] = useState(false);
	const [addedCardAlert, setAddedCardAlert] = useState(false);

	const onSubmit = (data: any) => {
		const callApi = async () => {
			let info = await GetLocalStorage("randnoteUser"); // this; because we need the logged in users ID

			console.log(data);
			Axios.post(`http://localhost:8024/card`, {
				cardnumber: data.cardnumber,
				user_id: info.id,
				carddetails: data.carddetails,
				month: data.month,
				year: data.year,
				cvc: data.cvc,
			})
				.then((res) => {
					console.log(res.data);
					setAddedCardAlert(true); // notifications... needs to ... send the right information
				})
				.catch((err) => {
					console.log(err);
				});
		};

		callApi();
	};

	return (
		<div>
			<Container>
				{
					// alert area:
					addedCardAlert ? <AlertDismissible></AlertDismissible> : ""
				}

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
								className="form-control"
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
								className="form-control"
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
								className="form-control"
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
								className="form-control"
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
								className="form-control"
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
