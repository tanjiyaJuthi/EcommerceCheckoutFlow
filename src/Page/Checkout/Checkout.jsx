import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CartContext } from "../../ContextAPIs/CartContext";

const Checkout = () => {
    const navigate = useNavigate();

    const {
        cart,
        increase,
        decrease,
        removeFromCart,
    } = useContext(CartContext);

    const [formData, setFormData] = useState({
        admission_date: "",
        photo: null,

        name: "",
        father_name: "",
        father_phone_no: "",

        school_collage_name: "",
        job_title: "",

        email: "",
        gender: "",

        present_address: "",
        permanent_address: "",

        nid_no: "",
        phone_no: "",

        local_guardian_name: "",
        local_guardian_phone_no: "",

        date_of_birth: "",
        blood_group: "",

        course_id: "",
        course_fee: "",
        course_qty: "",
        total_course_fee: "",
        discount_course_fee: "",
        sub_total_course_fee: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitData = new FormData();

        // User fields
        Object.keys(formData).forEach((key) => {
            if (
                ![
                    "course_id",
                    "course_fee",
                    "course_qty",
                    "total_course_fee",
                    "discount_course_fee",
                    "sub_total_course_fee",
                ].includes(key)
            ) {
                submitData.append(key, formData[key]);
            }
        });

        submitData.append("course_id", cart.id);
        submitData.append("course_fee", cart.regular_price);
        submitData.append("course_qty", cart.quantity);
        submitData.append(
            "total_course_fee",
            Number(cart.regular_price) * cart.quantity
        );
        submitData.append(
            "discount_course_fee",
            cart.discount_price
        );
        submitData.append(
            "sub_total_course_fee",
            Number(cart.discount_price) * cart.quantity
        );

        // console.log([...submitData.entries()]);

        navigate("/order-details", {
            state: {
                orderId: 1234,
                userData: formData,
                cart,
            },
        });
    };

    if (!cart) {
        return (
            <h2 className="text-center text-2xl mt-10 font-bold">
                Cart Empty
            </h2>
        );
    }

    const totalPrice = Number(cart.discount_price) * cart.quantity;

    return (
        <div className="  mt-5 border mx-2">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Checkout</h2>
            </div>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                {/* Trainee Information Section */}
                <div className="form-section">
                    {/* Admission Date & Photo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block font-semibold mb-2">
                                Admission Date
                            </label>

                            <input
                                type="date"
                                required
                                name="admission_date"
                                value={formData.admission_date}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Photo
                            </label>

                            <input
                                type="file"
                                required
                                name="photo"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* Name & Father's Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                        <div>
                            <label className="block font-semibold mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Father's Name
                            </label>

                            <input
                                type="text"
                                required
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                    </div>

                    {/* Father's Phone & Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block font-semibold mb-2">
                                Father's Phone
                            </label>

                            <input
                                type="text"
                                required
                                name="father_phone_no"
                                value={formData.father_phone_no}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Phone Number
                            </label>

                            <input
                                type="text"
                                required
                                name="phone_no"
                                value={formData.phone_no}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                    </div>

                    {/* School & Job */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                        <div>
                            <label className="block font-semibold mb-2">
                                School / College
                            </label>

                            <input
                                type="text"
                                required
                                name="school_collage_name"
                                value={formData.school_collage_name}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Job Title
                            </label>

                            <input
                                type="text"
                                required
                                name="job_title"
                                value={formData.job_title}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                    </div>

                    {/* Email & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block font-semibold mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Gender
                            </label>

                            <select
                            required
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block font-semibold mb-2">
                                Present Address
                            </label>

                            <textarea
                                rows="4"
                                required
                                name="present_address"
                                value={formData.present_address}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Permanent Address
                            </label>

                            <textarea
                                rows="4"
                                required
                                name="permanent_address"
                                value={formData.permanent_address}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* NID & DOB */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block font-semibold mb-2">
                                NID Number
                            </label>

                            <input
                                type="text"
                                required
                                name="nid_no"
                                value={formData.nid_no}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                required
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* Guardian */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label className="block font-semibold mb-2">
                                Local Guardian Name
                            </label>

                            <input
                                type="text"
                                required
                                name="local_guardian_name"
                                value={formData.local_guardian_name}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Guardian Phone
                            </label>

                            <input
                                type="text"
                                required
                                name="local_guardian_phone_no"
                                value={formData.local_guardian_phone_no}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div className="mb-8">
                        <label className="block font-semibold mb-2">
                            Blood Group
                        </label>

                        <select
                            name="blood_group"
                            value={formData.blood_group}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>

                <div className="m-mt_16px">
                    <div className="pt-p_16px">
                        <div className="lg:flex items-start gap-3">
                            <div className="w-full lg:w-[58%] bg-white border-2">
                                <table className=" overflow-x-auto  w-full">
                                    <thead>
                                        <tr className="border-b-4 border-gray-300">
                                            <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                                                Course
                                            </th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Price
                                            </th>
                                            {/* <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Quantity
                                            </th> */}
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="overflow-x-auto ">

                                        <tr className="border-b border-gray-300 overflow-x-auto">
                                            <td>
                                                <div className="flex items-center justify-center ">
                                                    <div className="w-[20%] text-center flex items-center justify-center ">
                                                        <RiDeleteBin5Line
                                                            onClick={removeFromCart}
                                                            className="text-xl hover:text-footer_color cursor-pointer"

                                                        />
                                                    </div>
                                                    <div className="flex flex-col text-center justify-center items-center py-2  w-[80%]">
                                                        <div className="mask">
                                                            <img
                                                                className="h-[40px] w-[70px]"
                                                                src={cart.photo}
                                                                alt={cart.course_name}
                                                            />
                                                        </div>
                                                        <p className="text-[14.4px] px-[7px] text-center flex ">
                                                            Course name  <span className="hidden lg:flex ">- {cart.course_name}</span>
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                                                    Tk {cart.discount_price}
                                                </p>
                                            </td>
                                            {/* <td>
                                                <div className="flex justify-center">
                                                    <div className="border">
                                                        <button
                                                            onClick={decrease}
                                                            className="px-4 w-[30px] font-bold font_standard my-1.5"

                                                        >
                                                            -
                                                        </button>
                                                    </div>
                                                    <div className="border-y">
                                                        <input
                                                            readOnly
                                                            value={cart.quantity}
                                                            type="number"
                                                            className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"

                                                        />
                                                    </div>
                                                    <div className="border">
                                                        <button
                                                            onClick={increase}
                                                            className="px-4 w-[30px] font-bold font_standard my-1.5"

                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </td> */}
                                            <td>
                                                <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
                                                    Tk {Number(cart.discount_price) * cart.quantity}
                                                </p>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className="lg:w-[41%] bg-white border-2 ">
                                <div className="px-[30px]">
                                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                                        Cart Summary
                                    </h2>
                                    <div className="py-3 flex justify-between border-b border-gray-300">
                                        <p className="text-black font-bold">Total Price</p>
                                        <p className="text-black font-bold">
                                            Tk {totalPrice}
                                        </p>
                                    </div>

                                    <button
                                        state={"bdt"}
                                        className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4  block text-center mx-auto w-full"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;
