/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from 'react'

import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import { deleteProduct, getProducts, logout } from "../api/auth";
import type { ProductData } from "../types/product.types";
import { toast } from "react-toastify";
import CustomLoading from "./Loading";

const Table = () => {
  // Add deletingId state to track which product is being deleted
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchLoading, setSearchLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Add this new state

  // const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setInitialLoading(true); // Show loading on initial fetch
        const data = await getProducts(page, pageSize);
        setProducts(data.data.results);
        setFilteredProducts(data.data.results);
        setTotalItems(data.data.total_items);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      } finally {
        setInitialLoading(false); // Hide loading after fetch
      }
    };

    fetchProducts();
  }, [page, pageSize]);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id.toString());
      await deleteProduct(id);

      // Remove deleted product from state
      const updatedProducts = products.filter((p) => p.id !== id);
      const updatedFilteredProducts = filteredProducts.filter(
        (p) => p.id !== id
      );

      setProducts(updatedProducts);
      setFilteredProducts(updatedFilteredProducts);
      setTotalItems((prev) => prev - 1);

      toast.success("Product deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
      console.error("Error deleting product:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearchLoading(true);
    try {
      if (!searchTerm.trim()) {
        setFilteredProducts(products);
        return;
      }

      const term = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.product_name.toLowerCase().includes(term) ||
          product.product_brand.toLowerCase().includes(term) ||
          product.product_category.toLowerCase().includes(term)
      );

      setFilteredProducts(filtered);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <>
      {initialLoading ? ( // Use initialLoading instead of loading
        <CustomLoading />
      ) : (
        <div className="m-8 flex items-center justify-center flex-col">
          <SearchInput
            searchProduct={searchProduct}
            setSearchProduct={setSearchProduct}
            onSearch={handleSearch}
          />

          <button
            type="button"
            className=" text-white cursor-pointer absolute end-2.5 top-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={logout}
          >
            Log out
          </button>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            {searchLoading ? (
              <div className="flex items-center justify-center p-8">
                <CustomLoading message="Searching..." />
              </div>
            ) : filteredProducts?.length > 0 ? (
              <>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Id{" "}
                      </th>
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
                    {filteredProducts?.map((product: ProductData) => (
                      <tr
                        key={product?.sku}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                      >
                        <td className="px-6 py-4">{product?.id}</td>

                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {product?.product_name}
                        </th>
                        <td className="px-6 py-4">{product?.product_brand}</td>
                        <td className="px-6 py-4">
                          {product?.product_category}
                        </td>
                        <td className="px-6 py-4">
                          {product?.in_stock ? "Yes" : "No"}
                        </td>

                        <td className="px-6 py-4">
                          {product?.product_quantity}
                        </td>
                        <td className="px-6 py-4">{product?.rating}</td>
                        <td className="px-6 py-4">${product?.product_price}</td>
                        <td className="px-6 py-4">
                          {product?.shipping_weight}
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id.toString()}
                            className={`font-medium text-red-600 dark:text-red-500 hover:underline ${
                              deletingId === product.id.toString()
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {deletingId === product.id.toString()
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={page}
                  pageSize={pageSize}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  totalItems={totalItems}
                />
              </>
            ) : (
              <div className="flex items-center justify-center p-8">
                <p className="text-gray-500 dark:text-gray-400">
                  No products found
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
