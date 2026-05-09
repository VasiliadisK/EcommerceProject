import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../sharedComponents/utilComponents/Spinner";
import ErrorBlock from "../../sharedComponents/utilComponents/ErrorBlock";

export default function CategoriesTable({ categories, isLoading, isError, error, onEdit, onDelete }) {

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

    if (categories.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-white/40 text-sm">No categories found.</p>
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
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, i) => (
                            <tr
                                key={category.categoryId}
                                className={`border-t border-white/5 transition-colors hover:bg-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
                            >
                                <td className="px-4 py-3 text-white/40 text-xs">{category.categoryId}</td>
                                <td className="px-4 py-3 font-medium text-white">{category.categoryName}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(category)}
                                            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(category)}
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
                {categories.map((category) => (
                    <div
                        key={category.categoryId}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                    >
                        <div className="flex flex-col gap-0.5">
                            <p className="text-white font-semibold text-sm">{category.categoryName}</p>
                            <p className="text-white/30 text-xs">ID: {category.categoryId}</p>
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => onEdit(category)}
                                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                            <button
                                onClick={() => onDelete(category)}
                                className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}