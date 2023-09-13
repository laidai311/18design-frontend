import { formatCurrency } from "@/utils";
import Link from "next/link";
import { styled } from "styled-components";

const CardProduct = styled.div`
  border-radius: 12px;
  border: 0.5px solid #b9b9b9;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  & img {
    border-radius: 12px 12px 0px 0px;
  }
`;
const CardDescription = styled.div`
  padding: 20px;

  & h3 {
    font-size: 17px;
    font-weight: 700;
    line-height: normal;
    color: #616a7d;
  }

  & .group__price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
    & .price {
      font-size: 18px;
      line-height: 28px;
      font-weight: bold;
    }
    & .strike-price {
      letter-spacing: 0.4px;
      text-decoration-line: line-through;
      color: #d93535;
      font-size: 14px;
    }
  }
  & .detail__product-info {
    color: #0067c6;
    text-transform: uppercase;
    font-size: 14px;
  }
`;
export function CardProductItem() {
  const price = 1000000;
  return (
    <CardProduct>
      <div>
        <Link href="#">
          <img src="https://img.freepik.com/free-photo/chairs-prepared-group-therapy_23-2148856209.jpg?w=1480&t=st=1694603886~exp=1694604486~hmac=078a50c7f583e9afca21c5de04456d6849e39620946c9c27e2be8b7cce149934" />
        </Link>
      </div>
      <CardDescription>
        <Link href="#">
          <h3>Bàn học</h3>
          <div className="group__price">
            <p className="price">{formatCurrency(price)}</p>
            <p className="strike-price">{formatCurrency(price)}</p>
          </div>
        </Link>
        <a className="detail__product-info">Chi tiết</a>
      </CardDescription>
    </CardProduct>
  );
}
