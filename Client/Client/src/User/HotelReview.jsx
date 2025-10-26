import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEdit, MdDelete, MdExpandLess, MdExpandMore } from "react-icons/md";

function HotelReview({ Formdata }) {
  console.log(Formdata, "Formdata from hotelreview.jsx file clg");
  const [Isopenreview, setopenreview] = useState(true);
  const IsCurrentuser = 1;

  // curd opertion for the form
  // edit task function to edit the form of(review/isssue)
  const editReview = async (FormId) => {
    try {
      if (!FormId) {
        console.log("some thing went wrong ! the edit id is missing");
        return alert("some thing went wrong !");
      }
      console.log(FormId, "FormId to edit the form.");
      alert(FormId);
      // calling api here
    } catch (err) {
      console.error(err.message);
    }
  };

  // delete function to delete the particular review/issue
  const deleteReview = async (FormId) => {
    try {
      if (!FormId) {
        console.log("some thing went wrong ! the delete id is missing");
        return alert("some thing went wrong !");
      }
      console.log(FormId, "FormId to delete the form.");
      alert(FormId);
      // calling api here
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Toggle Header */}
      <div
        onClick={() => setopenreview((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer text-blue-700 mb-6 hover:text-blue-900 transition"
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Hotel Reviews{" "}
          <span className="text-gray-500">({Formdata.length})</span>
        </h2>
        {Isopenreview ? (
          <MdExpandLess className="text-2xl" />
        ) : (
          <MdExpandMore className="text-2xl" />
        )}
      </div>

      {/* If open */}
      {Isopenreview && (
        <>
          {Formdata.length <= 0 ? (
            <div className="text-center text-gray-600 bg-white p-6 rounded-2xl shadow-sm w-[90%] sm:w-[70%] md:w-[45%]">
              <p className="text-lg font-medium">
                Be the first to review this hotel!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 w-full items-center">
              {Formdata.map((data, idx) => (
                <div
                  key={idx}
                  className="bg-white w-[90%] sm:w-[70%] md:w-[45%] p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <FaUserCircle className="text-5xl text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {data.ReviewName}
                      </h3>
                      <p className="text-sm text-gray-500">{data.ReviewType}</p>
                    </div>
                  </div>

                  {/* Review Dates */}
                  <div className="text-sm text-gray-400 mb-5 border-t pt-2">
                    <p>
                      <span className="font-medium text-gray-600">
                        Created:
                      </span>{" "}
                      {new Date(data?.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium text-gray-600">
                        Updated:
                      </span>{" "}
                      {new Date(data?.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {IsCurrentuser && (
                    <div className="flex justify-end gap-3">
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition cursor-pointer"
                        onClick={() => editReview(data._id)}
                      >
                        <MdEdit /> Edit
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition cursor-pointer"
                        onClick={() => deleteReview(data._id)}
                      >
                        <MdDelete /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HotelReview;
