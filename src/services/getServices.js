export const getServices = async () => {
  const res = await fetch(`${process.env.PUBLIC_URL}/services/api/getall`);
  const services = res.json();
  return services || [];
};

export const getServicesDetails = async (id) => {
  const res = await fetch(`${process.env.PUBLIC_URL}/services/api/${id}`);
  const service = res.json();
  return service || {};
};
