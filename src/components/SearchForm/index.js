import { fetcher, getUrl } from "@/utils";
import { IconLoading, IconSearch, IconXmark } from "../Icons";
import { useClickOutside } from "@/hooks";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

function SearchForm({ open, onClickOutside, ...props }) {
    const [selected, setSelected] = useState("post");
    const [isFocused, setIsFocused] = useState(false);
    const [result, setResult] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const wrapperRef = useClickOutside(() => {
        setIsFocused(false);
        onClickOutside?.();
    });
    const searchRef = useRef(null);

    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const { ref, ...rest } = register("search");
    const watchSearch = watch("search", "");

    const onSubmit = async (value) => {
        setIsLoading(true);
        setError();
        searchRef.current?.blur?.();
        try {
            const data = await fetcher(
                `/search?subtype=${selected}&search=${value?.search || ""}`
            );
            setResult(data.data);
        } catch (error) {
            setError("Không có kết quả nào trên hệ thống.");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div ref={wrapperRef} {...props}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center"
            >
                <input
                    {...rest}
                    name="search"
                    ref={(e) => {
                        ref(e);
                        searchRef.current = e; // you can still assign to ref
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    placeholder="Bạn đang tìm kiếm gì ...?"
                    inputMode="search"
                    autoCapitalize="off"
                    className="grow focus:outline-none appearance-none bg-inherit text-white"
                />
                {watchSearch ? (
                    <button
                        type="button"
                        onClick={() => {
                            setValue("search", "");
                            reset();
                            setResult();
                        }}
                        className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400 opacity-60"
                    >
                        <IconXmark width={15} height={15} />
                    </button>
                ) : null}
                {isLoading ? (
                    <button
                        type="button"
                        className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400"
                    >
                        <IconLoading width={70} height={70} />
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400"
                    >
                        <IconSearch width={18} height={18} />
                    </button>
                )}
            </form>
            <div
                className={clsx(
                    "flex space-x-2 lg:pt-2 transition-all opacity-0 lg:opacity-100 h-0 lg:h-auto pointer-events-none lg:pointer-events-auto",
                    { "opacity-100 h-auto pt-2 pointer-events-auto": isFocused }
                )}
            >
                <button
                    onClick={() => {
                        setSelected("post");
                        if (selected !== "post") {
                            reset();
                            setResult();
                        }
                    }}
                    className={clsx(
                        "border rounded-full px-3 text-sm text-white",
                        {
                            "bg-primary/80 text-white": selected === "post",
                        }
                    )}
                >
                    Bài đăng
                </button>
                <button
                    onClick={() => {
                        setSelected("product");
                        if (selected !== "product") {
                            reset();
                            setResult();
                        }
                    }}
                    className={clsx(
                        "border rounded-full px-3 text-sm text-white",
                        {
                            "bg-primary/80 text-white": selected === "product",
                        }
                    )}
                >
                    Sản phẩm
                </button>
            </div>
            <div
                className={clsx(
                    "transition-all opacity-0 lg:opacity-100 h-0 lg:h-auto pointer-events-none lg:pointer-events-auto",
                    { "opacity-100 h-auto pt-2 pointer-events-auto": isFocused }
                )}
            >
                {error ? (
                    <div>{error || ""}</div>
                ) : (
                    <div
                        className="overflow-x-hidden overflow-y-auto overscroll-contain max-h-[calc(var(--window-height)-184px)] -mx-4"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        <div className="flex flex-col mt-2">
                            {Array.isArray(result)
                                ? result.map((item, index) => (
                                      <Link
                                          key={index}
                                          href={`${
                                              selected === "post"
                                                  ? "/chi-tiet"
                                                  : "/san-pham/chi-tiet"
                                          }${getUrl(item.url)}`}
                                          className="text-white rounded-md px-4 py-2 hover:bg-white/10"
                                      >
                                          {item?.title || ""}
                                      </Link>
                                  ))
                                : null}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchForm;
