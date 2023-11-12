import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Error({ error }) {
  /**
   * Renders an error message and image based on the error type.
   *
   * @param {string} error - The type of error. Can be "404" or "500".
   * @returns {JSX.Element} - The rendered error message, description, button, and images.
   */
  let errorTypeMessage;
  switch (error) {
    case "404":
      errorTypeMessage = "Page not found";
      break;
    case "500":
      errorTypeMessage = "Internal server error";
      break;
    default:
      errorTypeMessage = "Oops, Something went wrong";
  }

  return (
    <div className="min-h-screen lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                {error + " Error"}
                {" (" + error + ". " + errorTypeMessage + ")"}
              </h1>
              <p className="my-2 text-gray-800 dark:text-gray-600">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </p>
              <Link to="/" className="my-2 text-gray-800 font-bold text-2xl dark:text-gray-600">
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
                  Take me there!
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};
