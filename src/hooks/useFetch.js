import { fetcher } from "@/utils";
import { useEffect, useReducer } from "react";

const initialState = {
    status: "loading",
    isLoading: true,
    isFetching: false,
    isError: false,
    error: undefined,
    data: undefined,
};

function fetchReducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...initialState, isFetching: true };
        case "success":
            return {
                ...initialState,
                status: "success",
                isLoading: false,
                isFetching: false,
                data: action.payload,
            };
        case "error":
            return {
                ...initialState,
                status: "error",
                isLoading: false,
                isFetching: false,
                isError: true,
                error: action.payload,
            };
        default:
            return state;
    }
}

export function useFetch(url, options = {}, isForm, enabled = true) {
    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url || !enabled) return;

        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                dispatch({ type: "loading" });

                options.signal = abortController.signal;
                const data = await fetcher(url, options, isForm);

                dispatch({ type: "success", payload: data });
            } catch (error) {
                if (abortController.signal.aborted) {
                    console.log("Cancelled request");
                } else {
                    dispatch({ type: "error", payload: error });
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, enabled]);

    return state;
}
