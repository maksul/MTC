import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import firebaseReducer from './firebaseReducer';
import assetReducer from './assetReducer';
import pageReducer from './pageReducer';
import accessReducer from './accessReducer';
import galleryReducer from './galleryReducer';
import faqReducer from './faqReducer';
import mgmtProfileReducer from './mgmtProfileReducer';

// define a new persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'error', 'asset', 'page', 'access', 'gallery', 'faq', 'mgmtProfile']
}

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    fire: firebaseReducer,
    asset: assetReducer,
    page: pageReducer,
    access: accessReducer,
    gallery: galleryReducer,
    faq: faqReducer,
    mgmtProfile: mgmtProfileReducer
});

export default persistReducer(persistConfig, rootReducer);