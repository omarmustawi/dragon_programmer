import { Link } from "react-router-dom";
import "./style.css";

import { AiOutlineArrowRight } from "react-icons/ai";
export default function Err404() {
  return (
    <div className="err404">
      <div class="noise"></div>
      <div class="overlay"></div>
      <div class="terminal">
        <h1>
          Error <span class="errorcode">404</span>
        </h1>
        <p class="output ">
          <AiOutlineArrowRight className="inline" />
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <p class="output">
          <AiOutlineArrowRight className="inline" />
          Please try to 
          <Link to="/" className="button">
            return to the homepage
          </Link>
          .
        </p>
        <p class="output">
          <AiOutlineArrowRight className="inline" />
          Good luck.
        </p>
      </div>
    </div>
  );
}
