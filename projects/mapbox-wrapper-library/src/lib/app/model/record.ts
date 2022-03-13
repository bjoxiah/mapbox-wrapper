import {PetInfo} from "./petInfo";
import {SchoolsInfo} from "./schoolsInfo";
import {Parking} from "./parking";
import {Geocode} from "./geocode";
import {FloorPlan, FloorplanDetails} from "./floorplan";

export interface Record {
    listID: number;
    order: number;
    propertyID: number;
    name: string;
    streetAddress: string;
    city: string;
    state: string;
    pets: boolean;
    washerDry: string;
    photo: string;
    favorite: boolean;
    highestSentCommissions: number;
    onsiteManager?: any;
    management?: any;
    proximity: number;
    section8: boolean;
    seniorHousing: boolean;
    studentHousting: boolean;
    floorplans: FloorPlan[];
    highValueAmenities: string[];
    paidUtilities: string[];
    geocode: Geocode;
}



export interface RecordDetails {
  listID: number;
  propertyID: number;
  yearBuilt: number;
  yearRenovated: number;
  name: string;
  streetAddress: string;
  neighborhood: string;
  phone: string;
  city: string;
  adminFee: number;
  appFee: number;
  url: string;
  favorite: boolean;
  notes: string;
  specials: string;
  parking: Parking;
  schoolsInfo: SchoolsInfo;
  petInfo: PetInfo;
  paidUtilities: any[];
  floorplans: FloorplanDetails[];
  highValueAmenities: string[];
  unitAmenities: string[];
  propertyAmenities: string[];
  geocode: Geocode;
  photos: string[];
  section8: boolean;
  studentHousting: boolean;
  seniorHousing: boolean;
  officeHours?: any;
  numUnits: number;
  email?: any;
  role: string;
  management?: any;
  managementOffices: any[];
  regionalName?: any;
  regionalPhone?: any;
  regionalEmail?: any;
  onsiteManager?: any;
}
