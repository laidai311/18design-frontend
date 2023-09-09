import { css, styled } from "styled-components";
import { IconSearch } from "../Icons";
import { useForm } from "react-hook-form";
import { media } from "../theme";
import { useClickOutside } from "@/hooks";

function SearchForm({ onClickOutside, ...props }) {
    const ref = useClickOutside(() => onClickOutside?.());
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <SearchFormStyled ref={ref} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("search")}
                    placeholder="Bạn đang tìm kiếm gì ...?"
                    inputMode="search"
                    autoCapitalize="off"
                />
                <button type="submit">
                    <IconSearch width={18} height={18} />
                </button>
            </form>
        </SearchFormStyled>
    );
}

export default SearchForm;

const SearchFormStyled = styled.div`
    form {
        background-color: white;
        display: flex;
        align-items: center;
        ${media.lg(css`
            padding: 0;
            border-radius: 8px;
            background-color: transparent;
        `)}
    }

    input {
        padding: 5px 8px;
        border: thin solid #ccc;
        width: 100%;
        height: 39px;
        border-radius: 8px 0 0 8px;
        background-color: white;
    }

    button {
        padding: 0px 11px;
        border-left: none;
        height: 39px;
        border-radius: 0 8px 8px 0;
        background-color: #333;
        color: white;
    }
`;
