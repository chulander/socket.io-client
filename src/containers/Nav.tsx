import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavItem, { NavItemWithRef } from "../components/NavItem";

const defaultClassname =
  "rounded-md px-3 py-2 text-sm font-medium  text-white hover:bg-gray-700 hover:text-white";
const activeClassname =
  "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white";
export interface Nav {
  className?: string;
}
export function Nav({ className }: Nav) {
  return (
    <Disclosure as="nav" className={`bg-gray-800 ${className}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 w-full items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <NavItem to="/home">
                    <img
                      className="block h-12 w-auto lg:hidden"
                      src="https://media.graphassets.com/ZTEzJmSoRYGwcyShcGQ2"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-12 w-auto lg:block"
                      src="https://media.graphassets.com/ZTEzJmSoRYGwcyShcGQ2"
                      alt="Your Company"
                    />
                  </NavItem>
                </div>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}

                  <NavItem to="/careers" className={defaultClassname}>
                    Careers
                  </NavItem>
                  <NavItem
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? activeClassname : defaultClassname
                    }
                  >
                    About us
                  </NavItem>
                  <NavItem
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? activeClassname : defaultClassname
                    }
                  >
                    Contact Us
                  </NavItem>
                </div>
              </div>
              <div className="-mr-2 flex sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as={NavItemWithRef}
                to="/careers"
                className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
              >
                Careers
              </Disclosure.Button>
              <Disclosure.Button
                as={NavItemWithRef}
                to="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                About us
              </Disclosure.Button>
              <Disclosure.Button
                as={NavItemWithRef}
                to="/contact"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Contact us
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
export default Nav;
