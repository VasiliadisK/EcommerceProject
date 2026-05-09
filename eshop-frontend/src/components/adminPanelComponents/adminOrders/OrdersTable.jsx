import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate, faEye } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../sharedComponents/utilComponents/Spinner";
import ErrorBlock from "../../sharedComponents/utilComponents/ErrorBlock";

const STATUS_STYLES = {
    PREPARING: "bg-yellow-500/20 text-yellow-400",
    SHIPPING: "bg-blue-500/20 text-blue-400",
    COMPLETED: "bg-green-500/20 text-green-400",
    REFUNDED: "bg-purple-500/20 text-purple-400",
    CANCELLED: "bg-red-500/20 text-red-400",
};

export default function OrdersTable({ orders, isLoading, isError, error, onStatusChange, onDetails }) {

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Spinner size="md" borderColor="white" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center py-20">
                <ErrorBlock message={error?.message || "Something went wrong"} />
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-white/40 text-sm">No orders found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-white/80">
                    <thead>
                        <tr className="bg-brand-dark text-white/50 uppercase text-xs tracking-wider">
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Address</th>
                            <th className="px-4 py-3 text-left">Date</th>
                            <th className="px-4 py-3 text-right">Total</th>
                            <th className="px-4 py-3 text-center">Payment</th>
                            <th className="px-4 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr
                                key={order.orderId}
                                className={`border-t border-white/5 transition-colors hover:bg-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                            >
                                <td className="px-4 py-3 text-white/40 text-xs">#{order.orderId}</td>
                                <td className="px-4 py-3 text-white/70">{order.email}</td>
                                <td className="px-4 py-3 text-white/50 text-xs max-w-[150px] truncate">{order.address}</td>
                                <td className="px-4 py-3 text-white/50 text-xs">{order.orderDate}</td>
                                <td className="px-4 py-3 text-right font-medium text-white">€{order.totalAmount.toFixed(2)}</td>
                                <td className="px-4 py-3 text-center">
                                    <span className="text-white/50 text-xs">{order.payment?.paymentMethod}</span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <StatusBadge status={order.orderStatus} />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onDetails(order)}
                                            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
                                            title="View Details"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button
                                            onClick={() => onStatusChange(order)}
                                            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
                                            title="Change Status"
                                        >
                                            <FontAwesomeIcon icon={faArrowsRotate} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                                <p className="text-white font-semibold text-sm">#{order.orderId}</p>
                                <p className="text-white/60 text-xs truncate">{order.email}</p>
                                <p className="text-white/40 text-xs">{order.orderDate}</p>
                                <p className="text-white/40 text-xs truncate">{order.address}</p>
                            </div>
                            <div className="shrink-0">
                                <StatusBadge status={order.orderStatus} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 pt-3">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-white font-medium text-sm">€{order.totalAmount.toFixed(2)}</span>
                                <span className="text-white/40 text-xs">{order.payment?.paymentMethod}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onDetails(order)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer text-xs"
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                    Details
                                </button>
                                <button
                                    onClick={() => onStatusChange(order)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer text-xs"
                                >
                                    <FontAwesomeIcon icon={faArrowsRotate} />
                                    Status
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function StatusBadge({ status }) {
    return (
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${STATUS_STYLES[status] ?? "bg-white/10 text-white/50"}`}>
            {status}
        </span>
    );
}