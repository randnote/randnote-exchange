import type { NextPage } from "next";
import { useState,useEffect } from "react";
import { Container, Button, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticatedNavbar } from "./components/Navbar";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8024";
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';  

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
  } from 'chart.js';

  ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
  );
//   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


let zaga = {
	labels: ['January', 'February', 'March','April', 'May', 'June', 'July'],
	datasets: [
	  {
		label: 'Dataset 1',
		data: [100,200,300,500],
		borderColor: 'rgb(255, 99, 132)',
		backgroundColor: 'rgba(255, 99, 132, 0.5)',
	  },
	],
  };


  // =-============================== main component
const Chart: NextPage = () => {
	const [response, setResponse] = useState({
			labels: ['January', 'February', 'March','April', 'May', 'June', 'July'],
			datasets: [
			  {
				label: 'Dataset 1',
				data: [100,200,300,500],
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			  },
			],
		  })


	useEffect(() => {
		const socket = socketIOClient(ENDPOINT);
		
		 
		//   console.log(zaga)
		socket.on("FromAPI", (data) => {
			// setResponse(zaga)
			let price : number = data;
			let arrayLabels: any = response.labels;
			let arrayPrices: any = response.datasets[0].data;
			arrayLabels.push('new')
			arrayPrices.push(price);


			let newObj:any = {
				labels: arrayLabels,
				datasets: [
				  {
					label: 'Dataset 1',
					data: arrayPrices,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				  },
				],
			  };

			  setResponse(newObj)

			console.log(data)

			// setResponse(data);
			// let vara : any = chartArray;
			// let objecta = {
			// 	name : "a",
			// 	uv: data
			// }
			// vara.push(objecta);
			// console.log(vara)
			// setChartArray(vara)
			// console.log(data)
		});
	}, []);
	return (
		<div>
			{
				response ? <div>hall</div>: ''
			}
			<AuthenticatedNavbar></AuthenticatedNavbar>
			return <Line  data={response} />
		</div>
	);
};

const chartstyle = {
	height: '500px'
};

export default Chart;
