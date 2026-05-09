import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faShield, faUser } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../sharedComponents/utilComponents/Spinner";
import ErrorBlock from "../../sharedComponents/utilComponents/ErrorBlock"

export default function UsersTable({ users, isLoading, isError, error, onEdit, onDelete }) {

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Spinner size="md" borderColor="white" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center py-20">
                <ErrorBlock message={error?.message || "Something went wrong"} />
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-white/40 text-sm">No users found.</p>
            </div>
        );
    }

    return (
        <>
            <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm text-white/80">
                    <thead>
                        <tr className="bg-brand-dark text-white/50 uppercase text-xs tracking-wider">
                            <th className="px-4 py-3 text-left">ID</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Username</th>
                            <th className="px-4 py-3 text-left">Email</th>
                            <th className="px-4 py-3 text-left">Address</th>
                            <th className="px-4 py-3 text-center">Role</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr
                                key={user.userId}
                                className={`border-t border-white/5 transition-colors hover:bg-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                            >
                                <td className="px-4 py-3 text-white/40 text-xs">{user.userId}</td>
                                <td className="px-4 py-3 font-medium text-white">
                                    {user.firstName} {user.lastName}
                                </td>
                                <td className="px-4 py-3 text-white/70">{user.userName}</td>
                                <td className="px-4 py-3 text-white/70">{user.email}</td>
                                <td className="px-4 py-3 text-white/50 text-xs">{user.address}</td>
                                <td className="px-4 py-3 text-center">
                                    <RoleBadge role={user.role} />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(user)}
                                            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(user)}
                                            className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-col gap-3 md:hidden">
                {users.map((user) => (
                    <div
                        key={user.userId}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3"
                    >
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex flex-col gap-0.5">
                                <p className="text-white font-semibold text-sm">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-white/40 text-xs">@{user.userName}</p>
                                <p className="text-white/40 text-xs">{user.email}</p>
                            </div>
                            <RoleBadge role={user.role} />
                        </div>
                        <div className="flex gap-2 border-t border-white/10 pt-3">
                            <button
                                onClick={() => onEdit(user)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer text-xs"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(user)}
                                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer text-xs"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

function RoleBadge({ role }) {
    const isAdmin = role === "ADMIN";
    return (
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
            isAdmin ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"
        }`}>
            <FontAwesomeIcon icon={isAdmin ? faShield : faUser} className="text-[10px]" />
            {role}
        </span>
    );
}