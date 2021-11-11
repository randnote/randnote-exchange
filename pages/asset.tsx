import type { NextPage } from "next";
import { Container, Button, Row, Col } from "reactstrap";
import MainNavbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard: NextPage = () => {
	return (
		<div>
			show the randnote graph here....
			<div className="card">
				<div className="card-title">Overview</div>
				<div className="card-body">icon-link-here Whitepaper</div>
			</div>
			<p>a buy sellt table on the side</p>
		</div>
	);
};
export default Dashboard;
