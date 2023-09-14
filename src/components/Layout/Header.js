/* eslint-disable @next/next/no-img-element */
import { IconMenu } from "@/components/Icons";
import SearchForm from "../SearchForm";
import clsx from "clsx";
import Menu from "./Menu";
import { useStore } from "@/stores";
import Link from "next/link";
import CloseButton from "../CloseButton";
import { useSwipesHoriziontal } from "@/hooks";
import { MENU } from "@/constant/menu";
import { COLOR_LOGO_URL, LOGO_NAME, WHITE_LOGO_URL } from "@/constant/default";

export default function Header({ isHomePage, property, api_url }) {
    const {
        openSidebar,
        setOpenSidebar,
        stickyHeader,
        openSearch,
        setOpenSearch,
        responsive,
    } = useStore();

    const drawRef = useSwipesHoriziontal({
        onLeftSwipe: () => {
            setOpenSidebar(false);
        },
    });

    const colorLogoUrl = property?.color_logo?.data?.attributes?.url
        ? api_url + property?.color_logo?.data?.attributes?.url
        : COLOR_LOGO_URL;
    const whiteLogoUrl = property?.white_logo?.data?.attributes?.url
        ? api_url + property?.white_logo?.data?.attributes?.url
        : WHITE_LOGO_URL;
    const colorLogoName =
        property?.color_logo?.data?.attributes?.name || LOGO_NAME;
    const whiteLogoName =
        property?.white_logo?.data?.attributes?.name || LOGO_NAME;

    return (
        <header id="header">
            <div
                className={clsx(
                    "flex flex-col absolute top-0 left-0 right-0 z-10 shadow-lg transition-all",
                    isHomePage ? "bg-transparent" : "bg-white",
                    {
                        "!fixed !bg-white animate-[stuckMoveDown_0.6s]":
                            stickyHeader,
                    }
                )}
            >
                <div className="relative container max-w-7xl mx-auto flex justify-center lg:justify-between items-stretch h-header px-3">
                    <div className="lg:hidden absolute top-0 left-0 h-header w-header flex items-center justify-center">
                        <button
                            onClick={() => setOpenSidebar(true)}
                            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/10"
                        >
                            <IconMenu width={20} height={20} />
                        </button>
                    </div>
                    <div className="shrink-0 mr-3 flex items-center">
                        <Link href={"/"} className="w-40">
                            <img
                                alt={colorLogoName}
                                src={colorLogoUrl}
                                className={clsx({ "lg:hidden": isHomePage })}
                            />
                            <img
                                alt={
                                    stickyHeader ? colorLogoName : whiteLogoName
                                }
                                src={stickyHeader ? colorLogoUrl : whiteLogoUrl}
                                className={
                                    isHomePage ? "hidden lg:block" : "hidden"
                                }
                            />
                        </Link>
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
                                "fixed top-0 left-0 z-30 w-72 h-full transition-all duration-300 transform -translate-x-full bg-sidebar text-white lg:text-black lg:bg-white shadow-lg lg:py-0 overflow-y-auto opacity-0 overscroll-contain":
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
                                src={"./images/18-design-cut-white.png"}
                            />
                        </Link>
                        <div className="absolute top-0 right-2 h-header flex items-center justify-center lg:hidden">
                            <CloseButton
                                onClick={() => setOpenSidebar(false)}
                            />
                        </div>
                        <Menu menu={property?.menu || MENU} />
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
                    <div className="lg:px-5 lg:py-3 bg-white rounded-lg divide-y w-full">
                        <SearchForm className="py-1" />
                    </div>
                </div>
            </div>
        </header>
    );
}
