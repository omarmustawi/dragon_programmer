import myImage from "../../images/myImage.png";
import ImageMekdad from "../../images/ImageMekdad.jpg";
import { FaSquareFacebook, FaTelegram } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section className="w-full h-full text-xl font-medium text-stone-700 bg-slate-50">
      <section>
        <div className="intro h-20"></div>
        <div className="flex justify-center">
          <div className="md:m-20 m-5">
            <h1 className="mb-8 md:text-4xl sm:text-2xl text-center font-semibold text-orange-400">
              Information About owners{" "}
            </h1>
            <div className="flex lg:flex-row flex-col gap-5 lg:gap-0">
              {/* info about me */}
              <div className="flex sm:flex-row sm:gap-0 gap-2 flex-col justify-center items-center lg:w-1/2 w-full lg:border-r-2 border-slate-200 lg:border-b-0 border-b-2 pb-4">
                <img
                  src={myImage}
                  alt="myImage"
                  width={200}
                  className=" bg-gradient-to-tr from-pink-400  to-orange-200 rounded-full"
                />
                <div className="ml-10">
                  <p className="text-lg md:text-xl">
                    <span className="text-pink-500 font-bold"> Hello</span> , My
                    name is{" "}
                    <span className="text-pink-500 font-bold">
                      {" "}
                      OMAR MUSTAWY{" "}
                    </span>
                    , a student at Faculty of Informatics Engineering at
                    Tishreen University. Also, I am fornt-end developer.
                  </p>
                  <h1 className="text-slate-700 text-xl font-bold">
                    Follow me by:{" "}
                  </h1>
                  <div className="flex gap-8 w-fit m-auto">
                    <Link
                      to="https://www.facebook.com/omar.mestawi/"
                      target="_blank"
                    >
                      <FaSquareFacebook size={30} color="#334155" />
                    </Link>
                    <Link to="https://t.me/omar_mustawy" target="_blank">
                      <FaTelegram size={30} color="#334155" />
                    </Link>
                    <Link
                      to="https://api.whatsapp.com/send?phone=+963931886477&text=Hello, more information!"
                      target="_blank"
                    >
                      <IoLogoWhatsapp size={30} color="#334155" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* info about MEKDAD */}
              <div className="flex sm:flex-row sm:gap-0 gap-2 flex-col justify-center items-center lg:w-1/2 w-full lg:border-l-2 border-slate-200 lg:border-b-0 border-b-2 pb-4 ">
                <img
                  src={ImageMekdad}
                  alt="myImage"
                  width={200}
                  className="rounded-full h-60 ml-3"
                />
                <div className="ml-10">
                  <p className="text-lg md:text-xl">
                    <span className="text-pink-500 font-bold"> Hello</span> I am{" "}
                    <span className="text-pink-500 font-bold">
                      MEKDAD GHAZAL{" "}
                    </span>{" "}
                    from Syria, Lattakia. I am 22 years Graduate of Faculty of
                    Information Engineering I am Freelance, Backend Developer,
                    IT and networking engineer{" "}
                  </p>
                  <h1 className="text-slate-700 text-xl font-bold">
                    Follow me by:{" "}
                  </h1>
                  <div className="flex gap-8 w-fit m-auto">
                    <Link
                      to="https://www.facebook.com/mekdad.ghazal.7/"
                      target="_blank"
                    >
                      <FaSquareFacebook size={30} color="#334155" />
                    </Link>
                    <Link
                      to="https://www.instagram.com/itz_mekdad/?fbclid=IwAR3XNE_O4D-iFfOEB6kUr9gOdSsnDtAbfFIuINe2pvNUXXIqlnMEZdNP__I"
                      target="_blank"
                    >
                      <FaInstagramSquare size={30} color="#334155" />
                    </Link>
                    <Link
                      to="https://api.whatsapp.com/send?phone=+963931886477&text=Hello, more information!"
                      target="_blank"
                    >
                      <IoLogoWhatsapp size={30} color="#334155" />
                    </Link>
                    <Link
                      to="https://twitter.com/mekdad_gh?fbclid=IwAR1wejyOXe65eyhbssRdm-HNoclCjd3H94uXW5cVzydbl5i-VkMCuohnUGA"
                      target="_blank"
                    >
                      <BsTwitter size={30} color="#334155" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* about our website */}
            <section className="pt-10 text-lg md:text-xl">
              <p>
                Welcome to{" "}
                <span className="text-pink-500 font-bold">
                  Dragon Programming Academy
                </span>
                , your destination for learning and mastering programming
                languages!
              </p>

              <p>
                Our mission is to make programming education accessible,
                engaging, and effective for learners of all levels. Whether
                you're a complete beginner or an experienced coder, we have
                courses that cater to your needs.
              </p>

              <p>
                Our team of experienced instructors is passionate about teaching
                and technology. We've designed our courses to provide hands-on
                experience, real-world projects, and a supportive learning
                environment.
              </p>
              <br />
              <h2>Why Choose Us?</h2>
              <p className="text-orange-800">
                <strong className="text-pink-500">
                  {" "}
                  ✓ Expert Instructors:{" "}
                </strong>{" "}
                Our instructors are industry professionals who are passionate
                about sharing their knowledge.
              </p>
              <p className="text-orange-800">
                <strong className="text-pink-500">
                  {" "}
                  ✓ Comprehensive Curriculum:{" "}
                </strong>{" "}
                Our courses cover a wide range of programming languages,
                frameworks, and technologies.
              </p>
              <p className="text-orange-800">
                <strong className="text-pink-500">
                  {" "}
                  ✓ Hands-on Learning:{" "}
                </strong>{" "}
                Get practical experience through coding exercises and real-world
                projects.
              </p>
              <p className="text-orange-800">
                <strong className="text-pink-500">
                  {" "}
                  ✓ Supportive Community:{" "}
                </strong>{" "}
                Join a community of learners, connect with peers, and receive
                help when needed.
              </p>
              <br />
              <h2>Our Vision</h2>
              <p>
                We envision a world where programming is accessible to everyone.
                We believe that coding skills are essential in today's digital
                age and can open doors to endless opportunities.
              </p>
            </section>

            {/* Report a problem */}
            <div className="mt-16 ">
              <strong className="text-slate-700 text-lg md:text-xl">
                If you have any questions, feedback, or inquiries, don't
                hesitate to get in touch with us. We're here to help you on your
                coding journey!
              </strong>
              <br />
              <br />
              <form className="flex flex-col justify-center items-center md:gap-8 gap-3 w-full">
                <input
                  className="rounded-input md:w-1/2 w-full"
                  type="text"
                  placeholder="Name"
                />
                <input
                  className="rounded-input md:w-1/2 w-full"
                  type="email"
                  placeholder="Email"
                />
                <textarea
                  className="rounded-input bg-transparent rounded-2xl md:w-1/2 w-full h-48 "
                  placeholder="Object . . ."
                />
                <button className="block w-28 mt-6 m-auto text-lg  p-2 bg-pink-400 text-white rounded-2xl border-2 border-transparent hover:border-2 hover:border-pink-400 hover:bg-white hover:text-pink-400">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
