import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, defaultTheme } from "@/components/theme";
import { StoreProvider } from "@/stores";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <StoreProvider>
            <GlobalStyle />
            <ThemeProvider theme={defaultTheme}>
                {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
        </StoreProvider>
    );
}
