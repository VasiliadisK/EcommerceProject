import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersAdmin } from "../../../http/userRequests";
import { ModalContext } from "../../../store/ModalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import UsersTable from "../adminUsers/UsersTable"
import UserFormModal from "../adminUsers/UsersFormModal";
import UserDeleteModal from "../adminUsers/UsersDeleteModal";
import Pagination from "../../sharedComponents/Pagination";

export default function AdminUsers() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNumber = Number(searchParams.get("pageNumber")) || 0;
    const pageSize = Number(searchParams.get("pageSize")) || 10;

    function updateParam(key, value) {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (value) next.set(key, String(value));
            else next.delete(key);
            return next;
        });
    }

    const {
        openAdminUserAddModal,
        openAdminUserEditModal,
        openAdminUserDeleteModal,
        isAdminUserAddModalOpen,
        isAdminUserEditModalOpen,
        isAdminUserDeleteModalOpen,
        getModalData,
        closeModal,
    } = useContext(ModalContext);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users", { pageNumber, pageSize }],
        queryFn: () => getAllUsersAdmin({ pageNumber, pageSize }),
        retry: false,
    });

    const users = data?.data?.users ?? [];
    const totalPages = data?.data?.totalPages ?? 0;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl font-semibold tracking-wide">Users</h1>
                <button
                    onClick={openAdminUserAddModal}
                    className="flex items-center gap-2 bg-white text-brand font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition cursor-pointer text-sm"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add User
                </button>
            </div>

            <UsersTable
                users={users}
                isLoading={isLoading}
                isError={isError}
                error={error}
                onEdit={openAdminUserEditModal}
                onDelete={openAdminUserDeleteModal}
            />

            {users.length !== 0 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={pageNumber}
                    onPageChange={(newPage) => updateParam("pageNumber", newPage)}
                    activeClasses="bg-white text-brand"
                    inactiveClasses="text-white"
                />
            )}

            {isAdminUserAddModalOpen() && (
                <UserFormModal user={null} onClose={closeModal} />
            )}

            {isAdminUserEditModalOpen() && (
                <UserFormModal user={getModalData()} onClose={closeModal} />
            )}

            {isAdminUserDeleteModalOpen() && (
                <UserDeleteModal user={getModalData()} onClose={closeModal} />
            )}
        </div>
    );
}