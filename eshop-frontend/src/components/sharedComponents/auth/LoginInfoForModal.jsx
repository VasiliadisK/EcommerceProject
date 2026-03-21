import Modal from "../utilComponents/Modal";
import { ModalContext } from "../../../store/ModalContext";
import { useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormTextInput from "../utilComponents/FormTextInput";
import FormPasswordInput from "../utilComponents/FormPasswordInput";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../../http/authRequests";
import { queryClient } from "../../../http/queryClient";
import Spinner from "../utilComponents/Spinner";
import ErrorBlock from "../utilComponents/ErrorBlock";
import toast from "react-hot-toast";

export default function LoginInfoForModal() {
  const { isLoginModalOpen, closeModal, openRegisterModal } =
    useContext(ModalContext);

  const methods = useForm();

  function handleCloseModal() {
    closeModal();
  }


  const {
    mutate: loginUser,
    data,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: (credentials) => login(credentials),
    onSuccess: (response) => {
      setTimeout(() => {
        queryClient.invalidateQueries(["loggedInUser"]);
      }, 100); toast.success(`Welcome back ${response.data.username}`);
      closeModal();
      methods.reset();
    },
    onError: (error) => {
      toast.error("An error occurred: "+error.message)
    },
  });


  async function onSubmit(data) {
    const credentials = {
      username: data.username,
      password: data.password,
    };
    loginUser(credentials);
  }
  return (
    <Modal className="modal" open={isLoginModalOpen()} onClose={closeModal}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto p-2">
            <div className="relative flex items-center justify-center mb-6">
              <h1 className="text-2xl font-semibold text-white">Login</h1>
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute right-0 text-white hover:text-gray-300 transition-colors font-bold text-2xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <FormTextInput
                inputLabel="Username"
                inputKey="username"
                inputMaxLength={20}
                inputMinLength={6}
              />

              <FormPasswordInput inputLabel="Password" inputKey="password" />
            </div>
          </div>
          <div className="p-6 flex justify-center">
            <button
              type="submit"
              className="px-10 py-3 bg-white text-stone-900 font-bold rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
            >
              {isPending ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
      </FormProvider>
      {isError && (
        <ErrorBlock
          message={
            error?.response?.data?.message ||
            "Something went wrong, please try again"
          }
        />
      )}
      <button
        className="text-white text-lg cursor-pointer hover:text-gray-200"
        onClick={openRegisterModal}
      >
        Don't have an account? Register here
      </button>
    </Modal>
  );
}
