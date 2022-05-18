import { useEffect } from "react";
import GetLocalStorage from "./localstorage";
import { useRouter } from "next/router";

// validate function thats added to every authenticable page on the website
const validate = () => {
	const router = useRouter();

	useEffect(() => {
		if (localStorage) {
			// if user is ALREADY validated:
			// if (GetLocalStorage("randnoteUser") !== null) {
			// 	router.push("/dashboard");
			// }

			// if user is NOT validated:
			if (GetLocalStorage("randnoteUser") === null) {
				router.push("/signin");
			}
		}
	}, []);
};

export default validate;
