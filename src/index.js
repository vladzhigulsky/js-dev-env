import './index.less';

import numeral from 'numeral';

const value = numeral(1000).format('£0,0.00');
console.log(`The value is ${value}`);
