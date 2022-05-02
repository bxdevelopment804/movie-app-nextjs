import SearchResultsProvider from '../context/SearchResultsProvider';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
	return (
		<SearchResultsProvider>
			<Component {...pageProps} />
		</SearchResultsProvider>
	);
}
