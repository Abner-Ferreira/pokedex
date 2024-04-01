import PokeProvider from "@/contexts/PokeContexto";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <PokeProvider>

        <Component {...pageProps} />
      </PokeProvider>
    </>
  );
}
