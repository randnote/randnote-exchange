import React from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { SetLocalStorage } from "./components/authentication/localstorage";
import { useRouter } from "next/router";
import MainNavbar from "./components/Navbar";
import { Container, Row, Button, FormGroup, Label } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DisplayAlert } from "./components/alerts/alerts";

const Signin: NextPage = () => {
	const { register, handleSubmit } = useForm();
	const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
	const [failedPassword, setFailedPassword] = React.useState<boolean>(false);
	const router = useRouter();

	const onSubmit = (data: any) => {
		// ${process.env.SERVER}/login
		Axios.post(`http://localhost:8024/signin`, {
			email: data.email,
			password: data.password,
		})
			.then(async (res) => {
				console.log(res.data);

				if (res.data.success === true) {
					let { id, firstname, lastname, email }: any =
						res.data.data.result;

					let localStorageDataObject = {
						id: id,
						firstname: firstname,
						lastname: lastname,
						email: email,
					};

					SetLocalStorage("randnoteUser", localStorageDataObject);
					router.push("/dashboard");
				} else if (res.data.success === false) {
					// WrongUsernamePasswordAlert();
					setFailedPassword(true);
				}
				console.log(res.data);
			})
			.then(() => {})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<MainNavbar></MainNavbar>
			<Container style={{ marginTop: "40px" }}>
				<Row>
					{failedPassword ? (
						<DisplayAlert
							information="Wrong username or password"
							color="danger"
						></DisplayAlert>
					) : (
						""
					)}
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormGroup>
							<Label style={emailLabelStyle} for="">
								Email
							</Label>
							<input
								style={loginInputBoxStyle}
								{...register("email")}
								type="email"
								name="email"
								id=""
								className="form-control"
							/>
						</FormGroup>
						<FormGroup>
							<Label for="">Password</Label>
							<input
								style={loginInputBoxStyle}
								{...register("password")}
								type="password"
								name="password"
								id=""
								className="form-control"
							/>
						</FormGroup>
						<Button
							style={submitButtonStyle}
							id="submitButton"
							className="btn btn-primary"
							type="submit"
							color="success"
						>
							Login
						</Button>
						<br />
						<Link href="signup">
							Don't have an account yet? Signup here
						</Link>
					</form>
				</Row>
			</Container>
		</div>
	);
};

const emailLabelStyle = {
	marginTop: "10px",
};

const loginInputBoxStyle = {
	borderRadius: "60px",
	marginTop: "10px",
	marginBottom: "10px",
};

const submitButtonStyle = {
	borderRadius: "60px",
	marginBottom: "40px",
	width: "100px",
};

export default Signin;
