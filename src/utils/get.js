export function get(collection, path, defaultValue) {
    let result;
    if (Array.isArray(collection)) {
        result = collection.find((item) => {
            if (typeof item === "object" && typeof path === "object") {
                const pathEntry = Object.entries(path)[0];
                return item?.[pathEntry[0]] == pathEntry[1];
            }
            return false;
        });
    } else if (typeof collection === "object") {
        result = collection?.[path];
    }
    return result === undefined ? defaultValue : result;
}

export function getArrayStrapi(data, defaultValue) {
    let result;
    if (Array.isArray(data)) {
        result = data.map((item) => {
            if ("attributes" in item && typeof item?.attributes === "object") {
                return {
                    id: item?.id,
                    ...item.attributes,
                };
            }
        });
    }
    return result === undefined ? defaultValue : result;
}
