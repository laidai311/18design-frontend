import { IconXmark } from "../Icons";
import { CloseWrap, Main, Wrapper } from "../Styled/Layout/ContactForm";
import { Form } from "../UI";

export default function ContactForm({ onClose }) {
    return (
        <Wrapper>
            <CloseWrap>
                <button onClick={onClose || null}>
                    <IconXmark width={24} height={24} />
                </button>
            </CloseWrap>
            <Form
                style={{ width: "100%", height: "100%" }}
                onSubmit={(value) => {
                    console.log(value);
                }}
            >
                <Main>
                    <h3>
                        MIỄN PHÍ 100% <br /> PHÍ THIẾT KẾ NỘI THẤT
                    </h3>
                    <p>TRONG DUY NHẤT HÔM NAY</p>
                    <select
                        name="design_style"
                        placeholder="Phong cách thiết kế"
                    >
                        <option>Phong cách thiết kế</option>
                        <option>Hiện đại</option>
                        <option>Luxury</option>
                        <option>Tân cổ điển</option>
                    </select>
                    <select name="investment_level" placeholder="Mức độ đầu từ">
                        <option>Mức độ đầu tư</option>
                        <option>Thấp</option>
                        <option>Trung cấp</option>
                        <option>Cao cấp</option>
                    </select>
                    <input
                        type="number"
                        name="total_area"
                        placeholder="Tổng diện tích (m²)"
                        inputMode="decimal"
                    />
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Họ tên"
                        inputMode="text"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        inputMode="tel"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        inputMode="email"
                    />
                    <button type="submit">Dự tính chi phí</button>
                </Main>
            </Form>
        </Wrapper>
    );
}
