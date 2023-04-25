import { useCallback, useState, ChangeEvent, MouseEvent } from "react";
import { UseSocketType } from "../hooks/useSocket";

/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const plans = [
  {
    id: "Car",
    name: "Car Insurance",
    description: "great car insurance",
  },
  {
    id: "Home",
    name: "Home Insurance",
    description: "great home insurance",
  },
  {
    id: "Liability",
    name: "Liability",
    description: "great liability insurance",
  },
];
export type Selection = {
  socket: UseSocketType[0];
};

export function Selection({ socket }: Selection) {
  const [state, setState] = useState("");
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // console.log("what is e.target.value", e.target.value);
    console.log("what is e.target.name", e.target.name);
    // console.log("what is e.target.name", e.target);
    setState(e.target.name);
  }, []);
  const onClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (socket && state) {
        console.log("emitting getComponent", state);
        socket.emit("getComponent", state);
      }
    },
    [socket, state]
  );
  return (
    <form className="border border-black p-4">
      <fieldset>
        <legend className="sr-only">Plan</legend>
        <div className="space-y-5">
          {plans.map((plan) => (
            <div key={plan.id} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={plan.id}
                  aria-describedby={`${plan.id}-description`}
                  name={plan.id}
                  type="radio"
                  checked={plan.id === state}
                  onChange={onChange}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor={plan.id} className="font-medium text-gray-900">
                  {plan.name}
                </label>
                <p id={`${plan.id}-description`} className="text-gray-500">
                  {plan.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        onClick={onClick}
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Get a Quote
      </button>
    </form>
  );
}

export default Selection;
