import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {loadData} from "../../store/actions";
import {Observable} from "rxjs";
import {Record} from "../../model/record";
import {selectData, selectRecords} from "../../store/selectors";
import {AppState, RootState} from "../../store/state";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public allData$ = this.store.select<Record[] | undefined>(selectRecords);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadData());
  }

}
