import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
import { Tabs, Tab, Card, Modal, Button } from "react-bootstrap";
import Axios from "axios";
import GetLocalStorage from "./components/authentication/localstorage";
import { localstorageUserType } from "./components/authentication/localstorage";
import { useForm } from "react-hook-form";
import { FormGroup, Label } from "reactstrap";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8024";

interface orderExampeType {
	zarAmount: number;
	price: number;
	notes: number;
}

const Transactions: NextPage = () => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [zarBalance, setZarBalance] = useState<number>(0);
	const [transactionsWebsite, setTransactionsWebsite] = useState([]);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);
	const { register, handleSubmit } = useForm();
	const [price, setPrice] = useState<number>(0);
	const [orderType, setOrderType] = useState<string>("");

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI", (data) => {
			// setPrice(0)
			setPrice(data.price);
		});

		const getUserFromLocalStorage = async () => {
			let userInformation: localstorageUserType = await GetLocalStorage(
				"randnoteUser"
			); // this; because we need the logged in users ID
			Axios.get(`http://localhost:8024/zarbalance/${userInformation.id}`)
				.then((res) => {
					console.log(res);
					setZarBalance(res.data.balance);
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

	const OrderExampleCalculation = (
		orderExampleObject: orderExampeType
	): orderExampeType => {
		let returnObject: orderExampeType = {
			zarAmount: orderExampleObject.price * orderExampleObject.notes,
			price: orderExampleObject.zarAmount * orderExampleObject.notes,
			notes: orderExampleObject.price * orderExampleObject.zarAmount,
		};
		return returnObject;
	};

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

								<Card.Text>
									{zarBalance ? (
										<>{zarBalance}</>
									) : (
										<>Loading</>
									)}
								</Card.Text>

								<Button
									variant="outline-primary"
									onClick={handleShow}
								>
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

								<Button
									variant="outline-success"
									onClick={handleShow}
								>
									Buy/Sell <i>NOTES</i>
								</Button>
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
				<form>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup>
							<p>
								Current price per <i>NOTE</i> is{" "}
								<b>ZAR {price}</b>
							</p>
						</FormGroup>

						<FormGroup>
							<select
								className="form-control"
								{...register("ordertype", {
									onChange: (e) => {
										// console.log(e.target.value)
										setOrderType(e.target.value);
									},
									onBlur: (e) => {},
								})}
							>
								<option value="buy">Buy order</option>
								<option value="sell">Sell order</option>
							</select>
						</FormGroup>

						<FormGroup>
							<Label for="">Amount:</Label>
							<input
								{...register("zaramount")}
								type="text"
								name="zaramount"
								className="form-control"
								placeholder="Enter amount in Zar"
							/>
						</FormGroup>

						<FormGroup>
							<Label for=""><i>Notes</i>:</Label>
							<input
								{...register("notes")}
								type="text"
								name="notes"
								className="form-control"
								placeholder={
									orderType == 'sell'? "Enter quantity of Notes to sell": "Enter quantity of Notes to buy"
								}
							/>
						</FormGroup>

						<FormGroup>
							{orderType === "sell" ? (
								<p>
									Selling at this price will earn you{" "}
									<b>ZAR 455</b>
								</p>
							) : (
								<p>
									Buying at this price, you will recieve{" "}
									<b>ZAR 300</b>
								</p>
							)}
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
};

export default Transactions;
