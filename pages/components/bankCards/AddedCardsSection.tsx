import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Axios from "axios";
import GetLocalStorage from "../authentication/localstorage";



const AddedCardsSection = (props: any) => {
	const [cards, setCards] = useState([]);

	useEffect(() => {
		const callApi = async () => {
			let info = await GetLocalStorage("randnoteUser");
			Axios.get(`http://localhost:8024/cards/${info.id}`)
				.then((res) => {
					// setPosts(res.data.slice(0, 10));
					//console.log(res.status === 200)
					// console.log(res.data);
					if(res.status===200){
						console.log("yes")
						setCards(res.data)
						console.log(res.data)
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

	const handleDeposit = (cardId : number) =>{
		console.log(cardId)

		
	}

	const handleDelete = (cardId: number) =>{
		
			Axios.get(`http://localhost:8024/deletecard/${cardId}`)
				.then((res) => {
					console.log(res)
				})
				.catch((err) => {
					console.log(err);
				});
	
	}

	return (
		<div>
			<Container>
				<Row>
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
					{
						cards.length >0 && cards !== undefined ? cards.map((card: any)=>(
							
						<tr>
						
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
							<td>
									<Button
										color="success"
										id="Popover1"
										type="button"
										onClick={ ()=>{
											handleDeposit(card.id)
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
										onClick={ ()=>{
											handleDelete(card.id)
										}}
									>
										X
									</Button>
								</td>
						</tr>
						)) : <div>niks</div>
					}
					</tbody>
					</table>
				</Row>
			</Container>
			{/* {
				cards.length >0 && cards !== undefined ? cards.map((card:any)=>{
					<div>{card}</div>
				}) : <div>sam</div>
			} */}
			{/* <Table style={stylesTable} responsive>
				<thead>
					<tr>
						<th style={tableHeaderNameStyle}>DEPOSIT METHODS</th>
					</tr>
				</thead>

				<tbody>
					{
						cards.length > 0 ? (<div>hellow</div>): (<div>no</div>)
					}
					{cards.length> 0 ? 
						cards.map((card: any) => (
							<div> ok
							<tr key={card.cardnumber}>
								<td scope="row">
									Mastercard ending in {card.cardnumber}
								</td>
								<td>Expires in {card.year}</td>
								<td>
									<Button
										color="success"
										id="Popover1"
										type="button"
										onClick={ ()=>{
											handleDeposit(card.id)
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
										onClick={ ()=>{
											handleDelete(card.id)
										}}
									>
										X
									</Button>
								</td>
							</tr>
							</div>
						)
					) : (
						<div>You do not have any deposit methods yet.</div>
					)}
				</tbody> 
			</Table> */}
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
