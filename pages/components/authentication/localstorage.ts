// takes in the key of the storage variable and returns the value-object:
const GetLocalStorage = (key: string) => {
    let item: any = localStorage.getItem(key)
	if ( item !== null || undefined) {
		let information: any = localStorage.getItem(key);
		let localstorageData: any = JSON.parse(information);
		return localstorageData;
	} else {
        return null
		// throw Error("Local storage key is undefined");
	}
};

export const SetLocalStorage = (key: string, info: any) => {
	localStorage.removeItem(key); // remove existing key
	let data: any = "";
	if (key == "randnoteUser") {
		data = {
			id: info.id,
			firstname: info.firstname,
			lastname: info.lastname,
			email: info.email,
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
