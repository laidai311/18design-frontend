/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

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

export function useEventListener(type, listener, options) {
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener(type, listener, options);
            return () =>
                ref.current?.removeEventListener(type, listener, options);
        }
        return undefined;
    }, [listener, options]);

    return ref;
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
    }, []);

    return { ref, hovered };
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

export const useDetectKeyboardOpen = (minKeyboardHeight = 300, defaultValue = false) => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(defaultValue);

    useEffect(() => {
        const listener = () => {
            const newState =
                window.screen.height - minKeyboardHeight > window.visualViewport.height;
            if (isKeyboardOpen != newState) {
                setIsKeyboardOpen(newState);
            }
        };

        if (typeof visualViewport != 'undefined') {
            window.visualViewport.addEventListener('resize', listener);
        }

        const handleOff = () => {
            setIsKeyboardOpen(false);
        };

        document.addEventListener('focusout', handleOff);

        return () => {
            if (typeof visualViewport != 'undefined') {
                window.visualViewport.removeEventListener('resize', listener);
            }
            document.removeEventListener('focusout', handleOff);
        };
    }, []);

    return isKeyboardOpen;
};

export const useWindowHeight = () => {
    const isDetectKeyboardOpen = useDetectKeyboardOpen();
    useEffect(() => {
        const isMobile =
            typeof window === 'object'
                ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      window.navigator.userAgent
                  )
                : false;
        const syncHeight = () => {
            if (isDetectKeyboardOpen && isMobile) return;

            document.documentElement.style.setProperty(
                '--window-height',
                `${window.innerHeight}px`
            );
        };
        syncHeight();

        window.addEventListener(
            'orientationchange',
            function () {
                // Generate a resize event if the device doesn't do it
                window.dispatchEvent(new Event('resize'));
            },
            false
        );

        window.addEventListener('resize', syncHeight);
        return () => {
            window.removeEventListener('resize', syncHeight);
        };
    }, []);
};
