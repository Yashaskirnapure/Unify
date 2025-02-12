import { configureStore } from '@reduxjs/toolkit';
import authenticate from '../slices/authenticate';

export default configureStore({ 
    reducer: {
        auth: authenticate,
    } 
});