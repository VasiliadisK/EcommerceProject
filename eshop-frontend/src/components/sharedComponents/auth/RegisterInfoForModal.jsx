import Modal from "../utilComponents/Modal";
import { ModalContext } from "../../../store/ModalContext";
import { useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormTextInput from "../utilComponents/FormTextInput";
import FormPasswordInput from "../utilComponents/FormPasswordInput";
import { useState } from "react";
import PasswordChecklist from "react-password-checklist";

export default function RegisterInfoForModal() {
  const { isRegisterModalOpen, closeModal, openLoginModal } =
    useContext(ModalContext);

  function handleCloseModal() {
    closeModal();
  }
  const [showCriteria, setShowCriteria] = useState(false);
  const methods = useForm();

  const password = methods.watch("password", "");
  const passwordAgain = methods.watch("verifyPassword", "");

  async function onSubmit(data) {
    const credentials = {
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      username: data.username,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      phone: data.phone,
      password: data.password,
    };
    console.log("Data have been submitted " + JSON.stringify(credentials));
  }
  return (
    <Modal className="modal" open={isRegisterModalOpen()} onClose={closeModal}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto p-2">
            <div className="relative flex items-center justify-center mb-6">
              <h1 className="text-2xl font-semibold text-white">Register</h1>
              <button
                onClick={handleCloseModal}
                className="absolute right-0 text-white hover:text-gray-300 transition-colors font-bold text-2xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormTextInput
                    inputLabel="First Name"
                    inputKey="firstName"
                    inputMaxLength={20}
                    inputMinLength={5}
                    pattern={/^[A-Za-z]+$/i}
                    patternMessage="Only Characters are allowed"
                  />

                  <FormTextInput
                    inputLabel="Last Name"
                    inputKey="lastName"
                    inputMaxLength={20}
                    inputMinLength={5}
                    pattern={/^[A-Za-z]+$/i}
                    patternMessage="Only Characters are allowed"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormTextInput
                    inputLabel="Email"
                    inputKey="email"
                    pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                    patternMessage="Invalid email address"
                    placeholder="your.email@example.com"
                  />

                  <FormTextInput
                    inputLabel="Username"
                    inputKey="username"
                    inputMaxLength={20}
                    inputMinLength={5}
                  />
                </div>
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormPasswordInput
                      inputLabel="Password"
                      inputKey="password"
                      onFocus={() => setShowCriteria(true)}
                      onBlur={() =>
                        setTimeout(() => setShowCriteria(false), 300)
                      }
                      validate={{
                        minLength: (value) =>
                          value.length >= 8 || "At least 8 characters",
                        hasUppercase: (value) =>
                          /[A-Z]/.test(value) ||
                          "One uppercase letter required",
                        hasNumber: (value) =>
                          /[0-9]/.test(value) || "One number required",
                        hasSpecial: (value) =>
                          /[^A-Za-z0-9]/.test(value) ||
                          "One special character required",
                      }}
                    />
                    <FormPasswordInput
                      inputLabel="Verify Password"
                      inputKey="verifyPassword"
                      validate={{
                        matches: (value) =>
                          value === password || "Passwords do not match",
                      }}
                    />
                  </div>
                  {showCriteria && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl p-3 z-50">
                      <PasswordChecklist
                        rules={[
                          "minLength",
                          "specialChar",
                          "number",
                          "capital",
                          "match",
                        ]}
                        minLength={8}
                        value={password}
                        valueAgain={passwordAgain}
                        messages={{
                          minLength: "Password must have at least 8 characters",
                          specialChar:
                            "Password must contain a special character",
                          number: "Password must contain a number",
                          capital: "Password must contain a capital letter",
                          match: "Passwords must match",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormTextInput
                    inputLabel="Street Address"
                    inputKey="address"
                    placeholder="123 Main Street"
                  />

                  <FormTextInput
                    inputLabel="City"
                    inputKey="city"
                    placeholder="Thessaloniki"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormTextInput
                    inputLabel="Postal Code"
                    inputKey="postalCode"
                    placeholder="10001"
                  />

                  <FormTextInput
                    inputLabel="Phone"
                    inputKey="phone"
                    pattern={/^[0-9\s\-+()]+$/}
                    patternMessage="Invalid phone number"
                    placeholder="6923109218"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 bg-white text-stone-900 font-bold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </FormProvider>

      <button
        className="text-white text-lg cursor-pointer hover:text-gray-200"
        onClick={openLoginModal}
      >
        Already have an account? Login here
      </button>
    </Modal>
  );
}
