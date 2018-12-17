import { useState, useEffect } from "react";

export function useStore(store) {
  const [state, setState] = useState(store.getState);

  useEffect(() => store.watch(setState), [store]);

  return state;
}
