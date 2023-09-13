/* eslint-disable @next/next/no-img-element */
import { WHY_CHOOSE_BG } from "@/constant/default";
import { WHY_CHOOSE_LIST } from "@/constant/why-choose_list";

export default function Whychoose({
    why_choose_list = WHY_CHOOSE_LIST,
    why_choose_background,
    api_url,
}) {
    const whyChooseBG = why_choose_background?.data?.attributes?.url
        ? api_url + why_choose_background?.data?.attributes?.url
        : WHY_CHOOSE_BG;

    return (
        <section
            style={{
                backgroundImage: `url("${whyChooseBG}")`,
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
            className="pt-10 relative text-white"
        >
            <div className="container max-w-7xl mx-auto">
                <div className="bg-black/70 absolute inset-0" />
                <h3 className="relative text-2xl uppercase text-center mb-6 px-6">
                    Tại sao chọn 18 Design
                </h3>
                <div className="relative -mx-4 flex flex-wrap pb-10">
                    {why_choose_list.map((itm, idx) => (
                        <div
                            key={idx}
                            className="w-full p-4 md:w-1/2 lg:w-1/3 space-y-3"
                        >
                            <div className="flex justify-center">
                                <img
                                    alt="pic-1"
                                    src={itm?.icon_link || ""}
                                    className="w-16 h-16"
                                />
                            </div>
                            <div className="text-center space-y-1">
                                <h3 className="text-primary uppercase font-semibold">
                                    {itm?.title || ""}
                                </h3>
                                <p>{itm?.description || ""}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
