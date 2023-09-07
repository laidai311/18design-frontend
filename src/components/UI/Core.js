import styled from "styled-components";
import "lazysizes";
import { forwardRef } from "react";

export const Img = styled.img.attrs(() => ({
    className: "lazyload",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=",
}))`
    display: inline-block;
`;

export const Form = forwardRef(({ onSubmit, ...props }, ref) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataArr = new FormData(e.target);
        const data = Object.fromEntries(dataArr);
        onSubmit?.(data, e);
    };
    return <form {...props} ref={ref} onSubmit={handleSubmit} />;
});

Form.displayName = "Form";
