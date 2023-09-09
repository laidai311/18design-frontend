import { styled } from "styled-components";
import { Container } from "../Styled";
import { Img } from "../UI";

const About = styled.div`
    padding-top: 50px;

    & h2 {
        font-size: 28px;
        text-transform: uppercase;
        margin-bottom: 20px;
    }

    & h3 {
        text-align: center;
        font-size: 24px;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    & h4 {
        font-size: 24px;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    & p {
        margin-bottom: 20px;
        font-weight: 300;
    }

    & ul {
        list-style: inside;
        padding-left: 10px;

        & li {
            font-weight: 300;
            margin-bottom: 10px;
        }
    }
    & img {
        margin-bottom: 20px;
    }
`;

export function AboutUs({ title, content }) {
    return (
        <About>
            <Container>
                <h2>{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </Container>
        </About>
    );
}
