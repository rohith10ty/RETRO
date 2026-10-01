import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShoppingBag } from "lucide-react";

export default function BagDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const priceNum = item.priceRaw || parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0;
    return acc + priceNum * (item.quantity || 1);
  }, 0);

  const formattedSubtotal = "₹" + subtotal.toLocaleString("en-IN");

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        setOrderComplete(false);
        if (onClearCart) onClearCart();
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md cursor-pointer"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-md bg-[#0f0e0e] border-l border-white/15 h-full z-10 text-white flex flex-col justify-between shadow-2xl p-6 sm:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                <h2 className="font-impact uppercase text-xl tracking-tight text-white">
                  SHOPPING BAG
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono font-bold">
                  {cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            {orderComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                <h3 className="font-impact uppercase text-2xl tracking-tight text-white">
                  ORDER AUTHENTICATED
                </h3>
                <p className="font-mono text-xs text-neutral-400 max-w-xs leading-relaxed">
                  Your archive footwear order has been confirmed. Confirmation details sent to your account.
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3 text-neutral-500">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] text-neutral-600 mb-1" />
                <p className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  YOUR BAG IS EMPTY
                </p>
                <p className="text-[11px] text-neutral-500 max-w-[220px]">
                  Select and curate sneakers from the 3D selector or the vault archive.
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-4 space-y-3 custom-scrollbar pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/10"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0">
                        <img
                          src={item.image_url || item.image}
                          alt={item.title || item.name}
                          className="w-full h-full object-contain drop-shadow-sm"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                          {item.title || item.name}
                        </h4>
                        <p className="text-xs font-mono font-semibold text-neutral-400 mt-0.5">
                          {item.price}
                        </p>
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2 bg-black/40 rounded-full border border-white/10 w-fit px-2 py-0.5">
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, -1)}
                            className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-[11px] font-bold px-1.5">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, 1)}
                            className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem && onRemoveItem(item.id)}
                      className="p-2 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer rounded-lg hover:bg-white/5"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer / Summary */}
            {cartItems.length > 0 && !orderComplete && (
              <div className="pt-5 border-t border-white/10 space-y-4">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span className="text-white font-semibold">{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Express Insured Shipping</span>
                    <span className="text-emerald-400 uppercase font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Due</span>
                    <span>{formattedSubtotal}</span>
                  </div>
                </div>

                <button
                  disabled={isCheckingOut}
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 rounded-full font-mono text-xs tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>AUTHENTICATING...</span>
                    </div>
                  ) : (
                    <>
                      <span>CHECKOUT &bull; {formattedSubtotal}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
