import React from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import MainNavbar from "./components/Navbar";
import {
	Container,
	Col,
	Row,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Alert,
} from "reactstrap";
// import {createSession} from '../session.js'
// import {isAuthenticated} from '../authentication';

const Signin: NextPage = () => {
	const { register, handleSubmit } = useForm();
	const [isAuthorized, setIsAuthorized] = React.useState(false);

	// React.useEffect( () => {
	// 	if(isAuthenticated() === true){
	// 		setIsAuthorized(true)
	// 		history.push('/create')
	// 	}else{
	// 		console.log('no')
	// 	}

	// }, []);

	const onSubmit = (data: any) => {
		Axios.post(`${process.env.SERVER}/login`, {
			email: data.email,
			password: data.password,
		});
		// 	.then((res)=>{
		// 		console.log(res.data);
		// 		createSession(res.data);
		// 		history.push("/create");
		// 	}).catch((err)=>{
		// 		console.log(err)
		// 	})
	};

	return (
		<div>
		<MainNavbar></MainNavbar>
			<Container className="">
				<Row>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormGroup>
							<Label style={emailLabelStyle} for="">Email</Label>
							<Input
							style={loginInputBoxStyle}
								{...register("email")}
								type="email"
								name="email"
								id=""
							/>
						</FormGroup>
						<FormGroup>
							<Label for="">Password</Label>
							<Input
							style={loginInputBoxStyle}
								{...register("password")}
								type="password"
								name="password"
								id=""
							/>
						</FormGroup>
						<Button
						style={submitButtonStyle}
							id="submitButton"
							className="btn btn-primary"
							type="submit"
						>
							Login
						</Button>
					</form>
				</Row>
			</Container>
		</div>
	);
};

const emailLabelStyle = {
	marginTop: '10px'
}

const loginInputBoxStyle = {
	borderRadius: '60px',
	marginTop: '10px',
	marginBottom: '10px'
}

const submitButtonStyle = {
	borderRadius: '60px'
}


export default Signin;
