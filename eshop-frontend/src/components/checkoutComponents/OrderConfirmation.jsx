import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../store/CartContext";
import Spinner from "../sharedComponents/utilComponents/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { stripePaymentConfirmation } from "../../http/orderRequests";
import toast from "react-hot-toast";
import ErrorBlock from "../sharedComponents/utilComponents/ErrorBlock";
import { useMutation } from "@tanstack/react-query";
import Header from "../sharedComponents/Header";
import Footer from "../sharedComponents/Footer";

export default function OrderConfirmation() {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const { items, clearCart } = useContext(CartContext);
    const paymentIntent = searchParams.get("payment_intent");
    const clientSecret = searchParams.get("payment_intent_client_secret");
    const redirectStatus = searchParams.get("redirect_status");

    const { mutate: confirmPurchase, data, isPending, isError, error } = useMutation({
        mutationFn: (req) => stripePaymentConfirmation(req),
        onSuccess: () => {
            clearCart();
            toast.success("Order was accepted!");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Payment couldn't be completed");
        },
        onSettled: () => {
            setTimeout(() => {
                navigate("/");
            }, 4000);
        },
    });

    useEffect(() => {

        if (paymentIntent && clientSecret && redirectStatus && items?.length > 0) {
            confirmPurchase({
                paymentBody: {
                    pgName: "Stripe",
                    pgPaymentId: paymentIntent,
                    pgStatus: redirectStatus,
                    pgResponseMessage: redirectStatus === "succeeded"
                        ? "Payment successful"
                        : "Payment failed"
                }
            });
        }

    }, [paymentIntent, clientSecret, redirectStatus, items]);
    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="bg-brand py-16 px-20 rounded-lg shadow-2xl text-center max-w-2xl w-full mx-6">
                    {isPending ? (
                        <div className="p-6 flex justify-center">
                            <Spinner size="lg" borderColor="white" />
                        </div>
                    ) : isError ? (
                        <div className="p-6 flex justify-center">
                            <ErrorBlock message={error?.message || "Payment couldn't be completed"} />
                        </div>
                    ) : (
                        <>
                            <div className="text-white mb-6 flex justify-center">
                                <FontAwesomeIcon icon={faCheckCircle} size="4x" />
                            </div>
                            <div className="border-b border-white/20 pb-4 mb-6">
                                <h2 className="text-[11px] uppercase tracking-[0.3em] text-white font-semibold">
                                    Order Confirmed
                                </h2>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed">
                                Thank you for your purchase! Your payment was successful. We will begin processing your order shortly.
                            </p>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}