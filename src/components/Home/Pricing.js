/* eslint-disable @next/next/no-img-element */
import ContactForm from "../ContactForm";

export function Pricing() {
    return (
        <section className="bg-white pt-10 relative">
            <div className="container max-w-7xl mx-auto">
                <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                    DỰ DOÁN CHI PHÍ THIẾT KẾ - THI CÔNG
                </h2>
                <div className="-mx-4 flex flex-wrap px-4 pb-10">
                    <div className="w-full p-4 lg:w-1/2">
                        <ContactForm />
                    </div>
                    <div className="w-full p-4 lg:w-1/2">
                        <img
                            alt="sesion-bg-2"
                            src="./images/seasion-bg-2.jpg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
