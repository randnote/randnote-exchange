import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
import ChartComponent from "./components/charts/chartComponent";
import { Container, Row, Col } from "reactstrap";

const Chart: NextPage = () => {
	
	return (
		<div>
			
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<Container>
				<Row>
					<Col md='8'>
						<ChartComponent></ChartComponent>
					</Col>
				</Row>
			</Container>
			
			
		</div>
	);
};


export default Chart;
