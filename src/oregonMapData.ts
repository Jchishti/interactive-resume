// File: src/oregonMapData.ts
// Coordinates are in the 3000×2000 pixel map space.
// Oregon occupies roughly x: 428–2590, y: 285–1758

export type MapMarkerData = {
  id: string;
  fantasyName: string;
  realName: string;
  x: number;
  y: number;
  entryIds: string[];
  accent: string;
  flavor: string;
};

export const mapMarkers: MapMarkerData[] = [
  {
    id: 'hildsburgh',
    fantasyName: 'Hildsburgh',
    realName: 'Hillsboro / Beaverton',
    x: 762,
    y: 375,
    entryIds: ['hillsboro', 'steven-moore'],
    accent: '#b45309',
    flavor: 'Parks maintained. Systems debugged. Title said Finance.',
  },
  {
    id: 'northern-keep',
    fantasyName: 'The Northern Keep',
    realName: 'Portland',
    x: 858,
    y: 340,
    entryIds: ['ups'],
    accent: '#78350f',
    flavor: 'Two Christmases. Top-rated driver helper in the region.',
  },
  {
    id: 'scholars-hold',
    fantasyName: "The Scholar's Hold",
    realName: 'Corvallis',
    x: 842,
    y: 680,
    entryIds: ['bsg'],
    accent: '#64748b',
    flavor: 'Where the career began. QA before anyone called it that.',
  },
  {
    id: 'ashwood',
    fantasyName: 'Ashwood',
    realName: 'Cottage Grove',
    x: 858,
    y: 940,
    entryIds: ['forest-service'],
    accent: '#4d7c0f',
    flavor: 'One summer fighting fire. One summer was enough.',
  },
];
