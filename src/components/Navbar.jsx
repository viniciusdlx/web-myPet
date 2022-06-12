import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavbarElements() {
  let activeClassName =
    'easi-in duration-200 text-mpPurple1 lg:border-b-2 lg:border-b-mpPurple1 font-bold'

  return (
    <>
      <nav className="py-6 shadow-xl navbar navbar-expand-lg navbar-light rounded-b-[40px] mbl:rounded-b-[50px] sm:rounded-b-[100px] lg:rounded-b-full bg-white">
        <div className="container mx-auto">
          <div className="w-3/4 mx-auto">
            <div className="flex flex-wrap justify-between lg:justify-around items-center">
              <div>
                <h1 className="text-5xl text-mpPurple1 tracking-widest font-bold ease-linear duration-200 hover:scale-110">
                  <NavLink to="/home">myPet</NavLink>
                </h1>
              </div>
              <button
                className="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
            "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobile-menu"
                aria-controls="mobile-menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="bars"
                  className="w-6"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                  ></path>
                </svg>
              </button>
              <div
                className="collapse navbar-collapse mt-5 lg:mt-2 w-full lg:block lg:w-auto"
                id="mobile-menu"
              >
                <ul className="gap-x-14 gap-y-4 flex flex-col text-center mt-4 lg:flex-row font-normal md:mt-0 md:text-xs md:font-medium md:items-center lg:text-base xl:text-lg 2xl:text-lg">
                  <li className="text-xl lg:text-lg text-mpGreyLink font-medium ease-linear duration-150 hover:scale-105 border-2 lg:border-0 px-6 lg:px-0 rounded-full lg:rounded-none w-3/4 lg:w-auto mx-auto md:mx-0">
                    <NavLink
                      to="/home"
                      className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                      }
                    >
                      HOME
                    </NavLink>
                  </li>
                  <li className="text-xl lg:text-lg text-mpGreyLink font-medium ease-linear duration-150 hover:scale-105 border-2 lg:border-0 px-6 lg:px-0 rounded-full lg:rounded-none w-3/4 lg:w-auto mx-auto md:mx-0">
                    <NavLink
                      to="/meus-pets"
                      className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                      }
                    >
                      MEUS PETS
                    </NavLink>
                  </li>
                  <li className="text-xl lg:text-lg text-mpGreyLink font-medium ease-linear duration-150 hover:scale-105 border-2 lg:border-0 px-6 lg:px-0 rounded-full lg:rounded-none w-3/4 lg:w-auto mx-auto md:mx-0">
                    <NavLink
                      to="/sobre"
                      className={({ isActive }) =>
                        isActive ? activeClassName : undefined
                      }
                    >
                      SOBRE NÓS
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
