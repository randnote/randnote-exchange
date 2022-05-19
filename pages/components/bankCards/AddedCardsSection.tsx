// import type { NextPage } from "next";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Table, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
// import { useState, useEffect } from "react";
// import { Container } from "reactstrap";
// import Axios from "axios";

// const AddedCardsSection = () => {
// 	const userId = 1;

// 	const [cards, setCards] = useState([]);
// 	// useEffect(() => {
// 	// 	Axios.get(`http://localhost:8024/cards/${userId}`).then((res) => {
// 	// 		// setPosts(res.data.slice(0, 10));
// 	// 		console.log(res.data);
// 	// 		setCards(res.data);
// 	// 	});
// 	// }, []);

// 	return (
// 		<Container>
// 			<Table style={stylesTable} responsive>
// 				<thead>
// 					<tr>
// 						<th style={tableHeaderNameStyle}>DEPOSIT METHODS</th>
// 					</tr>
// 				</thead>

// 				<tbody>
// 					{cards != undefined ? (
// 						cards.map((card) => (
// 							<div key="a">
// 								<tr>
// 									<td scope="row">
// 										Mastercard ending in {card.cardnumber}
// 									</td>
// 									<td>Expires in {card.year}</td>
// 									<td>
// 										<Button
// 											color="success"
// 											id="Popover1"
// 											type="button"
// 										>
// 											Deposit
// 										</Button>
// 									</td>
// 									<td>
// 										<Button
// 											color="danger"
// 											id="Popover1"
// 											type="button"
// 										>
// 											X
// 										</Button>
// 									</td>
// 								</tr>
// 							</div>
// 						))
// 					) : (
// 						<div>You do not have any deposit methods yet.</div>
// 					)}
// 				</tbody>
// 			</Table>

// 			{/*<Popover
// 				placement="bottom"
// 				target="Popover1"
// 				toggle={function noRefCheck() {}}
// 			>
// 				<PopoverHeader>Popover Title</PopoverHeader>
// 				<PopoverBody>
// 					Sed posuere consectetur est at lobortis. Aenean eu leo quam.
// 					Pellentesque ornare sem lacinia quam venenatis vestibulum.
// 				</PopoverBody>
// 			</Popover>*/}
// 		</Container>
// 	);
// };

// const stylesTable = {
// 	margin: "10px",
// };

// const tableHeaderNameStyle = {
// 	color: "#2cb978",
// };

// export default AddedCardsSection;
