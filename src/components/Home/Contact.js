/* eslint-disable @next/next/no-img-element */
import ContactForm from "../ContactForm";
import { Img } from "../UI";

export function Contact({ contact_background_link }) {
    return (
        <section className="bg-white pt-10 relative">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    Dự đoán chi phí thiết kế - Thi công
                </h2>
                <div className="-mx-4 flex flex-wrap px-4 pb-10">
                    <div className="w-full p-4 lg:w-1/2">
                        <ContactForm />
                    </div>
                    <div className="w-full p-4 lg:w-1/2">
                        <Img
                            alt="sesion-bg-2"
                            src={contact_background_link}
                            className={"w-full h-full object-cover"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
