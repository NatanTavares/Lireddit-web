import { ChakraProvider } from "@chakra-ui/react";
import { createClient, Provider } from "urql";
import type { AppProps } from "next/app";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include",
    },
  });

  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
