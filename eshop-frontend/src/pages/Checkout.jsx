import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { OrderSummary } from "../components/checkoutComponents/OrderSummary";
import { useContext, useState } from "react";
import { BrandButton } from "../components/checkoutComponents/BrandButton";
import Header from "../components/sharedComponents/Header";
import PaymentForm from "../components/checkoutComponents/PaymentForm";
import Footer from "../components/sharedComponents/Footer";
import { CartContext } from "../store/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { getClientSecretStripe } from "../http/orderRequests";



const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
    const methods = useForm();

    const { items, total } = useContext(CartContext);

    console.log(items);
    
    const { mutate: getClientSecret, data: clientSecretData, isPending } = useMutation({
        mutationFn: (req) => getClientSecretStripe(req),
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong during the process")
        }
    });

    useEffect(() => {
        if (total > 0) {
            getClientSecret({ amount: total * 100, currency: "eur" });
        }
    }, [total]);

    const clientSecret = clientSecretData?.data;

    return (
        <div className="min-h-screen bg-white font-light text-[#3a2a20]">
            <Header />
            <BrandButton to="/products" variant="primary">Συνεχεια αγορων</BrandButton>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-center text-xl tracking-[0.5em] uppercase mb-16 text-brand">Checkout</h1>

                <div className="lg:col-span-7 bg-brand p-8 md:p-12 shadow-2xl rounded-sm">
                    <div>
                        {clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm clientSecret={clientSecret} totalPrice={total} />
                            </Elements>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-5 mt-5">
                    <OrderSummary
                        items={items}
                        subtotal={total}
                        shippingCost={3.5}
                        total={total+3.5}
                    />
                </div>


            </main>
            <Footer />
        </div>
    );
}