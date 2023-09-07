import { styled } from "styled-components";
import { Container } from "../Styled";
import { Img } from "../UI";

const About = styled.div`
  padding-top: 50px;

  & h2 {
    font-size: 28px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  & h3 {
    text-align: center;
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  & h4 {
    font-size: 24px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  & p {
    margin-bottom: 20px;
    font-weight: 300;
  }

  & ul {
    list-style: inside;
    padding-left: 10px;

    & li {
      font-weight: 300;
      margin-bottom: 10px;
    }
  }
  & img {
    margin-bottom: 20px;
  }
`;

export function AboutUs() {
  return (
    <About>
      <Container>
        <div>
          <h2>Về chúng tôi</h2>
          <h3>18 Design - Công ty cổ phần kiến trúc và đầu tư xây dựng 18 Design</h3>
          <div>
            <p>
              <strong>18 Design</strong> là một trong những công ty hàng đầu về thiết kế và thi công kiến trúc - nội ngoại thất. Với slogan <span>“KIẾN TRÚC KHÁC BIỆT - KHÔNG GIAN ĐẶC BIỆT”</span> ,
              chúng tôi đề cao sáng tạo, đổi mới và cung cấp ý tưởng thiết kế tạo ra những không gian sống ý nghĩa, mang dấu ấn cá nhân, xứng tầm với phong cách, tầm nhìn của mọi gia chủ bằng tâm
              huyết, bằng, kinh nghiệm, sự nhiệt tình và sáng tạo của đổi ngũ <strong>18 Design</strong> . Đến với chúng tôi, bạn chắc chắn sẽ hài lòng về không gian sống của mình.
            </p>
            <p>
              Không gian sống của mỗi người thực sự rất quan trọng và luôn cần phải được đảm bảo rằng nó đẹp, có thể đáp ứng được nhu cầu sinh hoạt tối đa. Trên phương châm đặt chất lượng lên hàng
              đầu, công ty luôn nâng cao hoạt động theo quy trình khép kín thiết kế - thi công – sản xuất – lắp đặt – hoàn thiện nhằm đảm bảo chất lượng tốt nhất, cao cấp nhất cho khách hàng
            </p>
            <p>
              <strong>18 Design</strong> hội tụ những kiến trúc sư, nhà thiết kế và kỹ sư chuyên nghiệp, những nghệ nhân và thợ sản xuất thủ công tại xưởng sản xuất có trình độ cao kết hợp trang thiết
              bị máy móc hiện đại mang đến không gian thiết kế vượt trội về mặt chất lượng, đảm bảo nhu cầu sử dụng và tạo dựng niềm tin của khách hàng.
            </p>

            <h4>Đội ngũ của chúng tôi</h4>
            <p>
              <strong> Đội ngũ 18 Design</strong> – Bằng tất cả niềm đam mê và kiên định với mục tiêu, Công Ty Cổ Phần Kiến Trúc Và Đầu Tư Xây Dựng 18 Design từng bước trở thành Nhà thiết kế và thi
              công kiến trúc – nội ngoại thất, được các công ty RIKI Việt Nam, Truyền Thông Đậu Family, Imago Work hay tập đoàn Tài Tâm lựa chọn làm đối tác chiến lược trong các hạng mục, dự án thiết
              kế kiến trúc, thi công nội thất nhà mẫu, biệt thự, chung cư, văn phòng, nhà hàng khách sạn, quán bar cà phê, công trình công cộng,... <strong>18 Design</strong> ghi dấu ấn thiết kế nội
              thất sang trọng, thi công nội thất cao cấp trên các dự án: Vinhomes Timecity Park Hill, Vinhomes Royal City, Vinhomes Smartcity, One 18 Ngọc Lâm, Vinhomes D’capitale, Shophouse 124 Vĩnh
              Tuy, Lake View,...
            </p>
            <div>
              <p>
                Với <strong>18 Design</strong> chúng tôi hoạt động dựa trên những giá trị cốt lõi
              </p>
              <ul>
                <li>
                  Trung thực để phát triển bền vững, tận tâm, tận lực vì lợi ích chung của khách hàng. Luôn đặt chữ TÂM là nền tảng trong việc kinh doanh của doanh nghiệp, thượng tôn pháp luật và luôn
                  giữ vững đạo đức nghề nghiệp
                </li>
                <li>Đề cao tinh thần hợp tác cùng phát triển</li>
                <li>Tốc độ, hiệu quả, đảm bảo tiến độ nhanh nhưng không ẩu đoảng, nỗ lực để đảm bảo đúng và vượt qua cam kết với khách hàng</li>
                <li>
                  Chọn lọc tinh hoa nhất đảm bảo đủ đức, đủ tài để thực hiện nhiệm vụ, hướng tới sự chuyên nghiệp hóa, tự động hóa. Xem sáng tạo là sự thúc đẩy doanh nghiệp, tạo ra sự khác biệt và bản
                  sắc trong mỗi sản phẩm.
                </li>
                <li>Tôn trọng, tin cậy và đề cao chữ TÍN – lấy chữ TÍN là vũ khí cạnh tranh và bảo vệ chữ TÍN cũng như bảo vệ danh dự của chính mình</li>
              </ul>
              <p>
                <strong>“TẦM NHÌN”</strong> – “Luôn không ngừng vươn xa, trở thành biểu tượng niềm tin hàng đầu về thiết kế và thi công kiến trúc, nội ngoại thất cho mọi ngôi nhà Việt.”
              </p>
              <p>
                <strong>“SỨ MỆNH” - 18 Design</strong> cam kết cung cấp đến khách hàng những giá trị sáng tạo khi thiết kế và thi công để không gian sống của quý khách hàng trở nên tuyệt vời hơn, mang
                đến cho mọi tổ ẩm có một không gian sống cao cấp và chất lượng hàng đầu bằng chính sự trân quý, yêu thương và trách nhiệm đối với cuộc sống của con người và xã hội.
              </p>
            </div>
            <h4>Dịch vụ của chúng tôi</h4>
            <p>
              Bằng chính niềm đam mê và không ngừng học hỏi, <strong>18 Desgin</strong> luôn cập nhật và bắt kịp xu thế kiến trúc nội ngoại thất trong và ngoài nước. Mỗi sự cố gắng của chúng tôi đều
              đem lại cho khách hàng sự hài lòng. Các phong cách thiết kế được vận dụng khéo léo tinh tế trong từng không gian nhà ở nhưng vẫn mang dấu ấn riêng, cá tính riêng của chủ nhà.
            </p>
            <p> - Tư vấn thiết kế</p>
            <Img data-src={"./images/18-design-office.jpg"} />
            <p> - Thiết kế kiến trúc</p>
            <Img data-src={"./images/18-design-office.jpg"} />
            <p> - Thiết kế nội thất</p>
            <Img data-src={"./images/18-design-office.jpg"} />
            <p> - Thi công nội thất</p>
            <Img data-src={"./images/18-design-office.jpg"} />
            <p> - Trang trí nội thất</p>
            <Img data-src={"./images/18-design-office.jpg"} />

            <h4>XƯỞNG SẢN XUẤT ĐỒ GỖ</h4>
            <p>
              Nhằm đáp ứng một không gian nội thất tinh tế, Xưởng sản xuất nội thất <strong>18 Design</strong> không ngừng phát triển về mặt quy mô và tiếp tục khẳng định vị thế Chuyên gia sản xuất
              nội thất cao cấp trên thị trường Việt Nam.
            </p>
            <p>
              Chúng tôi hoạt động dựa trên quan điểm kinh doanh dịch vụ cao cấp, chất lượng tuyệt vời, cơ sở sản xuất cao cấp, thợ sản xuất giàu kinh nghiệm và hệ thống quản lý chất lượng nghiêm ngặt.
              Đặc biệt, chúng tôi luôn cập nhật mẫu mã mới phù hợp với phong cách thiết kế nội thất trên thị trường, mỗi sản phẩm nội thất mỗi chất liệu khác nhau đều có quy định bảo hành cụ thể, nhằm
              đem lại lợi ích thiết thực nhất cho khách hàng.
            </p>
            <Img data-src={"./images/18-design-office.jpg"} />
          </div>
        </div>
      </Container>
    </About>
  );
}
