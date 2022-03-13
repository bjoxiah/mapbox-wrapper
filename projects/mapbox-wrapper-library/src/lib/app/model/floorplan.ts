
export interface FloorPlan {
    bedrooms: number;
    type: string;
    price: number;
}

export interface FloorplanDetails {
  floorplanID: number;
  bed: number;
  bath: number;
  sqft: number;
  deposit: number;
  photoUrl: string;
  washerDryer: string;
  price: number;
  priceMax: number;
  den: boolean;
  isAvailable: boolean;
  available: Date;
  comments: string;
}
