import React from "react";
import { createEvent, createStore } from "effector";
import { createStoreConsumer } from "effector-react";
import Composer from "react-composer";
import { form } from "../store";

const storeContexts = new Map();
const storeProvider = createStore(new Map());
const storeConsumers = storeProvider.map(state =>
  Array.from(state.values())
    .map(store => [
      createStoreConsumer(store),
      storeContexts.get(store.id).Provider
    ])
    .map(([Component, Provider]) => ({ children }) => {
      return (
        <Component>
          {value => <Provider value={value}>{children()}</Provider>}
        </Component>
      );
    })
    .map(Component => <Component />)
);
const pushStore = createEvent();

storeProvider.on(pushStore, (state, store) => {
  if (state.has(store.id)) return state;
  storeContexts.set(store.id, React.createContext(store.getState()));
  return new Map(state.set(store.id, store));
});

const StoreConsumers = createStoreConsumer(storeConsumers);

storeProvider.watch(stores => {
  console.log(stores);
});

export class StoreProvider extends React.Component {
  renderProp = state => (
    <Composer components={state}>{() => this.props.children}</Composer>
  );
  render() {
    return <StoreConsumers>{this.renderProp}</StoreConsumers>;
  }
}

function useStore(store) {
  React.useEffect(
    () => {
      pushStore(store);
    },
    [store]
  );
  const state = React.useContext(
    storeContexts.get(store.id) || React.createContext(store.getState())
  );
  return state;
}

export const FirstNameInput = () => {
  const state = useStore(form.firstName);
  return <input onChange={form.changeFirstName} value={state} />;
};

export const LastNameInput = () => {
  const state = useStore(form.lastName);
  return <input onChange={form.changeLastName} value={state} />;
};
