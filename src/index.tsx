import './index.css';
import './tailwind.generated.css';

import * as serviceWorker from './serviceWorker';

import App from './view/App';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
