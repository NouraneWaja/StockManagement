import { IArticle, NewArticle } from './article.model';

export const sampleWithRequiredData: IArticle = {
  id: 8198,
};

export const sampleWithPartialData: IArticle = {
  id: 12508,
  prix: 11353,
  codebarres: 'bypassing c que',
};

export const sampleWithFullData: IArticle = {
  id: 86608,
  nom: 'Presbourg priver',
  quantite: 33442,
  prix: 21317,
  codebarres: 'Antimony Latine',
};

export const sampleWithNewData: NewArticle = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
