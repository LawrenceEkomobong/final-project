const paystackKey = (import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '').trim().replace(/;$/, ''); 

const hasKey = paystackKey && 
  paystackKey !== 'your_paystack_public_key' && 
  paystackKey !== '' && 
  paystackKey.startsWith('pk_');

/**
 * Initializes and triggers Paystack payment.
 * If credentials are missing, launches a high-fidelity simulated checkout modal.
 * 
 * @param {Object} options
 * @param {string} options.email - Customer email
 * @param {number} options.amount - Total amount in NGN
 * @param {function} options.onSuccess - Success callback receiving { reference }
 * @param {function} options.onClose - Close/Cancel callback
 */
export const initializePaystackCheckout = ({ email, amount, onSuccess, onClose }) => {
  const reference = 'PAYSTK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const koboAmount = Math.round(amount * 100);

  if (hasKey && window.PaystackPop) {
    try {
      const handler = window.PaystackPop.setup({
        key: paystackKey,
        email: email,
        amount: koboAmount,
        currency: 'NGN',
        ref: reference,
        callback: (response) => {
          onSuccess({ reference: response.reference });
        },
        onClose: () => {
          if (onClose) onClose();
        }
      });
      handler.openIframe();
      return;
    } catch (err) {
      console.error('Paystack initialization failed:', err);
    }
  }

  // Live keys missing, or library failed to load - Launch Simulated Checkout Overlay
  console.log('Using Simulated Paystack checkout.');
  showMockPaystackModal({ email, amount, reference, onSuccess, onClose });
};

/**
 * Renders a simulated Paystack checkout overlay directly into the DOM
 */
const showMockPaystackModal = ({ email, amount, reference, onSuccess, onClose }) => {
  const modalId = 'mock-paystack-overlay';
  
  // Clean up existing modal if any
  const existing = document.getElementById(modalId);
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = modalId;
  overlay.className = 'fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 font-sans p-4';
  
  overlay.innerHTML = `
    <div class="bg-white text-[#1C1C1C] w-full max-w-md shadow-2xl overflow-hidden border border-gray-100" style="border-radius: 4px;">
      <!-- Header -->
      <div class="bg-[#09A5DB] p-6 text-white flex justify-between items-center">
        <div>
          <p class="text-xs uppercase tracking-widest font-semibold text-white/80">Secured by Paystack</p>
          <h3 class="text-lg font-bold mt-1">Simulated Checkout</h3>
        </div>
        <div class="text-right">
          <p class="text-xs text-white/80">Reference</p>
          <p class="text-xs font-mono font-medium">${reference}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <div class="flex justify-between items-center border-b border-gray-100 pb-4">
          <div>
            <p class="text-sm text-gray-500 font-medium">Merchant</p>
            <p class="font-bold text-gray-800 text-base">Chef Kufreabasi</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500 font-medium">Email</p>
            <p class="text-sm font-medium text-gray-800">${email}</p>
          </div>
        </div>

        <div class="text-center py-6 bg-gray-50 border border-gray-100" style="border-radius: 4px;">
          <p class="text-sm text-gray-500">Amount Due</p>
          <p class="text-3xl font-extrabold text-gray-900 mt-1">₦${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
        </div>

        <div class="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3 space-y-1" style="border-radius: 4px;">
          <p class="font-bold">⚠️ Sandbox Mode</p>
          <p>No real money will be charged. This simulates the Paystack live gateway experience.</p>
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="bg-gray-50 px-6 py-4 flex gap-3 border-t border-gray-100">
        <button id="mock-pay-cancel" class="flex-1 py-3 text-sm font-semibold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors" style="border-radius: 4px;">
          Cancel
        </button>
        <button id="mock-pay-success" class="flex-1 py-3 text-sm font-semibold text-white bg-[#3BB75E] hover:bg-[#32A150] transition-colors shadow-sm" style="border-radius: 4px;">
          Pay ₦${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Event Listeners
  const cancelBtn = document.getElementById('mock-pay-cancel');
  const successBtn = document.getElementById('mock-pay-success');

  const cleanUp = () => {
    overlay.classList.add('opacity-0');
    overlay.style.transition = 'opacity 0.2s ease-out';
    setTimeout(() => overlay.remove(), 200);
  };

  cancelBtn.addEventListener('click', () => {
    cleanUp();
    if (onClose) onClose();
  });

  successBtn.addEventListener('click', () => {
    cleanUp();
    onSuccess({ reference });
  });
};
