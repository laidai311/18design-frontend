import Link from "next/link";
import { Img } from "../UI";
import { IconAnglesRight, IconEye } from "../Icons";
import { useRouter } from "next/router";
import { styled } from "styled-components";

export const Card = ({
    title,
    description,
    total_view,
    slug = "#",
    cover,
    className,
}) => {
    const router = useRouter();
    const { NEXT_PUBLIC_API_URL } = process.env;

    const image_link = cover
        ? NEXT_PUBLIC_API_URL + cover.data.attributes.formats.medium.url
        : null;

    const image_name = cover ? cover.data.attributes.formats.medium.name : null;

    const url =
        router.pathname === "/"
            ? router.pathname + slug
            : router.pathname + "/" + slug;

    return (
        <CardStyled className={className || ""}>
            <div className="relative border rounded-md overflow-hidden transition-shadow duration-300 ease-out group hover:shadow-xl">
                <Link href={url}>
                    <div className="relative cover-card overflow-hidden h-64 after:group-hover:animate-[circle_0.75s] select-none">
                        <Img
                            src={image_link}
                            alt={image_name}
                            className="transition-transform duration-300 group-hover:scale-110 h-full w-full object-cover"
                        />
                    </div>
                </Link>
                <div className="p-3">
                    <Link href={url}>
                        <h5 className="min-h-[50px] line-clamp-2 font-semibold mb-1">
                            {title || ""}
                        </h5>
                    </Link>
                    <Link href={url}>
                        <p className="opacity-80 line-clamp-2 mb-2">
                            {description}
                        </p>
                    </Link>
                    <div className="flex justify-between">
                        <div className="flex space-x-2 items-center">
                            <IconEye />
                            <span>{total_view}</span>
                        </div>
                        <Link href={url} className="action">
                            <div className="flex items-center space-x-2 hover:underline hover:text-blue-600">
                                <span>Chi tiết</span>
                                <IconAnglesRight />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </CardStyled>
    );
};

const CardStyled = styled.div`
    .cover-card::after {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        display: block;
        content: "";
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 100%;
        transform: translate(-50%, -50%);
        opacity: 0;
        pointer-events: none;
    }
`;
