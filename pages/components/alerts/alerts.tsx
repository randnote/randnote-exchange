import { type } from "os";
import React,{useState} from "react";
import { Alert } from "reactstrap";
// import {Heading } from "react-bootstrap"
// all alerts are dismissable cards

export type alertProps = {
	color: string;
	information: string;
};

const DisplayAlert = (props: alertProps) => {
	return <Alert color={props.color}>{props.information}</Alert>;
};

  

export { DisplayAlert };
