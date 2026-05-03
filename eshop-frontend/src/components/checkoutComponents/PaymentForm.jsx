import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Spinner from "../sharedComponents/utilComponents/Spinner";
import ErrorBlock from "../sharedComponents/utilComponents/ErrorBlock";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useState } from "react";

export default function PaymentForm({ clientSecret, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const methods = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const paymentElementOptions = {
    layout: "tabs",
  };

  async function handleSubmit() {
    if (!stripe || !elements) return;

    setIsLoading(true);
    setIsError(false);

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setIsError(true);
      setErrorMessage(submitError.message);
      toast.error(submitError.message || "Something went wrong during the payment process");
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
      },
    });

    if (error) {
      setIsError(true);
      setErrorMessage(error.message);
      toast.error(error.message || "Something went wrong during the payment process");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="border-b border-white/20 pb-4">
        <h2 className="text-[11px] uppercase tracking-[0.3em] text-white font-semibold">
          2. Στοιχεια Πληρωμης
        </h2>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="space-y-6">
            {clientSecret && <PaymentElement options={paymentElementOptions} />}
            {isError && <ErrorBlock message={errorMessage} />}
            <div className="p-6 flex justify-center">
              {isLoading ? (
                <Spinner size="sm" borderColor={`white`} />
              ) : (
                <button
                  type="submit"
                  disabled={!stripe}
                  className="px-10 py-3 bg-white text-stone-900 font-bold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  Pay {Number(totalPrice).toFixed(2)} <FontAwesomeIcon icon={faEuroSign} className="ml-0.5" />
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};