import { useState } from "react";
import { Button } from "@/components/UI";
import {
    IconArrowDown3,
    IconHome,
    IconMenu,
    IconSearch,
} from "@/components/Icons";
import { useEventListener } from "@/hooks";
import {
    HeaderInner,
    HeaderMain,
    HeaderLogoImg,
    HeaderLogoLink,
    HeaderNavWrapper,
    HeaderNavLink,
    HeaderNavLinks,
    HeaderIconMenu,
    HeaderNavButton,
    HeaderNavPopover,
    HeaderContainer,
} from "@/components/Styled/Header";

export default function Header({}) {
    const [headerSticky, setHeaderSticky] = useState(false);

    useEventListener("scroll", (e) => {
        setHeaderSticky(window.scrollY > (headerSticky ? 0 : 90));
    });

    return (
        <HeaderContainer>
            <HeaderMain sticky={headerSticky ? headerSticky : undefined}>
                <HeaderInner>
                    <HeaderIconMenu>
                        <Button>
                            <IconMenu width={20} height={20} />
                        </Button>
                    </HeaderIconMenu>
                    <HeaderLogoLink href={"/"}>
                        <HeaderLogoImg
                            alt={"logo"}
                            data-src={"./images/18-design-cut.png"}
                        />
                    </HeaderLogoLink>
                    <HeaderNavWrapper>
                        <HeaderNavLink href={"/"}>
                            <IconHome
                                width={18}
                                height={18}
                                color={"#E6BC67"}
                            />
                        </HeaderNavLink>
                        <HeaderNavLink href={"/"}>Về chúng tôi</HeaderNavLink>
                        <HeaderNavLinks>
                            <HeaderNavLink href={"/"}>Dự án</HeaderNavLink>
                            <IconArrowDown3 width={14} />
                            <HeaderNavPopover
                                aria-expanded="false"
                                className={"header-nav-popover"}
                            >
                                <HeaderNavLink href={"/"}>
                                    Sửa nhà trọn gói
                                </HeaderNavLink>
                                <HeaderNavLink href={"/"}>
                                    Xây nhà trọn gói
                                </HeaderNavLink>
                                <HeaderNavLink href={"/"}>
                                    Thi công nội thất
                                </HeaderNavLink>
                            </HeaderNavPopover>
                        </HeaderNavLinks>
                        <HeaderNavLinks>
                            <HeaderNavLink href={"/"}>
                                Thiết kế nội thất
                            </HeaderNavLink>
                            <IconArrowDown3 width={14} />
                        </HeaderNavLinks>
                        <HeaderNavLinks>
                            <HeaderNavLink href={"/"}>
                                Thiết kế kiến trúc
                            </HeaderNavLink>
                            <IconArrowDown3 width={14} />
                        </HeaderNavLinks>
                        <HeaderNavLinks>
                            <HeaderNavLink href={"/"}>Tin tức</HeaderNavLink>
                            <IconArrowDown3 width={14} />
                        </HeaderNavLinks>
                        <HeaderNavLink href={"/"}>Liên hệ</HeaderNavLink>
                        <HeaderNavButton>
                            <IconSearch width={18} height={18} />
                        </HeaderNavButton>
                    </HeaderNavWrapper>
                </HeaderInner>
            </HeaderMain>
        </HeaderContainer>
    );
}
