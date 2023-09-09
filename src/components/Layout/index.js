import Header from "./Header";
import Footer from "./Footer";
import FloatButton from "./FloatButton";
import { useEffect, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalOverlay,
} from "../Styled/Layout/ContactForm";
import ContactForm from "../ContactForm";
import { useLockBodyScroll } from "@/hooks";
import { css, styled } from "styled-components";
import { media } from "../theme";
import { useRouter } from "next/router";
import { IconXmark } from "../Icons";

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
        setIsHomePage(["/"].includes(router.pathname));
    }, [router.pathname]);

    return (
        <>
            <Header isHomePage={isHomePage} />
            <Main $transparent={isHomePage}>{children}</Main>
            <Footer onContactClick={() => setOpen(true)} />
            <FloatButton onContactClick={() => setOpen(true)} />
            <Modal $open={open}>
                <ModalOverlay $open={open} onClick={() => setOpen(false)} />
                <ModalContent $open={open}>
                    <div
                        className={
                            "relative bg-white p-7 rounded-xl max-h-screen overflow-y-auto"
                        }
                    >
                        <div className="absolute top-3 right-3">
                            <button
                                onClick={() => setOpen(false)}
                                className="p-1 rounded-full hover:bg-gray-100 text-gray-600"
                            >
                                <IconXmark width={24} height={24} />
                            </button>
                        </div>
                        <div className="w-full md:min-w-[450px] space-y-4 flex flex-col">
                            <h3 className="font-semibold uppercase text-center text-lg">
                                MIỄN PHÍ 100% <br /> PHÍ THIẾT KẾ NỘI THẤT
                            </h3>
                            <h4 className="uppercase text-center font-semibold">
                                TRONG DUY NHẤT HÔM NAY
                            </h4>
                            <ContactForm onClose={() => setOpen(false)} />
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}

const Main = styled.main`
    min-height: 80vh;

    ${media.lg(css`
        padding-top: ${(p) => (p.$transparent ? 0 : p.theme.headerHeight)};
    `)}
    padding-top: ${(p) => `calc(${p.theme.headerHeight} + 63px)`};
`;
