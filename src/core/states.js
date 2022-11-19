export const initializeState = () => {
  if (typeof window.disableautofillstate === 'undefined') {
    window.disableautofillstate = {};
  }
};

export const getState = (type) => {
  if (typeof window.disableautofillstate[type] === 'undefined') {
    window.disableautofillstate[type] = {};
  }
  return window.disableautofillstate[type];
};

export const updateState = (type, data) => {
  window.disableautofillstate[type] = data;
};
