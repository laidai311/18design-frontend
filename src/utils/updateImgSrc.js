export const updateImgSrc = (value) => {
    if (typeof value !== "string") return null;

    let result = value;
    const regexImg = /<img\s.*?src=(?:'|\")([^'\">]+)(?:'|\").*?\/?>/gi;

    if (regexImg.test(result)) {
        result.match(regexImg).forEach((itm) => {
            let _itm = itm.replace(
                /\/uploads\//gi,
                `${process.env.NEXT_PUBLIC_API_URL}/uploads/`
            );
            result = result.replace(itm, _itm);
        });
    }
    return result;
};
