import { useState } from "react";

function Comment() {
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const validateField = (fieldName, value, regex, errorMessage) => {
        if (!regex.test(value)) {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [fieldName]: errorMessage,
            }));
        } else {
            setErrorMessages((prevErrors) => ({
                ...prevErrors,
                [fieldName]: undefined,
            }));
        }
    };
    console.log(errorMessages);
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessages({});

        validateField("name", name, /^[A-Za-z\s]+$/, "Họ tên không hợp lệ.");
        validateField("comment", comment, /^.{1,}$/, "Vui lòng điền thông tin");

        const hasErrors = Object.values(errorMessages).some(
            (errorMessage) => errorMessage !== undefined
        );

        if (!hasErrors) {
            try {
                setName("");
                setComment("");
                console.log("Dữ liệu form:", { name, comment });
            } catch (error) {
                console.error("Lỗi khi gửi", error);
            }
        }
    };
    return (
        <div className="bg-black bg-opacity-5 p-6">
            <h2 className="text-lg font-bold mb-4">Bình luận</h2>
            <div className="flex flex-col space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Dai Lai</h3>
                    <p className="text-gray-700 text-sm mb-2">11/09/2023</p>
                    <p className="text-gray-700">
                        This is a sample comment. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Thuý kiều</h3>
                    <p className="text-gray-700 text-sm mb-2">16/09/2023</p>
                    <p className="text-gray-700">
                        I agree with John. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold">Thuý vân</h3>
                    <p className="text-gray-700 text-sm mb-2">15/09/2023</p>
                    <p className="text-gray-700">
                        I have a different opinion. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
                <form
                    className="bg-white p-4 rounded-lg shadow-md"
                    onSubmit={handleSubmit}
                >
                    <h3 className="text-lg font-bold mb-2">Thêm bình luận</h3>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="name"
                        >
                            Họ và Tên *
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Nhập họ và tên"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errorMessages.name && (
                            <p className="text-red-500">{errorMessages.name}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 font-bold mb-2 "
                            htmlFor="comment"
                        >
                            Bình luận *
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="comment"
                            rows="3"
                            placeholder="Bạn muốn viết gì đó ..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        {errorMessages.comment && (
                            <p className="text-red-500">
                                {errorMessages.comment}
                            </p>
                        )}
                    </div>
                    <button
                        className="bg-yellow-600 hover:bg-cyan-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Phản hồi
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Comment;
