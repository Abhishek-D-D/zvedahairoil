"use client";

export default function WhatsAppButton() {
  const whatsappNumber = "917353553693";
  const message = encodeURIComponent(
    "Hi Zveda! I am looking to start my hair recovery journey and would love to know more about the Ayurvedic Hair Oil ritual."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-sm font-semibold tracking-wide pr-0 group-hover:pr-2">
        Consult on WhatsApp
      </span>
      {/* Lucide React Icon or SVG */}
      <svg
        className="w-6 h-6 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.883-6.963C16.634 1.936 14.16 1.01 11.53 1.01 6.098 1.01 1.677 5.432 1.674 10.865c-.001 1.693.444 3.344 1.29 4.79l-.973 3.553 3.656-.954zm10.933-5.702c-.3-.15-1.774-.875-2.046-.974-.272-.1-.47-.15-.668.15-.198.3-.765.975-.938 1.173-.173.2-.347.225-.648.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.487-1.777-1.66-2.077-.173-.3-.018-.462.13-.61.135-.134.3-.349.45-.524.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.197 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.774-.725 2.022-1.424.248-.699.248-1.299.173-1.424-.075-.125-.272-.2-.572-.35z" />
      </svg>
    </a>
  );
}
