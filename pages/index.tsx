import type { NextPage } from "next";
import { AuthenticatedNavbar } from "./components/Navbar";
import MainFooter from "./components/Footer";
import { Container, Button, Row, Card, CardBody,CardTitle ,CardText} from "reactstrap";
import ChartComponent from "./components/charts/chartComponent";
import Image from 'next/image'
import MainImage from '../public/blocks.png'

import {GrMoney} from 'react-icons/gr'
import {GiCycle} from 'react-icons/gi'
import {SiHiveBlockchain} from 'react-icons/si'
// styles imports:
import styles from "../styles/Home.module.scss";

interface Props {
	text: string;
}

// Main section
const MainComponent: React.FC = () => {
	return (
		<div className={styles.mainComponent}>
			<Container className={styles.mainComponentMainContainer}>
				<Row className={`${styles.mainRow} `}>
					
					<div className={`${styles.colLeft} col-md-6 col-sm-12`}>
						<h1>Rand Note Exchange</h1>
						<p>This is the RandNote official website and exchange.</p>
					</div>

					<div className={`${styles.colRight} col-md-6 col-sm-12`}>
						<Image
							src={MainImage}
							alt="Picture of the author"
							width={600}
							height={500} 
							// blurDataURL="data:..." automatically provided
							// placeholder="blur" // Optional blur-up while loading
						/>
					</div>

				</Row>
			</Container>
		</div>
	);
};

// About section
const AboutComponent = () => {
	return (
		<div className={styles.aboutComponent}>
			<Container>
				<div className="text-center">
					
					<Row>
						<h3 className={`${styles.infoSection}`}>
							One blockchain to simulate all your needs!
						</h3>
					</Row>

					<Row className={styles.blockSection}>
						<div className="col-md-4">
							<Card>
								<CardBody>
									<GrMoney size={50}></GrMoney>

									<CardTitle tag="h5">
									Money 
									</CardTitle>
									<CardText>
									This application simulates real world money transactions such as depositing and withdrawing funds, using those funds to trade the cryptocurrency. 
									</CardText>
								</CardBody>	
							</Card>
						</div>

						<div className="col-md-4">
							<Card>
								<CardBody>
									<SiHiveBlockchain size={50}></SiHiveBlockchain>
									<CardTitle tag="h5">
									Blockchain simulation
									</CardTitle>
									<CardText>
									This application consists of a blockchain written in Typescript(Node) that runs in the backend.
									</CardText>
								</CardBody>	
							</Card>
						</div>

						<div className="col-md-4">
							<Card>
								<CardBody>
									<GiCycle size={40}></GiCycle>
									<CardTitle tag="h5">
									Blockchain automation
									</CardTitle>
									<CardText>
									This application consists of an automator application that is responsible for automating user transactions(buys, sells and transfers).
									</CardText>
								</CardBody>	
							</Card>
						</div>
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
			<AuthenticatedNavbar></AuthenticatedNavbar>
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
