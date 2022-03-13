import {Component, Input, OnInit} from '@angular/core';
import {Record} from "../../model/record";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input()
  dataList: Record[] | null | undefined;
  constructor() { }

  ngOnInit(): void { }



}
