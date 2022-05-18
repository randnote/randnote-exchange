import React from 'react';

// takes in the key of the storage variable and returns the value-object:
const GetLocalStorage = (key: any) => {
    if(localStorage.getItem(key) !==    null || undefined){
        let information: any = localStorage.getItem(key);
        let localstorageData: any = JSON.parse(information);
        return localstorageData;
    }else{
        throw Error("Local storage key is undefined");
    }
  
};


export const SetLocalStorage = (key: string, username: string, info: any) =>{
	localStorage.removeItem(key); // remove existing key 
	let data: any = "";
	if(key == "randnoteUser"){
		data = {
	      id: info.result.id,
	      institution_id: info.result.institution_id,
	      staffnumber: username
	    };
	}else {
        return Error("Storage key is undefined")
	}
    localStorage.setItem(key, JSON.stringify(data));
}

export const DeleteLocalStorage = (key: string) =>{
	localStorage.removeItem(key);
}



export default GetLocalStorage;