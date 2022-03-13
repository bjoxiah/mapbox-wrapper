import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Optional, ViewChild} from '@angular/core';
import {MAPTILEURL} from "../../Utils/constants";
import * as mp from 'maplibre-gl';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state";
import {getSingleRecord, selectCurrentRoute, selectRecords, selectUrl} from "../../store/selectors";
import {GeoJson} from "../../model/geojson";
import {MapRenderService} from "../../services/map-render/map-render.service";
import {Router} from "@angular/router";
import {Configurations} from "../../model/configurations";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: mp.Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  public coordinates$ = this.store.select(selectRecords);
  public selected$ = this.store.select(getSingleRecord);
  public currentRoute$ = this.store.select<string>(selectUrl);
  private maptiler_key: string = '';

  constructor(private store: Store<AppState>,
              private renderService: MapRenderService,
              private router: Router,
              @Optional() config?: Configurations) {
    if (config && config.maptiler_key != '') {
      this.maptiler_key = config.maptiler_key;
    } else {
      throw new Error('Configurations data not provided!')
    }
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.coordinates$.subscribe(res => {
      if (Array.isArray(res)) {
        const geoJson = this.renderService.getGeoJsonFormatFromRecord(res);
        this.renderMap(geoJson)
      }
    });

    // @ts-ignore
    this.selected$.subscribe(res => {
      if (res) {
        const geoJson = this.renderService.getGeoJsonFormatFromSelected(res);
        this.singleRender(geoJson);
      }

    })
  }

  public destroyMap() {
    this.map?.remove();
  }

  public renderMap(geoJson: GeoJson) {
    this.destroyMap();
    this.map = new mp.Map({
      container: this.mapContainer.nativeElement,
      style: `${MAPTILEURL.replace('MAPTILER_KEY', this.maptiler_key)}`,
      center: [geoJson.features[0].geometry.coordinates[0], geoJson.features[0].geometry.coordinates[1]],
      zoom: 5
    });
    this.map.addControl(new mp.NavigationControl({}), 'top-right');
    this.loaderMarkers(geoJson);
  }

  private loaderMarkers(geoJson: GeoJson) {
    this.map?.on('load', () => {
      // Add an image to use as a custom marker
      this.map?.loadImage(
        "assets/home.png",
        (error: any, image: any) => {
          if (error) throw error;
          // Add image to map
          this.map?.addImage("custom-marker", image);
          const src = `source-${Math.random()}`;
          this.map?.addSource(src, {
            type: "geojson",
            data: geoJson
          })
          // Add layer to map, using your geojson as source
          this.map?.addLayer({
            id: 'marker',
            type: "symbol",
            source: src,
            layout: {
              "icon-image": "custom-marker",
              "icon-anchor": "bottom",
              'icon-overlap': 'always'
            }
          });
        }
      );

      this.map?.flyTo({
        center: [geoJson.features[0].geometry.coordinates[0], geoJson.features[0].geometry.coordinates[1]],
        essential: true,
        zoom: 12,
        speed: 4,
        curve: 1,
        easing: (t: any) => {
          return t;
        }
      });

      this.map?.on('click', 'marker', (e: any) => {
        const geo = {
          type: "",
          features: [{
            type: "",
            geometry: {
              type: "",
              coordinates: [e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1]]
            },
            properties: {
              name: e.features[0].properties.name,
              photo: e.features[0].properties.photo,
              propertyId: e.features[0].properties.propertyId,
            }
          }]
        } as unknown as GeoJson;
        this.singleRender(geo);
      });

      // Change the cursor to a pointer when the mouse is over the states layer.
      this.map?.on('mouseenter', 'marker', () => {
        // @ts-ignore
        this.map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      this.map?.on('mouseleave', 'marker', () => {
        // @ts-ignore
        this.map.getCanvas().style.cursor = '';
      });
    });
  }

  private singleRender(e: GeoJson) {
    if (this.map == undefined) {
      this.map = new mp.Map({
        container: this.mapContainer.nativeElement,
        style: `${MAPTILEURL.replace('MAPTILER_KEY', this.maptiler_key)}`
      }).addControl(new mp.NavigationControl({}), 'top-right');
      this.map.loadImage(
        "assets/home.png",
        (error: any, image: any) => {
          if (error) throw error;
          // Add image to map
          this.map?.addImage("custom-marker", image);
        });
      this.redrawNewPoints(e, this.map);
    }
    else {
      this.map.flyTo({
        center: [e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1]],
        zoom: 18
      });
      const geoJSON = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1]]
            },
            "properties": {
              "name": e.features[0].properties.name,
              "photo": e.features[0].properties.photo,
              "propertyId": e.features[0].properties.propertyId
            }
          }
        ]
      } as unknown as GeoJson;
      if (this.map.getLayer(`marker-${e.features[0].properties.propertyId}`)) {
        this.map.removeLayer(`marker-${e.features[0].properties.propertyId}`);
      }
      const src = `source-${Math.random()}`;
      this.map.addSource(src, {
        type: "geojson",
        data: geoJSON
      })
      this.map.addLayer({
        id: `marker-${e.features[0].properties.propertyId}`,
        type: "symbol",
        source: src,
        layout: {
          "icon-image": "custom-marker",
          "icon-anchor": "bottom",
          'icon-overlap': 'always'
        }
      });
      // Clear previous positions
      if (this.map.getLayer('marker')) {
        this.map.setLayoutProperty('marker', 'visibility', 'none');
      }

      this.currentRoute$.subscribe(res => {
        if (res == '/') {
          this.router.navigateByUrl(`/details/${e.features[0].properties.propertyId}`);
        }
      }).unsubscribe();
    }
  }


  private redrawNewPoints(e: GeoJson, map: mp.Map) {
    map.on('load', () => {
      map.flyTo({
        center: [e.features[0].geometry.coordinates[0],e.features[0].geometry.coordinates[1]],
        zoom: 18
      });
      const geoJSON = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": e.features[0].geometry.coordinates
            },
            "properties": {
              "name": e.features[0].properties.name,
              "photo": e.features[0].properties.photo,
              "propertyId": e.features[0].properties.propertyId
            }
          }
        ]
      } as unknown as GeoJson;
      if (map.getLayer(`marker-${e.features[0].properties.propertyId}`)) {
          map.removeLayer(`marker-${e.features[0].properties.propertyId}`);
      }
      const src = `source-${Math.random()}`;
      this.map?.addSource(src, {
        type: "geojson",
        data: geoJSON
      })
      map.addLayer({
        id: `marker-${e.features[0].properties.propertyId}`,
        type: "symbol",
        source: src,
        layout: {
          "icon-image": "custom-marker",
          "icon-anchor": "bottom",
          'icon-overlap': 'always'
        }
      });
      // Clear previous positions
      if (map.getLayer('marker')) {
        map.setLayoutProperty('marker', 'visibility', 'none');
      }
      this.currentRoute$.subscribe(res => {
        if (res == '/') {
          this.router.navigateByUrl(`/details/${e.features[0].properties.propertyId}`);
        }
      }).unsubscribe();
    });
  }

  ngOnDestroy(): void {
    this.destroyMap();
    // @ts-ignore
    this.coordinates$.unsubscribe();
    // @ts-ignore
    this.currentRoute$.unsubscribe();
    // @ts-ignore
    this.selected$.unsubscribe();
  }

}
