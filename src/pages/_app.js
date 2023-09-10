import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/components/theme";
import { StoreProvider } from "@/stores";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import { useScrollRestoration } from "@/hooks";

export default function App({ Component, pageProps, router }) {
    const getLayout = Component.getLayout || ((page) => page);
    useScrollRestoration(router);

    return (
        <StoreProvider>
            <DefaultSeo {...SEO} />
            <ThemeProvider theme={defaultTheme}>
                {getLayout(<Component {...pageProps} />, pageProps)}
            </ThemeProvider>
        </StoreProvider>
    );
}
