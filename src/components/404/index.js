import { css, styled } from "styled-components";
import { IconSearch } from "../Icons";
import { media } from "../theme";
import { useStore } from "@/stores";

export default function Component404({ message }) {
    const { setOpenSearch } = useStore();
    return (
        <section className="container max-w-7xl mx-auto px-3">
            <View404Styled>
                <div className="row">
                    <div className="content404">
                        <div className="text">404</div>
                    </div>
                    <div className="content">
                        <div className="title">{message || ""}</div>
                        <div>
                            <p className="description">
                                Có vẻ như không tìm thấy nội dung của bạn. Hãy
                                thử cách khác hoặc tìm kiếm?
                            </p>
                            <div
                                onClick={() => {
                                    setOpenSearch(true);
                                }}
                                className="p-2 border rounded-lg flex space-x-2 cursor-pointer"
                            >
                                <input
                                    placeholder="Bạn đang tìm kiếm gì ...?"
                                    inputMode="search"
                                    autoCapitalize="off"
                                    className={
                                        "grow focus:outline-none appearance-none bg-inherit"
                                    }
                                />
                                <button
                                    type="submit"
                                    className="w-10 h-10 rounded-full hover:bg-black/5 flex items-center justify-center text-gray-400"
                                >
                                    <IconSearch width={18} height={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </View404Styled>
        </section>
    );
}

const View404Styled = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    padding: 0 24px;

    .row {
        flex: 1;
        display: flex;
        flex-direction: column;

        ${media.md(css`
            flex-direction: row;
        `)}
    }

    .content404 {
        flex: 1;
        padding: 12px;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
    }
    .content {
        flex: 2;
        padding: 12px;
    }

    .text {
        font-size: 6em;
        font-weight: bold;
        opacity: 0.3;
    }

    .title {
        text-transform: uppercase;
        margin: 0 0 20px;
        border-bottom: 2px solid #bd8b1b;
        line-height: 35px;
        position: relative;
        font-size: 20px;
    }

    .description {
        opacity: 0.9;
        margin-bottom: 20px;
    }
`;
