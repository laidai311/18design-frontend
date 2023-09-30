import { cloneElement } from "react";
import { IconChevronDown, IconHome, IconSearch } from "../Icons";
import { MENU } from "@/constant/menu";
import { range } from "@/utils";
import { useRouter } from "next/router";
import { useStore } from "@/stores";
import clsx from "clsx";
import Link from "next/link";

const SubMenuItem = ({
    children,
    className,
    sub_menu,
    title,
    url,
    target,
    ...props
}) => {
    const { responsive, openSubMenu, setOpenSubMenu, pathNameDynamic } =
        useStore();
    const router = useRouter();

    const open = openSubMenu?.[url];

    const handleOpen = (value) => {
        setOpenSubMenu({ [url]: value });
    };

    return (
        <li
            className={clsx(
                "relative lg:px-2 hover:bg-black/5 lg:hover:bg-transparent transition-colors",
                {
                    "bg-black/5 lg:bg-transparent":
                        router.pathname === url || pathNameDynamic === url,
                }
            )}
            onMouseEnter={() => responsive.lg && handleOpen(true)}
            onMouseLeave={() => responsive.lg && handleOpen(false)}
        >
            <div
                className={clsx(
                    "lg:h-full flex items-center justify-between lg:justify-start group lg:-mr-2",
                    className || ""
                )}
                {...props}
            >
                {children}
                <button
                    onClick={() => handleOpen(!open)}
                    className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-black/5 lg:hover:bg-transparent lg:group-hover:text-hover mr-2 lg:mr-0"
                >
                    <div
                        className={clsx("transition-transform duration-300", {
                            "rotate-180": open,
                        })}
                    >
                        <IconChevronDown width={14} />
                    </div>
                </button>
            </div>
            {Array.isArray(sub_menu) && sub_menu?.length ? (
                <MenuItems
                    items={sub_menu}
                    className={clsx(
                        "bg-black/5 lg:bg-white lg:text-initial font-normal text-sm pointer-events-none transition-all lg:transition-transform ease-out opacity-0 lg:translate-y-2 h-0",
                        {
                            "pointer-events-auto opacity-100 lg:!translate-y-0 h-auto lg:px-1 py-1":
                                open,
                        },
                        {
                            "absolute left-0 top-full w-64 rounded-lg shadow-lg":
                                responsive.lg,
                        }
                    )}
                />
            ) : null}
        </li>
    );
};

const MenuItems = ({ items, hasHome, hasSearch, ...props }) => {
    const { openSearch, setOpenSearch, pathNameDynamic } = useStore();
    const router = useRouter();

    return Array.isArray(items) ? (
        <ul
            className="flex lg:flex-wrap items-stretch flex-col lg:flex-row divide-y lg:divide-y-0 uppercase lg:font-medium"
            {...props}
        >
            {hasHome ? (
                <li
                    className={clsx(
                        "lg:px-2 hover:bg-black/5 lg:hover:bg-transparent transition-colors",
                        {
                            "bg-black/5 lg:bg-transparent":
                                router.pathname === "/",
                        }
                    )}
                >
                    <Link
                        href="/"
                        className={clsx(
                            "grow h-full flex items-center lg:hover:text-hover px-5 lg:px-0 py-3 lg:py-2",
                            { "lg:!text-hover": router.pathname === "/" }
                        )}
                    >
                        <IconHome
                            width={18}
                            height={18}
                            className="hidden lg:block"
                        />
                        <span className="lg:hidden">Trang chủ</span>
                    </Link>
                </li>
            ) : null}
            {items.map((itm, idx) =>
                cloneElement(
                    Array.isArray(itm?.sub_menu) && itm?.sub_menu?.length ? (
                        <SubMenuItem {...itm} />
                    ) : (
                        <li
                            className={clsx(
                                "lg:px-2 hover:bg-black/5 lg:hover:bg-transparent transition-colors",
                                {
                                    "bg-black/5 lg:bg-transparent":
                                        router.pathname === itm?.url ||
                                        pathNameDynamic === itm?.url,
                                }
                            )}
                        />
                    ),
                    { key: idx },
                    <Link
                        href={itm?.url || "/#"}
                        target={itm?.target || null}
                        className={clsx(
                            "transition-colors grow h-full flex items-center lg:hover:text-hover px-5 lg:px-0 py-3 lg:py-2",
                            {
                                "lg:!text-hover":
                                    router.pathname === itm?.url ||
                                    pathNameDynamic === itm?.url,
                            }
                        )}
                    >
                        <span className="truncate">{itm?.title || ""}</span>
                    </Link>
                )
            )}
            {hasSearch ? (
                <li className="lg:px-2 hidden lg:block">
                    <button
                        onClick={() => setOpenSearch(!openSearch)}
                        className="h-full flex items-center hover:text-hover py-2 px-2"
                    >
                        <IconSearch width={18} height={18} />
                    </button>
                </li>
            ) : null}
        </ul>
    ) : null;
};

function Menu() {
    const { menu, menuLoading } = useStore();

    return menuLoading ? (
        <div class="animate-pulse flex space-x-2 items-stretch">
            <div className="flex items-center">
                <div class="rounded-lg bg-black/5 h-5 w-5"></div>
            </div>
            {range(1, 7).map((key) => (
                <div key={key} className="flex items-center">
                    <div class="rounded-lg bg-white/10 h-5 w-32"></div>
                </div>
            ))}
        </div>
    ) : (
        <MenuItems items={menu || MENU} hasHome hasSearch />
    );
}

export default Menu;
