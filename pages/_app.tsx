import "../styles/globals.scss";
import "../styles/mainGlobals.css";
import "../styles/breakpoints.scss";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
export default MyApp;
