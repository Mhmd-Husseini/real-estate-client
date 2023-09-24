import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/";

export const sendRequest = async ({
  method = "GET",
  route,
  params,
  body,
  includeHeaders = true,
}) => {
  if (!route) throw Error("URL required");

  axios.defaults.headers.authorization = includeHeaders
    ? `Bearer ${localStorage.getItem("token")}`
    : "";

  try {
    const response = await axios.request({
      method,
      url: route,
      data: body,
      params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
