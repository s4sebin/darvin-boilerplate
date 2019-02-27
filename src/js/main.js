// Polyfills
import 'mdn-polyfills/NodeList.prototype.forEach';

// Bundle Config
import '../../.modernizrrc';
import './libs/modernizr-custom-tests';
import '../styles/main.scss';

import styleVariables from 'sass-extract-loader!../styles/settings/_settings.scss';

// Page Defaults
import './main.config';

import '../templates/modules/m02-accordion/main.js';

console.log('\n--- Style Varibles ---\n');
console.log(styleVariables);
console.log('\n')

