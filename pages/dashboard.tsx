import type { NextPage } from "next";
import { Container, Button, Row, Col } from "reactstrap";
import MainNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import WatchlistTable from "./components/dashboardTables/watchlistTable";
import AssetsTable from "./components/dashboardTables/assetsTable";
import InFooter from "./components/InFooter";


const Dashboard: NextPage = () => {
	return (
		<div>
			<MainNavbar></MainNavbar>
			<Container style={{height: '12000px'}}>
				<Row>
					<Col md="6">
						<h2>R RandNote</h2>
					</Col>
				</Row>

				<Row>
					<AssetsTable></AssetsTable>
				</Row>

				<Row>
					<WatchlistTable></WatchlistTable>
				</Row>
			</Container>
			<InFooter></InFooter>
		</div>
	);
};
export default Dashboard;
