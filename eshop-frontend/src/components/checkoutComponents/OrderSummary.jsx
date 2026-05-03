

export const OrderSummary = ({ items, subtotal, shippingCost, total }) => (
  <div className="bg-brand p-8 shadow-xl rounded-sm text-white sticky top-8 border border-white/5">
    <h3 className="text-[11px] uppercase tracking-[0.2em] mb-8 pb-4 border-b border-white/20 font-semibold">Η παραγγελια σας</h3>
    <div className="space-y-6 mb-8">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{item.productName}</p>
            <p className="text-[10px] text-white/60">{item.description} (x{item.requestedQuantity})</p>
          </div>
          <span className="text-sm font-medium">€{(item.finalPrice * item.requestedQuantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
    <div className="space-y-3 pt-6 border-t border-white/20 text-[13px]">
      <div className="flex justify-between text-white/80"><span>Υποσύνολο</span><span>€{subtotal.toFixed(2)}</span></div>
      <div className="flex justify-between text-white/80"><span>Μεταφορικά</span><span>€{shippingCost.toFixed(2)}</span></div>
      <div className="flex justify-between text-lg font-bold pt-4 text-white uppercase tracking-wider">
        <span>Συνολο</span><span>€{total.toFixed(2)}</span>
      </div>
    </div>
  </div>
);