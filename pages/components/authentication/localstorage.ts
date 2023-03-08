// takes in the key of the storage variable and returns the value-object:

export interface localstorageUserType {
	id: number;
	email: string;
	firstname: string;
	lastname: string;
}

const GetLocalStorage = (key: string) => {
	if (typeof window !== 'undefined') {
		let item: any = localStorage.getItem(key);
		if (item !== null || undefined) {
			let information: any = localStorage.getItem(key);
			let localstorageData: any = JSON.parse(information);
			return localstorageData;
		} else {
			return null;
			// throw Error("Local storage key is undefined");
		}
	}
	  
	
};

export const SetLocalStorage = (key: string, info: any) => {
	if (typeof window !== 'undefined') {

		localStorage.removeItem(key); // remove existing key
		let data: any = "";
		if (key == "randnoteUser") {
			data = {
				id: info.id,
				firstname: info.firstname,
				lastname: info.lastname,
				email: info.email,
			};

			localStorage.setItem(key, JSON.stringify(data));
		} else {
			return Error("Storage key is undefined");
		}
	}
};

export const DeleteLocalStorage = (key: string) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(key);
	}
	
};

export default GetLocalStorage;
