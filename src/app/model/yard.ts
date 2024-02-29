export interface Yard {
  id: number,
  created: Date,
  updated: Date,
  name: string,
  hardinessZone: string | null,
  yardSubType: string | null,
  plantIds: number[] | null,
  animalIds: number[] | null,
  userEmail: string
}
