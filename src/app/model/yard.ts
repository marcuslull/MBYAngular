export interface Yard {
  id: number | null,
  created: Date | null,
  updated: Date | null,
  name: string | null,
  hardinessZone: string | null,
  yardSubType: string | null,
  noteIds: string | null,
  plantIds: number[] | null,
  animalIds: number[] | null,
  imageIds: number[] | null,
  userEmail: string | null,
  localThumbnailImageUrl: string | null,
}
