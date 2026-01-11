
export enum WasteCategory {
  WET = 'Wet Waste',
  DRY = 'Dry Waste',
  EWASTE = 'E-Waste',
  HAZARDOUS = 'Hazardous Waste',
  UNKNOWN = 'Unknown'
}

export interface ClassificationResult {
  objectName: string;
  category: WasteCategory;
  explanation: string;
  disposalTip: string;
}

export interface PickupSchedule {
  day: string;
  time: string;
  area: string;
  type: string;
}
