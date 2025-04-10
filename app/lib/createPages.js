import axios from "axios";
import Cookies from "js-cookie";

export const getData = async (id, dispatchDetail, endpoint) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${endpoint}/${id}
        `,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log("response", response);
    dispatchDetail({ type: "UPDATE-ALL", value: response.data.data.data });
  } catch (error) {
    dispatchDetail({ type: "NOT-FOUND", value: error.response.data.message });
    console.log("error", error);
  }
};
export const deleteItem = async (pathname, router, endpoint) => {
  if (!pathname.endsWith("create")) {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${endpoint}/${
          pathname.split("/")[3]
        }
        `,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      console.log("success", response);
      router.push(`${pathname.slice(0, pathname.lastIndexOf("/"))}`);
    } catch (error) {
      console.log("err", error);
    }
  } else {
    router.push(`${pathname.slice(0, pathname.lastIndexOf("/"))}`);
  }
};
export const saveItem = async (
  pathname,
  data,
  dispatchDetail,
  defaultData,
  router,
  endpoint
) => {
  const isCreate = pathname.endsWith("create");
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${endpoint}`;
  const url = isCreate ? baseUrl : `${baseUrl}/${pathname.split("/")[2]}`;
  const method = isCreate ? "post" : "patch";

  try {
    const response = await axios[method](url, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    dispatchDetail(defaultData);

    const redirectPath = pathname.slice(0, pathname.lastIndexOf("/"));
    router.push(redirectPath);

    return response.data;
  } catch (error) {
    // Throw error to be handled by caller
    throw new Error(
      `Failed to ${isCreate ? "create" : "update"} ${endpoint}: ${
        error.message
      }`
    );
  }
};
