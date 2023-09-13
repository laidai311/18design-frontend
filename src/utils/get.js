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

export function getArrayStrapi(arr, defaultValue) {
    let result;
    if (Array.isArray(arr)) {
        result = arr.map((item) => {
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

export function getImageStrapi(value, path, defaultValue) {
    let result =
        typeof path === "string"
            ? value?.data?.attributes?.[path] || undefined
            : undefined;

    switch (path) {
        case "url":
            result =
                result === undefined
                    ? undefined
                    : process.env?.NEXT_PUBLIC_API_URL + result;
            break;
    }

    return result === undefined ? defaultValue : result;
}
