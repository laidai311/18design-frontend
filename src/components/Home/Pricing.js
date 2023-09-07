import { styled } from "styled-components";
import { IconBox, IconEmail, IconHandMoney, IconHomeDesign, IconPhone, IconUser } from "../Icons";
import { Container } from "../Styled";

const PricingDesign = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
`;
export const PricingTitle = styled.div`
  text-align: center;

  & h2 {
    margin-bottom: 50px;
    display: inline-block;
    padding: 0px 25px;
    line-height: 50px;
    position: relative;
    font-weight: 500;
    font-size: 24px;
    text-transform: uppercase;
  }
  & :after {
    position: absolute;
    bottom: -10px;
    content: "";
    height: 3px;
    width: 80px;
    left: calc(50% - 40px);
    background: #bd8b1b;
  }
`;
const PricingBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  gap: 20px;

  @media (max-width:992px) {
  grid-template-columns: repeat(1, auto);
  }
`;
const PricingItem = styled.div`
  overflow: hidden;
`;
const PricingSubmit = styled.button`
  font-weight: bold;
  font-size: 17px;
  border-radius: 5px;
  display: block;
  width: 100%;
  box-shadow: none;
  border: none;
  color: #fff;
  padding: 15px 0;
  text-transform: uppercase;
  background: linear-gradient(90deg, rgba(189, 139, 27, 1) 6%, rgba(244, 217, 116, 1) 50%, rgba(189, 139, 27, 1) 100%);
`;
const FromPricing = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  & select,
  input {
    width: 100%;
    padding: 12px;
    border: none;
    border-left: 1px solid #dcdcdc;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  & select:focus {
    outline: none; /* Loại bỏ viền xung quanh */
    box-shadow: none; /* Loại bỏ bóng đổ */
  }
`;
const LabelPricing = styled.label`
  display: flex;
  align-items: center;
  border: 1px solid #ced4da;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const BoxIcon = styled.div`
  padding: 10px 15px;
`;
export function Pricing() {
  return (
    <PricingDesign>
      <Container>
        <PricingTitle>
          <h2>DỰ DOÁN CHI PHÍ THIẾT KẾ – THI CÔNG</h2>
        </PricingTitle>
        <PricingBlock>
          <PricingItem>
            <FromPricing>
              <LabelPricing>
                <BoxIcon>
                  <IconHomeDesign />
                </BoxIcon>
                <select name="menu-862">
                  <option value="Phong cách thiết kế">Phong cách thiết kế</option>
                  <option value="Hiện đại">Hiện đại</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Tân cổ điển">Tân cổ điển</option>
                </select>
              </LabelPricing>
              <LabelPricing>
                <BoxIcon>
                  <IconHandMoney />
                </BoxIcon>
                <select name="menu-863">
                  <option value="Mức độ đầu tư">Mức độ đầu tư</option>
                  <option value="Thấp">Thấp</option>
                  <option value="Trung cấp">Trung cấp</option>
                  <option value="Cao cấp">Cao cấp</option>
                </select>
              </LabelPricing>
              <LabelPricing>
                <BoxIcon>
                  <IconBox />
                </BoxIcon>
                <input placeholder="Tổng diện tích (m2)" />
              </LabelPricing>
              <LabelPricing>
                <BoxIcon>
                  <IconUser />
                </BoxIcon>
                <input placeholder="Họ và tên" />
              </LabelPricing>
              <LabelPricing>
                <BoxIcon>
                  <IconPhone />
                </BoxIcon>
                <input placeholder="Số điện thoại" />
              </LabelPricing>
              <LabelPricing>
                <BoxIcon>
                  <IconEmail />
                </BoxIcon>
                <input placeholder="Email" />
              </LabelPricing>
              <PricingSubmit type="submit">Dự tính chi phí</PricingSubmit>
            </FromPricing>
          </PricingItem>
          <PricingItem>
            <img src="https://noithatdreamhome.vn/wp-content/uploads/2022/10/281465686_187213376971013_1046231756504008806_n.jpg" />
          </PricingItem>
        </PricingBlock>
      </Container>
    </PricingDesign>
  );
}
