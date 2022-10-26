import SearchResultsProvider from '../context/SearchResultsProvider';
import TmdbIdProvider from '../context/TMDBIdProvider';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
	return (
		<TmdbIdProvider>
			<SearchResultsProvider>
				<Component {...pageProps} />
			</SearchResultsProvider>
		</TmdbIdProvider>
	);
}
