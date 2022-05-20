import type { NextPage } from "next";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
import { Tabs,Tab, Card } from "react-bootstrap";
// import Tabs from 'react-bootstrap/Tabs'

const Transactions: NextPage = () => {
	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<br/>

			<Container>
				<Row>
					<Col md='6'>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>ZAR balance</Card.Title>
								
								<Card.Text>
								ZAR 123.00
								</Card.Text>
								<Card.Link href="#">Make deposit</Card.Link>
								
							</Card.Body>
						</Card>
					</Col>

					<Col md='6'>
						<Card style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>Notes balance</Card.Title>
								
								<Card.Text>
								N 29293.000023
								</Card.Text>
								<Card.Link href="#">Trade</Card.Link>
								
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>

			<br/>

			<Container>
				<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
					<Tab eventKey="websiteTransactions" title="Website Transactions">
						masesdfsdf
					</Tab>
					<Tab eventKey="blockchainTransactions" title="Blockchain Transactions">
						sdfsdf
					</Tab>
					
				</Tabs>
			</Container>
		</div>
	);
};
export default Transactions;
