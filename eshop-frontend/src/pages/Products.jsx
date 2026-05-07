import ErrorBlock from "../components/sharedComponents/utilComponents/ErrorBlock";
import Spinner from "../components/sharedComponents/utilComponents/Spinner";
import ProductCard from "../components/productComponents/ProductCard";
import Footer from "../components/sharedComponents/Footer";
import Header from "../components/sharedComponents/Header";
import FadeIn from "../util/FadeInTag";
import { ModalContext } from "../store/ModalContext";
import { useContext, useState, useEffect } from "react";
import ProductViewModal from "../components/productComponents/ProductViewModal";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllProductsWithPagination } from "../http/productRequests";
import Filter from "../components/productComponents/Filter";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/sharedComponents/Pagination";


export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get("keyword") || "";
    const category = searchParams.get("categoryId") || null;
    const sortOrder = searchParams.get("sortOrder") || null;
    const pageNumber = Number(searchParams.get("pageNumber")) || 0;
    const pageSize = Number(searchParams.get("pageSize")) || 12;

    // To prevent insta calling the backend. 
    // Add 400 ms delay after user stops typing.
    const [debouncedSearch, setDebouncedSearch] = useState("");

    function updateParam(key, value) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) next.set(key, String(value));
            else next.delete(key);
            if (key !== "pageNumber") next.delete("pageNumber");
            return next;
        });
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [pageNumber]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    const [selectedProductForView, setSelectedProductForView] = useState({});
    const { isProductViewModalOpen, openAdminAddModal } = useContext(ModalContext);

    const params = {
        pageNumber: pageNumber,
        pageSize: pageSize,
        keyword: debouncedSearch || null,
        categoryId: category || null,
        sortOrder: sortOrder,
        sortBy: sortOrder ? "price" : null
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products", params],
        queryFn: () => getAllProductsWithPagination(params),
        retry: false,
        placeholderData: keepPreviousData,
    });

    const products = data?.data?.products ?? [];
    const totalPages = data?.data?.totalPages ?? 0;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
                <FadeIn>
                    <div className="flex flex-wrap items-start gap-3">
                        <div className="flex-1 min-w-0">
                            <Filter
                                onCategoryChange={(val) => updateParam("categoryId", val)}
                                onSearchChange={(val) => updateParam("keyword", val)}
                                onSortChange={(val) => updateParam("sortOrder", val)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <Spinner size="lg" borderColor={`brand`} />
                        </div>
                    ) : isError ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <ErrorBlock message={error?.message || "Something went wrong fetching products"} />
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                            <div className="w-16 h-16 rounded-full bg-[#F5EDE4] flex items-center justify-center">
                                <i className="fa-solid fa-bag-shopping text-[#C4A882] text-2xl"></i>
                            </div>
                            <h3 className="text-[#2C1810] font-semibold text-lg">No products found</h3>
                            <p className="text-[#8C7B73] text-sm text-center max-w-xs">
                                Try adjusting your search or selecting a different category.
                            </p>
                        </div>
                    ) : (
                        <div className="min-h-[700px] flex flex-col justify-between">
                            <div className="pb-6 pt-14 grid 2xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                                {products.map((item, i) => (
                                    <ProductCard key={i} {...item} onView={(product) => setSelectedProductForView(product)} />
                                ))}
                            </div>
                            <Pagination
                                totalPages={totalPages}
                                currentPage={pageNumber}
                                onPageChange={(newPage) => updateParam("pageNumber", newPage)}
                            />
                        </div>
                    )}
                </FadeIn>
            </div>
            {isProductViewModalOpen() && <ProductViewModal {...selectedProductForView} />}
            <Footer />
        </div>
    );
}