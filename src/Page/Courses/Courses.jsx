import { useContext, useEffect, useState } from "react";
import Loader from "../../Utils/Loader/Loader";
import Pagination from "../../Utils/Pagination/Pagination";
import {CartContext} from "../../ContextAPIs/CartContext";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // real api
  useEffect(() => {
      const fetchCourse = async () => {
          try {
              const res = await fetch(`${import.meta.env.VITE_PROJECT_URL}/api/get-course-list`);
              const data = await res.json();

              // console.log(data.courseData);

              setCourses(data.courseData || []);
          } catch (error) {
              if (import.meta.env.DEV) {
                  console.error(error);
              }
          } finally {
              setLoading(false);
          }
      }

      fetchCourse();
  }, []);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const res = await fetch("/data.json");
  //       const data = await res.json();

  //       setCourses(data);
  //     } catch (error) {
  //       if (import.meta.env.DEV) {
  //         console.error(error);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const currentCourses = courses.slice(firstIndex, lastIndex);

  // add to cart context
  const { addToCart } = useContext(CartContext);

  return (
    <div className="m-mt_16px">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentCourses.map((course) => {
              const regularPrice = Number(course.regular_price);
              const discountedPrice = Number(course.discount_price);

              const percentage = Math.round(
                ((regularPrice - discountedPrice) / regularPrice) * 100,
              );

              const percent = regularPrice > 0 ? percentage : 0;

              return (
                <div
                  key={course.course_label_id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={course.photo}
                      alt={course.course_name}
                      className="w-full h-52 object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="text-gray-800 text-lg font-semibold mb-2">
                      {course.course_name}
                    </h2>

                    <div className="flex items-center justify-between mb-4">
                      <span className="flex text-blue-500 text-md">★★★★★</span>

                      <span className="ml-2 text-gray-600 text-md font-bold">
                        {course.trainer_data.name}
                      </span>
                    </div>

                    <p className="text-gray-600 text-md mb-4">
                      Course Details{" "}
                      <span className="text-blue-500">Show Details</span>
                    </p>

                    <hr />

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <span className="line-through text-gray-400 text-sm">
                          Tk {regularPrice}
                        </span>

                        <span className="text-green-600 text-md font-bold ml-2">
                          -{percent}%
                        </span>

                        <span className="text-black text-lg font-bold ml-2">
                          Tk {discountedPrice}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={() => addToCart(course)}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full font-bold text-md"
                        >
                            Add To Cart
                        </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Pagination
            totalItems={courses.length}
            itemsPerPage={perPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Courses;