// import React from 'react'

import Pagination from "./Pagination";
import SearchInput from "./SearchInput";

const Table = () => {
  return (
    <>
    <div className="m-8 flex items-center justify-center flex-col">
{/* <h1>Products</h1> */}

    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <SearchInput />
        <input type="text" />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Brand
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>

            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17"
            </th>
            <td className="px-6 py-4">Apple</td>

            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">15</td>
            <td className="px-6 py-4">4.5</td>

            <td className="px-6 py-4">$2999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Microsoft Surface Pro
            </th>
            <td className="px-6 py-4">Samsung</td>

            <td className="px-6 py-4">Television</td>
            <td className="px-6 py-4">36</td>
            <td className="px-6 py-4">4.1</td>
            <td className="px-6 py-4">$1999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Magic Mouse 2
            </th>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Television</td>
            <td className="px-6 py-4">36</td>
            <td className="px-6 py-4">4.1</td>
            <td className="px-6 py-4">$99</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
              >
                Edit
              </a>
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Google Pixel Phone
            </th>
            <td className="px-6 py-4">Phone</td>
            <td className="px-6 py-4">Television</td>
            <td className="px-6 py-4">36</td>
            <td className="px-6 py-4">4.1</td>
            <td className="px-6 py-4">$799</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
              >
                Edit
              </a>

              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple Watch 5
            </th>
            <td className="px-6 py-4">Wearables</td>
            <td className="px-6 py-4">Television</td>
            <td className="px-6 py-4">36</td>
            <td className="px-6 py-4">4.1</td>
            <td className="px-6 py-4">$999</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2"
              >
                Edit
              </a>

              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination />
    </div>
    </>
    
  );
};

export default Table;
