import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { sagaMiddleWare } from './store'
import rootSaga from './saga' 
import App from './cotainers/App';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <HashRouter>
                <App />
            </HashRouter>
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);

sagaMiddleWare.run(rootSaga)
