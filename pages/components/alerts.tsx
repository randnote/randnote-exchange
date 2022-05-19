import { type } from "os";
import React from "react";
import { Alert } from 'reactstrap';
// all alerts are dismissable cards



export type alertProps = {
	color: string,
	information: string
}

const DisplayAlert = (props: alertProps) => {
	return (
		<Alert color={props.color}>
			{props.information}
	  </Alert>
	);
};

export { DisplayAlert };
