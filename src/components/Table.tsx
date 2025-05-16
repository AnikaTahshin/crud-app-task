/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";
import { deleteProduct, getProducts, logout } from "../api/auth";
import type { ProductData } from "../types/product.types";
import { toast, ToastContainer } from "react-toastify";
import CustomLoading from "./Loading";
import "react-toastify/dist/ReactToastify.css";

const Table = () => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchLoading, setSearchLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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

  const handleDelete = async (slug: string | null) => {
    if (!slug) return;
    try {
      setDeletingId(slug);
      await deleteProduct(slug);
      const updatedProducts = products.filter((p) => p.slug !== slug);
      const updatedFilteredProducts = filteredProducts.filter(
        (p) => p.slug !== slug
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {initialLoading ? (
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
            onClick={() => {
              toast.success("Logged out successfully!");
              setTimeout(() => {
                logout();
              }, 1000);
            }}
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
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
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
                            onClick={() => product?.slug && handleDelete(product?.slug)}
                            disabled={!product?.slug || deletingId === product?.slug}
                            className={`font-medium text-red-600 dark:text-red-500 hover:underline ${
                              !product?.slug || deletingId === product?.slug
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                          >
                            {!product?.slug || deletingId === product?.slug
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
              <div className="flex flex-col items-center justify-center p-12">
                <svg
                  className="w-16 h-16 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p className="text-xl font-medium text-gray-500 dark:text-gray-400 mb-2">
                  No Products Found
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Try adjusting your search or filter to find what you're looking for
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
