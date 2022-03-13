import { Component, OnInit } from '@angular/core';
import {getSingleRecord} from "../../store/selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state";
import {loadRecordDetail} from "../../store/actions";
import {Record, RecordDetails} from "../../model/record";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public details$ = this.store.select<RecordDetails|null>(getSingleRecord);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadRecordDetail());
  }

}
