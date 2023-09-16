import { formatCurrency, getArrayStrapi } from "@/utils";
import Link from "next/link";
import { styled } from "styled-components";
import { Img } from "../UI";
import { useStore } from "@/stores";

const CardProduct = styled.div`
    border-radius: 12px;
    border: 0.5px solid #b9b9b9;
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    & img {
        border-radius: 12px 12px 0px 0px;
    }
`;
const CardDescription = styled.div`
    padding: 20px;

    & h3 {
        font-size: 17px;
        font-weight: 700;
        line-height: normal;
        color: #616a7d;
    }

    & .group__price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
        & .price {
            font-size: 18px;
            line-height: 28px;
            font-weight: bold;
        }
        & .strike-price {
            letter-spacing: 0.4px;
            text-decoration-line: line-through;
            color: #d93535;
            font-size: 14px;
        }
    }
    & .detail__product-info {
        color: #0067c6;
        text-transform: uppercase;
        font-size: 14px;
    }
`;
export function CardProductItem({
    title,
    slug,
    new_price,
    old_price,
    images,
    tag,
    ...props
}) {
    const { api_url } = useStore();

    const imagesArr = getArrayStrapi(images?.data, []);

    const image_link = imagesArr?.[0]
        ? api_url + imagesArr?.[0]?.url || ""
        : null;

    const image_name = imagesArr?.[0]
        ? imagesArr?.[0]?.name || ""
        : "18 design";

    return (
        <div className="bg-white transition-all overflow-hidden rounded-lg shadow-md hover:shadow-xl group">
            <div className="relative pt-[60%] overflow-hidden">
                <Link href={`/san-pham/${tag}/${slug || ""}`}>
                    <div className="absolute inset-0">
                        <Img
                            alt={image_name || ""}
                            // src={"/images/slider-1.jpg" || image_link || ""}
                            src={image_link || "/images/slider-1.jpg"}
                            className={
                                "w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                            }
                        />
                    </div>
                </Link>
            </div>
            <CardDescription>
                <Link href={`/san-pham/${tag}/${slug || ""}`}>
                    <h3>{title || ""}</h3>
                    <div className="group__price">
                        <p className="price">
                            {formatCurrency(new_price || "")}
                        </p>
                        <p className="strike-price">
                            {formatCurrency(old_price || "")}
                        </p>
                    </div>
                </Link>
                <Link
                    href={`/san-pham/${tag}/${slug || ""}`}
                    className="hover:underline text-blue-500"
                >
                    {" "}
                    Chi tiết
                </Link>
            </CardDescription>
        </div>
    );
}
