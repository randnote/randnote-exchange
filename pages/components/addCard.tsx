import type { NextPage } from "next";
import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useForm } from "react-hook-form";

/* This component will connect tot the backend and add a card for the user if the card in valid*/
const PaymentForm = () => {
	const { register, watch, handleSubmit } = useForm();
	// const [cvc, setCvc] = useState('');
	// const [expiry, setExpiry] = useState('');
	// const [focus, setfocus] = useState('');
	// const [name, setName] = useState('');
	// const [number, setNumber] = useState('');
	let state: any = {
		cvc: "121",
		expiry: "",
		focus: "",
		name: "",
		number: "",
	};

	// let  handleInputFocus = (e: any) => {
	//     this.setState({ focus: e.target.name });
	//   }

	let handleInputChange = (e: any) => {
		const { name, value } = e.target;
	};
	//   this.setState({ [name]: value });

	return (
		<div id="PaymentForm">
			<Cards
				cvc={state.cvc}
				// expiry={this.state.expiry}
				// focused={this.state.focus}
				// name={this.state.name}
				// number={this.state.number}
			/>
			<form>
				<input
					{...register("number")}
					type="tel"
					name="number"
					placeholder="Card Number"
					// onChange={this.handleInputChange}
					// onFocus={this.handleInputFocus}
				/>
				{/* <input
              type="tel"
              name="number"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            /> */}
				...
			</form>
		</div>
	);
};

export default PaymentForm;
