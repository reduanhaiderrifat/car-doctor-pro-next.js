import React from "react";

import ServicesCard from "../ServicesCard";
import { getServices } from "@/services/getServices";


const Services = async () => {
  const { services } = await getServices();

  return (
    <div className="text-slate-800 min-h-screen">
      <div className="text-center container mx-auto">
        <h3 className="text-2xl font-bold text-orange-600">Our services</h3>
        <h2 className="text-5xl">Our services</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem in libero
          doloribus, accusantium facere sed voluptatem dignissimos nihil velit
          eligendi!
        </p>
      </div>
      <div className="container mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services?.map((service) => (
          <ServicesCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
