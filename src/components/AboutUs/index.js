import ReadOnlyEditor from "../ReadOnlyEditor";

export function AboutUs({ title, content }) {
    return (
        <div className="py-12 leading-8 text-base">
            <div className="container mx-auto max-w-7xl">
                <h1 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3 font-semibold">
                    {title || "Về chúng tôi"}
                </h1>
                <ReadOnlyEditor content={content} />
            </div>
        </div>
    );
}
