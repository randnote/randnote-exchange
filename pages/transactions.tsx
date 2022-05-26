import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
import { Tabs, Tab, Card, Modal, Button } from "react-bootstrap";
import Axios from "axios";
import GetLocalStorage from "./components/authentication/localstorage";
import { localstorageUserType } from "./components/authentication/localstorage";

const Transactions: NextPage = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [zarBalance, setZarBalance] = useState<number>(0);
	const [transactionsWebsite, setTransactionsWebsite] = useState([]);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	useEffect(() => {
		const getUserFromLocalStorage = async () => {
			let userInformation: localstorageUserType = await GetLocalStorage(
				"randnoteUser"
			); // this; because we need the logged in users ID

			// console.log(userInformation)

			Axios.get(`http://localhost:8024/zarbalance/${userInformation.id}`)
				.then((res) => {
					console.log(res);
					setZarBalance(res.data.balance)
				})
				.catch((err) => {
					console.log(err);
				});
		};

		const getDepositsAndWithdrawals = async () => {};

		// get the zar balance from backend:

		//get the Notes balance from blockchain:
		getUserFromLocalStorage();
	}, []);

	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<br />

			<Container>
				<Row>
					<Col md="6">
						<Card style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>ZAR balance</Card.Title>

								<Card.Text>{zarBalance ? <>{zarBalance}</>: <>Loading</>}</Card.Text>

								<Button variant="primary" onClick={handleShow}>
									Make deposit
								</Button>
							</Card.Body>
						</Card>
					</Col>

					<Col md="6">
						<Card style={{ width: "18rem" }}>
							<Card.Body>
								<Card.Title>Notes balance</Card.Title>

								<Card.Text>N 29293.000023</Card.Text>
								<Card.Link href="#">Trade</Card.Link>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>

			<br />

			<Container>
				<Tabs
					defaultActiveKey="profile"
					id="uncontrolled-tab-example"
					className="mb-3"
				>
					<Tab
						eventKey="websiteTransactions"
						title="Website Transactions"
					>
						website trans
						<table className="table">
							<thead>
								<tr>
									<th scope="col">#</th>
									<th scope="col">First</th>
									<th scope="col">Last</th>
									<th scope="col">Handle</th>
								</tr>
							</thead>
							<tbody>
								{/* {transactionsWebsite.length > 0 ? (
						transactionsWebsite.map((transaction: any) => (
							<tr key={transaction.id}>
								<td>{card.cardnumber}</td>
								<td>Otto</td>
							</tr>
						))
					) : (
						<tr>
							<td>nothing</td>
						</tr>
					)} */}
							</tbody>
						</table>
					</Tab>
					<Tab
						eventKey="blockchainTransactions"
						title="Blockchain Transactions"
					>
						sdfsdf
					</Tab>
				</Tabs>
			</Container>

			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Woohoo, you're reading this text in a modal!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Transactions;
