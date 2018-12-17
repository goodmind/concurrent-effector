import * as React from "react";

export function createComponent(store, renderProp) {
  return class RenderComponent extends React.Component {
    static displayName = `${store.shortName}.RenderComponent`;

    state = { currentState: store.getState() };

    _unsubscribe = null;
    _hasUnmounted = false;

    componentDidMount() {
      this.subscribe();
    }
    componentWillUnmount() {
      this.unsubscribe();
      this._hasUnmounted = true;
    }
    subscribe() {
      const callback = state => {
        if (this._hasUnmounted) {
          return;
        }

        this.setState(prevState => {
          if (state === prevState.currentState) {
            return null;
          }
          return { currentState: state };
        });
      };

      const unsubscribe = store.subscribe(callback);

      this._unsubscribe = unsubscribe;
    }

    unsubscribe() {
      if (typeof this._unsubscribe === "function") {
        this._unsubscribe();
      }

      this._unsubscribe = null;
    }
    render() {
      return renderProp(this.props, this.state.currentState);
    }
  };
}
