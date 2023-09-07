import Header from "./Header";
import Footer from "./Footer";

export default function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
