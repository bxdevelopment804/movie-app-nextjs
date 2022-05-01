import '../styles/global.css';
import SearchResultsProvider from '../context/SearchResultsProvider';

export default function App({ Component, pageProps }) {
	return (
		<SearchResultsProvider>
			<Component {...pageProps} />
		</SearchResultsProvider>
	);
}
