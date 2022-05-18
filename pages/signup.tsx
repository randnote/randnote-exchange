import type { NextPage } from "next";
import MainNavbar from "./components/Navbar";
import { useForm } from "react-hook-form";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

import {
	Container,
	Col,
	Row,
	Label,
	Form,
	Input,
	FormGroup,
	Button,
} from "reactstrap";

const Signup: NextPage = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		//${process.env.REACT_APP_SERVER}/signup`
		console.log(data)
		Axios.post(`http://localhost:8024/signup`, {
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			password: data.password,
		})
		.then((res)=>{
			console.log(res.data);

			if(res.data.success === true){
				// add to localstorage & send to dashboard
				// history.push("/create");
			}


			
		})
		.catch( err =>{
			console.log(err);
		})
	};
	return (
		<div>
			<MainNavbar></MainNavbar>
			<Container>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormGroup>
						<Label tyle={firstnameLabelStyle} for="">
							First name
						</Label>
						<input
							style={signupInputStyle}
							{...register("firstname")}
							type="text"
							name="firstname"
							id=""
						/>
					</FormGroup>
					<FormGroup>
						<Label for="">Last name</Label>
						<input
							style={signupInputStyle}
							{...register("lastname")}
							type="lastname"
							name="lastname"
							id=""
						/>
					</FormGroup>
					<FormGroup>
						<Label for="">Email</Label>
						<input
							style={signupInputStyle}
							{...register("email")}
							type="email"
							name="email"
							id=""
						/>
					</FormGroup>
					<FormGroup>
						<Label for="">Password</Label>
						<input
							style={signupInputStyle}
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
						Signup
					</Button>
					<br />

					<Link href="signin">
						Already have an account? Signin here
					</Link>
				</form>
			</Container>
		</div>
	);
};

const firstnameLabelStyle = {
	marginTop: "20px",
};

const signupInputStyle = {
	borderRadius: "60px",
	marginTop: "10px",
	marginBottom: "10px",
};

const submitButtonStyle = {
	borderRadius: "60px",
};

export default Signup;
