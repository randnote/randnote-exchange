import type { NextPage } from "next";
import { AuthenticatedNavbar } from "./components/Navbar";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { SetLocalStorage } from "./components/authentication/localstorage";

import { Container, Label, FormGroup, Button } from "reactstrap";

const Signup: NextPage = () => {
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	const onSubmit = (data: any) => {
		//${process.env.REACT_APP_SERVER}/signup`
		console.log(data);
		Axios.post(`http://localhost:8024/signup`, {
			firstname: data.firstname,
			lastname: data.lastname,
			email: data.email,
			password: data.password,
		})
			.then((res) => {
				console.log(res.data);

				if (res.data.success === true) {
					let localStorageDataObject = {
						id: res.data.data.id,
						firstname: res.data.data.firstname,
						lastname: res.data.data.lastname,
						email: res.data.data.email,
					};
					SetLocalStorage("randnoteUser", localStorageDataObject);
					router.push("/transactions");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<Container style={{ marginTop: "40px" }}>
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
							className="form-control"
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
							className="form-control"
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
							className="form-control"
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
	marginBottom: "40px",
	width: "100px",
};

export default Signup;
