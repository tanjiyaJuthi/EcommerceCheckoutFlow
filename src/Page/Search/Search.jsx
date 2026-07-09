import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";

const Search = () => {
    const [searchData, setSearchData] = useState({
        form_no: "",
        phone_no: "",
    });

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearch = async () => {
        if (!searchData.form_no || !searchData.phone_no) {
            toast.warning("Please enter Form No and Phone Number");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                "https://itder.com/api/search-purchase-data",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(searchData),
                }
            );

            const data = await res.json();

            console.log(data);

            if (data.success) {
                setOrder(data.data);
                toast.success("Order Found");
            } else {
                setOrder(null);
                toast.error(data.message || "Order not found");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">

            <div className="w-full max-w-xl">

                <h1 className="text-3xl font-bold mb-8">
                    Search Order
                </h1>

                <input
                    type="text"
                    name="form_no"
                    placeholder="Form Number"
                    value={searchData.form_no}
                    onChange={handleChange}
                    className="border w-full p-3 rounded mb-4"
                />

                <div className="relative">

                    <input
                        type="text"
                        name="phone_no"
                        placeholder="Phone Number"
                        value={searchData.phone_no}
                        onChange={handleChange}
                        className="border w-full p-3 rounded"
                    />

                    <IoMdSearch
                        onClick={handleSearch}
                        className="absolute right-4 top-3 text-2xl cursor-pointer"
                    />

                </div>

                <button
                    onClick={handleSearch}
                    className="mt-5 w-full bg-blue-600 text-white py-3 rounded"
                >
                    {loading ? "Searching..." : "Search"}
                </button>

                {order && (
                    <div className="mt-8 border rounded p-5 bg-white shadow">

                        <h2 className="text-xl font-bold mb-4">
                            Order Details
                        </h2>

                        <p>
                            <strong>Form No:</strong> {order.form_no}
                        </p>

                        <p>
                            <strong>Name:</strong> {order.name}
                        </p>

                        <p>
                            <strong>Phone:</strong> {order.phone_no}
                        </p>

                        <p>
                            <strong>Course:</strong> {order.course_name}
                        </p>

                        <p>
                            <strong>Quantity:</strong> {order.course_qty}
                        </p>

                        <p>
                            <strong>Total:</strong> Tk{" "}
                            {order.sub_total_course_fee}
                        </p>

                        <p>
                            <strong>Order ID:</strong> {order.order_id}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
};

export default Search;