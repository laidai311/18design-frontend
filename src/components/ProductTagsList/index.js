import { Img } from "../UI";
import { useStore } from "@/stores";
import Link from "next/link";
import Loader from "../Loader";

export function ProductTagsList({ loading, product_tag_list }) {
    const { default_image } = useStore();

    return (
        <div className="relative py-10">
            <div className="container mx-auto max-w-7xl">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Danh mục nổi bật
                </h2>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                        {Array.isArray(product_tag_list)
                            ? product_tag_list.map((item, index) => (
                                  <ProductTagCard
                                      key={index}
                                      {...item}
                                      className="p-4 w-full md:w-1/2 lg:w-1/4"
                                  />
                              ))
                            : null}
                        <ProductTagCard
                            name={"Xem tất cả"}
                            meta_box={{
                                image: {
                                    name: "18 Design",
                                    full_url: default_image?.full_url || "",
                                },
                            }}
                            url={"/san-pham/cac-loai"}
                            className="p-4 w-full md:w-1/2 lg:w-1/4"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

const ProductTagCard = ({ slug, meta_box, name, className, url }) => {
    return (
        <div className={className || ""}>
            <Link href={url ? url : `/san-pham/${slug || ""}`}>
                <div className="relative pt-[67%] rounded-xl overflow-hidden group">
                    <Img
                        alt={meta_box?.image?.name || ""}
                        src={meta_box?.image?.full_url || ""}
                        className={
                            "absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                        }
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white capitalize text-xl font-semibold text-center whitespace-nowrap">
                        {name || ""}
                    </div>
                </div>
            </Link>
        </div>
    );
};
