import type { NextPage } from "next";
import { Container, Button, Row, Col } from "reactstrap";
import MainNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard: NextPage = () => {
	return (
		<div>
			<div className="card">
				<div className="card-title">About US</div>
				<div className="card-body">Randnote was created by Daniel Romeo Mamphekgo as a demonstration...</div>
			</div>
		</div>
	);
};
export default Dashboard;
