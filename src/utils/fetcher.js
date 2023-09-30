import { API_WP, API_FORM } from "@/configs/api";
import unfetch from "isomorphic-unfetch";

let cache = new Map();

export function clearCache() {
    cache.clear();
}

export const fetcher = async (url, options, isForm = false) => {
    try {
        if (typeof url !== "string") {
            throw new Error("url is required");
        }
        if (!cache.has(url)) {
            const response = await unfetch(
                process.env.API_URL + (isForm ? API_FORM : API_WP) + url,
                options
            );
            if (!response.ok) {
                throw response.statusText;
            }

            cache.set(url, {
                data: await response.json(),
                total: response.headers.get("x-wp-total"),
            });
        }
        return cache.get(url);
    } catch (error) {
        throw error;
    }
};
