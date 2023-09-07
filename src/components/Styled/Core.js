import { styled } from "styled-components";

export const ImageDefault = styled.img`
    width: 100%;
    height:auto;
`
export const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-right: 12px;
    padding-left: 12px;

    @media (min-width: 768px) {
        max-width: 720px;
    }
    @media (min-width: 992px) {
        max-width: 960px;
    }
    @media (min-width: 1200px) {
        max-width: 1140px;
    }
    @media (min-width: 1400px) {
        max-width: 1320px;
    }
   
    
    
`