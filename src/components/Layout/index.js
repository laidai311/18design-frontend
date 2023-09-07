import Header from "./Header";
import Footer from "./Footer";
import FloatButton from "./FloatButton";
import { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalOverlay,
} from "../Styled/Layout/ContactForm";
import ContactForm from "./ContactForm";
import { useLockBodyScroll } from "@/hooks";
import { css, styled } from "styled-components";
import { media } from "../theme";
import { useRouter } from "next/router";

const Main = styled.main`
    min-height: 80vh;

    ${media.lg(css`
        padding-top: ${(p) => (p.isHomePage ? 0 : p.theme.headerHeight)};
    `)}
    padding-top: ${(p) =>
        p.isHomePage ? 0 : `calc(${p.theme.headerHeight} + 63px)`};
`;

export default function DefaultLayout({ children }) {
    const [open, setOpen] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true);
    const router = useRouter();

    useLockBodyScroll(open);

    useEffect(() => {
        const sto = setTimeout(() => {
            setOpen(true);
        }, 8000);

        localStorage.openpages = Date.now();
        const onLocalStorageEvent = (e) => {
            if (e.key == "openpages") {
                // Listen if anybody else is opening the same page!
                localStorage.page_available = Date.now();
            }
            if (e.key == "page_available") {
                setOpen(false);
                if (sto) {
                    clearTimeout(sto);
                }
            }
        };
        window.addEventListener("storage", onLocalStorageEvent, false);
    }, []);

    useEffect(() => {
        setIsHomePage(["/"].includes(window.location.pathname));
    }, [router.pathname]);

    return (
        <>
            <Header isHomePage={isHomePage} />
            <Main isHomePage={isHomePage}>{children}</Main>
            <FloatButton onContactClick={() => setOpen(true)} />
            <Modal open={open ? open : undefined}>
                <ModalOverlay
                    open={open ? open : undefined}
                    onClick={() => setOpen(false)}
                />
                <ModalContent open={open ? open : undefined}>
                    <ContactForm onClose={() => setOpen(false)} />
                </ModalContent>
            </Modal>
            <Footer onContactClick={() => setOpen(true)} />
        </>
    );
}
