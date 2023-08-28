import { css } from "styled-components";
import { screens } from "@/components/theme/screens";

export const media = {
    xs: (inner) => css`
        @media (min-width: ${screens.xs}) {
            ${inner};
        }
    `,
    sm: (inner) => css`
        @media (min-width: ${screens.sm}) {
            ${inner};
        }
    `,
    md: (inner) => css`
        @media (min-width: ${screens.md}) {
            ${inner};
        }
    `,
    lg: (inner) => css`
        @media (min-width: ${screens.lg}) {
            ${inner};
        }
    `,
    xl: (inner) => css`
        @media (min-width: ${screens.xl}) {
            ${inner};
        }
    `,
    "2xl": (inner) => css`
        @media (min-width: ${screens["2xl"]}) {
            ${inner};
        }
    `,
};

/**
 *  ${media.sm(css'
 *    flex-direction: column;
 *  ')
 */
