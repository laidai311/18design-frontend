export function Quote({}) {
    return (
        <section>
            <div className="flex flex-col lg:flex-row items-stretch">
                <div className="flex-1 bg-[#949599] text-white h-full flex items-center justify-center py-6 lg:py-20 px-2">
                    <h3 className="text-center uppercase flex flex-col space-y-1.5">
                        <span className="text-sm">
                            Bạn đang ấp ủ ý tưởng về ngôi nhà của mình?
                        </span>
                        <span className="text-2xl lg:text-3xl">
                            Hãy liên lạc ngay
                        </span>
                        <span className="text-sm">
                            Chúng tôi sẽ giúp hiện thực hóa ước mơ về tổ ấm của
                            bạn!
                        </span>
                    </h3>
                </div>
                <div
                    className="flex-1 flex items-center justify-center py-6 lg:py-20 px-3 text-white"
                    style={{
                        backgroundImage: "url('./images/quote-1.jpg')",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "50%",
                    }}
                >
                    <p className="text-center uppercase text-2xl">
                        miễn phí{" "}
                        <span className="animate-[blink_1.6s_infinite] text-5xl">
                            100%
                        </span>
                        <br />
                        phí thiết kế nội thất
                    </p>
                </div>
            </div>
        </section>
    );
}
