// @flow

import React, { useContext, useMemo } from "react";
import invariant from "invariant";

const componentDataMap = new WeakMap();

function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}

function bindData(Component, data) {
  componentDataMap.set(Component, data);
}

export function getBoundData(Component) {
  const componentData = componentDataMap.get(Component);

  invariant(
    componentData,
    `You need to bind a model to your component "${getDisplayName(
      Component
    )}" (using bindModel)`
  );

  return componentData;
}

export function bindModel(
  Component,
  modelFactory,
  ComponentContext = React.createContext()
) {
  invariant(
    typeof Component === "function" &&
      typeof modelFactory === "function" &&
      ComponentContext &&
      ComponentContext.Provider &&
      ComponentContext.Consumer,
    `bindModel expects a component and a model factory (optionally a context)`
  );

  bindData(Component, {
    modelFactory,
    ComponentContext
  });

  Component.Consumer = ComponentContext.Consumer;
  Component.Provider = providerFactory(ComponentContext, modelFactory);
}

export function useComponentModel(Component, Provider) {
  invariant(
    typeof Component === "function",
    "useComponentModel expects a component"
  );

  const { modelFactory, ComponentContext } = getBoundData(Component);
  const { ComponentContext: ProviderContext } = Provider
    ? getBoundData(Provider)
    : {};

  return (
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContext(ProviderContext || ComponentContext) || useMemo(modelFactory)
  );
}

function providerFactory(Context, modelFactory, options) {
  const Provider = ({ children, disable, options: optionsFromProp }) => {
    const contextValue = disable
      ? undefined
      : modelFactory(optionsFromProp || options);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  };

  bindData(Provider, {
    modelFactory,
    ComponentContext: Context
  });

  return Provider;
}

export function createComponentProvider(Component, options) {
  invariant(
    typeof Component === "function",
    "createComponentProvider expects a component"
  );

  const { modelFactory } = getBoundData(Component);
  const Context = React.createContext();

  return providerFactory(Context, modelFactory, options);
}

export function Consumer(props) {
  const { children, of: Component } = props;

  invariant(
    typeof children === "function",
    "Consumer expects a single child that is a function"
  );

  const { ComponentContext } = getBoundData(Component);

  return (
    <ComponentContext.Consumer>
      {model => children(model)}
    </ComponentContext.Consumer>
  );
}
