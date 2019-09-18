class BaseRegion {
  regionId: number;
  regionCode: string;
  path: string;
  parentId: number;
  regionName: string;
  zipCode: string;
  regionPinYin: string;
  lng: number;
  lat: number;
  level: number;
  sort: number;
  isHot: number;
  isDelete: number;
}

export class Region extends BaseRegion{
  children: BaseRegion[];
}
