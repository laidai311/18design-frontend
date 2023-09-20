import { useEffect, useRef, useState } from "react";
import { IconLoading, IconSearch } from "../Icons";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { useClickOutside } from "@/hooks";
import { useStore } from "@/stores";
import unfetch from "isomorphic-unfetch";
import Link from "next/link";
import { getUrl } from "@/utils";

function SearchForm({ open, ...props }) {
    const [selected, setSelected] = useState("post");
    const [isFocused, setIsFocused] = useState(false);
    const [result, setResult] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const ref = useClickOutside(() => {
        setIsFocused(false);
    });
    const { api_url } = useStore();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setFocus,
    } = useForm();

    useEffect(() => {
        if (open) {
            setFocus("search");
        }
    }, [open]);

    const onSubmit = async (value) => {
        setIsLoading(true);
        setError();
        try {
            const res = await unfetch(
                api_url +
                    `/search?subtype=${selected}&search=${value?.search || ""}`
            );
            const data = await res.json();
            setResult(data);
        } catch (error) {
            setError("Không có kết quả nào trên hệ thống.");
        } finally {
            setIsLoading(false);
        }
    };
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
                    className="grow focus:outline-none appearance-none bg-inherit text-white"
                />
                <button
                    type="submit"
                    className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400"
                >
                    {isLoading ? (
                        <IconLoading width={70} height={70} />
                    ) : (
                        <IconSearch width={18} height={18} />
                    )}
                </button>
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
            {error ? (
                <div>{error || ""}</div>
            ) : (
                <div className="flex flex-col mt-2">
                    {Array.isArray(result)
                        ? result.map((item, index) => (
                              <Link
                                  key={index}
                                  href={`${
                                      selected === "post"
                                          ? "/khac"
                                          : "/san-pham/chi-tiet"
                                  }${getUrl(item.url)}`}
                                  className="bg-white text-black rounded-md my-2 px-2 py-1"
                              >
                                  {item?.title || ""}
                              </Link>
                          ))
                        : null}
                </div>
            )}
        </div>
    );
}

export default SearchForm;
