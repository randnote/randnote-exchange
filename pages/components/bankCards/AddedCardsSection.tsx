import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import {FormGroup, Label} from "reactstrap";
import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import { Tabs, Tab, Card, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Axios from "axios";
import GetLocalStorage from "../authentication/localstorage";


export interface depositType {
	userId: number;
	cardId: number;
	amount: number;
}

const AddedCardsSection: React.FC = (props: any) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const { register, handleSubmit } = useForm();
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);
	const [cards, setCards] = useState<any[]>([]);
	const [user, setUser] = useState<any>({});

	useEffect(() => {
		const callApi = async () => {
			let user = await GetLocalStorage("randnoteUser");
			Axios.get(`http://localhost:8024/cards/${user.id}`)
				.then((res) => {
					// setPosts(res.data.slice(0, 10));
					//console.log(res.status === 200)
					// console.log(res.data);
					if (res.status === 200) {
						console.log("yes");
						setCards(res.data.result);
						setUser(user);
						console.log(res.data);
						// return
					}
					// if(res.data.success === true){
					// 	setCards(res.data);

					// }
				})
				.catch((err) => {
					console.log(err);
				});
		};
		callApi();
	}, []);

	const handleDeposit = async (cardId: number) => {
		handleShow();

	};

	const onSubmitDeposit = ()=>{
		// let user = await GetLocalStorage("randnoteUser");

		// console.log(cardId);
		// console.log(user.id);
		// // console.log()

		// let depositObject: depositType = {
		// 	userId: user.id,
		// 	cardId: cardId,
		// 	amount: 100,
		// };

		// Axios.post(`http://localhost:8024/deposit`, depositObject)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}

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
											handleDeposit(card.id);
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
							<td>nothing</td>
						</tr>
					)}
				</tbody>
			</table>

			<Modal show={showModal} onHide={handleClose}>
				<form onSubmit={handleSubmit(onSubmitDeposit)}>
					<Modal.Header closeButton>
						<Modal.Title>You're about to make a deposit</Modal.Title>
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
								value="100"
							/>
						</FormGroup>

							
						
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button  variant="outline-success" onClick={handleClose}>
							Deposit
						</Button>
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
