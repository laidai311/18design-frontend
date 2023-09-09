import DefaultLayout from "@/components/Layout";
import Component404 from "@/components/404";

export default function Page() {
    return <Component404 message={"Không thể tìm thấy trang bạn yêu cầu."} />;
}

Page.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;
