import type { NextPage } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import MainNavbar from "./components/Navbar";
import MainFooter from "./components/Footer";
import { Container, Button, Row } from "reactstrap";
import Chart from "./components/chart";

// Main section
const MainComponent = () => {
	return (
		<Container className="text-center">
			<Row>
				<h1>Rand Note Exchange</h1>
				<p>This is the RandNote official website and exchange.</p>
			</Row>

			<Chart></Chart>
		</Container>
	);
};

// About section
const AboutComponent = () => {
	return (
		<div style={AboutComponentDiv}>
			<Container>
				<div className="text-center">
					<Row>
						<p className="text-center">
							Randnote is lorem
							ipsum...............................h1
						</p>
					</Row>

					<Row>
						<p className="text-center">
							<Button
								style={{
									color: "white",
									backgroundColor: "green",
									borderRadius: "20px",
									maxWidth: "300px",
								}}
							>
								WHITEPAPER
							</Button>
						</p>
					</Row>
				</div>
			</Container>
		</div>
	);
};

// Page
const Home: NextPage = () => {
	return (
		<div>
			<MainNavbar></MainNavbar>
			<MainComponent></MainComponent>
			<AboutComponent></AboutComponent>
			<MainFooter></MainFooter>
		</div>
	);
};

const AboutComponentDiv = {
	backgroundColor: "green",
};

export default Home;
