import queryString from "query-string";
import ApiError from "./ApiError";

let authenticationHeaders = {};
// export const API_BASE_URL = 'https://fayezmaliha.xyz';
// export const API_BASE_URL = 'https://hopescan.org';
export const API_BASE_URL = 'https://hopescan.ai';
// export const API_BASE_URL = "http://localhost:8000";
// export const API_BASE_URL = "3.79.243.10";
// export const API_BASE_URL = "http://3.127.136.136:8000";

export function setAuthenticationHeaders(value) {
  authenticationHeaders = value;
}

const loadUser = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  let userInfo = JSON.parse(storedUser);

  if (storedUser && storedToken) {
    // Set authentication headers
    setAuthenticationHeaders({
      ["Authorization"]: storedToken ? "Bearer " + storedToken : "",
    });
  }
};
export default async function sendApiRequest(
  path,
  method,
  query,
  body,
  headers = {},
  options = {},
  url
) {
  // console.log(path);
  // console.log(query);

  loadUser();
  body ? console.log(body) : "";
  const baseUrl = url ? url : API_BASE_URL;
  const fetchUrl = queryString.stringifyUrl({
    query,
    url: baseUrl + "/" + path,
  });

  headers = {
    ...authenticationHeaders,
    "Content-Type": "application/json",
    ...headers,
    accept: "*/*",
  };

  // console.log(headers);

  // let requestBody ;
  // if (headers["Content-Type"] == "multipart/form-data")
  //   requestBody = body !== undefined ? body : undefined;
  // else requestBody = body !== undefined ? JSON.stringify(body) : undefined;

  let requestBody;
  if (body instanceof FormData) {
    // If the body is FormData, send it as-is and remove Content-Type (browser sets it)
    delete headers["Content-Type"];
    requestBody = body;
  } else {
    requestBody = body !== undefined ? JSON.stringify(body) : undefined;
  }

  let response;
  try {
    console.log(fetchUrl);
    // console.log(requestBody);

    response = await fetch(fetchUrl, {
      body: requestBody,
      method,
      mode: "cors",
      headers: {
        ...headers,
      },
    });
    // console.log(response)
    // console.log('----------------')
    // console.log(await response.json())
    // console.log('----------------')

    //token expired
    if (response.status == 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    if (
      response.status === 404 ||
      response.status === 403 ||
      response.status === 400 ||
      response.status === 500
    ) {
      console.error("Error status:", response.status);
      console.log("response", response);
      return response.status;
    }
    if (!response.ok) {
      console.log(response.status);
      console.log(response.error);
      throw new ApiError(
        response.statusText,
        response.status,
        await response.text()
      );
    }

    // Handle blob response
    if (options.responseType === "blob") {
      return await response.blob(); // Return the response as a Blob
    }


    const isJsonResponse = response.headers
      .get("content-type")
      ?.toLowerCase()
      .includes("application/json");

      // console.log(response)
      const res = method === "GET" ? await response.json() : response;
      // const res = isJsonResponse ? await response.json() : await response.text();
      console.log(response)

    return res;
  } catch (error) {
    console.log(
      "api",
      `${method} ${fetchUrl}: Could not parse response content: ${error.message}`
    );

    console.error("Network request failed:", error);
    throw new ApiError("Network error", 500, error.message);
  }
}
