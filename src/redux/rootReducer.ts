import { combineReducers } from 'redux';
import userReducer from './user/reduce';
import loadingReducer from './loading/reduce';
import notificacoesReducer from './notificacoes/reduce';

const rootReducer = combineReducers({
    userReducer,
    loadingReducer,
    notificacoesReducer,
});

export default rootReducer;