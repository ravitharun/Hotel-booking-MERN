import React, { useState } from "react";

const HotelForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const stepNames = ["Basic Info", "Location", "Owner", "Rooms", "Hotel Info"];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      {/* Step Progress */}
      <div className="flex items-center mb-10">
        {stepNames.map((name, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center"
            onClick={prevStep}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 text-white font-semibold ${
                step === index + 1
                  ? "bg-blue-600"
                  : step > index + 1
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>
            <p className="text-sm text-gray-700 text-center">{name}</p>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-full mt-2 ${
                  step > index + 1 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Hotel Management Form
      </h2>

      {/* Step Content */}
      <div className="space-y-6">
        {step === 1 && (
          <>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Hotel Name
              </label>
              <input
                type="text"
                placeholder="Enter Hotel Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Chain Name
              </label>
              <input
                type="text"
                placeholder="Enter Chain Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="md:flex md:space-x-4">
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-700">
                  Star Category
                </label>
                <input
                  type="number"
                  placeholder="Enter Star Category"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2 font-medium text-gray-700">
                  Remaining Rooms
                </label>
                <input
                  type="number"
                  placeholder="Enter Remaining Rooms"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            {[
              "Address",
              "City",
              "State",
              "Country",
              "Zipcode",
              "Latitude",
              "Longitude",
              "Distance From Airport",
              "Distance From Railway Station",
            ].map((label, i) => (
              <div key={i}>
                <label className="block mb-2 font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={`Enter ${label}`}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                placeholder="Enter Owner Name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Owner Email
              </label>
              <input
                type="email"
                placeholder="Enter Owner Email"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            {[1, 2].map((room, i) => (
              <div
                key={i}
                className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm"
              >
                <h4 className="font-semibold mb-4">Room {i + 1}</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Room Type
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Room Type"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Price"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {step === 5 && (
          <>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Rating
              </label>
              <input
                type="number"
                placeholder="Enter Rating"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Number of Reviews
              </label>
              <input
                type="number"
                placeholder="Enter Number of Reviews"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Amenities
              </label>
              <textarea
                placeholder="Enter Amenities"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Prev
          </button>
        )}
        <button
          onClick={
            step === totalSteps ? () => alert("Form Submitted!") : nextStep
          }
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ml-auto"
        >
          {step === totalSteps ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default HotelForm;
