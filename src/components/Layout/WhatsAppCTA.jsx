import React from 'react';

export default function WhatsAppCTA() {
  const whatsappNumber = '+2348123456789';
  const message = encodeURIComponent("Hello Chef Kufreabasi, I'd like to inquire about your culinary consultancy and food safety training services.");

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center bg-[#25D366] text-white p-3.5 shadow-xl hover:bg-[#20ba59] transition-all duration-300 hover:scale-110 pulse-ring-btn"
      style={{ borderRadius: '50%' }}
      aria-label="Contact Chef K on WhatsApp"
    >
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.592 2.03 14.12 1.01 11.5 1.01 6.066 1.01 1.641 5.38 1.637 10.81c-.001 1.737.457 3.432 1.328 4.957l-1.077 3.93 4.028-1.043zm11.58-6.104c-.312-.156-1.848-.901-2.13-.997-.282-.099-.487-.149-.69.156-.204.303-.787.997-.965 1.194-.177.196-.355.221-.668.064-1.05-.524-1.797-.965-2.521-2.21-.19-.325.19-.302.544-1.007.062-.124.03-.232-.015-.325-.045-.093-.41-1.002-.562-1.368-.148-.355-.297-.307-.41-.313-.105-.005-.226-.005-.347-.005-.12 0-.317.045-.483.228-.166.183-.634.613-.634 1.497 0 .884.65 1.736.74 1.86.091.124 1.28 1.929 3.1 2.709 1.517.65 2.06.52 2.784.412.636-.095 1.847-.745 2.11-.976.262-.232.262-.43.184-.541-.077-.111-.28-.196-.593-.352z" />
      </svg>
    </a>
  );
}
