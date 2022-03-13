import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state";
import {getHeaderName, getSingleRecord} from "../../store/selectors";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public headerName$ = this.store.select(getHeaderName);
  public details$ = this.store.select(getSingleRecord);
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void { }

}
