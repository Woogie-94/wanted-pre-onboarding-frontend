import { produce } from "immer";
import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";

import { noop } from "../utils";

interface State {
  type: "add" | "dismiss" | "remove";
  message: string;
}

type Action = { type: "add"; message: string } | { type: "dismiss" } | { type: "remove" };

const ToastContext = createContext<State | undefined>(undefined);
const ToastDispatchContext = createContext<Dispatch<Action>>(noop);

const reducer = produce((draft: State, action: Action) => {
  switch (action.type) {
    case "add":
      draft.type = action.type;
      draft.message = action.message;
      break;
    case "dismiss":
      draft.type = action.type;
      break;
    case "remove":
      draft.type = action.type;
      break;
  }
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { type: "remove", message: "" });

  return (
    <ToastContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>{children}</ToastDispatchContext.Provider>
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
export const useToastDispatchContext = () => useContext(ToastDispatchContext);
