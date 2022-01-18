import type { NextPage } from "next";
import { Container, Button } from "reactstrap";
import PaymentForm from "./components/addCard";
import MainNavbar from "./components/Navbar";

const Deposit: NextPage = () => {
	return (
		<div>
			<Container>
				Deposit
				<PaymentForm></PaymentForm>
			</Container>
		</div>
	);
};
export default Deposit;
