import {
    IconBox,
    IconChevronDown,
    IconEmail,
    IconHandMoney,
    IconHomeDesign,
    IconLoading,
    IconPhone,
    IconUser,
} from "../Icons";
import { useForm } from "react-hook-form";
import { useStore } from "@/stores";
import { useState } from "react";
import clsx from "clsx";

export default function ContactForm({ onClose, className }) {
    const { api_url } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (value) => {
        setIsLoading(true);
        try {
            // Default options are marked with *
            const res = await fetch(api_url + "/api/registered-users", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ data: { ...value, checked: false } }), // body data type must match "Content-Type" header
            });
            const data = await res.json(); // parses JSON response into native JavaScript objects
            onClose?.();
        } catch (error) {
            setError(error?.message || "Lỗi không gửi được dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            style={{ width: "100%", height: "100%" }}
            onSubmit={handleSubmit(onSubmit)}
            className={clsx("flex flex-col space-y-4", className || "")}
        >
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconHomeDesign />
                </div>
                <div className="relative grow">
                    <select
                        {...register("design_style")}
                        placeholder="Phong cách thiết kế"
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded-r-lg leading-tight focus:outline-none focus:shadow-outline h-11"
                    >
                        <option value={""}>Phong cách thiết kế</option>
                        <option value={"Hiện đại"}>Hiện đại</option>
                        <option value={"Luxury"}>Luxury</option>
                        <option value={"Tân cổ điển"}>Tân cổ điển</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <IconChevronDown />
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconHandMoney />
                </div>
                <div className="relative grow">
                    <select
                        {...register("investment_level")}
                        placeholder="Mức độ đầu từ"
                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-r-lg leading-tight focus:outline-none focus:shadow-outline h-11"
                    >
                        <option value={""}>Mức độ đầu tư</option>
                        <option value={"Thấp"}>Thấp</option>
                        <option value={"Trung cấp"}>Trung cấp</option>
                        <option value={"Cao cấp"}>Cao cấp</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <IconChevronDown />
                    </div>
                </div>
            </div>

            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconBox />
                </div>
                <input
                    {...register("total_area")}
                    type="number"
                    placeholder="Tổng diện tích (m²)"
                    inputMode="decimal"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconUser />
                </div>
                <input
                    {...register("full_name")}
                    type="text"
                    placeholder="Họ tên"
                    inputMode="text"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconPhone />
                </div>
                <input
                    {...register("phone")}
                    type="text"
                    placeholder="Số điện thoại"
                    inputMode="tel"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>

            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconEmail />
                </div>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    inputMode="email"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>
            {error ? (
                <div className="text-white bg-red-500 rounded-lg p-2">
                    {error}
                </div>
            ) : null}
            <button
                type="submit"
                disabled={isLoading}
                className="bg-cta-button h-14 uppercase rounded-lg font-semibold text-white text-lg flex justify-center items-center disabled:opacity-70 disabled:pointer-events-none relative"
            >
                <div>Gửi thông tin liên hệ</div>
                <div
                    className={clsx(
                        "opacity-0 transition-opacity absolute top-1/2 -translate-y-1/2 right-2",
                        {
                            "opacity-100": isLoading,
                        }
                    )}
                >
                    <IconLoading width={50} height={50} />
                </div>
            </button>
        </form>
    );
}
