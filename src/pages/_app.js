import "@/styles/globals.css";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: true,
            refetchOnReconnect: true,
            retry: 1,
            staleTime: "Infinity",
        },
    },
});

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                {getLayout(<Component {...pageProps} />)}
            </Hydrate>
        </QueryClientProvider>
    );
}
