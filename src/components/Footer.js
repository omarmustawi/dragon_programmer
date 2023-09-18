import { AiOutlineFacebook } from "react-icons/ai";
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { RiTelegramLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
export default function Footer() {
  // FOR MAKE navbar DOESN'T APPEAR IN DASHBOARD
  const location = useLocation();
  if (  !location.pathname.includes('controllPannel') ) {
    return (
      <section className="p-8 bg-backFooter text-gray-300">
        <div className="flex flex-col lg:flex-row items-center justify-around">
          <div>
            <Link to="https://www.facebook.com/omar.mestawi/" target="_blank">
              <AiOutlineFacebook size={30} className="inline-block mx-3 " />
            </Link>
            <Link
              to="https://Linkpi.whatsapp.com/send?phone=+963931886477&text=Hello, more information!"
              target="_blank"
            >
              <PiWhatsappLogoDuotone size={30} className="inline-block mx-3 " />
            </Link>
            <Link to="https://t.me/omar_mustawy" target="_blank">
              <RiTelegramLine size={30} className="inline-block mx-3 " />
            </Link>
          </div>
          <p className="text-center  font-medium">
            &copy; 2023 Dragon Programming Academy. All rights reserved.
          </p>
        </div>
      </section>
    );
  } else {
    return null;
  }
}
