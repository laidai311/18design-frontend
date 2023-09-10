import clsx from "clsx";
import { IconXmark } from "../Icons";

function CloseButton({ className, ...props }) {
    return (
        <button
            {...props}
            className={clsx(
                "w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/10 text-white",
                className || ""
            )}
        >
            <IconXmark width={24} height={24} />
        </button>
    );
}

export default CloseButton;
