import { EMAIL, PHONE } from "@/constant/default";
import { IconBook, IconEnvelope, IconPhone, IconZalo } from "../Icons";
import {
    FloatIcon,
    FloatLeft,
    FloatRight,
    PulseRing,
} from "../Styled/Layout/FloatButton";
import { useStore } from "@/stores";

export default function FloatButton({ onContactClick }) {
    const { defaultPage, defaultPageLoading: defaultPageStatus } = useStore();

    return defaultPageStatus === "loading" ? null : (
        <>
            <FloatLeft $bottom={170}>
                <a
                    href={`tel:${defaultPage?.phone || PHONE}`}
                    className="tooltip"
                >
                    <FloatIcon>
                        <PulseRing />
                        <IconPhone
                            style={{ position: "relative" }}
                            width={22}
                            height={22}
                        />
                    </FloatIcon>
                    <span className="tooltiptext">
                        Gọi ngay: {defaultPage?.phone || PHONE}
                    </span>
                </a>
            </FloatLeft>
            <FloatLeft $bottom={110}>
                <a
                    href={`mailto:${defaultPage?.email || EMAIL}`}
                    className="tooltip"
                >
                    <FloatIcon>
                        <IconEnvelope width={24} height={24} />
                    </FloatIcon>
                    <span className="tooltiptext">
                        {defaultPage?.email || EMAIL}
                    </span>
                </a>
            </FloatLeft>
            <FloatLeft $bottom={50}>
                <a
                    target="_blank"
                    href={`https://zalo.me/${defaultPage?.phone || PHONE}`}
                    className="tooltip"
                >
                    <FloatIcon>
                        <IconZalo width={24} height={24} />
                    </FloatIcon>
                    <span className="tooltiptext">
                        Zalo:{defaultPage?.phone || PHONE}
                    </span>
                </a>
            </FloatLeft>
            <FloatRight>
                <button
                    onClick={onContactClick || null}
                    className="px-5 py-3 font-medium text-white rounded-t-lg hover:shadow inline-flex space-x-2 items-center justify-center bg-primary transition-colors"
                >
                    <IconBook />
                    <span>Nhận tư vấn thiết kế</span>
                </button>
            </FloatRight>
        </>
    );
}
