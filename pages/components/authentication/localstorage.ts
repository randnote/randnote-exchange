import React from "react";

// takes in the key of the storage variable and returns the value-object:
const GetLocalStorage = (key: any) => {
	if (localStorage.getItem(key) !== null || undefined) {
		let information: any = localStorage.getItem(key);
		let localstorageData: any = JSON.parse(information);
		return localstorageData;
	} else {
		throw Error("Local storage key is undefined");
	}
};

export const SetLocalStorage = (key: string,  info: any) => {
	localStorage.removeItem(key); // remove existing key
	let data: any = "";
	if (key == "randnoteUser") {
        console.log(info)
		data = {
			id: info.id,
            firstname: info.firstname,
            lastname : info.lastname,
            email: info.email
		};
	} else {
		return Error("Storage key is undefined");
	}
	localStorage.setItem(key, JSON.stringify(data));
};

export const DeleteLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export default GetLocalStorage;
