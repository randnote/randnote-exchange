import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { FormGroup, Label } from "reactstrap";
import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { Tabs, Tab, Card, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Axios from "axios";
import GetLocalStorage from "../authentication/localstorage";
// import fetch from 'node-fetch';
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

	const [cards, setCards] = useState<any[]>([]);
	const [user, setUser] = useState<any>({});

	const [cardSelected, setCardSelected] = useState({
		cardId: 0,
		cardnumber: 0,
	}); // had to store these dafualt vaules to eliminate error, look into...

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	useEffect(() => {
		const callApi = async () => {
			let user = await GetLocalStorage("randnoteUser");
			Axios.get(`http://localhost:8024/cards/${user.id}`)
				.then((res) => {
					if (res.status === 200) {
						setCards(res.data.result);
						setUser(user);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};
		callApi();
	}, [cardSelected]);

	const handleDeposit = async (cardObject: any) => {
		// set the state with the card selected:
		// console.log(cardObject)
		// console.log(cardObject.cardId)
		// console.log(cardObject.cardnumber)
		setCardSelected(cardObject);
		handleShow();
	};

	const onSubmitDeposit = async (data: any) => {
		// now we have the card selected and the amount ... and we need to get usersID and send the request...

		let user = await GetLocalStorage("randnoteUser");

		let depositObject: depositType = {
			userId: user.id,
			cardId: cardSelected.cardId,
			amount: 100,
		};

		Axios.post(`http://localhost:8024/deposit`, depositObject)
			.then((res) => {
				console.log("deposit made");
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
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
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
					{cards.length > 0 ? (
						cards.map((card: any) => (
							<tr key={card.id}>
								<td>{card.cardnumber}</td>
								<td>Otto</td>
								<td>
									<Button
										color="success"
										id="Popover1"
										type="button"
										onClick={() => {
											handleDeposit({
												cardId: card.id,
												cardnumber: card.cardnumber,
											});
										}}
									>
										Deposit
									</Button>
								</td>

								<td>
									<Button
										color="danger"
										id="Popover1"
										type="button"
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
									deposit, you first need to add a card.
								</h5>
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<Modal show={showModal} onHide={handleClose}>
				<form onSubmit={handleSubmit(handleDeposit)}>
					<Modal.Header closeButton>
						<Modal.Title>
							You're about to make a deposit
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<FormGroup>
							<Label for="">Card:</Label>
							<input
								{...register("amount")}
								type="text"
								name="amount"
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
							onClick={onSubmitDeposit}
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

const tableHeaderNameStyle = {
	color: "#2cb978",
};

export default AddedCardsSection;
