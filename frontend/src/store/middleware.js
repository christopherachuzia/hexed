export const saveState = state => next => action =>{
    let done = next(action);
    localStorage['redux-store'] = JSON.stringify(state.getState())
    return done
}