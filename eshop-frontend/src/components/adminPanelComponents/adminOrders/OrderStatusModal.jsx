import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../../http/orderRequests";
import Modal from "../../sharedComponents/utilComponents/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Spinner from "../../sharedComponents/utilComponents/Spinner";

const STATUSES = ["PREPARING", "SHIPPING", "COMPLETED", "REFUNDED", "CANCELLED"];

const STATUS_STYLES = {
    PREPARING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
    SHIPPING: "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30",
    COMPLETED: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
    REFUNDED: "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30",
    CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
};

export default function OrderStatusModal({ order, onClose }) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (status) => updateOrderStatus({ orderId: order.orderId, status }),
        onSuccess: () => {
            toast.success("Order status updated successfully");
            queryClient.resetQueries({ queryKey: ["orders"] });
            onClose();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
    });

    return (
        <Modal open={true} onClose={onClose} className="admin-status-modal">
            <style>{`
                .admin-status-modal {
                    max-width: 400px !important;
                    width: calc(100% - 2rem) !important;
                    padding: 0 !important;
                    overflow: hidden;
                    background: var(--color-brand-dark) !important;
                    border-radius: 16px !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                }
            `}</style>

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-white font-semibold text-lg">Change Status</h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>

            <div className="px-6 py-5 flex flex-col gap-3">
                <p className="text-white/50 text-sm">
                    Order <span className="text-white font-medium">#{order.orderId}</span> — current status:{" "}
                    <span className="text-white font-medium">{order.orderStatus}</span>
                </p>

                <div className="flex flex-col gap-2 mt-1">
                    {STATUSES.map((status) => (
                        <button
                            key={status}
                            onClick={() => mutate(status)}
                            disabled={isPending || status === order.orderStatus}
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${STATUS_STYLES[status]}`}
                        >
                            {isPending ?
                                <div className="flex justify-center items-center">
                                    <Spinner size="sm" borderColor="white" />
                                </div> : status}
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    );
}