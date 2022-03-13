import { Root } from "../../model/root";
import { StoreStatus } from "../../Utils/constants";
import {Record, RecordDetails} from "../../model/record";
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  data: RootState;
  router: fromRouter.RouterReducerState<any>;
}

export interface RootState {
  data: Root | null;
  selected: RecordDetails | null,
  error: string;
  status: StoreStatus;
}

export const initialState: RootState = {
  data: null,
  selected: null,
  error: "",
  status: StoreStatus.PENDING,
};
