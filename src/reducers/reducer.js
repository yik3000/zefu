import { combineReducers } from 'redux';
import systemReducer from './system.js';
import account from "./account.js";
import services from './services.js';
import zefus from './zefu.js';
import geo from './geo';
import codes from './code';

const rootReducer = combineReducers({
    system:systemReducer,
    account:account,
    services: services,
    zefus:zefus,
    codes:codes,
    geo:geo
});

export default rootReducer;
