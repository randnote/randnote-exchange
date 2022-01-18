import type { NextPage } from "next";
import styles from "./styles/infooter.module.css";

const footerClassName = `${styles.footer} page-footer font-small blue pt-4 `;

const InFooter = () => {
	return (
		<footer className={footerClassName}>
			<div className="container-fluid text-center text-md-left">
				<div className="row">something maybe here</div>
			</div>
			<div className="footer-copyright text-center py-3">
				© 2020 Copyright RANDNOTE(Open source):
			</div>
		</footer>
	);
};

export default InFooter;
