import type { NextPage } from "next";
import { Container, Button, Row, Col } from "reactstrap";
import MainNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard: NextPage = () => {
	return (
		<Container>
			<Row>
				<Col md='6'>
					<h2>R  RandNote</h2>
				</Col>
			</Row>

		</Container>
	);
};
export default Dashboard;
