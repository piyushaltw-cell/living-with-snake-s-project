
export enum SnakeDanger {
  HARMLESS = 'Harmless',
  CAUTION = 'Caution Required',
  VENOMOUS = 'Venomous',
  DANGEROUS = 'Highly Dangerous'
}

export interface SnakeSpecies {
  id: string;
  name: string;
  scientificName: string;
  dangerLevel: SnakeDanger;
  description: string;
  diet: string;
  habitat: string;
  imageUrl: string;
}

export interface Sighting {
  id: string;
  speciesId?: string;
  location: string;
  timestamp: Date;
  imageUrl?: string;
  notes: string;
}
