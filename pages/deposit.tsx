import type { NextPage } from "next";
import { Container, Button, Input, Row, Col , Alert, FormGroup, Label} from "reactstrap";
import MainNavbar, { AuthenticatedNavbar } from "./components/Navbar";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import Cards from "react-credit-cards";
import AddedCardsSection from "./components/bankCards/AddedCardsSection"

class PaymentForm extends React.Component {
	state = {
		cvc: "",
		expiry: "",
		focus: "",
		name: "",
		number: "",
	};

	handleInputFocus = (e) => {
		this.setState({ focus: e.target.name });
	};

	handleInputChange = (e) => {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div id="PaymentForm">
				

				<Container style={{ marginTop: "10px" }}>


				  <Alert

				    color="warning"
				    dismissible
				  >
				    Use valid, but fake card details!
				  </Alert>
				

					<Row>
						<Col md="6">
							<Cards
								cvc={this.state.cvc}
								expiry={this.state.expiry}
								focused={this.state.focus}
								name={this.state.name}
								number={this.state.number}
							/>
						</Col>

						<Col md="6">
							<form className="DepositForm">
								<Input
									className="shadow-none"
									style={PaymentFormInputStyle}
									type="tel"
									name="number"
									placeholder="Card Number"
									onChange={this.handleInputChange}
									onFocus={this.handleInputFocus}
								/>

								<Input
									className="shadow-none"
									style={PaymentFormInputStyle}
									type="tel"
									name="name"
									placeholder="Name as displayed on your card"
									onChange={this.handleInputChange}
									onFocus={this.handleInputFocus}
								/>

								<Input
									className="shadow-none"
									style={PaymentFormInputStyle}
									type="tel"
									name="expiry"
									placeholder=""
									onChange={this.handleInputChange}
									onFocus={this.handleInputFocus}
								/>

								<Input
									className="shadow-none"
									style={PaymentFormInputStyle}
									type="tel"
									name="cvc"
									placeholder="cvc"
									onChange={this.handleInputChange}
									onFocus={this.handleInputFocus}
								/>

								 <FormGroup
								    check
								    inline
								  >
								    <Input type="checkbox" />
								    <Label check>
								      Save card
								    </Label>
								  </FormGroup>

								<Button color="success">Submit</Button>
							</form>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
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
