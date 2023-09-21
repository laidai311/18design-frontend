import { formatCurrency } from "@/utils";
import Link from "next/link";
import { styled } from "styled-components";
import { Img } from "../UI";

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
export function CardProductItem({ title, slug, meta_box }) {
    const image_link =
        meta_box?.images?.[0]?.full_url || "/images/slider-1.jpg";

    const image_name = meta_box?.images?.[0]?.name || "pic";

    return (
        <div className="bg-white transition-all overflow-hidden rounded-lg shadow-md hover:shadow-xl group">
            <div className="relative pt-[60%] overflow-hidden">
                <Link href={`/san-pham/chi-tiet/${slug || ""}`}>
                    <div className="absolute inset-0">
                        <Img
                            alt={image_name}
                            src={image_link}
                            className={
                                "w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                            }
                        />
                    </div>
                </Link>
            </div>
            <CardDescription>
                <Link href={`/san-pham/chi-tiet/${slug || ""}`}>
                    <h3 className="line-clamp-2 h-10">
                        {title?.rendered || ""}
                    </h3>
                    <div className="group__price">
                        <p className="price">
                            {formatCurrency(meta_box?.new_price || "")}
                        </p>
                        {meta_box?.old_price ? (
                            <p className="strike-price">
                                {formatCurrency(meta_box?.old_price || "")}
                            </p>
                        ) : null}
                    </div>
                </Link>
                <Link
                    href={`/san-pham/chi-tiet/${slug || ""}`}
                    className="hover:underline text-blue-500"
                >
                    {" "}
                    Chi tiết
                </Link>
            </CardDescription>
        </div>
    );
}
