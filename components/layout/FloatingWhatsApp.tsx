import { siteConfig } from "@/lib/site";

export function FloatingWhatsApp() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I found your website and would like to discuss a development project."
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message Tripti Shakya on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25d366] text-black font-['Space_Grotesk'] font-bold text-[13.5px] shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] hover:scale-105 hover:bg-[#22c35e] transition-all duration-200"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4.5 h-4.5"
      >
        <path d="M12.031 2c-5.517 0-9.997 4.48-9.997 9.998 0 1.763.459 3.483 1.332 5.006L2 22l5.126-1.341c1.472.802 3.136 1.224 4.905 1.224 5.52 0 10.001-4.48 10.001-9.998 0-5.518-4.481-9.985-10.001-9.985zm0 18.258c-1.503 0-2.977-.404-4.264-1.168l-.306-.182-3.076.806.82-2.997-.2-.317a8.219 8.219 0 01-1.261-4.398c0-4.551 3.703-8.254 8.287-8.254 4.582 0 8.285 3.703 8.285 8.254 0 4.553-3.703 8.256-8.285 8.256z" />
      </svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}
