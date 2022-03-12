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
	Button,
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
			<Container style={{ maxWidth: "600px" }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Row>
						<Col md="12">
							<h3>
								YOUR BALANCE:{" "}
								<span
									style={{
										color: "green",
										textDecoration: "underline",
									}}
								>
									RR 400
								</span>
							</h3>
						</Col>
					</Row>

					<Row>
						<Col md="12">
							<h3>Receiver's Address</h3>
						</Col>
						<input
							{...register("receiversAddressInput")}
							type="text"
							name="receiversAddress"
							className="form-control"
							placeholder="input recievers address"
						></input>
					</Row>
					<hr></hr>

					<Row>
						<h3>Amount</h3>
						<input
							style={amountInputStyle}
							{...register("amount")}
							type="text"
							name="amount"
							className="form-control"
							placeholder="RR 33"
						></input>
					</Row>
					<hr></hr>

					<Row>
						<Col md="12">
							<Button style={continueButtonStyle}>
								Continue
							</Button>
						</Col>
					</Row>

					<Row>
						<small>
							*Disclaimer: Before transfering of funds, make sure
							that you have read our terms or agreement.
						</small>
					</Row>
				</form>
			</Container>
		</div>
	);
};

const receiversAddressInput = {
	borderRadius: "60px",
};
const amountInputStyle = {
	borderRadius: "10px",
	maxWidth: "200px",
};

const continueButtonStyle = {
	maxWidth: "200px",
	borderRadius: "10px",
	backgroundColor: "green",
	color: "white",
};

export default Transfer;
