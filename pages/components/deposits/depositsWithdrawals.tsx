import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Axios from "axios";
import GetLocalStorage from "../authentication/localstorage";

export interface depositType {
	userId: number;
	cardId: number;
	amount: number;
}

// this component gets both the deposits and withdrawals
const Deposits: React.FC = (props: any) => {
	const [deposits, setDeposits] = useState([]);

	useEffect(() => {
		const callApi = async () => {
			let user = await GetLocalStorage("randnoteUser");
			Axios.get(`http://localhost:8024/cards/${user.id}`)
				.then((res) => {
					//
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err);
                });
		};
		callApi();
	}, []);

	

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
					{/* {deposits.length > 0 ? (
						deposits.map((deposit: any) => (
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
					)}*/}
				</tbody> 
			</table>
		</div>
	);
};


export default Deposits;
