import "lazysizes";
import { forwardRef } from "react";
import clsx from "clsx";

export const Img = ({ src, className, ...props }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            alt="18 Design"
            {...props}
            data-src={src || "/images/default-image.jpg"}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            className={clsx("lazyload", className || "")}
        />
    );
};

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
