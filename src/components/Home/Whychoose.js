/* eslint-disable @next/next/no-img-element */
import { WHY_CHOOSE_BG } from "@/constant/default";
import Loader from "../Loader";
import { useStore } from "@/stores";

export default function Whychoose({
    why_choose_background,
    whyChooseGroup,
    whyChooseGroupLoading,
}) {
    const whyChooseBG = why_choose_background?.url || WHY_CHOOSE_BG;

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
            <div className="container max-w-7xl mx-auto px-3">
                <div className="bg-black/70 absolute inset-0" />
                <h3 className="relative text-2xl uppercase text-center mb-6 px-6">
                    Tại sao chọn 18 Design
                </h3>
                <div className="relative -mx-4 flex flex-wrap pb-10">
                    {Array.isArray(whyChooseGroup)
                        ? whyChooseGroup.map((itm, idx) => {
                              if (idx >= 6) return null;
                              return (
                                  <div
                                      key={idx}
                                      className="w-full p-4 md:w-1/2 lg:w-1/3 space-y-3"
                                  >
                                      <div className="flex justify-center">
                                          {whyChooseGroupLoading ? (
                                              <Loader />
                                          ) : (
                                              <img
                                                  alt={itm?.icon_name || ""}
                                                  src={itm?.icon_link || ""}
                                                  className="w-16 h-16"
                                              />
                                          )}
                                      </div>
                                      <div className="text-center space-y-1">
                                          <h3 className="text-primary uppercase font-semibold">
                                              {itm?.title || ""}
                                          </h3>
                                          <p>{itm?.description || ""}</p>
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </div>
            </div>
        </section>
    );
}
