import axios from "axios";
import Cookies from "js-cookie";

export const checkboxClicked = (element, selectedArray, updateState) => {
  const exist = selectedArray.find((el) => el === element) || false;
  if (exist) {
    updateState(selectedArray.filter((el) => el !== element));
  } else {
    updateState([...selectedArray, element]);
  }
};
export const flagItem = async (itemID, itemsArray, setItemsArray, endpoint) => {
  let foundIndex = itemsArray.findIndex((item) => item._id === itemID);
  let newItemsArray = [...itemsArray];
  let item = itemsArray.find((item) => item._id === itemID);
  console.log("item.flagged", item.flagged);
  try {
    const updatedItem = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${endpoint}/${itemID}
        `,
      { flagged: !item.flagged },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    item = { ...item, flagged: !item.flagged };
    newItemsArray[foundIndex] = item;
    setItemsArray(newItemsArray);
    console.log(updatedItem);
  } catch (error) {
    console.log("err", error);
  }
};
export const createItem = (pathname, router) => {
  router.push(`${pathname}/create`);
};
export const deleteItem = async (
  allItems,
  selectedItems,
  setAllItems,
  setSelectedItems,
  endpoint
) => {
  const remainingItems = allItems.filter(function (item) {
    return !selectedItems.includes(item._id);
  });
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${endpoint}`,
      {
        data: selectedItems,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    setAllItems(remainingItems);
    setSelectedItems([]);
  } catch (error) {
    console.log("error", error);
  }
};
export const getData = async (endpoint) => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/${endpoint}`
    );
    return data.data.data.data;
  } catch (error) {
    console.log("error", error);
  }
};