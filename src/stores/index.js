import {
    useDetectKeyboard,
    useFetch,
    useLockBodyScroll,
    useMediaQuery,
    useRouteChangeStart,
    useViewportSize,
    useWindowEvent,
} from "@/hooks";
import { getMenu } from "@/utils";
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

    const defaultPage = useFetch("/pages?slug=mac-dinh", {});

    const menuItems = useFetch(
        "/menu-items",
        {
            method: "GET",
            headers: {
                Authorization:
                    "Basic " +
                    btoa(
                        process.env.USER_NAME + ":" + process.env.USER_PASSWORD
                    ),
            },
        },
        false,
        !defaultPage?.isLoading
    );

    const menu = getMenu(menuItems.data?.data);

    const formFieldData = useFetch(
        "/forms/1/field-filters",
        {
            method: "GET",
            headers: {
                Authorization:
                    "Basic " +
                    btoa(
                        process.env.FORM_API_KEY +
                            ":" +
                            process.env.FORM_API_SECRET
                    ),
            },
        },
        true,
        !defaultPage.isLoading
    );

    const formFields = formFieldData.data
        ? formFieldData.data?.data?.filter(
              (item) => "key" in item && typeof item?.key === "number"
          )
        : [];

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
                defaultPage: defaultPage.data?.data?.[0]?.meta_box,
                defaultPageLoading: defaultPage.isLoading,
                formFields,
                formfieldsLoading: formFieldData.isLoading,
                menu,
                menuLoading: menuItems.isLoading,
                site_name: process.env.SITE_NAME,
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
    defaultPage: {},
    defaultPageLoading: true,
    formFields: [],
    formfieldsLoading: true,
    menu: [],
    menuLoading: true,
    site_name: "",
});

export const useStore = () => useContext(StoreContext);
