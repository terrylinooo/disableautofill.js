var disableautofill = require('./src/DisableAutoFill');

if (typeof window !== 'undefined') {
	window.disableautofill =  disableautofill;
}
