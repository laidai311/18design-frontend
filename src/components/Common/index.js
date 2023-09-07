import Link from "next/link";
import { Card, CardDescription, CardMedia, Space } from "../Styled/Card";
import { Img } from "../UI";
import { Flex } from "../Styled/Common";
import { IconAnglesRight, IconEye } from "../Icons";

export const CardItem = ({ image_link, title, total_view, location }) => {
    return (
        <div>
            <Card>
                <CardMedia className="card-media">
                    <Link href={location || "/"}>
                        <Img data-src={image_link || ""} />
                    </Link>
                </CardMedia>
                <CardDescription>
                    <Link href={location || "/"}>
                        <h5>{title || ""}</h5>
                    </Link>
                    <Flex $justify="space-between">
                        <Space $center>
                            <IconEye />
                            <span>{total_view}</span>
                        </Space>
                        <Link href={location || "/"}>
                            <Space $center>
                                <span>Chi tiết</span>
                                <IconAnglesRight />
                            </Space>
                        </Link>
                    </Flex>
                </CardDescription>
            </Card>
        </div>
    );
};
