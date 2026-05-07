export default function Pagination({ totalPages, currentPage, onPageChange, activeClasses, inactiveClasses }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-12 pb-8">

            <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => {
                    const isActive = index === currentPage;
                    return (
                        <button
                            key={index}
                            onClick={() => onPageChange(index)}
                            className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold transition-all cursor-pointer 
                                ${isActive 
                                    ? `${activeClasses == undefined ? "bg-brand text-white" : activeClasses}  shadow-md scale-105` 
                                    : `${inactiveClasses == undefined ? "text-[#8C7B73]" : inactiveClasses} bg-transparent  hover:bg-[#F5EDE4] hover:text-[#2C1810]`
                                }`}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}