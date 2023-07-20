import { ICategorie, NewCategorie } from './categorie.model';

export const sampleWithRequiredData: ICategorie = {
  id: 72962,
};

export const sampleWithPartialData: ICategorie = {
  id: 38999,
  description: 'hôte Salade Soul',
};

export const sampleWithFullData: ICategorie = {
  id: 42944,
  nom: 'Manager b Account',
  description: 'Grèce Agent API',
};

export const sampleWithNewData: NewCategorie = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
