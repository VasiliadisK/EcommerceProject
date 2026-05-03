import FormTextInput from "../sharedComponents/utilComponents/FormTextInput";

export default function ShippingForm() {

    return (
        
        <div className="space-y-10 animate-fadeIn">
            <div className="border-b border-white/20 pb-4">
                <h2 className="text-[11px] uppercase tracking-[0.3em] text-white font-semibold">
                    2. Στοιχεια Πληρωμης
                </h2>
            </div>

            <div className="space-y-6">
                <FormTextInput
                    inputLabel="Ονοματεπωνυμο Κατοχου"
                    inputKey="cardName"
                    placeholder="Οπως αναγραφεται στην καρτα"
                    pattern={/^[a-zA-Z\s]*$/}
                    patternMessage="Παρακαλώ χρησιμοποιήστε μόνο λατινικούς χαρακτήρες"
                />

                <FormTextInput
                    inputLabel="Αριθμος Καρτας"
                    inputKey="cardNumber"
                    placeholder="0000 0000 0000 0000"
                    inputMaxLength={16}
                    pattern={/^\d+$/}
                    patternMessage="Μόνο αριθμοί επιτρέπονται"
                />

                <div className="grid grid-cols-2 gap-5">
                    <FormTextInput
                        inputLabel="Ημ. Ληξης (MM/YY)"
                        inputKey="expiryDate"
                        placeholder="12/26"
                        inputMaxLength={5}
                    />

                </div>
            </div>
        </div>
    )
}