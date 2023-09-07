import Header from "./Header";
import Footer from "./Footer";
import FloatButton from "./FloatButton";
import { useRef, useState } from "react";
import { Modal, ModalContent, ModalOverlay } from "../Styled/ContactForm";
import ContactForm from "./ContactForm";
import { useEventListener, useLockBodyScroll } from "@/hooks";

export default function DefaultLayout({ children }) {
    const [open, setOpen] = useState(false);
    const [once, setOnce] = useState(true);
    const sto = useRef();

    useLockBodyScroll(open);

    useEventListener("scroll", (e) => {
        if (window.outerHeight - window.scrollY < 300 && once) {
            sto.current = setTimeout(() => {
                setOpen(true);
            }, 1000);
            setOnce(false);
        } else {
            if (sto.current && once) {
                clearTimeout(sto.current);
                sto.current = undefined;
            }
        }
    });

    return (
        <>
            <Header />
            {children}
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
