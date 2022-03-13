import {Component, Input, OnInit} from '@angular/core';
import {Record} from "../../model/record";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input()
  details!: Record;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  setSelectedItem() {
    this.router.navigateByUrl(`/details/${this.details.propertyID}`);
  }
}
