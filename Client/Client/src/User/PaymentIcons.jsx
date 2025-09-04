import React from "react";
import { FaCreditCard, FaUniversity } from "react-icons/fa";
import { MdAtm } from "react-icons/md";
import { SiPhonepe, SiGooglepay, SiVisa, SiMastercard } from "react-icons/si";

function PaymentIcons() {
  return (
    <div className="flex gap-4 items-center justify-center p-3 bg-gray-50 rounded-lg shadow-sm">
      <SiPhonepe size={28} className="text-purple-600" />
      <SiGooglepay size={28} className="text-blue-600" />
      <MdAtm size={28} className="text-green-600" />
      <FaCreditCard size={28} className="text-gray-700" />
      <SiVisa size={28} className="text-blue-500" />
      <SiMastercard size={28} className="text-red-600" />
      <FaUniversity size={28} className="text-indigo-600" />
    </div>
  );
}

export default PaymentIcons;
