import { useState } from "react";
import { Button } from "@/components/UI";
import {
    IconChevronDown,
    IconHome,
    IconMenu,
    IconSearch,
} from "@/components/Icons";
import { useEventListener } from "@/hooks";
import {
    Inner,
    Main,
    LogoImg,
    LogoLink,
    NavList,
    NavItemLink,
    NavListChild,
    MenuWrap,
    NavItemButton,
    NavChild,
    Wrapper,
} from "@/components/Styled/Header";

export default function Header({}) {
    const [headerSticky, setHeaderSticky] = useState(false);

    useEventListener("scroll", (e) => {
        setHeaderSticky(window.scrollY > (headerSticky ? 0 : 90));
    });

    return (
        <Wrapper>
            <Main sticky={headerSticky ? headerSticky : undefined}>
                <Inner>
                    <MenuWrap>
                        <Button>
                            <IconMenu width={20} height={20} />
                        </Button>
                    </MenuWrap>
                    <LogoLink href={"/"}>
                        <LogoImg
                            alt={"logo"}
                            data-src={"./images/18-design-cut.png"}
                        />
                    </LogoLink>
                    <NavList>
                        <NavItemLink href={"/"}>
                            <IconHome
                                width={18}
                                height={18}
                                color={"#E6BC67"}
                            />
                        </NavItemLink>
                        <NavItemLink href={"/"}>Về chúng tôi</NavItemLink>
                        <NavListChild>
                            <NavItemLink href={"/"}>Dự án</NavItemLink>
                            <IconChevronDown width={14} />
                            <NavChild
                                aria-expanded="false"
                                className={"header-nav-popover"}
                            >
                                <NavItemLink href={"/"}>
                                    Sửa nhà trọn gói
                                </NavItemLink>
                                <NavItemLink href={"/"}>
                                    Xây nhà trọn gói
                                </NavItemLink>
                                <NavItemLink href={"/"}>
                                    Thi công nội thất
                                </NavItemLink>
                            </NavChild>
                        </NavListChild>
                        <NavListChild>
                            <NavItemLink href={"/"}>
                                Thiết kế nội thất
                            </NavItemLink>
                            <IconChevronDown width={14} />
                        </NavListChild>
                        <NavListChild>
                            <NavItemLink href={"/"}>
                                Thiết kế kiến trúc
                            </NavItemLink>
                            <IconChevronDown width={14} />
                        </NavListChild>
                        <NavListChild>
                            <NavItemLink href={"/"}>Tin tức</NavItemLink>
                            <IconChevronDown width={14} />
                        </NavListChild>
                        <NavItemLink href={"/"}>Liên hệ</NavItemLink>
                        <NavItemButton>
                            <IconSearch width={18} height={18} />
                        </NavItemButton>
                    </NavList>
                </Inner>
            </Main>
        </Wrapper>
    );
}
