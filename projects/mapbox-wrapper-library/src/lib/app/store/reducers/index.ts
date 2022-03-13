import { createReducer, on } from '@ngrx/store';
import { AppState, initialState } from "../state";
import {
  loadData,
  loadDataFailure,
  loadDataSuccess,
  loadRecordDetail,
  loadRecordDetailSuccess,
  toggleLoadingState
} from "../actions";
import { StoreStatus } from "../../Utils/constants";
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

const dataReducer = createReducer(
  // Supply the initial state
  initialState,
  // Toggle loading state
  on(toggleLoadingState, (state) => ({ ...state, status: StoreStatus.LOADING })),
  // Trigger loading the data
  on(loadData, (state) => ({ ...state, selected: null, status: StoreStatus.LOADING })),
  // Handle successfully loaded data
  on(loadDataSuccess, (state, { data }) => ({
    ...state,
    data: data,
    selected: null,
    error: "",
    status: StoreStatus.SUCCESS,
  })),
  // Handle data load failure
  on(loadDataFailure, (state, { error }) => ({
    ...state,
    selected: null,
    error: error,
    status: StoreStatus.ERROR,
  })),

  on(loadRecordDetail, (state) => ({
    ...state,
    status: StoreStatus.LOADING
  })),

  on(loadRecordDetailSuccess, (state, { data }) => ({
    ...state,
    selected: data,
    status: StoreStatus.SUCCESS,
    error: ""
  }))
);

export const reducers: ActionReducerMap<AppState> = {
  data: dataReducer,
  router: routerReducer
};

