import type { NextPage } from "next";

const MainFooter = () => {
	return (
		<footer className="page-footer font-small blue pt-4">
			<div className="container-fluid text-center text-md-left">
				<div className="row">
					<div className="col-md-6 mt-md-0 mt-3">
						<h5 className="text-uppercase"></h5>
						<p>
							Randnote logo and randnote is not an official
							service provider
						</p>
					</div>
					<hr className="clearfix w-100 d-md-none pb-3" />
					<div className="col-md-3 mb-md-0 mb-3">
						<h5 className="text-uppercase">MORE</h5>
						<ul className="list-unstyled">
							<li>
								<a href="#!">Whitepaper</a>
							</li>
							<li>
								<a href="#!">About Us</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="footer-copyright text-center py-3">
				© 2020 Copyright RANDNOTE(Open source):
			</div>
		</footer>
	);
};

export default MainFooter;
