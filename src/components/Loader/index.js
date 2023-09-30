import clsx from "clsx";
import { IconLoading } from "../Icons";

function Loader({ className }) {
    return (
        <div
            className={clsx(
                "flex justify-center items-center",
                className || ""
            )}
        >
            <IconLoading width={50} height={50} />
        </div>
    );
}

export default Loader;
