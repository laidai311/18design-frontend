import { IconHome } from "../Icons";
import Link from "next/link";

export function Breadcrumb({ value1 }) {
    return (
        <div className="my-4">
            <div className="container max-w-7xl mx-auto px-3">
                <div className="leading-7">
                    <Link
                        href="/"
                        className="inline-block hover:text-primary -mb-0.5"
                    >
                        <IconHome width={16} height={16} />
                    </Link>
                    <span> / </span>
                    <Link
                        href={"/san-pham"}
                        className="inline-block hover:text-primary"
                    >
                        Sản phẩm
                    </Link>
                    {value1?.label ? (
                        <>
                            <span> / </span>
                            <Link
                                href={"/san-pham" + value1?.url}
                                className="inline-block hover:text-primary"
                            >
                                {value1?.label}
                            </Link>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
