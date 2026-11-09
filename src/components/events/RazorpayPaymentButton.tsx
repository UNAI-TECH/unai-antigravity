import React, { useEffect, useRef, useState } from "react";
import { Loader2, ShieldCheck, IndianRupee, AlertCircle, RefreshCw, Lock } from "lucide-react";

interface RazorpayPaymentButtonProps {
  buttonId?: string;
  amount?: number | string;
  onSuccess: (paymentData: any) => void;
  beforePayment?: () => boolean;
  className?: string;
}

export const RazorpayPaymentButton: React.FC<RazorpayPaymentButtonProps> = ({
  buttonId = "pl_TxxlM2Z9Q4JvBr",
  amount,
  onSuccess,
  beforePayment,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const effectiveButtonId = (buttonId && buttonId.trim()) ? buttonId.trim() : "pl_TxxlM2Z9Q4JvBr";

  const loadPaymentButton = () => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    setIsLoading(true);
    setHasError(false);

    // Exact Razorpay embed format:
    // <form><script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_TxxlM2Z9Q4JvBr" async> </script> </form>
    const form = document.createElement("form");
    form.id = `razorpay-form-${effectiveButtonId}`;
    form.className = "w-full flex justify-center";

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", effectiveButtonId);
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };

    script.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      console.error("Failed to load Razorpay payment button script from checkout.razorpay.com");
    };

    // Capture standard form submission executed by Razorpay upon successful payment
    const handleFormSubmit = (e: Event) => {
      e.preventDefault();
      if (beforePayment && !beforePayment()) {
        setIsProcessing(false);
        return;
      }
      setIsProcessing(true);
      const hiddenInput = form.querySelector('input[name="razorpay_payment_id"]') as HTMLInputElement;
      const paymentId = hiddenInput?.value?.trim();
      if (paymentId && paymentId.startsWith("pay_") && paymentId.length >= 8) {
        onSuccess({
          razorpay_payment_id: paymentId,
          status: "success",
        });
      } else {
        setIsProcessing(false);
      }
    };
    form.addEventListener("submit", handleFormSubmit);

    // Hook programmatic form.submit() call executed by Razorpay widget
    form.submit = () => {
      if (beforePayment && !beforePayment()) {
        setIsProcessing(false);
        return;
      }
      setIsProcessing(true);
      const hiddenInput = form.querySelector('input[name="razorpay_payment_id"]') as HTMLInputElement;
      const paymentId = hiddenInput?.value?.trim();
      if (paymentId && paymentId.startsWith("pay_") && paymentId.length >= 8) {
        onSuccess({
          razorpay_payment_id: paymentId,
          status: "success",
        });
      } else {
        setIsProcessing(false);
      }
    };

    form.appendChild(script);
    container.appendChild(form);

    // Fallback timer: Razorpay button renders within ~1.5s
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      form.removeEventListener("submit", handleFormSubmit);
    };
  };

  useEffect(() => {
    const cleanup = loadPaymentButton();

    // Listen to click on container to detect when attendee opens Razorpay checkout
    const container = containerRef.current;
    const handleClick = (e: MouseEvent) => {
      if (beforePayment && !beforePayment()) {
        e.preventDefault();
        e.stopPropagation();
        setIsProcessing(false);
        return;
      }
      setIsProcessing(true);
    };
    if (container) {
      container.addEventListener("click", handleClick, true);
    }

    // Listen for postMessage from Razorpay checkout iframe
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.origin === "string" && (event.origin.includes("razorpay.com") || event.origin.includes("razorpay"))) {
        try {
          const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
          if (data) {
            // If user closed the modal without finishing payment
            if (data.event_type === "close_modal" || data.event === "payment.failed" || data.name === "payment.failed") {
              setIsProcessing(false);
              return;
            }

            // Payment success confirmation from Razorpay
            const isSuccess =
              data.event === "payment.success" ||
              data.status === "success" ||
              Boolean(data.razorpay_payment_id) ||
              data.name === "payment.success" ||
              data.event_type === "redirect_to_on_payment_success" ||
              data.event_type === "payment.success" ||
              Boolean(data.data?.razorpay_payment_id) ||
              Boolean(data.data?.payment_id);

            if (isSuccess) {
              const rawPaymentId =
                data.razorpay_payment_id ||
                data.data?.razorpay_payment_id ||
                data.data?.payment_id;

              const paymentId = typeof rawPaymentId === "string" ? rawPaymentId.trim() : "";

              if (paymentId && paymentId.startsWith("pay_") && paymentId.length >= 8) {
                setIsProcessing(false);
                onSuccess({
                  ...data,
                  razorpay_payment_id: paymentId,
                  status: "success",
                });
              }
            }
          }
        } catch {
          // Ignore non-JSON messages
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      if (cleanup) cleanup();
      if (container) {
        container.removeEventListener("click", handleClick, true);
        container.innerHTML = "";
      }
      window.removeEventListener("message", handleMessage);
    };
  }, [effectiveButtonId, onSuccess, beforePayment]);

  return (
    <div className={`w-full flex flex-col items-center gap-4 ${className}`}>
      {/* Price Summary Banner */}
      {amount !== undefined && amount !== null && amount !== "" && (
        <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-emerald-800">
                Amount Payable
              </p>
              <p className="text-2xl font-black text-emerald-700">
                ₹{Number(amount).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Secured by Razorpay</span>
          </div>
        </div>
      )}

      {/* Loading state indicator */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-slate-500">
          <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
          <span>Loading secure payment gateway...</span>
        </div>
      )}

      {/* Processing Status Banner */}
      {isProcessing && (
        <div className="w-full p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex items-center gap-3 text-left animate-in fade-in-50 duration-300">
          <div className="w-9 h-9 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-black uppercase tracking-wider text-blue-900">
              Payment Processing in Razorpay
            </p>
            <p className="text-xs text-blue-700">
              Please complete your payment in the Razorpay checkout window. Do not close or refresh this page.
            </p>
          </div>
        </div>
      )}

      {/* Error / Ad-blocker notice with retry */}
      {hasError && (
        <div className="w-full p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Payment Gateway Unavailable
              </p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                The payment button script could not be loaded. If you are using an ad-blocker or content filter, please allow <code>checkout.razorpay.com</code> and try again.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={loadPaymentButton}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Loading Payment Button
          </button>
        </div>
      )}

      {/* Embedded Razorpay Form Container */}
      <style>{`
        .razorpay-btn-container {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
        }
        .razorpay-btn-container form {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          margin: 0 !important;
        }
        .razorpay-btn-container .razorpay-payment-button {
          width: 100% !important;
          min-height: 52px !important;
          padding: 14px 24px !important;
          border-radius: 1rem !important;
          font-weight: 800 !important;
          font-size: 0.95rem !important;
          letter-spacing: 0.025em !important;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%) !important;
          color: #ffffff !important;
          border: none !important;
          box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.35) !important;
          cursor: pointer !important;
          transition: all 0.25s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
        }
        .razorpay-btn-container .razorpay-payment-button:hover {
          filter: brightness(1.08) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 14px 28px -5px rgba(37, 99, 235, 0.45) !important;
        }
        .razorpay-btn-container .razorpay-payment-button:active {
          transform: translateY(0px) !important;
        }
      `}</style>
      <div
        ref={containerRef}
        className="w-full flex justify-center razorpay-btn-container min-h-[52px]"
      />

      {/* Security & Compulsory Payment Guarantee Note */}
      <div className="w-full pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-center text-[11px] text-slate-500 font-medium">
        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Payment is compulsory for this event. Registration is officially confirmed only upon successful Razorpay verification.</span>
      </div>
    </div>
  );
};
