import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrdersAdmin } from "../../../http/orderRequests";
import { ModalContext } from "../../../store/ModalContext";
import { useSearchParams } from "react-router-dom";
import OrdersTable from "../adminOrders/OrdersTable"
import OrderStatusModal from "../adminOrders/OrderStatusModal"
import OrderDetailsModal from "../adminOrders/OrderDetailsModal"
import Pagination from "../../sharedComponents/Pagination";

export default function AdminOrders() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("pageNumber")) || 0;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    function updateParam(key, value) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) next.set(key, String(value));
            else next.delete(key);
            return next;
        });
    }

    const {
        openAdminOrderStatusModal,
        openAdminOrderDetailsModal,
        isAdminOrderStatusModalOpen,
        isAdminOrderDetailsModalOpen,
        getModalData,
        closeModal,
    } = useContext(ModalContext);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["orders", { pageNumber, pageSize }],
        queryFn: () => getAllOrdersAdmin({ pageNumber, pageSize }),
        retry: false,
    });

    const orders = data?.data?.orders ?? [];
    const totalPages = data?.data?.totalPages ?? 0;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl font-semibold tracking-wide">Orders</h1>
            </div>

            <OrdersTable
                orders={orders}
                isLoading={isLoading}
                isError={isError}
                error={error}
                onStatusChange={openAdminOrderStatusModal}
                onDetails={openAdminOrderDetailsModal}
            />

            {orders.length !== 0 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={pageNumber}
                    onPageChange={(newPage) => updateParam("pageNumber", newPage)}
                    activeClasses="bg-white text-brand"
                    inactiveClasses="text-white"
                />
            )}

            {isAdminOrderStatusModalOpen() && (
                <OrderStatusModal
                    order={getModalData()}
                    onClose={closeModal}
                />
            )}

            {isAdminOrderDetailsModalOpen() && (
                <OrderDetailsModal
                    order={getModalData()}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}