import type { NextPage } from "next";

const MainFooter = () => {
	return (
		<footer className="page-footer font-small blue pt-4 fixed-bottom">
			<div className="footer-copyright text-center py-3">
				Copyright © randnote.co.za
			</div>
		</footer>
	);
};

const NonStickFooter = () => {
	return (
		<footer className="page-footer font-small blue pt-4 ">
			<div className="footer-copyright text-center py-3">
				Copyright © randnote.co.za
			</div>
		</footer>
	);
};

export { MainFooter, NonStickFooter };
