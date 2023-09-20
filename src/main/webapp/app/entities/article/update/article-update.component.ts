import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ArticleFormService, ArticleFormGroup } from './article-form.service';
import { IArticle } from '../article.model';
import { ArticleService } from '../service/article.service';
import { ICategorie } from 'app/entities/categorie/categorie.model';
import { CategorieService } from 'app/entities/categorie/service/categorie.service';
import { CODEBARRES_ALREADY_USED_TYPE } from 'app/config/error.constants';

@Component({
  standalone: true,
  selector: 'jhi-article-update',
  templateUrl: './article-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ArticleUpdateComponent implements OnInit {
  isSaving = false;
  article: IArticle | null = null;
  errorCodebarresExists = false;

  categoriesSharedCollection: ICategorie[] = [];

  editForm: ArticleFormGroup = this.articleFormService.createArticleFormGroup();

  constructor(
    protected articleService: ArticleService,
    protected articleFormService: ArticleFormService,
    protected categorieService: CategorieService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCategorie = (o1: ICategorie | null, o2: ICategorie | null): boolean => this.categorieService.compareCategorie(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ article }) => {
      this.article = article;
      if (article) {
        this.updateForm(article);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.errorCodebarresExists = false;
    this.isSaving = true;
    const article = this.articleFormService.getArticle(this.editForm);
    if (article.id !== null) {
      this.subscribeToSaveResponse(this.articleService.update(article));
    } else {
      this.subscribeToSaveResponse(this.articleService.create(article));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>): void {
     result.subscribe(
     (res: HttpResponse<IArticle>) => {
                this.onSaveSuccess();
            },
     (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 400 && errorResponse.error.type === CODEBARRES_ALREADY_USED_TYPE) {
                // Le code-barres existe déjà
                this.errorCodebarresExists = true;
          }
          else {
          this.onSaveError()
          }
          this.onSaveFinalize();
          }
        );

  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(article: IArticle): void {
    this.article = article;
    this.articleFormService.resetForm(this.editForm, article);

    this.categoriesSharedCollection = this.categorieService.addCategorieToCollectionIfMissing<ICategorie>(
      this.categoriesSharedCollection,
      article.categorie
    );
  }

  protected loadRelationshipsOptions(): void {
    this.categorieService
      .query()
      .pipe(map((res: HttpResponse<ICategorie[]>) => res.body ?? []))
      .pipe(
        map((categories: ICategorie[]) =>
          this.categorieService.addCategorieToCollectionIfMissing<ICategorie>(categories, this.article?.categorie)
        )
      )
      .subscribe((categories: ICategorie[]) => (this.categoriesSharedCollection = categories));
  }
}
