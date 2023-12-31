import styled, { css } from "styled-components";
import { screens } from "@/components/theme";
import "lazysizes";

export const Container = styled.div`
    width: 100%;
    max-width: ${screens.xl};
    margin: 0 auto;
`;

export const Flex = styled.div`
    display: flex;
    ${(p) =>
        typeof p.$justify === "string" &&
        css`
            justify-content: ${p.$justify};
        `}
    ${(p) =>
        typeof p.$items === "string" &&
        css`
            align-items: ${p.$items};
        `}
  ${({ direction }) =>
        direction &&
        css`
            flex-direction: ${direction};
        `}
  ${({ wrap }) =>
        wrap &&
        css`
            flex-wrap: ${wrap};
        `}
  ${({ flow }) =>
        flow &&
        css`
            flex-flow: ${flow};
        `}
  ${({ content }) =>
        content &&
        css`
            align-content: ${content};
        `}
  ${({ gap }) =>
        gap &&
        css`
            gap: ${gap};
        `}
  ${({ rowGap }) =>
        rowGap &&
        css`
            row-gap: ${rowGap};
        `}
  ${({ columnGap }) =>
        columnGap &&
        css`
            column-gap: ${columnGap};
        `}
`;

export const FlexItem = styled.div`
    ${({ order }) =>
        order &&
        css`
            order: ${order};
        `}
    ${({ grow }) =>
        grow &&
        css`
            flex-grow: ${grow};
        `}
  ${({ shrink }) =>
        shrink &&
        css`
            flex-shrink: ${shrink};
        `}
  ${({ basis }) =>
        basis &&
        css`
            flex-basis: ${basis};
        `}
  ${({ flex }) =>
        flex &&
        css`
            flex: ${flex};
        `}
  ${({ self }) =>
        self &&
        css`
            align-self: ${self};
        `}
`;
