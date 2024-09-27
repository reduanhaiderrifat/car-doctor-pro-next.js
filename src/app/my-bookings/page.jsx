"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyBookings = () => {
  const session = useSession();
  const [bookings, setBooking] = useState([]);

  // Function to load data
  const loadeddata = async () => {
    if (session?.data?.user?.email) {
      const res = await fetch(
        `${process.env.PUBLIC_URL}/my-bookings/api/${session.data.user.email}`
      );
      const data = await res.json();
      setBooking(data?.myBooking || []);
    }
  };

  // Function to handle delete
  const handleDelete = async (id) => {
    const deleted = await fetch(
      `${process.env.PUBLIC_URL}/my-bookings/api/booking/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(deleted);
    const result = await deleted.json();
    console.log(result);
    if (result?.response?.deletedCount === 1) {
      loadeddata(); // Reload data after deletion
      toast("Booking deleted successfully", {
        position: "bottom-left", // Set position to bottom-right
        autoClose: 3000, // Auto close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#333",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
      });
    }
  };

  // Effect to load data when the user is authenticated
  useEffect(() => {
    loadeddata();
  }, [session]); // Removed the callback dependency

  return (
    <div className="container mx-auto">
      <div className="relative h-72">
        <Image
          className="absolute h-72 w-full left-0 top-0 object-cover"
          src={"/assets/images/about_us/parts.jpg"}
          alt="service"
          width={1920}
          height={1080}
          style={{ width: "90vw" }}
        />
        <div className="absolute h-full left-0 top-0 flex items-center justify-center bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
          <h1 className="text-white text-3xl font-bold flex justify-center items-center ml-8">
            My Bookings
          </h1>
        </div>
      </div>
      <div className="mt-12">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Service Name</th>
                <th>Price</th>
                <th>Booking Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings?.map(({ serviceTitle, _id, date, price }, idx) => (
                <tr key={_id}>
                  <th>{idx + 1}</th>
                  <td>{serviceTitle}</td>
                  <td>{price}</td>
                  <td>{date}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <Link href={`/my-bookings/update/${_id}`}>
                        <button className="btn btn-primary">Edit</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(_id)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
