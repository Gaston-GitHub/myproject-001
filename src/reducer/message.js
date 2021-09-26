// Message Reducer updates message state when message action is dispatched from anywhere in the application.

import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {};

const fn = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_MESSAGE:
            return { message: payload };
        
        case CLEAR_MESSAGE:
            return { message: '' };

        default: 
            return state;
    }
}

export default fn;