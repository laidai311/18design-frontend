/* eslint-disable @next/next/no-img-element */
import { COLOR_LOGO_URL, LOGO_NAME, WHITE_LOGO_URL } from "@/constant/default";
import { IconMenu } from "@/components/Icons";
import { useStore } from "@/stores";
import { useSwipesHoriziontal } from "@/hooks";
import CloseButton from "../CloseButton";
import clsx from "clsx";
import Link from "next/link";
import Menu from "./Menu";
import SearchForm from "../SearchForm";
import Loader from "../Loader";

export default function Header({ isHomePage }) {
    const {
        openSidebar,
        setOpenSidebar,
        stickyHeader,
        openSearch,
        setOpenSearch,
        responsive,
        defaultPage,
        defaultPageLoading,
    } = useStore();

    const drawRef = useSwipesHoriziontal({
        onLeftSwipe: () => {
            setOpenSidebar(false);
        },
    });

    const colorLogoUrl = defaultPage?.color_logo?.full_url || COLOR_LOGO_URL;
    const whiteLogoUrl = defaultPage?.white_logo?.full_url || WHITE_LOGO_URL;
    const colorLogoName = defaultPage?.color_logo?.name || LOGO_NAME;
    const whiteLogoName = defaultPage?.white_logo?.name || LOGO_NAME;

    return (
        <header id="header">
            <div
                className={clsx(
                    "flex flex-col absolute top-0 left-0 right-0 z-10 shadow-lg transition-all",
                    isHomePage
                        ? "bg-header lg:bg-transparent"
                        : "bg-header text-white",
                    {
                        "!fixed !bg-header text-white animate-[stuckMoveDown_0.6s]":
                            stickyHeader,
                    }
                )}
            >
                <div className="relative container max-w-7xl mx-auto flex justify-start lg:justify-between items-stretch h-header px-3">
                    <div className="lg:hidden absolute top-0 right-0 h-header w-header flex items-center justify-center">
                        <button
                            onClick={() => setOpenSidebar(true)}
                            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/10 text-white"
                        >
                            <IconMenu width={20} height={20} />
                        </button>
                    </div>
                    <div className="shrink-0 mr-3 flex items-center">
                        {defaultPageLoading ? (
                            <Loader />
                        ) : (
                            <Link href={"/"} className="w-40 ml-3 lg:ml-0">
                                <img
                                    alt={colorLogoName}
                                    src={colorLogoUrl}
                                    className={clsx({
                                        "lg:hidden": isHomePage,
                                    })}
                                />
                                <img
                                    alt={
                                        stickyHeader
                                            ? colorLogoName
                                            : whiteLogoName
                                    }
                                    src={
                                        stickyHeader
                                            ? colorLogoUrl
                                            : whiteLogoUrl
                                    }
                                    className={
                                        isHomePage
                                            ? "hidden lg:block"
                                            : "hidden"
                                    }
                                />
                            </Link>
                        )}
                    </div>
                    <div
                        onClick={() => setOpenSidebar(false)}
                        className={clsx(
                            "fixed inset-0 pointer-events-none bg-black/40 opacity-0 transition-opacity",
                            {
                                "pointer-events-auto opacity-100": openSidebar,
                            }
                        )}
                    />
                    <div
                        ref={drawRef}
                        className={clsx(
                            "flex items-stretch flex-col lg:flex-row",
                            {
                                "fixed top-0 left-0 z-30 w-72 h-full transition-all duration-300 transform -translate-x-full bg-sidebar text-white lg:text-black lg:bg-header shadow-lg lg:py-0 overflow-y-auto opacity-0 overscroll-contain":
                                    !responsive.lg,
                            },
                            { "!translate-x-0 opacity-100": openSidebar },
                            { "lg:text-white": isHomePage && !stickyHeader }
                        )}
                    >
                        <Link
                            href={"/"}
                            className="w-40 h-header lg:hidden px-5 flex items-center"
                        >
                            <img
                                alt={"logo-white"}
                                src={
                                    whiteLogoUrl ||
                                    "./images/18-design-cut-white.png"
                                }
                            />
                        </Link>
                        <div className="absolute top-0 right-2 h-header flex items-center justify-center lg:hidden">
                            <CloseButton
                                onClick={() => setOpenSidebar(false)}
                            />
                        </div>
                        <Menu />
                    </div>
                </div>
                <div
                    className={clsx(
                        "transition-all opacity-0 backdrop-blur-md  bg-slate-900/25 fixed inset-0 z-50 pointer-events-none",
                        { "!pointer-events-auto opacity-100": openSearch }
                    )}
                    onClick={() => setOpenSearch(false)}
                >
                    <div className="absolute top-5 right-5">
                        <CloseButton onClick={() => setOpenSearch(false)} />
                    </div>
                </div>
                <div
                    className={clsx(
                        "transition-all py-2 px-3 overflow-hidden lg:p-0 lg:h-0 border-t lg:border-t-0",
                        {
                            "fixed top-32 left-1/2 -translate-x-1/2 z-50 !h-auto transition-none w-full max-w-screen-sm":
                                openSearch,
                        }
                    )}
                >
                    <div className="lg:px-5 lg:py-3 bg-header rounded-lg divide-y w-full">
                        <SearchForm className="py-1" open={openSearch} />
                    </div>
                </div>
            </div>
        </header>
    );
}
