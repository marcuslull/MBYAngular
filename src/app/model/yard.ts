export interface Yard {
  id: number | null,
  created: Date | null,
  updated: Date | null,
  name: string,
  hardinessZone: string | null,
  yardSubType: string | null,
  noteIds: string | null,
  plantIds: number[] | null,
  animalIds: number[] | null,
  userEmail: string | null,
  thumbnailImageId: number | null
}
