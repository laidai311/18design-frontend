import Header from "./Header";
import Footer from "./Footer";
import FloatButton from "./FloatButton";
import { useEffect } from "react";
import {
    Modal as Modal2,
    ModalContent,
    ModalOverlay,
} from "../Styled/Layout/ContactForm";
import ContactForm from "../ContactForm";
import { css, styled } from "styled-components";
import { media } from "../theme";
import { IconXmark } from "../Icons";
import { useStore } from "@/stores";
import Modal from "../Modal";

export default function DefaultLayout({ children, menu }) {
    const { openContactForm, setOpenContactForm, isHomePage } = useStore();

    useEffect(() => {
        const sto = setTimeout(() => {
            setOpenContactForm(true);
        }, 8000);

        localStorage.openpages = Date.now();
        const onLocalStorageEvent = (e) => {
            if (e.key == "openpages") {
                // Listen if anybody else is opening the same page!
                localStorage.page_available = Date.now();
            }
            if (e.key == "page_available") {
                setOpenContactForm(false);
                if (sto) {
                    clearTimeout(sto);
                }
            }
        };
        window.addEventListener("storage", onLocalStorageEvent, false);
    }, []);

    return (
        <>
            <Header isHomePage={isHomePage} menu={menu} />
            <Main $transparent={isHomePage}>{children}</Main>
            <Footer onContactClick={() => setOpenContactForm(true)} />
            <FloatButton onContactClick={() => setOpenContactForm(true)} />
            <Modal
                open={openContactForm}
                onClose={() => setOpenContactForm(false)}
            >
                <div className={"relative bg-white p-7 rounded-xl"}>
                    <div className="absolute top-3 right-3">
                        <button
                            onClick={() => setOpenContactForm(false)}
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
                        <ContactForm
                            onClose={() => setOpenContactForm(false)}
                        />
                    </div>
                </div>
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
