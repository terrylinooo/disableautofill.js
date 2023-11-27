import '@testing-library/jest-dom';

globalThis.window = Object.assign(globalThis.window || {}, {
    disableautofill_unit_test: true,
});