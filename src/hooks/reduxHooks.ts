import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../app/store";

export const useStoreDispatch = () => useDispatch<AppDispatch>();

export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;
