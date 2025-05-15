// import React from 'react'

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import { getProducts } from "../api/auth";
import type { ProductData } from "../types/product.types";

const Table = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        setLoading(true);
        const response = await getProducts(offset, limit);
        console.log("api res", response.data.results);
        setProducts(response.data.results);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [offset, limit]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="m-8 flex items-center justify-center flex-col">
        {/* <h1>Products</h1> */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <SearchInput />
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
                  Stock
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
                  Weight
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product?.product_name}
                  </th>
                  <td className="px-6 py-4">{product.product_brand}</td>
                  <td className="px-6 py-4">{product.product_category}</td>
                  <td className="px-6 py-4">{product.in_stock ? "Yes": "No"}</td>

                  <td className="px-6 py-4">{product.product_quantity}</td>
                  <td className="px-6 py-4">{product.rating}</td>
                  <td className="px-6 py-4">${product.product_price}</td>
                  <td className="px-6 py-4">{product.shipping_weight}</td>

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
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          offset={offset}
          limit={limit}
          setOffset={setOffset}
          setLimit={setLimit}
        />
      </div>
    </>
  );
};

export default Table;
