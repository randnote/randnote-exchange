import type { NextPage } from "next";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
import ChartComponent from "./components/charts/chartComponent";
import { Container, Row, Col } from "reactstrap";
import { Tabs, Tab, Card, Modal, Button } from "react-bootstrap";

import socketIOClient from "socket.io-client";
import MainFooter from "./components/Footer";
const ENDPOINT = "http://127.0.0.1:8024";

const Chart: NextPage = () => {
	const [price, setPrice] = useState(0);
	const [previousPrice , setPreviousPrice] = useState(0);
	const [priceMovementColor, setPriceMovementColor] = useState('black');

	const handleCallBack = async(childData: any) =>{
		// setPrice(childData);
		console.log(`its : ${childData}`)


		let currentPrice: number = previousPrice;
		let newPrice : number = childData;

		if(currentPrice > newPrice){
			// means that the price fell
			setPriceMovementColor('red')
		}else if(currentPrice < newPrice){
			setPriceMovementColor('pink')

		}else{
			// price remained the same
			setPriceMovementColor('black')

		}
		await setPreviousPrice(childData);
		console.log(previousPrice)
		await setPrice(childData);
		console.log(priceMovementColor)
	}



	// useEffect(() => {
	// 	const socket = socketIOClient(ENDPOINT);
	// 	socket.on("FromAPI", (data) => {
	// 		
		
	// 	});
	// }, []);


	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>
			
				<Container>
					<Row>
						<Col md="8">
							<ChartComponent parentCallBack={handleCallBack}></ChartComponent>
						</Col>
					</Row>
					<hr/>
					<br/>
					<Row>
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>PRICE</Card.Title>
									<Card.Text>
										{
											price ? (<span
											style={{
												color: priceMovementColor,
												fontSize: "30px",
											}}
										>
											111
										</span>) : ''
										}
										
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
	
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>Market cap</Card.Title>
									<Card.Text>
										<span style={{ color: "green" }}>
											ZAR 123.00
										</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
	
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>
										Avarage Notes Transactions(24 H)
									</Card.Title>
									<Card.Text>
										<i>N</i> 123.00
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
	
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>Price change (24 H)</Card.Title>
									<Card.Text>
										{" "}
										<span style={{ color: "green" }}>
											+$222.45
										</span>
									</Card.Text>
								</Card.Body>
							</Card>
						</Col>
						
					</Row>
				</Container>
			
			
			<MainFooter></MainFooter>
		</div>
	);
};

export default Chart;
