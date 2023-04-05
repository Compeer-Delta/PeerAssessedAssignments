/**
 * Credits:
 * Functionality: Hathan Khatkar
 * 
 */
import { Link } from "react-router-dom"
function BottomSection() {
    return (
      <>
        <nav className="z-20 fixed bottom-0 bg-slate-800 dark:bg-zinc-700 w-full ">
        <div className=" px-4 py-3 mx-auto md:px-6">
          <div className="flex items-center">
            <ul className="flex flex-row mt-0 space-x-20 md:space-x-32 2xl:space-x-80 text-sm font-medium py-5 w-full">
              <li>
                <Link
                  to="/"
                  className=" 2xl:ml-32 sm:mx-3  text-white hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="2xl:ml-64 xl:mx-16 sm:mx-3 text-white hover:underline truncate"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="2xl:ml-64 xl:mx-16 sm:mx-3 text-white hover:underline truncate"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
    )
}
export default BottomSection;