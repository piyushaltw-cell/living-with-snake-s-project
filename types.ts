import { Language } from './translations';

export enum SnakeDanger {
  HARMLESS = 'HARMLESS',
  CAUTION = 'CAUTION',
  VENOMOUS = 'VENOMOUS',
  DANGEROUS = 'DANGEROUS'
}

export interface LocalizedString {
  en: string;
  hi: string;
  kn: string;
  ta: string;
  mr: string;
}

export interface SnakeSpecies {
  id: string;
  name: LocalizedString;
  scientificName: string;
  vernacularNames: LocalizedString;
  dangerLevel: SnakeDanger;
  description: LocalizedString;
  keyFeatures: LocalizedString;
  averageLength: string;
  maxLength: string;
  diet: LocalizedString;
  habitat: LocalizedString;
  distribution: LocalizedString;
  behaviour: LocalizedString;
  imageUrl: string;
  iucnStatus: string;
}

export interface Sighting {
  id: string;
  speciesId?: string;
  location: string;
  timestamp: Date;
  imageUrl?: string;
  notes: string;
}