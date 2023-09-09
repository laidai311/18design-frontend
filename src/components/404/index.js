import { css, styled } from "styled-components";
import { Container } from "../Styled/Common";
import { media } from "../theme";

export default function Component404({ message }) {
    return (
        <Container>
            <View404Styled>
                <div className="text">404</div>
                <div className="title">{message || ""}</div>
            </View404Styled>
        </Container>
    );
}

const View404Styled = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 24px;

    ${media.md(css`
        flex-direction: row;
    `)}

    .text {
        font-size: 6em;
        font-weight: bold;
        opacity: 0.3;
    }

    .title {
        text-transform: uppercase;
        margin: 0 0 20px;
        border-bottom: 2px solid #bd8b1b;
        line-height: 35px;
        position: relative;
        font-size: 20px;
    }
`;
