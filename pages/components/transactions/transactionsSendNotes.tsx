import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Card, Modal, Button } from "react-bootstrap";
import Axios from "axios";
import { AlertDismissible } from "../alerts/dismissableAlerts";
import Router, { useRouter } from "next/router";
import GetLocalStorage from "../authentication/localstorage";
import { localstorageUserType } from "../authentication/localstorage";
import { useForm } from "react-hook-form";
import { FormGroup, Label } from "reactstrap";
import socketIOClient from "socket.io-client";
import { transcode } from "buffer";
const ENDPOINT = "http://127.0.0.1:8024";

const SendNotesModal = (props: any): any => {
	// Send notes modal:
	const [showModalTranscationNotes, setShowModalTransactionNotes] =
		useState<boolean>(false);
	const handleCloseTransactionNotes = () =>
		setShowModalTransactionNotes(false);
	const handleShowTransactionNotes = () => setShowModalTransactionNotes(true);

	const { register, handleSubmit } = useForm();

	const sendNotes = (data: any) => {
		// handleCloseNotes() // close the modal
		// const callApi = async () => {
		// 	let info: any = await GetLocalStorage(
		// 		"randnoteUser"
		// 	); // this; because we need the logged in users ID
		// 	info.privateKey = privateKey; // add keys to the objects
		// 	info.publicKey = publicKey;
		// 	console.log(info)
		// console.log(data)
		// now we use these keys to get the notes balance in the blockchain:
		// 	Axios.get(
		// 		`http://localhost:8033/balance/${res.data[0].publicKey}`
		// 	)
		// 		.then((res) => {
		// 			if (res.status == 200) {
		// 				// console.log(res.data.balance);
		// 				setNotesBalance(res.data.balance);
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			console.log(err);
		// 		});
		// })
		// .catch((err) => {
		// 	console.log(err);
		// });
	};

	return "";
};

export default SendNotesModal;
