import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServicesCard = ({ service }) => {

  return (
    <div>
      <div className="card card-compact bg-base-100 skeleton shadow-xl">
        <figure>
          <Image
            src={service.img}
            alt="Car"
           className=""
            width={400}
            height={10}
      
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title ">{service.title}</h2>
          <p className="">$ {service.price}</p>
          <div className="card-actions justify-end">
            <button className="btn  btn-primary">
              <Link href={`/services/${service._id}`}>Veiw Details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
