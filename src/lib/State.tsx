export const State = (setState, key, value) => {
  setState((state) => ({ ...state, [key]: value }));
};
