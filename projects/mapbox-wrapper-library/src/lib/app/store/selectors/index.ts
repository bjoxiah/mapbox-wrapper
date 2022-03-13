import { createSelector } from '@ngrx/store';
import { AppState, RootState } from "../state";
import {getSelectors} from "@ngrx/router-store";

export const selectData = (state: AppState) => state.data;
export const selectAllData = createSelector(selectData, (state: RootState) => state?.data);
export const selectRecords = createSelector(selectAllData, (root) => root?.records);
export const getHeaderName = createSelector(selectAllData, (root) => root?.agentInfo.company);
export const getSingleRecord = createSelector(selectData, (root) => root?.selected);
// Router Selectors
export const selectRouter = (state: AppState) => state.router;
export const {
  selectCurrentRoute, // select the current route
  selectFragment, // select the current route fragment
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(selectRouter);


