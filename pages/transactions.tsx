import type { NextPage } from "next";
import { Container, Button, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";

const Transactions: NextPage = () => {
	return (
		<div>
            <AuthenticatedNavbar></AuthenticatedNavbar>
			table here
		</div>
	);
};
export default Transactions;
