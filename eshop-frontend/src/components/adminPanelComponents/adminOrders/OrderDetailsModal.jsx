import Modal from "../../sharedComponents/utilComponents/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const STATUS_STYLES = {
    PREPARING: "bg-yellow-500/20 text-yellow-400",
    SHIPPING: "bg-blue-500/20 text-blue-400",
    COMPLETED: "bg-green-500/20 text-green-400",
    REFUNDED: "bg-purple-500/20 text-purple-400",
    CANCELLED: "bg-red-500/20 text-red-400",
};

export default function OrderDetailsModal({ order, onClose }) {
    return (
        <Modal open={true} onClose={onClose} className="admin-details-modal">
            <style>{`
            .admin-details-modal {
                max-width: 540px !important;
                width: calc(100% - 2rem) !important;
                padding: 0 !important;
                background: var(--color-brand-dark) !important;
                border-radius: 16px !important;
                border: 1px solid rgba(255,255,255,0.1) !important;
                max-height: 90vh !important;
            }
        `}</style>

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-white font-semibold text-lg">Order #{order.orderId}</h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>

            <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 65px)" }} className="px-6 py-5 flex flex-col gap-5">

                <div className="flex flex-col gap-2">
                    <SectionTitle>Order Info</SectionTitle>
                    <InfoRow label="Email" value={order.email} />
                    <InfoRow label="Address" value={order.address} />
                    <InfoRow label="Date" value={order.orderDate} />
                    <InfoRow label="Total" value={`€${order.totalAmount.toFixed(2)}`} />
                    <div className="flex justify-between items-center">
                        <span className="text-white/40 text-xs">Status</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[order.orderStatus] ?? "bg-white/10 text-white/50"}`}>
                            {order.orderStatus}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <SectionTitle>Payment</SectionTitle>
                    <InfoRow label="Method" value={order.payment?.paymentMethod} />
                    <InfoRow label="Provider" value={order.payment?.pgName} />
                    <InfoRow label="Status" value={order.payment?.pgStatus} />
                    <InfoRow label="Message" value={order.payment?.pgResponseMessage} />
                </div>

                <div className="flex flex-col gap-2">
                    <SectionTitle>Items</SectionTitle>
                    <div className="flex flex-col gap-2">
                        {order.orderItems?.map((item) => (
                            <div
                                key={item.orderItemId}
                                className="bg-white/5 rounded-lg px-4 py-3 flex items-center justify-between"
                            >
                                <div className="flex flex-col gap-0.5 min-w-0 flex-1 pr-4">
                                    <span className="text-white text-sm font-medium truncate">{item.productName}</span>
                                    <span className="text-white/40 text-xs">Qty: {item.quantity}</span>
                                </div>
                                <div className="flex flex-col items-end gap-0.5 shrink-0">
                                    <span className="text-white text-sm">€{item.originalPrice.toFixed(2)}</span>
                                    {item.discount > 0 && (
                                        <span className="text-green-400 text-xs">-{item.discount}%</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

function SectionTitle({ children }) {
    return (
        <p className="text-white/30 text-xs uppercase tracking-widest border-b border-white/5 pb-1">
            {children}
        </p>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-white/40 text-xs">{label}</span>
            <span className="text-white/80 text-sm">{value ?? "—"}</span>
        </div>
    );
}