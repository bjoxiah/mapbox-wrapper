import {Injectable} from '@angular/core';
import {GeoJson} from "../../model/geojson";
import {Record, RecordDetails} from "../../model/record";

@Injectable({
  providedIn: 'root'
})
export class MapRenderService {

  constructor() { }

  public getGeoJsonFormatFromRecord(records: Record[]): GeoJson {
    const rec = records.map(record => {
            return {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [record.geocode.Longitude, record.geocode.Latitude]
              },
              "properties": {
                "name": record.name,
                "photo": record.photo,
                "propertyId": record.propertyID
              }
            };
          });

    return { "type": "FeatureCollection", "features": rec } as unknown as GeoJson;
  }

  public getGeoJsonFormatFromSelected(record: RecordDetails): GeoJson {
    const rec = [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [record.geocode.Longitude, record.geocode.Latitude]
        },
        "properties": {
          "name": record.name,
          "photo": record.photos[0],
          "propertyId": record.propertyID
        }
    }];

    return { "type": "FeatureCollection", "features": rec } as unknown as GeoJson;
  }


}
