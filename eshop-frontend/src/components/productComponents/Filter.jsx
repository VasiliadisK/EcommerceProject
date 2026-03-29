import { faSearch, faChevronDown, faCheck, faArrowUpAZ, faArrowDownAZ, faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Popover from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../http/categoryRequests";

export default function Filter({ onCategoryChange, onSearchChange, onSortChange }) {
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getAllCategories"],
        queryFn: () => getAllCategories(),
        retry: false,
    });

    const categories = [
        { categoryId: "all", categoryName: "All Categories" },
        ...(data?.data?.categories ?? [])
    ];

    const [category, setCategory] = useState("all");
    const [open, setOpen] = useState(false);

    const selected = categories.find((c) => String(c.categoryId) === String(category));

    function handleCategoryChange(value) {
        setCategory(value);
        setOpen(false);
        onCategoryChange?.(value === "all" ? null : value);
    }

    function handleSearchChange(e) {
        onSearchChange?.(e.target.value);
    }

    const sortStates = [null, "asc", "desc"];
    const [sortIndex, setSortIndex] = useState(0);
    const sortOrder = sortStates[sortIndex];

    function handleSortToggle() {
        const next = (sortIndex + 1) % sortStates.length;
        setSortIndex(next);
        onSortChange?.(sortStates[next]);
    }

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input
                    type="text"
                    onChange={handleSearchChange}
                    placeholder="Search products"
                    className="border border-brand text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-brand transition duration-200"
                />
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-slate-400" />
            </div>

            <div className="flex sm:flex-row flex-col gap-3 items-center">
                <button
                    onClick={handleSortToggle}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-brand bg-white text-slate-800 text-sm font-medium hover:bg-[#F5EDE4] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand"
                >
                    <FontAwesomeIcon icon={
                        sortOrder === null ? faArrowUp :
                            sortOrder === "asc" ? faArrowUp :
                                faArrowDown
                    } className={`${sortOrder === null ? "text-slate-400" : "text-brand"}`} />

                    {sortOrder === null ? "Sort" : sortOrder === "asc" ? "Ascending" : "Descending  "}
                </button>

                <Popover.Root open={open} onOpenChange={setOpen}>
                    <Popover.Trigger asChild>
                        <button className="w-52 inline-flex items-center justify-between gap-3 px-4 py-2 rounded-md border border-brand bg-white text-slate-800 text-sm font-medium hover:bg-[#F5EDE4] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand">
                            <span>{selected?.categoryName ?? "All Categories"}</span>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`text-brand text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                            />
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content
                            className="bg-white border border-[#E8DDD5] rounded-lg shadow-lg z-50 py-1 w-52 max-h-64 overflow-y-auto"
                            sideOffset={6}
                            align="end"
                            onOpenAutoFocus={(e) => e.preventDefault()}
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat.categoryId}
                                    onClick={() => handleCategoryChange(String(cat.categoryId))}
                                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-slate-700 hover:bg-[#F5EDE4] hover:text-[#5C3D2E] transition-colors cursor-pointer"
                                >
                                    {cat.categoryName}
                                    {String(category) === String(cat.categoryId) && (
                                        <FontAwesomeIcon icon={faCheck} className="text-brand text-xs" />
                                    )}
                                </button>
                            ))}
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </div>
        </div>
    );
}