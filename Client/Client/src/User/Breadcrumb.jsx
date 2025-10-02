import React from 'react'
import { Link } from 'react-router-dom'

function Breadcrumb({Isopen}) {
  return (
    <>
                      {Isopen ? (
                        <>
                          <div className="fixed left-0 top-[75%] bg-gray-100 shadow z-50 w-auto px-4 py-2">
                            <div className="flex items-center text-gray-600 space-x-1">
                              <Link to="/" className="hover:text-blue-600">
                                Home
                              </Link>
                              <span>&gt;</span>
                              <Link to="/Search/Hotel" className="hover:text-blue-600">
                                Search Hotel
                              </Link>
                              <span>&gt;</span>
                              <Link to="/bookings" className="hover:text-blue-600">
                                Booking
                              </Link>
                              <span>&gt;</span>
                              <span className="text-gray-400">Payment</span>
                            </div>
                          </div>
                        </>
                      ) : null}
    </>
  )
}

export default Breadcrumb
