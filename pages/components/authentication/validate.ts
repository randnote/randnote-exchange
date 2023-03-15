import { useEffect, useState } from "react";
import GetLocalStorage from "./localstorage";
import { useRouter } from "next/router";

// validate function thats added to every authenticable page on the website
const Validate = () => {
	const router = useRouter();

	useEffect(() => {
		if (localStorage) {
			// if user is NOT validated:
			if (GetLocalStorage("randnoteUser") === null) {
				router.push("/signin");
			}
		}
	}, []);
};

// const checkLocalStorage  = () =>{
// 	const router = useRouter();
// 	const [auth, setAuth] = useState(false);

// 	useEffect(() => {
// 		if (localStorage) {
// 			if (GetLocalStorage("randnoteUser") === null) {
// 				setAuth(false);
// 			}
// 		}
// 	}, []);
// }

export default Validate;
