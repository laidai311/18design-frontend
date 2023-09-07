import { IconBook, IconEnvelope, IconPhone, IconZalo } from "../Icons";
import {
    FloatAdviceButton,
    FloatIcon,
    FloatLeft,
    FloatRight,
    PulseRing,
} from "../Styled/Layout/FloatButton";

export default function FloatButton({ onContactClick }) {
    return (
        <>
            <FloatLeft bottom={170}>
                <a href="tel:0838586444" className="tooltip">
                    <FloatIcon>
                        <PulseRing />
                        <IconPhone
                            style={{ position: "relative" }}
                            width={22}
                            height={22}
                        />
                    </FloatIcon>
                    <span className="tooltiptext">Gọi ngay: 0838586444</span>
                </a>
            </FloatLeft>
            <FloatLeft bottom={110}>
                <a href="mailto:arch18designs@gmail.com" className="tooltip">
                    <FloatIcon>
                        <IconEnvelope width={24} height={24} />
                    </FloatIcon>
                    <span className="tooltiptext">arch18designs@gmail.com</span>
                </a>
            </FloatLeft>
            <FloatLeft bottom={50}>
                <a
                    target="_blank"
                    href="https://zalo.me/0838586444"
                    className="tooltip"
                >
                    <FloatIcon>
                        <IconZalo width={24} height={24} />
                    </FloatIcon>
                    <span className="tooltiptext">Zalo:0838586444</span>
                </a>
            </FloatLeft>
            <FloatRight>
                <FloatAdviceButton onClick={onContactClick || null}>
                    <IconBook />
                    <span>Nhận tư vấn thiết kế</span>
                </FloatAdviceButton>
            </FloatRight>
        </>
    );
}
