import {
    useDetectKeyboard,
    useLockBodyScroll,
    useMediaQuery,
    useRouteChangeStart,
    useViewportSize,
    useWindowEvent,
} from "@/hooks";
import { useRouter } from "next/router";
import { createContext, useContext, useState } from "react";

export const StoreProvider = (props) => {
    // bật tắt sub menu
    const [openSubMenu, setOpenSubMenu] = useState({});
    // bật tắt sidebar
    const [openSidebar, setOpenSidebar] = useState(false);
    // bât sticky header
    const [stickyHeader, setStickyHeader] = useState(false);
    // bật tìm kiếm
    const [openSearch, setOpenSearch] = useState(false);
    // bật from liên hệ
    const [openContactForm, setOpenContactForm] = useState(false);

    const router = useRouter();
    const md = useMediaQuery("(min-width: 768px)");
    const lg = useMediaQuery("(min-width: 1024px)");
    const isDectectKeyboard = useDetectKeyboard();
    const viewport = useViewportSize(() => {
        // window resize
        if (typeof window !== "undefined" && !isDectectKeyboard) {
            document.documentElement.style.height = window.innerHeight + "px";
            document.documentElement.style.setProperty(
                "--window-height",
                window.innerHeight + "px"
            );
        }
        setOpenSidebar(false);
        setOpenSearch(false);
    });
    // khi router thay đổi
    useRouteChangeStart(() => {
        if (lg) setOpenSubMenu({});
        setOpenSidebar(false);
    });
    // khóa cuộn body
    useLockBodyScroll(openSidebar || openSearch || openContactForm);
    // sự kiện cuộn window
    useWindowEvent("scroll", () => {
        setStickyHeader(window.scrollY > (stickyHeader ? 0 : 90));
    });
    // sự kiện nhấn phím
    useWindowEvent("keydown", (e) => {
        if (e.key === "Escape") {
            setOpenSearch(false);
        }
    });

    const pathNameDynamic = router.query?.page_type
        ? "/" + router.query.page_type
        : null;

    const isHomePage = router.pathname === "/";

    return (
        <StoreContext.Provider
            value={{
                responsive: { md, lg },
                viewport,
                isDectectKeyboard,
                openSubMenu,
                setOpenSubMenu,
                openSidebar,
                setOpenSidebar,
                stickyHeader,
                setStickyHeader,
                openSearch,
                setOpenSearch,
                pathNameDynamic,
                openContactForm,
                setOpenContactForm,
                isHomePage,
            }}
            {...props}
        />
    );
};

export const StoreContext = createContext({
    responsive: { md: true, lg: true },
    viewport: { width: 1280, height: 720 },
    isDectectKeyboard: false,
    openSubMenu: {},
    setOpenSubMenu() {},
    openSidebar: false,
    setOpenSidebar() {},
    stickyHeader: false,
    setStickyHeader() {},
    openSearch: false,
    setOpenSearch() {},
    pathNameDynamic: "",
    openContactForm: {},
    setOpenContactForm() {},
    isHomePage: true,
});

export const useStore = () => useContext(StoreContext);
