import type { NextPage } from "next";
import { useState, useEffect, useRef } from "react";
import { AuthenticatedNavbar } from "./components/Navbar";
import { Container, Row, Col } from "reactstrap";
import { Card} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {MainFooter} from "./components/Footer";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8024";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const options = {
	scales: {
		x: { title: { display: true, text: "TIME" } },
		y: { title: { display: true, text: "($) PRICE" } },
	},
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "RANDNOTE PRICE/TIME",
		},
	},
};

const Chart: NextPage = () => {
	const [price, setPrice] = useState(0);
	const [marketCap, setMarketCap] = useState(0);
	const [priceMovementColor, setPriceMovementColor] = useState("black");
	const [response, setResponse] = useState({
		labels: [], // x axis- timestamps
		datasets: [
			{
				label: "Dataset 1",
				data: [], // price
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
		],
	});
	const previousPrice = useRef(0);

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI", async (data) => {
			// setPrice(0)

			setPrice(data.price);
			// console.log(data.price);

			let price: number = data.price;
			let arrayLabels: any = response.labels;
			let arrayPrices: any = response.datasets[0].data;
			arrayLabels.push(
				`${data.time.hours}: ${data.time.minutes}: ${data.time.seconds}`
			);
			arrayPrices.push(data.price);

			// Here, I mantain the price. If prices are more than 50, i cut and regulate the chart that the users sees:
			// I delete the first 25 prices...
			if (arrayPrices.length > 50) {
				arrayPrices.splice(0, 25);
				arrayLabels.splice(0, 25);
			}

			let newObj: any = {
				labels: arrayLabels,
				datasets: [
					{
						label: "RANDNOTE.",
						data: arrayPrices,
						borderColor: "rgba(53, 162, 235, 0.5)",
						backgroundColor: "rgba(53, 162, 235, 0.5)",
						tension: 0.2,
					},
				],
			};

			setResponse(newObj);
		});
		if (price > previousPrice.current) {
			setPriceMovementColor("green");
		} else if (price < previousPrice.current) {
			setPriceMovementColor("red");
		} else if (price == previousPrice.current) {
			setPriceMovementColor("black");
		}
		previousPrice.current = price;

		// calculate the market cap:
		// market cap:

		// let supply :any = await getSupply()
		// console.log('supply is :'+ supply)

		// let marketcap: number = price * supply;
		// setMarketCap(marketcap);
	}, [price]);

	return (
		<div>
			<AuthenticatedNavbar></AuthenticatedNavbar>

			<Container>
				<Row>
					<Col md="12">
						<Line options={options} data={response} />
					</Col>
				</Row>
				<hr />
				<br />
				<Row>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title>PRICE</Card.Title>
								<Card.Text>
									{price && priceMovementColor ? (
										<span
											style={{
												color: priceMovementColor,
												fontSize: "30px",
											}}
										>
											${parseInt(price.toFixed(2))}
										</span>
									) : (
										""
									)}
								</Card.Text>
							</Card.Body>
						</Card>
					</Col>

					{/* <Col>
						<Card>
							<Card.Body>
								<Card.Title>Market cap</Card.Title>
								<Card.Text>
									<span style={{ color: "green" }}>
										{marketCap}
									</span>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col> */}

					{/* <Col>
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
									<span style={{ color: "green" }}>
										+$222.45
									</span>
								</Card.Text>
							</Card.Body>
						</Card>
					</Col> */}
				</Row>
			</Container>

			<MainFooter></MainFooter>
		</div>
	);
};

export default Chart;
