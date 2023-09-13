import { BreadcrumbDetail } from "@/components/BreadcrumbDetail";
import { CategoryTitle } from "@/components/CategoryProduct";
import DefaultLayout from "@/components/Layout";
import ProductOther from "@/components/ProductOther";
import { SpecificationTab } from "@/components/SpecificationsTab";
import { Container } from "@/components/Styled";
import { ThumbDetail } from "@/components/ThumbDetail";
import { formatCurrency } from "@/utils";
import { styled } from "styled-components";

const ProductDetail = styled.div`
  & .detail {
    display: grid;
    grid-template-columns: repeat(2, 49%);
    gap: 20px;
    @media (max-width: 992px) {
      grid-template-columns: repeat(1, 100%);
    }
  }
`;
const ProductDescription = styled.div`
  padding: 0 20px;
  line-height: 0.8;
  & h3 {
    font-size: 32px;
    position: relative;
    text-transform: capitalize;
    &:after {
      content: "";
      position: absolute;
      bottom: -25%;
      left: 0;
      width: 100px;
      height: 2px;
      background-color: #d0b247;
    }
  }
  & .price__group {
    margin: 40px 0 20px;
    display: flex;
    gap: 40px;
    align-items: center;
    & .price {
      font-size: 24px;
      font-weight: 700;
    }
    & .old__price {
      text-decoration-line: line-through;
      color: #a9a9b2;
      font-size: 16px;
    }
  }
  & .materials,
  & .size {
    display: flex;
    gap: 30px;
    align-items: center;
    margin-top: 10px;
    letter-spacing: 0.8;
    & span {
      font-size: 18px;
      font-weight: 600;
    }
    & .option__name {
      & p {
        border: 1px solid #dfdfe2;
        padding: 10px;
        font-size: 12px;
        font-style: normal;
        font-weight: 300;
        line-height: 100%;
        letter-spacing: 0.5px;
      }
    }
  }
`;
const ButtonContact = styled.button`
  margin-top: 30px;
  border: 0.5px solid #282727;
  background: #282727;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2.2px;
  padding: 20px 25px;
`;
export default function Page() {
  return (
    <>
      <ProductDetail>
        <img src="https://img.freepik.com/-photo/stylish-scandinavian-living-room-with-design-mint-sofa-furnitures-mock-up-poster-map-plants-eleg_1258-152155.jpg?w=1800&t=st=1694598264~exp=1694598864~hmac=a8ba1aef84538545f49d24057796937b6f87262f81c9b687e36c925d56b28b22" />
        <BreadcrumbDetail />
        <Container>
          <div className="detail">
            <ThumbDetail />
            <ProductDescription>
              <h3>Ghế sofa</h3>
              <div className="price__group">
                <p className="price">{formatCurrency(8000000)}</p>
                <p className="old__price">{formatCurrency(12000000)}</p>
              </div>
              <div className="materials">
                <span>Vật liệu</span>

                <div className="option__name">
                  <p>Khung gỗ bọc vải - chân kim loại màu gold</p>
                </div>
              </div>
              <div className="size">
                <span>Kích thước</span>

                <div className="option__name">
                  <p>D1800 - R880 - C710 mm</p>
                </div>
              </div>
              <ButtonContact>Liên hệ</ButtonContact>
            </ProductDescription>
          </div>
          <SpecificationTab/>
          <CategoryTitle>
            <h3>Sản phẩm khác</h3>
          </CategoryTitle>
          <ProductOther />
        </Container>
      </ProductDetail>
    </>
  );
}
Page.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
