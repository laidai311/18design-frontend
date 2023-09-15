import { styled } from "styled-components";
import { Container } from "../Styled";
import Link from "next/link";
import { Img } from "../UI";

const Category = styled.div`
    padding: 30px 0 80px;
`;
const CategoryList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, auto);
    gap: 30px;

    @media (max-width: 992px) {
        grid-template-columns: repeat(2, auto);
    }
    @media (max-width: 456px) {
        grid-template-columns: repeat(1, auto);
    }
`;
export const CategoryTitle = styled.div`
    text-align: center;
    margin-bottom: 30px;

    & h3 {
        display: inline;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
        border-bottom: 1px solid #bd8b1b;
    }
`;
const CategoryItem = styled.div`
    & .category__card {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
    }
    & a {
        position: relative;
        display: block;
        &:before {
            content: "";
            position: absolute;
            top: 0;
            border-radius: 8px;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            opacity: 0.7;
            z-index: 1;
            transition: opacity 0.3s ease;
        }
    }
    & img {
        border-radius: 8px;
        transition: transform 0.3s ease;
    }
    & :hover img {
        transform: scale(1.1);
    }

    & p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        color: white;
        font-size: 18px;
        letter-spacing: 2.4px;
        font-weight: 700;
        white-space: nowrap;
        text-transform: capitalize;
    }
`;

const data = [
    {
        title: "Bàn ăn",
        slug: "ban-an",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/close-up-shiny-glassware-standing-dinner-plate_8353-664.jpg?w=1800&t=st=1694600303~exp=1694600903~hmac=e077623d4cf36a2470362dce321370885697fc7771cb98dc4c7e3b4f4e91df2f",
    },
    {
        title: "Ghế Sofa",
        slug: "ghe-sofa",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/interior-design-with-photoframes-plants_23-2149385437.jpg?w=1800&t=st=1694601751~exp=1694602351~hmac=181f1321234a6ed50047262b0ea1de8b75e45c7e3f9d1e23c52624c3ad53ffd8",
    },
    {
        title: "Giường Ngủ",
        slug: "ghe-sofa",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2173.jpg?w=1800&t=st=1694601835~exp=1694602435~hmac=8a3a00039c6ebada0553317f226139106c422dbd5c6b26c8631d2c6eec2ff03e",
    },
    {
        title: "Bàn làm việc",
        slug: "ban-lam-viec",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/high-angle-desk-arrangement-with-laptop_23-2149013955.jpg?w=1800&t=st=1694601958~exp=1694602558~hmac=66bc0d32f5e03754f2a06c3b083c4b10abe6e852b4fbb213b1503e07eeeddca8",
    },
    {
        title: "Tủ bếp",
        slug: "ban-lam-viec",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/kitchen-dining-room-modern-apartment_181624-58526.jpg?w=1800&t=st=1694602493~exp=1694603093~hmac=707b49acd9beb11bb90d216692b4f90c6d8e3697a1495f058cfc9d1eda818645",
    },
    {
        title: "Ghế văn phòng",
        slug: "ban-lam-viec",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/model-career-kit-still-life_23-2150217982.jpg?w=1800&t=st=1694602809~exp=1694603409~hmac=a007400bc07241993f2ebd52b744beb6a7d403530d169f66fbf459cb0ff379b8",
    },
    {
        title: "Tủ quần áo",
        slug: "ban-lam-viec",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/3d-rendering-luxury-scandinavian-wood-walk-closet-with-wardrobe-make-up-table_105762-2147.jpg?w=1800&t=st=1694602741~exp=1694603341~hmac=6983e0b3fcfc4814aa616ddbd922e1b217bd69c006bed817efddbe672be6b0d7",
    },
    {
        title: "Bàn trang điểm",
        slug: "ban-lam-viec",
        image_name: "images",
        image_link:
            "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?t=st=1694603312~exp=1694603912~hmac=795fd76e9a978ad4d60e391534c51439e52f291fbc463c40acc93b62999ce51a",
    },
];

export function CategorySection({ category_images, category_list = data }) {
    console.log(category_list);
    return (
        <Category className="category__product">
            <Container>
                <CategoryTitle>
                    <h2 className="relative text-2xl uppercase text-center mb-10 px-6 after:absolute after:h-1 after:w-20 after:bg-primary after:left-[calc(50%-40px)] after:-bottom-3">
                        Danh mục nổi bật
                    </h2>
                </CategoryTitle>
                <CategoryList>
                    {Array.isArray(category_list)
                        ? category_list.map((item, index) => (
                              <CategoryItem key={index}>
                                  <div className="category__card">
                                      <Link
                                          href={`/san-pham/${item?.slug || ""}`}
                                      >
                                          <Img
                                              alt={item?.image_name || ""}
                                              src={item?.image_link || ""}
                                          />
                                          <p>{item?.title || ""}</p>
                                      </Link>
                                  </div>
                              </CategoryItem>
                          ))
                        : null}
                </CategoryList>
            </Container>
        </Category>
    );
}
