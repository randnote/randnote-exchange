import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
import ChartComponent from "./components/charts/chartComponent";
import { Container, Row, Col } from "reactstrap";
import { Tabs, Tab, Card, Modal, Button } from "react-bootstrap";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8024";

const Chart: NextPage = () => {
	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<Container>
				<Row>
					<Col md="8">
						<ChartComponent></ChartComponent>
					</Col>
				</Row>

				<Row>

				<Col>
						<Card>
								<Card.Body>
									<Card.Title>PRICE</Card.Title>
									<Card.Text><span style={{color: 'green', fontSize: '30px'}}>$ 123.00</span></Card.Text>
									
								</Card.Body>
						</Card>
					</Col>


					<Col>
						<Card>
								<Card.Body>
									<Card.Title>Market cap</Card.Title>
									<Card.Text><span style={{color: 'green'}}>ZAR 123.00</span></Card.Text>
									
								</Card.Body>
						</Card>
					</Col>

					<Col>
						<Card >
								<Card.Body>
									<Card.Title>Avarage Notes Transactions(24 H)</Card.Title>
									<Card.Text><i>N</i> 123.00</Card.Text>
									
								</Card.Body>
						</Card>
					</Col>

					<Col>
						<Card >
								<Card.Body>
									<Card.Title>Price change (24 H)</Card.Title>
									<Card.Text> <span style={{color: 'green'}}>+$222.45</span></Card.Text>
									
								</Card.Body>
						</Card>
					</Col>
				
				</Row>
			</Container>
		</div>
	);
};

export default Chart;
