import { FaWhatsapp } from "react-icons/fa";

const Whatsappbutton = () => {
  return (
    <a
      href="https://wa.me/923478852590?text=Hi%20Diskodify,%20I'm%20interested%20in%20your%20courses."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-8 w-8 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform duration-300 hover:scale-110 hover:shadow-green-500/40"
    >
      <FaWhatsapp size={36} />
    </a>
  );
};

export default Whatsappbutton;