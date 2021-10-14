import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import MainNavbar from "./components/Navbar";
import MainFooter from "./components/Footer";
import { Container, Button, Row } from "reactstrap";
import Chart from "./components/chart";

// Main section
const MainComponent = () =>{
  return (
    <Container className="text-center">
        <Row>
          <h1>Rand Note Exchange</h1>
          <p>This is the RandNote official website and exchange.</p>

        </Row>

			<Chart></Chart>
			</Container>
  )
}

// About section
const AboutComponent = () =>{
  return (
    <div>
      About
    </div>
  )
}

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

export default Home;
