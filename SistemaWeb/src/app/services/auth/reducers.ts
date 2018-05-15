import * as fromApplication from './reducer';

export interface State {
    application: fromApplication.State;
}

export const reducers = {
    application: fromApplication.getReducers
};

export function selectIsLoggedIn(state: State) {
    return state.application.isLoggedIn;
}