import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";

import { AuthenticatedNavbar } from "./components/Navbar";
import {
	Container,
	Input,
	Row,
	Col,
	Alert,
	FormGroup,
	Label,
	Collapse,
	Button
} from "reactstrap";


const Transfer: NextPage = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		Axios.post(`${process.env.REACT_APP_SERVER}/signup`, {
			cardnumber: data.cardnumber,
			details: data.details,
			month: data.month,
			year: data.year,
			cvc: data.cvc,
		});
	};


	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<Container>
				<form onSubmit={handleSubmit(onSubmit)}>
						
						<Row>
							{/*<FormGroup>
								<Label for="">Card number</Label>
								<Input
									{...register("cardnumber")}
									type="text"
									name="cardnumber"
									id=""
								/>
							</FormGroup>

							<FormGroup>
								<Label for="">Card details</Label>
								<Input
									{...register("carddetails")}
									type="text"
									name="carddetails"
									id=""
								/>
							</FormGroup>

							<Button>Continue</Button>*/}

							<Col md='4'>
								Your Randnote
								<h4>Your Randnote balance</h4>
								<h3>RR 400</h3>
							</Col>

							<Col md='4'>
								TO
							</Col>

							<Col md='4'>
								<input {...register("receiversAddress")}
									type="text"
									name="receiversAddress"
									id="" placeholder="input recievers address">
								</input>
							</Col>
						</Row>
						<hr></hr>

						<Row>
							<h3>Amount</h3>
							<input
								{...register("amount")}
									type="text"
									name="amount"
									 placeholder="RR 33"></input>
						</Row>

						<Row>
							<small>*Disclaimer: Before transfering of funds, make sure that you have read our terms or agreement.</small>
						</Row>

					</form>
			</Container>
		</div>
	);
};
export default Transfer;
