import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";
import "nprogress/nprogress.css";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/components/theme";
import { StoreProvider } from "@/stores";
import SEO from "../../next-seo.config";
import { DefaultSeo } from "next-seo";
import { useScrollRestoration } from "@/hooks";
import nProgress from "nprogress";
import Router from "next/router";

export default function App({ Component, pageProps, router }) {
    const getLayout = Component.getLayout || ((page) => page);
    useScrollRestoration(router);

    Router.events.on("routeChangeStart", nProgress.start);
    Router.events.on("routeChangeError", nProgress.done);
    Router.events.on("routeChangeComplete", nProgress.done);

    nProgress.configure({
        template:
            '<div class="bar !bg-primary !border-b-[2px] !border-primary" role="bar"><div class="peg !bg-primary"></div></div>',
        easing: "ease",
        speed: 300,
        minimum: 0.1,
    });

    return (
        <StoreProvider>
            <DefaultSeo {...SEO} />
            <ThemeProvider theme={defaultTheme}>
                {getLayout(<Component {...pageProps} />, pageProps)}
            </ThemeProvider>
        </StoreProvider>
    );
}
