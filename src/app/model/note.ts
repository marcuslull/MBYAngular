export interface Note {
  id?: number | null,
  created?: Date | null,
  updated?: Date | null,
  owner?: string | null,
  comment: string,
  yardId: number | null | undefined
}
