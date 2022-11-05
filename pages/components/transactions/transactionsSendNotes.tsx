
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


const SendNotesModal  = () :any =>{

    // Send notes modal:
	const [showModalNotes, setShowModalNotes] = useState<boolean>(false);
	const handleCloseTransactionNotes = () => setShowModalNotes(false);
	const handleShowTransactionNotes = () => setShowModalNotes(true);

    const { register, handleSubmit } = useForm();

    const sendNotes = (data: any) =>{
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

	}

    return (
        <Modal show={handleShowTransactionNotes} onHide={handleCloseTransactionNotes}>
            <form  onSubmit={handleSubmit(sendNotes)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        You are about to send <i>NOTES</i> to another
                        address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <small>
                            Make sure that the address you have entered is
                            correct.
                        </small>
                    </FormGroup>

                    <FormGroup>
                        <Label for="">
                            <i>Notes</i>:
                        </Label>
                        <input
                            {...register("notes")}
                            type="text"
                            name="notes"
                            className="form-control"
                            placeholder="E.g 0.004 Notes"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label for="">
                            <i>Address</i>:
                        </Label>
                        <input
                            {...register("address")}
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="Copy paste in the addresss you want to send to"
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTransactionNotes}>
                        Close
                    </Button>
                    <Button variant="outline-success" type="submit" value="submit">
                        Send <i>NOTES</i>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );

}

export default SendNotesModal;