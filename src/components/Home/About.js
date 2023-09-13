/* eslint-disable @next/next/no-img-element */
import { ABOUT_DESCRIPTION, ABOUT_TITLE } from "@/constant/default";
import ReadOnlyEditor from "../ReadOnlyEditor";
import { Img } from "../UI";
import clsx from "clsx";

export function About({
    about_title,
    about_description,
    about_background_link,
    about_list,
}) {
    return (
        <section
            className="relative py-12"
            style={{
                backgroundImage: `url("${about_background_link || ""}")`,
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 bg-black/60" />
            <div className="container mx-auto max-w-7xl">
                <div className="relative text-white">
                    <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                        Về chúng tôi
                    </h2>
                    <div className="text-center px-5 lg:px-20 space-y-3">
                        <div className="uppercase font-semibold">
                            {about_title || ABOUT_TITLE}
                        </div>
                        <ReadOnlyEditor
                            content={about_description || ABOUT_DESCRIPTION}
                        />
                    </div>
                    <div className="-mx-4 flex flex-wrap">
                        {Array.isArray(about_list)
                            ? about_list.map((item, index) => (
                                  <div
                                      key={index}
                                      className={clsx(
                                          "w-full p-4 md:w-1/3 group",
                                          {
                                              "mt-12": index % 2 === 0,
                                          }
                                      )}
                                  >
                                      <div
                                          className={
                                              "transition-shadow group-hover:shadow-2xl overflow-hidden rounded-md"
                                          }
                                      >
                                          <div className="bg-white text-black p-4 text-center min-h-[250px]">
                                              <div className="flex justify-center mb-3">
                                                  <Img
                                                      alt="icon"
                                                      src={
                                                          item?.icon_link || "#"
                                                      }
                                                      className="transition-transform group-hover:rotate-[360deg] duration-1000"
                                                  />
                                              </div>
                                              <h3 className="font-semibold mb-2">
                                                  {item?.title || ""}
                                              </h3>
                                              <p className="text-sm">
                                                  {item?.description || ""}
                                              </p>
                                          </div>
                                          <div className="bg-primary uppercase p-3 text-center">
                                              {item?.action_text || ""}
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
