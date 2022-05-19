import type { NextPage } from "next";
import {useState} from 'react'
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
import { alertProps } from "./components/alerts";
import { useForm } from "react-hook-form";

import MainNavbar, { AuthenticatedNavbar } from "./components/Navbar";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";
import validate from "./components/authentication/validate";

const PaymentForm = () => {
	const { register, handleSubmit } = useForm();
	const [isOpen, setIsOpen] = useState(false);

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
				// notification that yiour card has been added
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
			{/* <AddedCardsSection> </AddedCardsSection> */}

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
