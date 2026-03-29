export default function Pagination({ totalPages, currentPage, onPageChange }) {
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
                                    ? "bg-brand text-white shadow-md scale-105" 
                                    : "bg-transparent text-[#8C7B73] hover:bg-[#F5EDE4] hover:text-[#2C1810]"
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