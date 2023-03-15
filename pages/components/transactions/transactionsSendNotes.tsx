import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SendNotesModal = (props: any): any => {
	// Send notes modal:
	const [showModalTranscationNotes, setShowModalTransactionNotes] =
		useState<boolean>(false);
	const handleCloseTransactionNotes = () =>
		setShowModalTransactionNotes(false);

	const sendNotes = (data: any) => {
		
	};

	return "";
};

export default SendNotesModal;
