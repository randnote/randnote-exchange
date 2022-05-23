import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8024";
import { Line } from "react-chartjs-2";

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

const ChartComponent = () => {
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

	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		socket.on("FromAPI", (data) => {
			console.log(data);

			let price: number = data.price;
			let arrayLabels: any = response.labels;
			let arrayPrices: any = response.datasets[0].data;
			arrayLabels.push(
				`${data.time.hours}: ${data.time.minutes}: ${data.time.seconds}`
			);
			arrayPrices.push(data.price);

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
	}, []);
	return (
		<div>
			return <Line options={options} data={response} />
		</div>
	);
};

export default ChartComponent;
