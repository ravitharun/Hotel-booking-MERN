import { icon } from "leaflet";
import React from "react";
import { FaCreditCard, FaUniversity } from "react-icons/fa";
import { MdAtm } from "react-icons/md";
import { SiPhonepe, SiGooglepay, SiVisa, SiMastercard } from "react-icons/si";

function PaymentIcons() {
  const Icons = [
    {
      icon: (
        <>
          <SiPhonepe />
        </>
      ),
      ui: "text-purple-600",
      title: "Phone pay",
      size: 28,
    },
    {
      icon: (
        <>
          <SiGooglepay />
        </>
      ),
      ui: "text-blue-600",
      title: "Google pay",
      size: 28,
    },
    {
      icon: (
        <>
          <MdAtm />
        </>
      ),
      ui: "text-green-600",
      title: "Atm",
      size: 28,
    },
    {
      icon: (
        <>
          <FaCreditCard />
        </>
      ),
      ui: "text-gray-600",
      title: "CreditCard ",
      size: 28,
    },
    {
      icon: (
        <>
          <SiVisa />
        </>
      ),
      ui: "text-blue-500",
      title: "Visa ",
      size: 28,
    },
    {
      icon: (
        <>
          <SiMastercard />
        </>
      ),
      ui: "text-red-600",
      title: "Mastercard pay",
      size: 28,
    },
  ];
  return (
    <div className="flex gap-4 items-center justify-center p-3 bg-gray-50 rounded-lg shadow-sm">
      {Icons.map((icons, idx) => (
        <div key={idx} title={icons.title}>
          <h3 className={icons.ui} size={icons.size}>
            {icons.icon}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default PaymentIcons;
