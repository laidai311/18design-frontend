import { IconSearch } from "../Icons";
import { useForm } from "react-hook-form";

function SearchForm({ ...props }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <div {...props}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center"
            >
                <input
                    {...register("search")}
                    placeholder="Bạn đang tìm kiếm gì ...?"
                    inputMode="search"
                    autoCapitalize="off"
                    className="grow focus:outline-none appearance-none"
                />
                <button
                    type="submit"
                    className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-600"
                >
                    <IconSearch width={18} height={18} />
                </button>
            </form>
        </div>
    );
}

export default SearchForm;
