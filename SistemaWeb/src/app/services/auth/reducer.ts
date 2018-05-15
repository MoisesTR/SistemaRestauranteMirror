import * as ApplicationActions from './action';

export interface State {
    isLoggedIn: boolean
}

const initialState: State = {
    isLoggedIn: true
};

export function getReducers(state = initialState, action: ApplicationActions.All): State {
    switch (action.type) {
        case ApplicationActions.LOG_OUT: {

            return {
                ...state,
                isLoggedIn: false
            }
        }

        case ApplicationActions.LOG_IN: {
            return {
                ...state,
                isLoggedIn: true
            }
        }

        default: {
            return state;
        }
    }
}