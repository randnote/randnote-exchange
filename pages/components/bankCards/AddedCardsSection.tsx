import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { FormGroup, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { Tabs, Tab, Card, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Axios from "axios";
import GetLocalStorage from "../authentication/localstorage";
import AlertDismissible from "../alerts/dismissableAlerts";
// import fetch from 'node-fetch';
import { localstorageUserType } from "../authentication/localstorage";
import { copyFileSync } from "fs";

export interface depositType {
	userId: number;
	cardId: number;
	amount: number;
}

interface cardType {
	cardId: number;
	cardnumber: number;
	amount: number;
}

const AddedCardsSection: React.FC = (props: any) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const { register, handleSubmit } = useForm();
	const [zarBalance, setZarBalance] = useState<number>(0);

	const [cards, setCards] = useState<any[]>([]);
	const [user, setUser] = useState<any>({});
	const [amountToDeposit, setAmountToDeposit] = useState<number>(0);
	const [addedCardAlert, setAddedCardAlert] = useState(false);
	const [deletedCardAlert, setDeletedCardAlert] = useState(false);

	const [cardSelected, setCardSelected] = useState({
		cardId: 0,
		cardnumber: 0,
	}); // had to store these dafualt vaules to eliminate error, look into...

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	useEffect(() => {
		const getCards = async () => {
			let user = await GetLocalStorage("randnoteUser");
			Axios.get(`http://localhost:8024/cards/${user.id}`)
				.then((res) => {
					if (res.status === 200) {
						setCards(res.data.result);
						setUser(user);

						// call another api to set the Zar balance
						Axios.get(`http://localhost:8024/zarbalance/${user.id}`)
							.then(async (res) => {
								await setZarBalance(res.data.balance);
							})
							.catch((err) => {
								console.log(err);
							});
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getCards();
	}, [cardSelected]);

	const handleDeposit = async (cardObject: any) => {
		setCardSelected(cardObject);
		handleShow();
	};

	const onSubmitDeposit = async (data: any) => {
		// now we have the card selected and the amount ... and we need to get usersID and send the request...

		let user = await GetLocalStorage("randnoteUser");

		let depositObject: depositType = {
			userId: user.id,
			cardId: cardSelected.cardId,
			amount: data.amount,
		};

		Axios.post(`http://localhost:8024/deposit`, depositObject)
			.then((res) => {
				console.log("deposit made");
				setAddedCardAlert(true);
				handleClose();
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(data);
	};

	const handleDelete = (cardId: number) => {
		Axios.get(`http://localhost:8024/deletecard/${cardId}`)
			.then((res) => {
				// console.log(res);
				setDeletedCardAlert(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<Container>
				<Row>
					<Card style={zarBalanceCardStyle}>
						<Card.Body>
							<Card.Title>ZAR balance</Card.Title>

							<Card.Text>
								{zarBalance !== undefined ? ( // there is an issue here, coz js detects 0 as false...
									<>{zarBalance}</>
								) : (
									<>Loading</>
								)}
							</Card.Text>
						</Card.Body>
					</Card>
				</Row>

				{
					// alert area:
					addedCardAlert ? (
						<AlertDismissible
							color="success"
							information="You have successfully added a card to your profile"
						></AlertDismissible>
					) : (
						""
					)
				}

				{
					// alert area:
					deletedCardAlert ? (
						<AlertDismissible
							color="info"
							information="You have successfully deleted a card from your profile"
						></AlertDismissible>
					) : (
						""
					)
				}

				<Row>
					<table
						style={stylesTable}
						className=" table   table-bordered border-default"
					>
						<thead className="table-success">
							<tr>
								<th scope="col">Card number</th>
								<th scope="col">Deposit</th>
								<th scope="col">Delete card</th>
							</tr>
						</thead>
						<tbody>
							{cards.length > 0 ? (
								cards.map((card: any) => (
									<tr key={card.id}>
										<td>{card.cardnumber}</td>

										<td>
											<Button
												color="outline-success"
												id="Popover1"
												type="button"
												style={depositButtonStyle}
												onClick={() => {
													handleDeposit({
														cardId: card.id,
														cardnumber:
															card.cardnumber,
													});
												}}
											>
												Deposit
											</Button>
										</td>

										<td>
											<Button
												color="outline-danger"
												id="Popover1"
												type="button"
												style={deleteButtonStyle}
												onClick={() => {
													handleDelete(card.id);
												}}
											>
												X
											</Button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td>
										<h5>
											You do not have any Cards. To make a
											deposit, you first need to add a
											card.
										</h5>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</Row>
			</Container>

			<Modal show={showModal} onHide={handleClose}>
				<form onSubmit={handleSubmit(onSubmitDeposit)}>
					<Modal.Header closeButton>
						<Modal.Title>
							You're about to make a deposit
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup>
							<Label for="">Card:</Label>
							<input
								{...register("cardinfo")}
								type="text"
								name="cardinfo"
								id=""
								className="form-control"
								disabled={true}
								placeholder="Card ending in ...5543"
								value=""
							/>
						</FormGroup>

						<FormGroup>
							<Label for="">Amount:</Label>
							<input
								{...register("amount")}
								type="text"
								name="amount"
								id=""
								className="form-control"
							/>
						</FormGroup>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<button
							// variant="outline-success"
							// onClick={onSubmitDeposit}
							type="submit"
						>
							Deposit
						</button>
					</Modal.Footer>
				</form>
			</Modal>
		</div>
	);
};

const stylesTable = {
	margin: "10px",
};

const cardsTable = {
	margin: "40px",
};

const depositButtonStyle = {
	borderRadius: "0px",
};
const deleteButtonStyle = {
	borderRadius: "0px",
};
const zarBalanceCardStyle = {
	borderRadius: "0px",
	margin: "40px",
};

const tableHeaderNameStyle = {
	color: "#2cb978",
};

export default AddedCardsSection;
