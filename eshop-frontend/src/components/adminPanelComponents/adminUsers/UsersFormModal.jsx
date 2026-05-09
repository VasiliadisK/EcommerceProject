import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserAdmin, updateUserAdmin } from "../../../http/userRequests";
import FormTextInput from "../../sharedComponents/utilComponents/FormTextInput";
import FormSelectInput from "../../sharedComponents/utilComponents/FormSelectInput";
import Modal from "../../sharedComponents/utilComponents/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Spinner from "../../sharedComponents/utilComponents/Spinner";

const ROLE_OPTIONS = [
    { value: "USER", label: "User" },
    { value: "ADMIN", label: "Admin" },
];

export default function UserFormModal({ user, onClose }) {
    const isEdit = !!user;
    const queryClient = useQueryClient();

    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: "",
            address: "",
            city: "",
            postalCode: "",
            phoneNumber: "",
            role: "USER",
        },
    });

    useEffect(() => {
        if (user) {
            methods.reset({
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
                password: "",
                address: user.address ?? "",
                city: user.city ?? "",
                postalCode: user.postalCode ?? "",
                phoneNumber: user.phoneNumber ?? "",
                role: user.role,
            });
        }
    }, [user]);

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => {
            if (isEdit) {
                const { password, ...rest } = data;
                return updateUserAdmin({ userId: user.userId, userData: rest });
            }
            return createUserAdmin(data);
        },
        onSuccess: () => {
            toast.success(isEdit ? "User updated successfully" : "User created successfully");
            queryClient.resetQueries({ queryKey: ["users"] });
            onClose();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
    });

    return (
        <Modal open={true} onClose={onClose} className="admin-user-modal">
            <style>{`
                .admin-user-modal {
                    max-width: 540px !important;
                    width: calc(100% - 2rem) !important;
                    padding: 0 !important;
                    overflow: hidden;
                    overflow-y: auto;
                    max-height: 90vh;
                    background: var(--color-brand-dark) !important;
                    border-radius: 16px !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                }
            `}</style>

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-white font-semibold text-lg">
                    {isEdit ? "Edit User" : "Add User"}
                </h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(mutate)} className="flex flex-col gap-4 px-6 py-5">
                    <div className="grid grid-cols-2 gap-4">
                        <FormTextInput inputLabel="First Name" inputKey="firstName" inputMinLength={2} />
                        <FormTextInput inputLabel="Last Name" inputKey="lastName" inputMinLength={2} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormTextInput inputLabel="Username" inputKey="userName" inputMinLength={3} />
                        <FormTextInput inputLabel="Email" inputKey="email" inputType="email" />
                    </div>
                    {!isEdit && (
                        <FormTextInput inputLabel="Password" inputKey="password" inputType="password" inputMinLength={6} />
                    )}
                    <FormTextInput inputLabel="Address" inputKey="address" />
                    <div className="grid grid-cols-2 gap-4">
                        <FormTextInput inputLabel="City" inputKey="city" />
                        <FormTextInput inputLabel="Postal Code" inputKey="postalCode" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormTextInput inputLabel="Phone Number" inputKey="phoneNumber" />
                        <FormSelectInput inputLabel="Role" inputKey="role" options={ROLE_OPTIONS} />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="px-5 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition text-sm cursor-pointer disabled:opacity-40"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="px-5 py-2.5 rounded-lg bg-white text-brand font-semibold hover:bg-white/90 transition text-sm cursor-pointer disabled:opacity-40"
                        >
                            {isPending ? <Spinner size="sm" /> : isEdit ? "Save Changes" : "Add User"}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
}