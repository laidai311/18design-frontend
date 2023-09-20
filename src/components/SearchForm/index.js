import { useState } from "react";
import { IconSearch } from "../Icons";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useClickOutside } from "@/hooks";

function SearchForm({ ...props }) {
    const [selected, setSelected] = useState("post");
    const [isFocused, setIsFocused] = useState(false);
    const ref = useClickOutside(() => {
        setIsFocused(false);
    });
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div ref={ref} {...props}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center"
            >
                <input
                    {...register("search")}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    placeholder="Bạn đang tìm kiếm gì ...?"
                    inputMode="search"
                    autoCapitalize="off"
                    className="grow focus:outline-none appearance-none bg-inherit"
                />
                <button
                    type="submit"
                    className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400"
                >
                    <IconSearch width={18} height={18} />
                </button>
            </form>
            <div
                className={clsx(
                    "flex space-x-2 lg:pt-2 transition-all opacity-0 lg:opacity-100 h-0 lg:h-auto pointer-events-none lg:pointer-events-auto",
                    { "opacity-100 h-auto pt-2 pointer-events-auto": isFocused }
                )}
            >
                <button
                    onClick={() => setSelected("post")}
                    className={clsx("border rounded-full px-3 text-sm", {
                        "bg-primary/80 text-white": selected === "post",
                    })}
                >
                    Bài đăng
                </button>
                <button
                    onClick={() => setSelected("product")}
                    className={clsx("border rounded-full px-3 text-sm", {
                        "bg-primary/80 text-white": selected === "product",
                    })}
                >
                    Sản phẩm
                </button>
            </div>
        </div>
    );
}

export default SearchForm;
