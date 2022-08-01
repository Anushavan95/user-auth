export const createHeader = () => {
  return new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

export const BASE_URL = "http://localhost:5000";
