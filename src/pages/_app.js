import "../styles/globals.css";
import "nprogress/nprogress.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import { DefaultSeo } from "next-seo";
import { defaultTheme } from "@/components/theme";
import { StoreProvider } from "@/stores";
import { ThemeProvider } from "styled-components";
import { useScrollRestoration } from "@/hooks";
import nProgress from "nprogress";
import Router from "next/router";
import SEO from "../../next-seo.config";

export default function App({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || ((page) => page);

  useScrollRestoration(router);

  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  nProgress.configure({
    template:
      '<div className="bar !bg-primary !border-b-[2px] !border-primary" role="bar"><div className="peg !bg-primary"></div></div>',
    easing: "ease",
    speed: 300,
    minimum: 0.1,
  });

  return (
    <StoreProvider {...pageProps}>
      <DefaultSeo
        {...SEO}
        additionalMetaTags={[
          {
            name: "viewport",
            content:
              "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no",
          },
        ]}
      />
      <ThemeProvider theme={defaultTheme}>
        {getLayout(<Component {...pageProps} />, pageProps)}
      </ThemeProvider>
    </StoreProvider>
  );
}
