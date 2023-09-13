/* eslint-disable react-hooks/exhaustive-deps */
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useMemo,
    useReducer,
} from "react";
import { range } from "@/utils";
import { useRouter } from "next/router";

export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useDidUpdate(fn, dependencies) {
    const mounted = useRef(false);

    useEffect(
        () => () => {
            mounted.current = false;
        },
        []
    );

    useEffect(() => {
        if (mounted.current) {
            return fn();
        }

        mounted.current = true;
        return undefined;
    }, dependencies);
}

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside(handler, events, nodes) {
    const ref = useRef();

    useEffect(() => {
        const listener = (event) => {
            const { target } = event ?? {};
            if (Array.isArray(nodes)) {
                const shouldIgnore =
                    target?.hasAttribute("data-ignore-outside-clicks") ||
                    (!document.body.contains(target) &&
                        target.tagName !== "HTML");
                const shouldTrigger = nodes.every(
                    (node) => !!node && !event.composedPath().includes(node)
                );
                shouldTrigger && !shouldIgnore && handler();
            } else if (ref.current && !ref.current.contains(target)) {
                handler();
            }
        };

        (events || DEFAULT_EVENTS).forEach((fn) =>
            document.addEventListener(fn, listener)
        );

        return () => {
            (events || DEFAULT_EVENTS).forEach((fn) =>
                document.removeEventListener(fn, listener)
            );
        };
    }, [ref, handler, nodes]);

    return ref;
}

export function useEventListener(eventName, handler, element, options) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        // Define the listening target
        const targetElement = element?.current ?? window;

        if (!(targetElement && targetElement.addEventListener)) return;

        // Create event listener that calls handler function stored in ref
        const listener = (event) => savedHandler.current(event);

        targetElement.addEventListener(eventName, listener, options);

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener, options);
        };
    }, [eventName, element, options]);
}

export function useHover() {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const onMouseEnter = useCallback(() => setHovered(true), []);
    const onMouseLeave = useCallback(() => setHovered(false), []);

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("mouseenter", onMouseEnter);
            ref.current.addEventListener("mouseleave", onMouseLeave);

            return () => {
                ref.current?.removeEventListener("mouseenter", onMouseEnter);
                ref.current?.removeEventListener("mouseleave", onMouseLeave);
            };
        }

        return undefined;
    }, [ref.current]);

    return { ref, hovered, setHovered };
}

function attachMediaListener(query, callback) {
    try {
        query.addEventListener("change", callback);
        return () => query.removeEventListener("change", callback);
    } catch (e) {
        query.addListener(callback);
        return () => query.removeListener(callback);
    }
}

function getInitialValue(query, initialValue) {
    if (typeof initialValue === "boolean") {
        return initialValue;
    }

    if (typeof window !== "undefined" && "matchMedia" in window) {
        return window.matchMedia(query).matches;
    }

    return false;
}

export function useMediaQuery(
    query,
    initialValue,
    { getInitialValueInEffect } = {
        getInitialValueInEffect: true,
    }
) {
    const [matches, setMatches] = useState(
        getInitialValueInEffect
            ? initialValue
            : getInitialValue(query, initialValue)
    );
    const queryRef = useRef();

    useEffect(() => {
        if ("matchMedia" in window) {
            queryRef.current = window.matchMedia(query);
            setMatches(queryRef.current.matches);
            return attachMediaListener(queryRef.current, (event) =>
                setMatches(event.matches)
            );
        }

        return undefined;
    }, [query]);

    return matches;
}

export const useDetectKeyboard = (
    minKeyboardHeight = 300,
    defaultValue = false
) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue);

    useEffect(() => {
        const listener = () => {
            const newState =
                window.screen.height - minKeyboardHeight >
                window.visualViewport.height;
            if (isKeyboardOpen !== newState) {
                setIsKeyboardOpen(newState);
            }
        };

        if (typeof visualViewport != "undefined") {
            window.visualViewport.addEventListener("resize", listener);
        }

        const handleOff = () => {
            setIsKeyboardOpen(false);
        };

        document.addEventListener("focusout", handleOff);

        return () => {
            if (typeof visualViewport != "undefined") {
                window.visualViewport.removeEventListener("resize", listener);
            }
            document.removeEventListener("focusout", handleOff);
        };
    }, []);

    return isKeyboardOpen;
};

export const useWindowHeight = () => {
    const isDetectKeyboardOpen = useDetectKeyboard();
    useEffect(() => {
        const isMobile =
            typeof window === "object"
                ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      window.navigator.userAgent
                  )
                : false;
        const syncHeight = () => {
            if (isDetectKeyboardOpen && isMobile) return;

            document.documentElement.style.setProperty(
                "--window-height",
                `${window.innerHeight}px`
            );
        };
        syncHeight();

        window.addEventListener(
            "orientationchange",
            function () {
                // Generate a resize event if the device doesn't do it
                window.dispatchEvent(new Event("resize"));
            },
            false
        );

        window.addEventListener("resize", syncHeight);
        return () => {
            window.removeEventListener("resize", syncHeight);
        };
    }, []);
};

export const useLockBodyScroll = (isLocked) => {
    const prevOverflow = useRef();
    const scrollY = useRef();
    const scrollX = useRef();

    const setOverflowHidden = useCallback(() => {
        if (prevOverflow.current === undefined) {
            prevOverflow.current = {
                overflow: document.documentElement.style.overflow,
                paddingRight: document.documentElement.style.paddingRight,
                scrollBarGap:
                    window.innerWidth - document.documentElement.clientWidth,
                getPaddingRight: parseInt(
                    window.getComputedStyle(document.documentElement)
                        .paddingRight,
                    10
                ),
            };
            scrollY.current = window.scrollY;
            scrollX.current = window.scrollX;

            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.paddingRight =
                prevOverflow.current?.scrollBarGap +
                prevOverflow.current?.getPaddingRight +
                "px";
        }
    }, []);

    const restoreOverflowHiddenSetting = useCallback(() => {
        if (prevOverflow.current !== undefined) {
            document.documentElement.style.overflow =
                prevOverflow.current?.overflow;
            document.documentElement.style.paddingRight =
                prevOverflow.current?.paddingRight;

            window.scrollTo(scrollX.current, scrollY.current);

            scrollX.current = undefined;
            scrollY.current = undefined;
            prevOverflow.current = undefined;
        }
    }, []);

    const disableBodyScroll = useCallback(() => {
        setOverflowHidden();
    }, [setOverflowHidden]);

    const enableBodyScroll = useCallback(() => {
        restoreOverflowHiddenSetting();
    }, [restoreOverflowHiddenSetting]);

    useIsomorphicLayoutEffect(() => {
        isLocked ? disableBodyScroll() : enableBodyScroll();

        return () => enableBodyScroll();
    }, [isLocked]);
};

/**
 *
 * @param {object = {current: Element}} ref from useRef()
 * @param {object = {root: Element, rootMargin: String, threshold: Number}} options opts
 * @returns Boolean
 */
export const useInView = (ref, options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        const callback = (entries) => {
            setIsIntersecting(entries[0].isIntersecting);
        };

        observer?.disconnect();

        if (ref.current) {
            const _observer = new IntersectionObserver(callback, options);
            _observer.observe(ref);
            setObserver(_observer);
        }

        return () => {
            observer?.disconnect();
        };
    }, [ref.current, options.root, options.rootMargin, options.threshold]);

    return isIntersecting;
};

export const useLocalStorage = (key, defaultValue) => {
    const [oldKey, setOldKey] = useState(key);
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        if (item !== null) {
            try {
                return JSON.parse(item);
            } catch {
                return defaultValue;
            }
        }
        return defaultValue;
    });

    useEffect(() => {
        const rawValue = JSON.stringify(value);
        localStorage.setItem(key, rawValue);
        localStorage.removeItem(oldKey);
        setOldKey(key);
    }, [key, value]);

    return [value, setValue];
};

/**
 *
 * @param {void, boolean} value Value for controlled state
 * @param {void, boolean} defaultValue Initial value for uncontrolled state
 * @param {void, boolean} finalValue Final value for uncontrolled state when value and defaultValue are not provided
 * @param {void} onChange ontrolled state onChange handler
 * @returns
 */
export function useUncontrolled({
    value,
    defaultValue,
    finalValue,
    onChange = () => {},
}) {
    const [uncontrolledValue, setUncontrolledValue] = useState(
        defaultValue !== undefined ? defaultValue : finalValue
    );

    const handleUncontrolledChange = (val) => {
        setUncontrolledValue(val);
        onChange?.(val);
    };

    if (value !== undefined) {
        return [value, onChange, true];
    }

    return [uncontrolledValue, handleUncontrolledChange, false];
}

export const DOTS = "dots";

/**
 *
 * @param {number} total Page selected on initial render, defaults to 1
 * @param {number} initialPage Controlled active page number
 * @param {number} page Total amount of pages
 * @param {number} siblings Siblings amount on left/right side of selected page, defaults to 1
 * @param {number} boundaries Amount of elements visible on left/right edges, defaults to 1
 * @param {void} onChange Callback fired after change of each page
 * @returns
 */
export function usePagination({
    total,
    siblings = 1,
    boundaries = 1,
    page,
    initialPage = 1,
    onChange,
}) {
    const _total = Math.max(Math.trunc(total), 0);
    const [activePage, setActivePage] = useUncontrolled({
        value: page,
        onChange,
        defaultValue: initialPage,
        finalValue: initialPage,
    });

    const setPage = (pageNumber) => {
        if (pageNumber <= 0) {
            setActivePage(1);
        } else if (pageNumber > _total) {
            setActivePage(_total);
        } else {
            setActivePage(pageNumber);
        }
    };

    const next = () => setPage(activePage + 1);
    const previous = () => setPage(activePage - 1);
    const first = () => setPage(1);
    const last = () => setPage(_total);

    const paginationRange = useMemo(() => {
        const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
        if (totalPageNumbers >= _total) {
            return range(1, _total);
        }

        const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
        const rightSiblingIndex = Math.min(
            activePage + siblings,
            _total - boundaries
        );

        const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
        const shouldShowRightDots =
            rightSiblingIndex < _total - (boundaries + 1);

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = siblings * 2 + boundaries + 2;
            return [
                ...range(1, leftItemCount),
                DOTS,
                ...range(_total - (boundaries - 1), _total),
            ];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = boundaries + 1 + 2 * siblings;
            return [
                ...range(1, boundaries),
                DOTS,
                ...range(_total - rightItemCount, _total),
            ];
        }

        return [
            ...range(1, boundaries),
            DOTS,
            ...range(leftSiblingIndex, rightSiblingIndex),
            DOTS,
            ...range(_total - boundaries + 1, _total),
        ];
    }, [_total, siblings, activePage]);

    return {
        range: paginationRange,
        active: activePage,
        setPage,
        next,
        previous,
        first,
        last,
    };
}

export const useRouteChangeStart = (fn) => {
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", fn || null);
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
            router.events.off("routeChangeStart", fn || null);
        };
    }, [router]);
};

export function useToggle(options = [false, true]) {
    const [[option], toggle] = useReducer((state, action) => {
        const value = action instanceof Function ? action(state[0]) : action;
        const index = Math.abs(state.indexOf(value));

        return state.slice(index).concat(state.slice(0, index));
    }, options);

    return [option, toggle];
}

export function useWindowEvent(type, listener, options) {
    useEffect(() => {
        window.addEventListener(type, listener, options);
        return () => window.removeEventListener(type, listener, options);
    }, [type, listener]);
}

const eventListerOptions = {
    passive: true,
};

export function useViewportSize(listener) {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const setSize = useCallback((e) => {
        setWindowSize({
            width: window.innerWidth || 0,
            height: window.innerHeight || 0,
        });
        if (typeof listener === "function") listener(e);
    }, []);

    useWindowEvent("resize", setSize, eventListerOptions);
    useWindowEvent("orientationchange", setSize, eventListerOptions);
    useEffect(setSize, []);

    return windowSize;
}

// the required distance between touchStart and touchEnd to be detected as a swipe
const minSwipeDistance = 50;

export function useSwipesHoriziontal(options = { onLeftSwipe, onRightSwipe }) {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const ref = useRef(null);
    const onTouchstart = useCallback((e) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    }, []);
    const onTouchmove = useCallback(
        (e) => setTouchEnd(e.targetTouches[0].clientX),
        []
    );
    const onTouchend = useCallback(() => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe) {
            if (isLeftSwipe) {
                if (typeof options.onLeftSwipe === "function")
                    options.onLeftSwipe();
            } else {
                if (typeof options.onRightSwipe === "function")
                    options.onRightSwipe();
            }
        }
    }, [touchStart, touchEnd]);

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("touchstart", onTouchstart);
            ref.current.addEventListener("touchmove", onTouchmove);
            ref.current.addEventListener("touchend", onTouchend);

            return () => {
                ref.current?.removeEventListener("touchstart", onTouchstart);
                ref.current?.removeEventListener("touchmove", onTouchmove);
                ref.current?.removeEventListener("touchend", onTouchend);
            };
        }

        return undefined;
    }, [ref.current, touchStart, touchEnd]);

    return ref;
}

export function useThrottle(value, interval = 500) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        if (Date.now() >= lastExecuted.current + interval) {
            lastExecuted.current = Date.now();
            setThrottledValue(value);
        } else {
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
            }, interval);

            return () => clearTimeout(timerId);
        }
    }, [value, interval]);

    return throttledValue;
}
