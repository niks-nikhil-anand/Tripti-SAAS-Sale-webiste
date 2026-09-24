import { siteConfig } from "@/lib/site";
import Image from "next/image";

export function FloatingWhatsApp() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I found your website and would like to discuss a development project."
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 transition-transform duration-200 hover:scale-110 active:scale-95 drop-shadow-[0_10px_25px_rgba(37,211,102,0.4)]"
    >
      <Image
        src="/whatsapp.png"
        alt=""
        width={56}
        height={56}
        className="w-full h-full object-contain"
      />
    </a>
  );
}

