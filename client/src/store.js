import { createStore,applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

const initialState = {
    burgerMenu: {
        user:{
        isOpen: false
        },

        admin : {
            isOpen: false
        }

    }
};

const middleware = [thunk];

export  const store = createStore(
    rootReducer,
    initialState,   
    
composeWithDevTools(applyMiddleware(...middleware))
    );



