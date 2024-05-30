/*
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import auth from "./modules/auth";
import user from "./modules/user";
import post from "./modules/post";
import comment from "./modules/comment";
import reply from "./modules/reply";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(auth, user, post, comment, reply);

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return configureStore({
    // 리듀서 모듈들이 합쳐진 루트 리듀서
    reducer: rootReducer,

    // 사용하고 싶은 미들웨어가 있다면 추가로 정의한다. (ex. concat 메소드 사용)
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

    // redux-toolkit은 devTools 등의 미들웨어들을 기본적으로 제공한다.
    devTools: process.env.NODE_ENV === "development",
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the "RootState" and "AppDispatch" types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
*/
