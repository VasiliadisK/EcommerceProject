import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Header from "../components/sharedComponents/Header";
import Footer from "../components/sharedComponents/Footer";
import FadeIn from "../util/FadeInTag";
import FormTextInput from "../components/sharedComponents/utilComponents/FormTextInput";
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { updateUserData } from "../http/userRequests";
import { queryClient } from "../http/queryClient";
import { updatePasswordOfLoggedInUser } from "../http/authRequests";
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import Spinner from "../components/sharedComponents/utilComponents/Spinner";
import ErrorBlock from "../components/sharedComponents/utilComponents/ErrorBlock";
import FormPasswordInput from "../components/sharedComponents/utilComponents/FormPasswordInput";
import PasswordChecklist from "react-password-checklist";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const FIELD_LABELS = {
  firstName: "Firstname",
  lastName: "Lastname",
  email: "Email",
  address: "Address",
  city: "City",
  postalCode: "Postal Code",
  phoneNumber: "Phone number",
  userName: "Username",
};


export default function ProfilePage() {

  const [editingContact, setEditingContact] = useState(false);
  const { logout, loggedInUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const accountMethods = useForm();
  const passwordMethods = useForm();
  const [showCriteria, setShowCriteria] = useState(false);
  const currentPassword = passwordMethods.watch("currentPassword", "");
  const password = passwordMethods.watch("password", "");
  const passwordAgain = passwordMethods.watch("verifyPassword", "");
  const { loggedInUser: user } = useContext(AuthContext);

  const {
    mutate: updateUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (updatedData) => updateUserData(user?.userId, updatedData),
    onSuccess: (response) => {

      const usernameChanged = response.data.userName !== user?.userName;

      if (usernameChanged) {
        logout();
        navigate("/");
        toast.success("Username changed, please login again");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      toast.success(`User ${response.data.userName} was updated successfully`);
      setEditingContact(false);
      accountMethods.reset();
    },
    onError: () => {
      toast.error("Something went wrong while updating user " + user.userName)
    },
  });

  const {
    mutate: updateUserPassword,
    isPendingPass,
    isErrorPass,
    errorPass,
  } = useMutation({
    mutationFn: (data) => updatePasswordOfLoggedInUser(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      toast.success(`Password of user ${user.userName} was updated successfully`);
      passwordMethods.reset();
      logout();
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong while updating password of user " + user.userName)
    },
  });


  function handleContactSave(data) {
    updateUser(data);
  }

  function handlePasswordChange(data) {
    updateUserPassword({
      currentPassword: data.currentPassword,
      newPassword: data.password
    })
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#FAF6F1] pb-20">

        <FadeIn>
          <div
            className="relative bg-[#5C3D2E] pt-12 pb-20 px-6 text-center overflow-hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,transparent,transparent 59px,rgba(255,255,255,0.03) 59px,rgba(255,255,255,0.03) 60px)",
            }}
          >
            <h1
              className="text-[#C4A882] text-[20px] uppercase tracking-[0.25em] mb-1"
            >
              Ο Λογαριασμός μου
            </h1>
            <h1
              className="text-white font-medium italic tracking-wide"
            >
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </FadeIn>

        <div className="max-w-[720px] mx-auto px-4 mt-10">

          <FadeIn>
            <div className="bg-white border border-[#E8DDD5] rounded-xl overflow-hidden mb-5">
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DDD5]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#F5EDE4] flex items-center justify-center text-[#5C3D2E] text-sm">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <h2 className="font-serif text-[#5C3D2E] text-lg font-semibold tracking-wide">
                    Στοιχεία Λογαριασμού
                  </h2>
                </div>
                {!editingContact && (
                  <button
                    onClick={() => {
                      accountMethods.reset({
                        firstName: user?.firstName,
                        lastName: user?.lastName,
                        email: user?.email,
                        phoneNumber: user?.phoneNumber,
                        address: user?.address,
                        city: user?.city,
                        postalCode: user?.postalCode,
                        userName: user?.userName
                      });
                      setEditingContact(true);
                    }}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#C4A882] text-[#5C3D2E] text-[11px] uppercase tracking-widest font-light hover:bg-[#F5EDE4] transition-colors"
                  >
                    <i className="fa-solid fa-pen-to-square text-[10px]"></i>
                    Επεξεργασία
                  </button>
                )}
              </div>
              <div className="px-6 py-5">
                {!editingContact ? (
                  <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
                    {Object.keys(FIELD_LABELS).map((key) => (
                      <div key={key} className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-[0.14em] text-[#8C7B73]">
                          {FIELD_LABELS[key]}
                        </span>
                        <span className="text-[15px] text-[#2C1810] font-light">
                          {user?.[key]}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <FormProvider {...accountMethods}>
                    <form onSubmit={accountMethods.handleSubmit(handleContactSave)}>
                      <div className="grid grid-cols-2 gap-5 max-[560px]:grid-cols-1">
                        <FormTextInput
                          inputLabel={FIELD_LABELS.firstName}
                          inputKey="firstName"
                          pattern={/^[A-Za-zΑ-Ωα-ωάέήίόύώΆΈΉΊΌΎΏ]+$/i}
                          patternMessage="Μόνο γράμματα επιτρέπονται"
                        />
                        <FormTextInput
                          inputLabel={FIELD_LABELS.lastName}
                          inputKey="lastName"
                          pattern={/^[A-Za-zΑ-Ωα-ωάέήίόύώΆΈΉΊΌΎΏ]+$/i}
                          patternMessage="Μόνο γράμματα επιτρέπονται"
                        />
                        <FormTextInput
                          inputLabel={FIELD_LABELS.email}
                          inputKey="email"
                          inputType="email"
                          pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
                          patternMessage="Μη έγκυρη διεύθυνση email"
                        />
                        <FormTextInput
                          inputLabel={FIELD_LABELS.phoneNumber}
                          inputKey="phoneNumber"
                          inputType="tel"
                          pattern={/^[0-9\s\-+()]+$/}
                          patternMessage="Μη έγκυρος αριθμός τηλεφώνου"
                        />
                        <FormTextInput
                          inputLabel={FIELD_LABELS.address}
                          inputKey="address"
                        />
                        <FormTextInput
                          inputLabel={FIELD_LABELS.city}
                          inputKey="city"
                        />
                        <FormTextInput
                          inputLabel={FIELD_LABELS.postalCode}
                          inputKey="postalCode"
                        />
                        <FormTextInput
                          inputLabel={FIELD_LABELS.userName}
                          inputKey="userName"
                          inputMaxLength={20}
                          inputMinLength={6}
                        />
                      </div>
                      <div className="flex gap-3 justify-end mt-6 pt-5 border-t border-[#E8DDD5]">
                        <button
                          type="button"
                          onClick={() => setEditingContact(false)}
                          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#E8DDD5] text-[#8C7B73] text-xs hover:border-[#C4A882] hover:text-[#5C3D2E] transition-colors"
                        >
                          <i className="fa-solid fa-xmark"></i> Ακύρωση
                        </button>
                        <button
                          type="submit"
                          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5C3D2E] text-white text-xs uppercase tracking-widest hover:bg-[#7A5244] transition-colors"
                        >
                          <i className="fa-solid fa-check"></i> {isPending ? <Spinner /> : "Αποθήκευση"}
                        </button>
                      </div>
                    </form>
                  </FormProvider>
                )}
                {isError && editingContact && (
                  <ErrorBlock
                    message={
                      error?.response?.data?.message ||
                      "Something went wrong, please try again"
                    }
                  />
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="bg-white border border-[#E8DDD5] rounded-xl overflow-hidden mb-5">
              <div className="flex items-center px-6 py-5 border-b border-[#E8DDD5] gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F5EDE4] flex items-center justify-center text-[#5C3D2E] text-sm">
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <h2 className="font-serif text-[#5C3D2E] text-lg font-semibold tracking-wide">
                  Διαχείρηση Κωδικού
                </h2>
              </div>
              <div className="px-6 pb-25">
                <FormProvider {...passwordMethods}>
                  <form onSubmit={passwordMethods.handleSubmit(handlePasswordChange)}>
                    <div className="relative">
                      <div className="flex flex-col gap-4 pt-5">
                        <FormPasswordInput
                          inputLabel="Current Password"
                          inputKey="currentPassword"
                        />
                        <FormPasswordInput
                          inputLabel="New Password"
                          inputKey="password"
                          onFocus={() => setShowCriteria(true)}
                          onBlur={() => setTimeout(() => setShowCriteria(false), 300)}
                          validate={{
                            minLength: (value) => value.length >= 8 || "At least 8 characters",
                            hasUppercase: (value) => /[A-Z]/.test(value) || "One uppercase letter required",
                            hasNumber: (value) => /[0-9]/.test(value) || "One number required",
                            hasSpecial: (value) => /[^A-Za-z0-9]/.test(value) || "One special character required",
                            notMatches: (value) => value !== currentPassword || "New password can't be the same as the old one",
                          }}
                        />
                        <FormPasswordInput
                          inputLabel="New Password again"
                          inputKey="verifyPassword"
                          validate={{
                            matches: (value) => value === password || "Passwords do not match",
                          }}
                        />
                      </div>
                      {showCriteria && (
                        <div className="absolute top-full left-0 w-120 mt-1 bg-white rounded-lg shadow-xl p-3 z-50">
                          <PasswordChecklist
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={8}
                            value={password}
                            valueAgain={passwordAgain}
                            messages={{
                              minLength: "Password must have at least 8 characters",
                              specialChar: "Password must contain a special character",
                              number: "Password must contain a number",
                              capital: "Password must contain a capital letter",
                              match: "Passwords must match",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 justify-end mt-6 pt-5 border-t border-[#E8DDD5]">
                      <button
                        type="submit"
                        className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#5C3D2E] text-white text-xs uppercase tracking-widest hover:bg-[#7A5244] transition-colors"
                      >
                        <i className="fa-solid fa-check"></i>
                        {isPendingPass ? <Spinner size="sm"/> : "Αποθήκευση"}
                      </button>
                    </div>
                  </form>
                </FormProvider>
                {isErrorPass && (
                  <ErrorBlock
                    message={errorPass?.response?.data?.message || "Something went wrong while changing password, please try again"}
                  />
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <Footer />
    </>
  );
}