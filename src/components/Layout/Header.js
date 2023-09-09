import { useState } from "react";
import {
    IconChevronDown,
    IconMenu,
    IconSearch,
    IconXmark,
} from "@/components/Icons";
import { useEventListener, useLockBodyScroll } from "@/hooks";
import {
    Wrapper,
    Main,
    Inner,
    OpenMenuWrap,
    LogoImg,
    LogoLink,
    Nav,
    NavList,
    NavItem,
    NavItemLink,
    NavItemWrap,
    NavChildList,
    NavChildItem,
    Drawer,
    NavSearchButton,
    CloseMenuWrap,
    DrawerOverlay,
    NavItemInput,
    NavIconHome,
    NavTextHome,
    SearchForm,
    SearchInput,
    SearchButton,
    SearchWrap,
} from "@/components/Styled/Layout/Header";
import { spacing } from "../theme";

export default function Header({ isHomePage }) {
    const [sticky, setSticky] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openSearch, openSetSearch] = useState(false);

    useLockBodyScroll(openSidebar);

    useEventListener("scroll", (e) => {
        setSticky(window.scrollY > (sticky ? 0 : 90));
    });

    return (
        <>
            <Wrapper id="header">
                <Main $sticky={sticky}>
                    <Inner>
                        <OpenMenuWrap>
                            <button onClick={() => setOpenSidebar(true)}>
                                <IconMenu width={20} height={20} />
                            </button>
                        </OpenMenuWrap>
                        <LogoLink href={"/"}>
                            <LogoImg
                                alt={"logo"}
                                data-src={"./images/18-design-cut.png"}
                            />
                        </LogoLink>
                        <DrawerOverlay
                            $open={openSidebar}
                            onClick={() => {
                                setOpenSidebar(false);
                            }}
                        >
                            <CloseMenuWrap hidden={!openSidebar}>
                                <button onClick={() => setOpenSidebar(false)}>
                                    <IconXmark width={24} height={24} />
                                </button>
                            </CloseMenuWrap>
                        </DrawerOverlay>
                        <Drawer
                            $open={openSidebar}
                            $sticky={sticky}
                            $transparent={isHomePage}
                        >
                            <Nav>
                                <NavList>
                                    <NavItem>
                                        <NavItemLink href="/">
                                            <NavIconHome
                                                width={spacing["4.5"]}
                                                height={spacing["4.5"]}
                                            />
                                            <NavTextHome>Trang chủ</NavTextHome>
                                        </NavItemLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavItemLink href="/gioi-thieu">
                                            Về chúng tôi
                                        </NavItemLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavItemWrap htmlFor="open-1">
                                            <span>Dự án</span>
                                            <IconChevronDown width={14} />
                                        </NavItemWrap>
                                        <NavItemInput id="open-1" />
                                        <NavChildList $sticky={sticky}>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Sửa nhà trọn gói
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Xây nhà trọn gói
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thi công nội thất
                                                </NavItemLink>
                                            </NavChildItem>
                                        </NavChildList>
                                    </NavItem>
                                    <NavItem>
                                        <NavItemWrap htmlFor="open-2">
                                            <span>Thiết kế nội thất</span>
                                            <IconChevronDown width={14} />
                                        </NavItemWrap>
                                        <NavItemInput id="open-2" />
                                        <NavChildList $sticky={sticky}>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất biệt thự
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất nhà phố
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất chung cư
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất văn phòng
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất khách sạn
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất nhà hàng
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất quán Cafe
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế nội thất spa
                                                </NavItemLink>
                                            </NavChildItem>
                                        </NavChildList>
                                    </NavItem>
                                    <NavItem>
                                        <NavItemWrap htmlFor="open-3">
                                            <span>Thiết kế kiến trúc</span>
                                            <IconChevronDown width={14} />
                                        </NavItemWrap>
                                        <NavItemInput id="open-3" />
                                        <NavChildList $sticky={sticky}>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế kiến trúc biệt thự
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Thiết kế kiến trúc nhà phố
                                                </NavItemLink>
                                            </NavChildItem>
                                        </NavChildList>
                                    </NavItem>
                                    <NavItem>
                                        <NavItemWrap htmlFor="open-4">
                                            <span>Tin tức</span>
                                            <IconChevronDown width={14} />
                                        </NavItemWrap>
                                        <NavItemInput id="open-4" />
                                        <NavChildList $sticky={sticky}>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that">
                                                    Chia sẻ kiến thức
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that/hoan-thien-noi-that-chung-cu">
                                                    Tuyển dụng kinh doanh
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that/hoan-thien-noi-that-chung-cu">
                                                    Tuyển dụng giám sát
                                                </NavItemLink>
                                            </NavChildItem>
                                            <NavChildItem>
                                                <NavItemLink href="/thiet-ke-noi-that/hoan-thien-noi-that-chung-cu">
                                                    Tuyển dụng thiết kế
                                                </NavItemLink>
                                            </NavChildItem>
                                        </NavChildList>
                                    </NavItem>
                                    <NavItem>
                                        <NavItemLink href="/lien-he">
                                            Liên hệ
                                        </NavItemLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavSearchButton
                                            onClick={() =>
                                                openSetSearch(!openSearch)
                                            }
                                        >
                                            <IconSearch
                                                width={18}
                                                height={18}
                                            />
                                        </NavSearchButton>
                                    </NavItem>
                                </NavList>
                            </Nav>
                        </Drawer>
                    </Inner>
                    <SearchWrap $open={openSearch}>
                        <SearchForm
                            onSubmit={(value) => {
                                console.log(value);
                            }}
                        >
                            <SearchInput
                                name="search"
                                placeholder="Bạn đang tìm kiếm gì ...?"
                                inputMode="search"
                                autoCapitalize="off"
                            />
                            <SearchButton type="submit">
                                <IconSearch width={18} height={18} />
                            </SearchButton>
                        </SearchForm>
                    </SearchWrap>
                </Main>
            </Wrapper>
        </>
    );
}
