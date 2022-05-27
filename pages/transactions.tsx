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
	// Buy/Sell notes modal
	const [showModal, setShowModal] = useState<boolean>(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	// Send notes modal:
	const [showModalNotes, setShowModalNotes] = useState<boolean>(false);
	const handleCloseNotes = () => setShowModalNotes(false);
	const handleShowNotes = () => setShowModalNotes(true);

	//M

	const [zarBalance, setZarBalance] = useState<number>(0);
	const [transactionsWebsite, setTransactionsWebsite] = useState([]);
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
						<Card>
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
						<Card>
							<Card.Body>
								<Row>
									<Col md="12">
										<Card.Title>Notes balance</Card.Title>
									</Col>
								</Row>

								<Row>
									<Col md="12">
										<Card.Text>
											<i>
												<b>N</b>
											</i>{" "}
											29293.000023
										</Card.Text>
									</Col>
								</Row>
								<br />

								<Row>
									<Col md="6">
										<Button
											variant="outline-success"
											onClick={handleShow}
										>
											Buy/Sell <i>NOTES</i>
										</Button>
									</Col>

									<Col md="6">
										<Button
											variant="outline-success"
											onClick={handleShowNotes}
										>
											Send <i>NOTES</i> to another user.
										</Button>
									</Col>
								</Row>
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
						<Modal.Title>
							You are about to make an Order
						</Modal.Title>
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
							<Label for="">
								<i>Notes</i>:
							</Label>
							<input
								{...register("notes")}
								type="text"
								name="notes"
								className="form-control"
								placeholder={
									orderType == "sell"
										? "Enter quantity of Notes to sell"
										: "Enter quantity of Notes to buy"
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
						<Button
							variant={
								orderType === "sell"
									? "outline-danger"
									: "outline-success"
							}
							onClick={handleClose}
						>
							{orderType === "sell" ? "SELL" : "BUY"}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>

			<Modal show={showModalNotes} onHide={handleCloseNotes}>
				<form>
					<Modal.Header closeButton>
						<Modal.Title>
							You are about to send <i>NOTES</i> to another address
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup>
							<small>Make sure that the address you have entered is correct.</small>
						</FormGroup>

						<FormGroup>
						<Label for="">
								<i>Notes</i>:
							</Label>
							<input
								{...register("notes")}
								type="text"
								name="notes"
								className="form-control"
								placeholder="E.g 0.004 Notes"
							/>

						</FormGroup>
						
						<FormGroup>
						<Label for="">
								<i>Address</i>:
							</Label>
							<input
								{...register("address")}
								type="text"
								name="address"
								className="form-control"
								placeholder="Copy paste in the addresss you want to send to"
							/>
						</FormGroup>

					
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="outline-success">
							Send <i>NOTES</i>
						</Button>
						
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
};

export default Transactions;
