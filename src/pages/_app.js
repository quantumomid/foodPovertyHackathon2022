import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Layout from "../components/layout/Layout";
import { theme } from "../theme/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
