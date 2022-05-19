import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { useState, useEffect } from "react";
import { Container } from "reactstrap";
import Axios from "axios";
import GetLocalStorage from "../authentication/localstorage";

const AddedCardsSection = () => {
	const [cards, setCards] = useState([]);

	useEffect(() => {
		let userId = "";
		// const getUserId = async() =>{
		//     let info = await GetLocalStorage("randnoteUser");
		//     return info;
		// }
		// let info =  getUserId();
		// info.then((res)=>{
		//     console.log(res.id)
		//     userId =  res.id
		// })

		const callApi = async () => {
			let info = await GetLocalStorage("randnoteUser");
			// console.log(info)
			Axios.get(`http://localhost:8024/cards/${info.id}`)
				.then((res) => {
					// setPosts(res.data.slice(0, 10));
					console.log(res.data);
					setCards(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		callApi();
	}, []);

	return (
		<Container>
			<Table style={stylesTable} responsive>
				<thead>
					<tr>
						<th style={tableHeaderNameStyle}>DEPOSIT METHODS</th>
					</tr>
				</thead>

				{/* <tbody>
					{cards != undefined ? (
						cards.map((card) => (
							<div key="a">
								<tr>
									<td scope="row">
										Mastercard ending in {card.cardnumber}
									</td>
									<td>Expires in {card.year}</td>
									<td>
										<Button
											color="success"
											id="Popover1"
											type="button"
										>
											Deposit
										</Button>
									</td>
									<td>
										<Button
											color="danger"
											id="Popover1"
											type="button"
										>
											X
										</Button>
									</td>
								</tr>
							</div>
						))
					) : (
						<div>You do not have any deposit methods yet.</div>
					)}
				</tbody> */}
			</Table>

			{/*<Popover
				placement="bottom"
				target="Popover1"
				toggle={function noRefCheck() {}}
			>
				<PopoverHeader>Popover Title</PopoverHeader>
				<PopoverBody>
					Sed posuere consectetur est at lobortis. Aenean eu leo quam.
					Pellentesque ornare sem lacinia quam venenatis vestibulum.
				</PopoverBody>
			</Popover>*/}
		</Container>
	);
};

const stylesTable = {
	margin: "10px",
};

const tableHeaderNameStyle = {
	color: "#2cb978",
};

export default AddedCardsSection;
