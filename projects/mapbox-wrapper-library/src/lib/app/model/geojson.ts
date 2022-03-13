export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  name: string;
  photo: string;
  propertyId: string;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface GeoJson {
  type: string;
  features: Feature[];
}
