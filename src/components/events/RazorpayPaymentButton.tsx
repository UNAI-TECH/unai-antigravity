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

  // Use refs for callbacks so keystrokes in parent components NEVER wipe out the button
  const beforePaymentRef = useRef(beforePayment);
  beforePaymentRef.current = beforePayment;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const loadPaymentButton = () => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";
    setIsLoading(true);
    setHasError(false);

    // Exact Razorpay embed format with fallback action url:
    // <form action="https://razorpay.com/payment-button/pl_TxxlM2Z9Q4JvBr/view/" method="GET">
    //   <script src="https://checkout.razorpay.com/v1/payment-button.js" data-payment_button_id="pl_TxxlM2Z9Q4JvBr" async> </script>
    // </form>
    const form = document.createElement("form");
    form.id = `razorpay-form-${effectiveButtonId}`;
    form.action = `https://razorpay.com/payment-button/${effectiveButtonId}/view/`;
    form.method = "GET";
    form.className = "w-full flex justify-center items-center m-0 p-0";

    // Pre-insert an authentic high-fidelity Razorpay button so mobile attendees see it immediately at 0ms
    const fallbackBtn = document.createElement("button");
    fallbackBtn.type = "submit";
    fallbackBtn.className = "PaymentButton PaymentButton--dark PaymentButton--rzpTheme PaymentButton--rzp-dark-standard custom-rzp-btn";
    fallbackBtn.setAttribute("data-rzp-placeholder", "true");
    fallbackBtn.innerHTML = `
      <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px; flex-shrink: 0;">
        <path d="M7.077 6.476l-.988 3.569 5.65-3.589-3.695 13.54 3.752.004 5.457-20L7.077 6.476z" fill="#fff"></path>
        <path d="M1.455 14.308L0 20h7.202L10.149 8.42l-8.694 5.887z" fill="#fff"></path>
      </svg>
      <div class="PaymentButton-contents" style="text-align: left;">
        <span class="PaymentButton-text" style="font-size: 15px; font-weight: 800; letter-spacing: 0.5px; line-height: 1.2; display: block; color: #ffffff;">PAY HERE</span>
        <div class="PaymentButton-securedBy" style="font-size: 9px; letter-spacing: 0.2px; opacity: 0.75; color: #ffffff; line-height: 1; margin-top: 2px;">Secured by Razorpay</div>
      </div>
    `;
    form.appendChild(fallbackBtn);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/payment-button.js";
    script.setAttribute("data-payment_button_id", effectiveButtonId);
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
      setHasError(false);
      // Remove placeholder once Razorpay's official widget has mounted
      const placeholder = form.querySelector('[data-rzp-placeholder="true"]');
      if (placeholder && form.children.length > 2) {
        placeholder.remove();
      }
    };

    script.onerror = () => {
      setIsLoading(false);
      setHasError(false); // Do not block user; fallback button will direct them straight to checkout
      console.warn("Razorpay script load deferred, using direct payment action fallback.");
    };

    // Capture standard form submission executed by Razorpay upon successful payment
    const handleFormSubmit = (e: Event) => {
      if (beforePaymentRef.current && !beforePaymentRef.current()) {
        e.preventDefault();
        e.stopPropagation();
        setIsProcessing(false);
        return;
      }

      const hiddenInput = form.querySelector('input[name="razorpay_payment_id"]') as HTMLInputElement;
      const paymentId = hiddenInput?.value?.trim();
      if (paymentId && paymentId.startsWith("pay_") && paymentId.length >= 8) {
        e.preventDefault();
        setIsProcessing(true);
        if (onSuccessRef.current) {
          onSuccessRef.current({
            razorpay_payment_id: paymentId,
            status: "success",
          });
        }
      }
    };
    form.addEventListener("submit", handleFormSubmit);

    // Hook programmatic form.submit() call executed by Razorpay widget
    form.submit = () => {
      if (beforePaymentRef.current && !beforePaymentRef.current()) {
        setIsProcessing(false);
        return;
      }
      const hiddenInput = form.querySelector('input[name="razorpay_payment_id"]') as HTMLInputElement;
      const paymentId = hiddenInput?.value?.trim();
      if (paymentId && paymentId.startsWith("pay_") && paymentId.length >= 8) {
        setIsProcessing(true);
        if (onSuccessRef.current) {
          onSuccessRef.current({
            razorpay_payment_id: paymentId,
            status: "success",
          });
        }
      }
    };

    form.appendChild(script);
    container.appendChild(form);

    // Fallback timer: ensure loading indicator turns off quickly
    const timer = setTimeout(() => {
      setIsLoading(false);
      // If Razorpay mounted, clean placeholder
      const placeholder = form.querySelector('[data-rzp-placeholder="true"]');
      if (placeholder && form.children.length > 2) {
        placeholder.remove();
      }
    }, 1800);

    return () => {
      clearTimeout(timer);
      form.removeEventListener("submit", handleFormSubmit);
    };
  };

  useEffect(() => {
    const cleanup = loadPaymentButton();

    // Listen to click and touch on container to enforce beforePayment check
    const container = containerRef.current;
    const handleInteract = (e: Event) => {
      if (beforePaymentRef.current && !beforePaymentRef.current()) {
        e.preventDefault();
        e.stopPropagation();
        setIsProcessing(false);
        return false;
      }
      setIsProcessing(true);
      return true;
    };

    if (container) {
      container.addEventListener("click", handleInteract, true);
      container.addEventListener("touchend", handleInteract, true);
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
                if (onSuccessRef.current) {
                  onSuccessRef.current({
                    ...data,
                    razorpay_payment_id: paymentId,
                    status: "success",
                  });
                }
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
        container.removeEventListener("click", handleInteract, true);
        container.removeEventListener("touchend", handleInteract, true);
        container.innerHTML = "";
      }
      window.removeEventListener("message", handleMessage);
    };
    // ONLY depend on effectiveButtonId so keystrokes in parent inputs NEVER destroy the button!
  }, [effectiveButtonId]);

  return (
    <div className={`w-full flex flex-col items-center gap-3.5 ${className}`}>
      {/* Price Summary Banner */}
      {amount !== undefined && amount !== null && amount !== "" && (
        <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
              <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-emerald-800">
                Amount Payable
              </p>
              <p className="text-xl sm:text-2xl font-black text-emerald-700 leading-tight">
                ₹{Number(amount).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-emerald-700 bg-white/80 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-emerald-500/20 shadow-sm shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secured by Razorpay</span>
          </div>
        </div>
      )}

      {/* Loading state indicator */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-1 text-xs text-slate-500">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-600" />
          <span>Connecting to Razorpay gateway...</span>
        </div>
      )}

      {/* Processing Status Banner */}
      {isProcessing && (
        <div className="w-full p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-left animate-in fade-in-50 duration-300">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-black uppercase tracking-wider text-blue-900">
              Payment Processing in Razorpay
            </p>
            <p className="text-xs text-blue-700">
              Please complete your payment in the Razorpay checkout window. Do not close this page.
            </p>
          </div>
        </div>
      )}

      {/* Razorpay Button Scoped CSS */}
      <style>{`
        .razorpay-btn-container {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          min-height: 52px !important;
        }
        .razorpay-btn-container form {
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .razorpay-btn-container .custom-rzp-btn,
        .razorpay-btn-container .PaymentButton {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: #0c2340 !important;
          color: #ffffff !important;
          min-height: 52px !important;
          padding: 10px 24px !important;
          border-radius: 12px !important;
          text-decoration: none !important;
          border: none !important;
          cursor: pointer !important;
          box-shadow: 0 4px 14px rgba(12, 35, 64, 0.3) !important;
          transition: all 0.2s ease !important;
          width: 100% !important;
          max-width: 340px !important;
          -webkit-tap-highlight-color: transparent !important;
        }
        .razorpay-btn-container .custom-rzp-btn:hover,
        .razorpay-btn-container .PaymentButton:hover {
          filter: brightness(1.1) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 18px rgba(12, 35, 64, 0.4) !important;
        }
        .razorpay-btn-container .custom-rzp-btn:active,
        .razorpay-btn-container .PaymentButton:active {
          transform: translateY(0px) !important;
        }
        .razorpay-btn-container .custom-rzp-btn svg,
        .razorpay-btn-container .PaymentButton svg {
          margin-right: 12px !important;
          flex-shrink: 0 !important;
        }
        .razorpay-btn-container .custom-rzp-btn .PaymentButton-contents,
        .razorpay-btn-container .PaymentButton-contents {
          text-align: left !important;
        }
        .razorpay-btn-container .custom-rzp-btn .PaymentButton-text,
        .razorpay-btn-container .PaymentButton-text {
          font-size: 15px !important;
          font-weight: 800 !important;
          letter-spacing: 0.5px !important;
          line-height: 1.2 !important;
          display: block !important;
          color: #ffffff !important;
        }
        .razorpay-btn-container .custom-rzp-btn .PaymentButton-securedBy,
        .razorpay-btn-container .PaymentButton-securedBy {
          font-size: 9px !important;
          letter-spacing: 0.2px !important;
          opacity: 0.8 !important;
          color: #ffffff !important;
          line-height: 1 !important;
          margin-top: 2px !important;
        }
      `}</style>

      {/* Embedded Razorpay Form Container */}
      <div
        ref={containerRef}
        className="w-full flex justify-center items-center razorpay-btn-container min-h-[52px]"
      />

      {/* Security & Compulsory Payment Guarantee Note */}
      <div className="w-full pt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500 font-medium">
        <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Payment is compulsory for this event. Entry confirmed upon Razorpay verification.</span>
      </div>
    </div>
  );
};
