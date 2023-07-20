import { ICategorie } from 'app/entities/categorie/categorie.model';

export interface IArticle {
  id: number;
  nom?: string | null;
  quantite?: number | null;
  prix?: number | null;
  codebarres?: string | null;
  categorie?: Pick<ICategorie, 'id' | 'nom'> | null;
}

export type NewArticle = Omit<IArticle, 'id'> & { id: null };
