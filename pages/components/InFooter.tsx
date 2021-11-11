import type { NextPage } from "next";

const InFooter = () => {
	return (
		<footer style={styles} className="page-footer font-small blue pt-4 ">
			<div className="container-fluid text-center text-md-left">
				<div className="row">
					something maybe here
				</div>
			</div>
			<div className="footer-copyright text-center py-3">
				© 2020 Copyright RANDNOTE(Open source):
			</div>
		</footer>
	);
};

const styles: object = {
    position: "fixed",
    height: "100px",
    bottom: 0,
    width: "100%"
}

export default InFooter;
