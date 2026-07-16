// import TrackOrder from "./TrackOrder";

import { useLocation } from "react-router-dom";

const OrderDetails = () => {
    const location = useLocation();

    const { order, course } = location.state || {};

    if (!order || !course) {
        return (
            <h2 className="text-center text-2xl mt-10">
                No order found.
            </h2>
        );
    }

    return (
            <div className=" m-mt_16px">
                <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
                    <div className="bg-white lg:p-p_30px w-full  ">
                        <div className="text-center  flex flex-col justify-center items-center ">
                            <p className="text-xl font-bold">Order Information</p>
                            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
                                Order Id :
                                <span className="font-semibold">
                                  {order.form_no}
                                </span>
                            </p>
                        </div>

                        <div className="w-full border flex flex-col md:flex-row md:items-start   md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4  ">
                            <div className="md:text-base text-sm flex-1  font-semibold   md:border-r-2 md:border-black md:pr-10">
                                <p className="font-bold md:mb-4 w-full">Shippiing Address</p>
                                <div className="space-y-1 w-full">
                                    <div className="flex items-center justify-between">
                                        <p>Full Name :</p>
                                        <p className="text-start">
                                            {order.name}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Permanent Address :</p>
                                        <p className="text-start">
                                            {order.permanent_address}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Present Address :</p>
                                        <p>{order.present_address    }</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p>Mobile :</p>
                                        <p>{order.phone_no}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="md:text-base text-sm  flex-1 font-semibold  md:ml-10 mt-m_medium">
                            <p className="font-bold  md:mb-4 w-full">Order Summary</p>
                            <div className="space-y-1 w-full">
                                <div className="flex items-center justify-between">
                                    <p>Subtotal Amount :</p>
                                    <p className="text-start">
                                        {order.sub_total_course_fee}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Total Amount :</p>
                                    <p className="text-start">
                                        {order.total_course_fee}
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="lg:my-8 md:my-6 my-8 px-p_4px">
                            <p className=" md:my-2 font-semibold">Courses:</p>
                            <table className="overflow-x-auto border w-full">
                                <thead className="b w-full">
                                    <tr className="text-sm ">
                                        <th className="lg:w-20 md:w-16 w-8 py-2 md:py-4 lg:py-6 border ">
                                            Image
                                        </th>
                                        <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                                            Course Name
                                        </th>
                                        <th className="lg:w-72 md:w-64 w-40 py-2 md:py-4 lg:py-6 border">
                                          Student   Name
                                        </th>
                                        <th className="lg:w-20 md:w-20 w-16 py-2 md:py-4 lg:py-6 border">
                                            Quantity
                                        </th>
                                        <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                                         Price
                                        </th>
                                        <th className="lg:w-20 md:w-20 w-16  py-2 md:py-4 lg:py-6 border text-center">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="md:text-base text-sm font-semibold">
                                    <tr>
                                        <td className="border text-center w-10 h-12 px-2">
                                            <img
                                                className="w-full h-full object-cover mx-auto"
                                                src={course.photo}
                                                alt={course.course_name}
                                            />
                                        </td>

                                        <td className="border text-center">
                                            {course.course_name}
                                        </td>

                                        <td className="border text-center">
                                            {order.name}
                                        </td>

                                        <td className="border text-center">
                                            {order.course_qty}
                                        </td>

                                        <td className="border text-center">
                                            Tk {order.course_fee}
                                        </td>

                                        <td className="border text-center">
                                            Tk {order.total_course_fee}
                                        </td>
                                    </tr>                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                   
                </div>
            </div>
    );
};

export default OrderDetails;
