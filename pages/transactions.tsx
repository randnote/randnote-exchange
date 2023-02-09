import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
import { Tabs, Tab, Card, Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { AlertDismissible } from "./components/alerts/dismissableAlerts";
import Router, { useRouter } from "next/router";
import GetLocalStorage from "./components/authentication/localstorage";
import { localstorageUserType } from "./components/authentication/localstorage";
import { useForm } from "react-hook-form";
import { FormGroup, Label } from "reactstrap";
import socketIOClient from "socket.io-client";
import { transcode } from "buffer";
// import SendNotesModal from "./components/transactions/transactionsSendNotes";
const ENDPOINT = "http://127.0.0.1:8024";

// styles imports:
import styles from "../styles/transactions.module.scss";

const Transactions: NextPage = () => {
	// Buy/Sell notes modal
	const [showModal, setShowModal] = useState<boolean>(false);
	const handleClose = () => {
		setShowModal(false);
	};
	const handleShow = () => setShowModal(true);

	// ---------------------------------------------------------------------------------------------------------
	const [showModal_SendNotes, setShowModal_SendNotes] =
		useState<boolean>(false);

	const handleShowSendNotesModal = () => setShowModal_SendNotes(true);
	const closeModal_SendNotes = () => setShowModal_SendNotes(false);

	const [sendNotesError, setSendNotesError] = useState<boolean>(false);
	const [successfulNotesTransmission, setSuccessfulNotesTransmission] = useState<boolean>(false);

	// this function is what gets called when the users clicks "send notes" on the modal ...
	const sendNotes = (data: any) => {
		closeModal_SendNotes(); // close the modal
		

		const callApi = async () => {
			let info: any = await GetLocalStorage("randnoteUser"); // this; because we need the logged in users ID
			info.privateKey = privateKey; // add keys to the objects
			info.publicKey = publicKey;
			// console.log(info);
			// console.log(data);
			
			
			//now we use these keys to get the notes balance in the blockchain:
			Axios.get(`http://localhost:8033/balance/${publicKey}`)
			.then((res) => {
				if (res.status == 200) {
					console.log(res.data.balance);
					// if(res.data.balance < data.notes){
					// 	// return error here
					// 	setSendNotesError(true);
					// 	setSuccessfulNotesTransmission(false)
					// }else if(res.data.balance == 0){
					// 	setSendNotesError(true);
					// 	setSuccessfulNotesTransmission(false)
					// }else{
						setSendNotesError(false);

						let sendNotesObject = {
							fromAddress:  info.publicKey,
							toAddress: data.address,
							amount: data.notes,
							fromAddressPrivateKey: info.privateKey
						}
						// console.log(sendNotesObject)
						let snack = JSON.stringify(sendNotesObject);

						Axios.post(`http://localhost:8033/transaction`, {obj: snack})
							.then((res) => {
								console.log(sendNotesObject)
								if(res.status == 200){
									console.log("The transaction is successful")
									setSuccessfulNotesTransmission(true)
								}
								
							}).catch((err) => {
								console.log(err);
							});

					// }
				}
			}).catch((err) => {
				console.log(err);
			});
		};

		
		callApi()
	};
	// -------------------------------------------------------------------------------------------

	// const [showModalNotes, setShowModalNotes] = useState<boolean>(false);
	// const handleCloseNotes = () => setShowModalNotes(false);
	// const handleShowNotes = () => setShowModalNotes(true);

	// success and error alerts.
	const [buySellError, setBuySellError] = useState(false);
	const [buySellSuccess, setBuySellSuccess] = useState(false);

	//M
	const [publicKey, setPublicKey] = useState<string>("");
	const [privateKey, setPrivateKey] = useState<string>("");
	const [zarBalance, setZarBalance] = useState<number>(0);
	const [notesBalance, setNotesBalance] = useState<number>(0);

	const [transactionsWebsite, setTransactionsWebsite] = useState([]);
	const { register, handleSubmit } = useForm();
	const [price, setPrice] = useState<number>(0);
	const [orderType, setOrderType] = useState<string>("");
	const [websiteTransactionsArray, setWebsiteTransactionsrray] = useState([]);

	const [order, setOrder] = useState({
		orderType: "buy",
		zarAmount: 0,
		notes: 0,
	});

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI", (data) => {
			// setPrice(0)
			setPrice(data.price);
		});

		const getUserFromLocalStorage = async () => {
			let user: localstorageUserType = await GetLocalStorage(
				"randnoteUser"
			);
			Axios.get(`http://localhost:8024/zarbalance/${user.id}`)
				.then(async (res) => {
					await setZarBalance(res.data.balance);
					console.log(res.data.balance);
					Axios.get(
						`http://localhost:8024/transactionWebsite/${user.id}`
					)
						.then((res) => {
							if (res.status == 200) {
								setWebsiteTransactionsrray(res.data.data);
							}
						})
						.catch((err) => {
							console.log(err);
						});

					// here we get the users public and private keys using the addresses:
					Axios.get(`http://localhost:8024/getKeys/${user.id}`)
						.then((res) => {
							if (res.status == 200) {
								// console.log(res.data[0]);
								// let publicAddress = res.data[0].publicAddress;
								setPrivateKey(res.data[0].privateKey);
								setPublicKey(res.data[0].publicKey);
							}

							// I have not added NotesBalance as a route:
							// now we use these keys to get the notes balance in the blockchain:
							Axios.get(
								`http://localhost:8033/balance/${res.data[0].publicKey}`
							)
								.then((res) => {
									if (res.status == 200) {
										// console.log(res.data.balance);
										setNotesBalance(res.data.balance);
									}
								})
								.catch((err) => {
									console.log(err);
								});
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		};

		// to get the notes balance, we first start by getting the users keys and then use those to get balance
		const getNotesBalance = () => {
			return;
		};

		getUserFromLocalStorage();
		// getNotesBalance();
	}, []); // end of useEffect

	const sendToDepositPage = () => {
		Router.push("/deposit");
	};

	const onChangeOrderAmount = (value: any) => {
		let calcualtedNotes = value / price;
		let newOrder = {
			orderType: order.orderType,
			zarAmount: value,
			notes: calcualtedNotes,
		};
		setOrder(newOrder);
	};
	const onChangeOrderNotes = (value: any) => {
		let calculatedAmount = price * value;
		let newOrder = {
			orderType: order.orderType,
			zarAmount: calculatedAmount,
			notes: value,
		};
		setOrder(newOrder);
	};
	const onChangeOrderType = (value: any) => {
		let myOrder = order;
		let newOrder = {
			orderType: value,
			zarAmount: order.zarAmount,
			notes: order.notes,
		};

		setOrder({
			orderType: "buy",
			zarAmount: 0,
			notes: 0,
		});
		setOrder(newOrder);
	};

	const makeTransaction = async () => {
		let user: localstorageUserType = await GetLocalStorage("randnoteUser");
		let newNotes: any = parseFloat(order.notes.toString());
		let orderObject = {
			user_id: user.id,
			price: price,
			ordertype: order.orderType,
			amount: order.zarAmount,
			notes: newNotes,
		};

		if (orderObject.ordertype == "buy" && zarBalance < orderObject.amount) {
			// means that the user is trying to buy more than they can afford
			handleClose();

			setBuySellError(true);
			setOrder({
				// we reset the order to 0
				orderType: "buy",
				zarAmount: 0,
				notes: 0,
			});
			return;
		} else {
			// no errors for user
			handleClose();
			setOrder({
				// we reset the order to 0
				orderType: "buy",
				zarAmount: 0,
				notes: 0,
			});
			setBuySellSuccess(true);
		}

		console.log(orderObject);

		Axios.post(`http://localhost:8024/transactionWebsite`, orderObject)
			.then((res) => {
				console.log("Transaction made");
				// handleCloseNotes();
				handleClose();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleCallExternalModal = () => {
		//
	};

	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			<br />

			<Container>
				{
					// alert area:
					buySellError ? (
						<AlertDismissible
							color="danger"
							information="There is an error with your transaction, make sure you have enough money to Buy, or you have enough Notes to Sell!"
						></AlertDismissible>
					) : (
						""
					)
				}
				{
					// alert area:
					buySellSuccess ? (
						<AlertDismissible
							color="success"
							information="You have successfully made a transaction."
						></AlertDismissible>
					) : (
						""
					)
				}

				{
					// alert area:
					sendNotesError ? (
						<AlertDismissible
							color="danger"
							information="You do not have enough NOTES to make this transaction. Buy notes first!"
						></AlertDismissible>
					) : (
						""
					)
				}

				{
					// alert area:
					successfulNotesTransmission ? (
						<AlertDismissible
							color="success"
							information="Your NOTES have been transferred to another user SUCCESSFULLY!"
						></AlertDismissible>
					) : (
						""
					)
				}

				<Row>
					<Col md="6">
						<Card className={styles.zarBalanceCardStyle}>
							<Card.Body>
								<Card.Title>ZAR balance</Card.Title>

								<Card.Text>
									{zarBalance !== undefined ? ( // there is an issue here, coz js detects 0 as false...
										<>{zarBalance}</>
									) : (
										<>Loading</>
									)}
								</Card.Text>

								<Button
									className={styles.makeDepositButtonStyle}
									variant="outline-primary"
									onClick={() => {
										sendToDepositPage();
									}}
								>
									Make deposit
								</Button>
							</Card.Body>
						</Card>
					</Col>

					<Col md="6">
						<Card className={styles.notesBalanceCardStyle}>
							<Card.Body>
								<Row>
									<Col md="12">
										<Card.Title>Notes balance</Card.Title>
									</Col>
								</Row>

								<Row>
									<Col md="12">
										<Card.Text>
											{notesBalance !== undefined ? (
												<>
													<i>
														<b>N</b>
													</i>
													&nbsp;
													{notesBalance}
												</>
											) : (
												<>Loading</>
											)}
										</Card.Text>
									</Col>
								</Row>
								<br />

								<Row>
									<Col md="6">
										<Button
											className={
												styles.buySellNotesButtonStyle
											}
											variant="outline-success"
											onClick={handleShow}
										>
											Buy/Sell <i>NOTES</i>
										</Button>
									</Col>

									<Col md="6">
										<Button
											className={
												styles.sendNotesButtonStyle
											}
											variant="outline-success"
											onClick={handleShowSendNotesModal}
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
					defaultActiveKey="websiteTransactions"
					id="uncontrolled-tab-example"
					className="mb-3"
				>
					<Tab
						eventKey="websiteTransactions"
						title="Website Transactions"
					>
						<table
							className={` table table-bordered border-default  ${styles.stylesTable}`}
						>
							<thead className="table-success">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Order type</th>
									<th scope="col">ZAR amount</th>
									<th scope="col">@ Price</th>
									<th scope="col">
										<i>Notes</i>
									</th>
									<th scope="col">Timestamp</th>
								</tr>
							</thead>
							<tbody>
								{websiteTransactionsArray.length > 0 ? (
									websiteTransactionsArray.map(
										(transaction: any) => (
											<tr key={transaction.id}>
												<td>{transaction.id}</td>
												<td>{transaction.ordertype}</td>
												<td>{transaction.amount}</td>
												<td>{transaction.price}</td>
												<td>{transaction.notes}</td>
												<td>{transaction.timestamp}</td>
											</tr>
										)
									)
								) : (
									<tr>
										<td>nothing</td>
									</tr>
								)}
							</tbody>
						</table>
					</Tab>
					<Tab
						eventKey="blockchainTransactions"
						title="Blockchain Transactions"
					>
						<table
							className={` table table-bordered border-default ${styles.stylesTable}`}
						>
							<thead className="table-success">
								<tr>
									<th scope="col">#</th>
									<th scope="col">Type</th>
									<th scope="col">
										<i>Notes</i>
									</th>
									<th scope="col">To/From Address</th>
									<th scope="col">Timestamp</th>
								</tr>
							</thead>
							{/* <tbody>
								{websiteTransactionsArray.length > 0 ? (
									websiteTransactionsArray.map(
										(transaction: any) => (
											<tr key={transaction.id}>
												<td>{transaction.id}</td>
												<td>{transaction.ordertype}</td>
												<td>{transaction.amount}</td>
												<td>{transaction.timestamp}</td>
												<td>{transaction.notes}</td>
												<td>{transaction.timestamp}</td>
											</tr>
										)
									)
								) : (
									<tr>
										<td>nothing</td>
									</tr>
								)}
							</tbody> */}
						</table>
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
										onChangeOrderType(e.target.value);
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
								{...register("zaramount", {
									onChange: (e) => {
										// console.log(e.target.value)
										// setOrderType(e.target.value);
										onChangeOrderAmount(e.target.value);
									},
									onBlur: (e) => {},
								})}
								type="text"
								name="zaramount"
								className="form-control"
								placeholder="Enter amount in Zar"
								value={order.zarAmount}
							/>
						</FormGroup>

						<FormGroup>
							<Label for="">
								<i>Notes</i>:
							</Label>
							<input
								{...register("notes", {
									onChange: (e) => {
										// console.log(e.target.value)
										// setOrderType(e.target.value);
										onChangeOrderNotes(e.target.value);
									},
									onBlur: (e) => {},
								})}
								type="text"
								name="notes"
								className="form-control"
								placeholder={
									orderType == "sell"
										? "Enter quantity of Notes to sell"
										: "Enter quantity of Notes to buy"
								}
								value={order.notes}
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
							onClick={makeTransaction}
						>
							{orderType === "sell" ? "SELL" : "BUY"}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>

			{/* This is a modal that allows users to send Notes to one another */}
			<Modal show={showModal_SendNotes} onHide={closeModal_SendNotes}>
				<form onSubmit={handleSubmit(sendNotes)}>
					<Modal.Header closeButton>
						<Modal.Title>
							You are about to send <i>NOTES</i> to another
							address
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup>
							<small>
								Make sure that the address you have entered is
								correct.
							</small>
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
						<Button
							variant="secondary"
							onClick={closeModal_SendNotes}
						>
							Close
						</Button>
						<Button
							variant="outline-success"
							type="submit"
							value="submit"
						>
							Send <i>NOTES</i>
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
};

export default Transactions;
