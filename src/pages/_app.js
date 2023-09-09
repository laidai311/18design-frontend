import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import {  defaultTheme } from "@/components/theme";
import { StoreProvider } from "@/stores";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <StoreProvider>
            <DefaultSeo {...SEO} />
            <ThemeProvider theme={defaultTheme}>
                {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
        </StoreProvider>
    );
}
