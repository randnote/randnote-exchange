import { useState } from "react";
import { Alert, Button } from "react-bootstrap";

export type alertProps = {
	color: string;
	information: string;
};

const AlertDismissible = (props: alertProps) => {
	const [show, setShow] = useState(true);

	return (
		<>
			<Alert show={show} variant={props.color}>
				<div className="row">
					<div className="col-md-10">
						<p>{props.information}</p>
					</div>

					<div className="col-md-2">
						<Button
							onClick={() => setShow(false)}
							variant="outline-success"
						>
							X
						</Button>
					</div>
				</div>
			</Alert>

			{/* {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
		</>
	);
};

export default AlertDismissible ;
