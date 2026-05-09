import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../sharedComponents/utilComponents/Spinner";
import ErrorBlock from "../../sharedComponents/utilComponents/ErrorBlock";

export default function AdminProductsTable({ products, onEdit, onDelete, onImage, isLoading, isError, error }) {

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
        <ErrorBlock message={error?.message || "Something went wrong while fetching the products, please try again later"} />

      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-white/40 text-sm">No products found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm text-white/80">
          <thead>
            <tr className="bg-brand-dark text-white/50 uppercase text-xs tracking-wider">
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-right">Final Price</th>
              <th className="px-4 py-3 text-center">Discount</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product.productId}
                className={`border-t border-white/5 transition-colors hover:bg-white/5 ${i % 2 === 0 ? "bg-white/[0.02]" : ""
                  }`}
              >
                <td className="px-4 py-3">
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="w-12 h-12 object-cover rounded-lg bg-white/10"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-white">{product.productName}</td>
                <td className="px-4 py-3">{product.categoryId}</td>
                <td className="px-4 py-3 text-right">€{product.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right">€{product.finalPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-center">
                  {product.hasDiscount ? (
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                      {product.discount}%
                    </span>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${product.availableQuantity > 0
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-red-500/20 text-red-400"
                    }`}>
                    {product.availableQuantity}
                  </span>
                </td>
                <td className="px-4 py-3 max-w-[200px]">
                  <p className="truncate text-white/50 text-xs">{product.description}</p>
                </td>
                <td className="px-4 py-3">
                  <ActionButtons product={product} onImage={onImage} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3"
          >
            {/* Top row: image + name + badges */}
            <div className="flex gap-3 items-start">
              <img
                src={product.image}
                alt={product.productName}
                className="w-14 h-14 object-cover rounded-lg bg-white/10 shrink-0"
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-white font-semibold text-sm">{product.productName}</p>
                <p className="text-white/40 text-xs line-clamp-2">{product.description}</p>
              </div>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap gap-2">
              <span className="text-white/80 text-xs font-medium">€{product.finalPrice.toFixed(2)}</span>
              {product.hasDiscount && (
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                  -{product.discount}%
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full ${product.availableQuantity > 0
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-red-500/20 text-red-400"
                }`}>
                Stock: {product.availableQuantity}
              </span>
            </div>

            {/* Actions row */}
            <div className="flex gap-2 border-t border-white/10 pt-3">
              <button
                onClick={() => onImage(product)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer text-xs"
              >
                <FontAwesomeIcon icon={faImage} />
                Image
              </button>
              <button
                onClick={() => onEdit(product)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition cursor-pointer text-xs"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
                Edit
              </button>
              <button
                onClick={() => onDelete(product)}
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

function ActionButtons({ product, onImage, onEdit, onDelete }) {
  return (
    <div className="flex md:flex-row flex-col items-center gap-1">
      <button
        onClick={() => onImage(product)}
        title="Add Image"
        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
      >
        <FontAwesomeIcon icon={faImage} />
      </button>
      <button
        onClick={() => onEdit(product)}
        title="Edit"
        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition cursor-pointer"
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
      <button
        onClick={() => onDelete(product)}
        title="Delete"
        className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}