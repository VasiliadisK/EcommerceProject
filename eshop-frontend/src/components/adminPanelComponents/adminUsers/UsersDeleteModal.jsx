import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAdmin } from "../../../http/userRequests";
import Modal from "../../sharedComponents/utilComponents/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Spinner from "../../sharedComponents/utilComponents/Spinner";

export default function UserDeleteModal({ user, onClose }) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => deleteUserAdmin(user.userId),
        onSuccess: () => {
            toast.success("User deleted successfully");
            queryClient.resetQueries({ queryKey: ["users"] });
            onClose();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        },
    });

    return (
        <Modal open={true} onClose={onClose} className="admin-delete-modal">
            <style>{`
                .admin-delete-modal {
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
                <h2 className="text-white font-semibold text-lg">Delete User</h2>
                <button onClick={onClose} className="text-white/40 hover:text-white transition cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
            </div>

            <div className="px-6 py-6 flex flex-col items-center gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-400 text-2xl" />
                </div>
                <p className="text-white/70 text-sm">
                    Are you sure you want to delete{" "}
                    <span className="text-white font-semibold">"{user?.userName}"</span>?
                    This action cannot be undone.
                </p>
            </div>

            <div className="flex gap-3 px-6 pb-5">
                <button
                    onClick={onClose}
                    disabled={isPending}
                    className="flex-1 px-4 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition text-sm cursor-pointer disabled:opacity-40"
                >
                    Cancel
                </button>
                <button
                    onClick={mutate}
                    disabled={isPending}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition text-sm cursor-pointer disabled:opacity-40"
                >
                    {isPending ?
                        <div className="flex justify-center items-center">
                            <Spinner size="sm" borderColor="white" />
                        </div> : "Delete"}
                </button>
            </div>
        </Modal>
    );
}