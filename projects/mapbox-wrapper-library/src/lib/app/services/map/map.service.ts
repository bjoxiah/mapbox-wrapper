import {Injectable, Optional} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Root } from "../../model/root";
import {DATAURL, SINGLEDATAURL} from "../../Utils/constants";
import {RecordDetails} from "../../model/record";
import {Configurations} from "../../model/configurations";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  token = '';
  maptiler_key = '';
  constructor(private http: HttpClient, @Optional() config?: Configurations) {
    if (config && config.token != '' && config.maptiler_key != '') {
      this.token = config.token;
      this.maptiler_key = config.maptiler_key;
    } else {
      throw new Error("Configuration data not provided!")
    }
  }

  fetchData(): Observable<Root> {
    return this.http.get<Root>(DATAURL.replace('SMART_DATA_TOKEN', this.token));
  }

  fetchRecordDetail(propertyId: any): Observable<RecordDetails>{
    return this.http.get<RecordDetails>(SINGLEDATAURL.replace('SMART_DATA_TOKEN', this.token).replace('PROPERTY_ID', propertyId));
  }
}
