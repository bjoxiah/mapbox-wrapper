import { createAction, props } from "@ngrx/store";
import { Root } from "../../model/root";
import {Record, RecordDetails} from "../../model/record";

export const toggleLoadingState = createAction('[General] Toggle Loading State');

export const loadData = createAction('[General] Fetch Data');

export const loadDataSuccess = createAction(
  '[Data API] Data Load Success',
  props<{ data: Root }>()
);

export const loadDataFailure = createAction(
  '[Data API] Data Load Failure',
  props<{ error: string }>()
);

export const searchData = createAction(
  '[Data Search] Data Search',
  props<{ searchTerm: string }>()
);

export const loadRecordDetail = createAction(
  '[Details Component] Load Single Data'
);

export const loadRecordDetailSuccess = createAction(
  '[Details Component] Load Single Data Success',
  props<{ data: RecordDetails }>()
);
