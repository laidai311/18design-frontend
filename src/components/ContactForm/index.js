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
import { fetcher } from "@/utils";
import Loader from "../Loader";

export default function ContactForm({ onClose, className }) {
    const { formFields, formfieldsLoading: formfieldsStatus } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [errorMessages, setErrorMessages] = useState({});
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (value) => {
        const newErrorMessages = {};

        const validateField = (fieldName, regex, errorMessage) => {
            if (!regex.test(value[fieldName])) {
                newErrorMessages[fieldName] = errorMessage;
            }
        };
        validateField("full_name", /^[A-Za-z\s]+$/, "Họ tên không hợp lệ.");
        validateField(
            "design_style",
            /^.{1,}$/,
            "Vui lòng chọn phong cách thiết kế."
        );
        validateField(
            "investment_level",
            /^.{1,}$/,
            "Vui lòng chọn mức độ đầu tư."
        );

        const totalArea = parseFloat(value.total_area);
        if (isNaN(totalArea) || totalArea <= 0) {
            newErrorMessages.total_area =
                "Tổng diện tích phải là một số dương.";
        }

        validateField("phone", /^[0-9]{10,}$/, "Số điện thoại không hợp lệ.");
        validateField(
            "email",
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Địa chỉ email không hợp lệ."
        );

        if (Object.keys(newErrorMessages).length > 0) {
            setErrorMessages(newErrorMessages);
            return;
        }

        setIsLoading(true);
        try {
            let formData = new FormData();
            formData.append("input_1", value?.design_style);
            formData.append("input_3", value?.investment_level);
            formData.append("input_4", value?.total_area);
            formData.append("input_5", value?.full_name);
            formData.append("input_6", value?.phone);
            formData.append("input_8", value?.email);
            // Default options are marked with *
            fetcher(
                "/forms/1/submissions",
                {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    mode: "cors", // no-cors, *cors, same-origin
                    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                    body: formData, // body data type must match "Content-Type" header
                },
                true
            );

            onClose?.();
            reset();
        } catch (error) {
            setError(error?.message || "Lỗi không gửi được dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    return formfieldsStatus === "loading" ? (
        <Loader className="relative py-10" />
    ) : (
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
                        <option value={""}>
                            {formFields?.[0]?.text || "Phong cách thiết kế"}
                        </option>
                        {Array.isArray(formFields[0]?.values)
                            ? formFields?.[0]?.values.map((item, index) => (
                                  <option key={index} value={item?.value || ""}>
                                      {item?.text || ""}
                                  </option>
                              ))
                            : null}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <IconChevronDown />
                    </div>
                </div>
            </div>
            {errorMessages.design_style && (
                <div className="text-sm text-left text-red-500">
                    {errorMessages.design_style}
                </div>
            )}
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
                        <option value={""}>
                            {formFields?.[1]?.text || "Mức độ đầu tư"}
                        </option>
                        {Array.isArray(formFields[1]?.values)
                            ? formFields?.[1]?.values.map((item, index) => (
                                  <option key={index} value={item?.value || ""}>
                                      {item?.text || ""}
                                  </option>
                              ))
                            : null}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <IconChevronDown />
                    </div>
                </div>
            </div>
            {errorMessages.investment_level && (
                <div className="text-sm text-left text-red-500">
                    {errorMessages.investment_level}
                </div>
            )}
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconBox />
                </div>
                <input
                    {...register("total_area")}
                    type="number"
                    placeholder={formFields?.[2]?.text || "Tổng diện tích (m²)"}
                    inputMode="decimal"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>
            {errorMessages.total_area && (
                <div className="text-sm text-left text-red-500">
                    {errorMessages.total_area}
                </div>
            )}
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconUser />
                </div>
                <input
                    {...register("full_name")}
                    type="text"
                    placeholder={formFields?.[3]?.text || "Họ tên"}
                    inputMode="text"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>
            {errorMessages.full_name && (
                <div className="text-sm text-left text-red-500">
                    {errorMessages.full_name}
                </div>
            )}
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconPhone />
                </div>
                <input
                    {...register("phone")}
                    type="text"
                    placeholder={formFields?.[4]?.text || "Số điện thoại"}
                    inputMode="tel"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>
            {errorMessages.phone && (
                <div className="text-sm text-left text-red-500">
                    {errorMessages.phone}
                </div>
            )}
            <div className="flex">
                <div className="flex items-center justify-center border border-gray-400 hover:border-gray-500 rounded-l-lg border-r-0 w-12">
                    <IconEmail />
                </div>
                <input
                    {...register("email")}
                    type="email"
                    placeholder={formFields?.[5]?.text || "Email"}
                    inputMode="email"
                    className="grow pl-4 pr-2 py-2 border border-gray-400 rounded-r-lg focus:outline-none hover:border-gray-500 focus:shadow-outline h-11"
                />
            </div>
            {errorMessages.email && (
                <div className="text-sm text-left text-red-500">
                    {errorMessages.email}
                </div>
            )}

            {error ? (
                <div className="text-white bg-red-500 mt-0 rounded-lg p-2">
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
