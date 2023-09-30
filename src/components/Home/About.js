/* eslint-disable @next/next/no-img-element */
import { ABOUT_DESCRIPTION, ABOUT_TITLE } from "@/constant/default";
import { Img } from "../UI";
import { useStore } from "@/stores";
import clsx from "clsx";
import Loader from "../Loader";
import ReadOnlyEditor from "../ReadOnlyEditor";

export function About({
    about_title,
    about_description,
    about_background,
    aboutGroupLoading,
    aboutGroup,
}) {
    return (
        <section
            className="relative py-12"
            style={{
                backgroundImage: `url("${about_background?.url || ""}")`,
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <div className="absolute inset-0 bg-black/60" />
            <div className="container mx-auto max-w-7xl px-3">
                <div className="relative text-white">
                    <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                        Về chúng tôi
                    </h2>
                    <div className="text-center px-5 lg:px-20 space-y-3 mb-5">
                        <div className="uppercase font-semibold">
                            {about_title || ABOUT_TITLE}
                        </div>
                        <ReadOnlyEditor
                            content={about_description || ABOUT_DESCRIPTION}
                        />
                    </div>
                    <div className="-mx-4 flex flex-wrap px-4 md:px-0">
                        {Array.isArray(aboutGroup)
                            ? aboutGroup.map((item, index) => {
                                  if (index >= 3) return null;
                                  return (
                                      <div
                                          key={index}
                                          className={clsx(
                                              "w-full p-4 md:w-1/3 group",
                                              {
                                                  "md:mt-12": index % 2 === 0,
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
                                                      {aboutGroupLoading ? (
                                                          <Loader />
                                                      ) : (
                                                          <Img
                                                              alt={
                                                                  item?.icon_name ||
                                                                  ""
                                                              }
                                                              src={
                                                                  item?.icon_link ||
                                                                  "/#"
                                                              }
                                                              className="transition-transform group-hover:rotate-[360deg] duration-1000 h-16"
                                                          />
                                                      )}
                                                  </div>
                                                  <h3 className="font-semibold mb-2">
                                                      {item?.title || ""}
                                                  </h3>
                                                  <p className="text-sm">
                                                      {item?.description || ""}
                                                  </p>
                                              </div>
                                              <div className="bg-primary uppercase p-3 text-center">
                                                  {item?.action || ""}
                                              </div>
                                          </div>
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
