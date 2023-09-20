import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategorieFormService, CategorieFormGroup } from './categorie-form.service';
import { ICategorie } from '../categorie.model';
import { CategorieService } from '../service/categorie.service';
import { CATEGORY_ALREADY_USED_TYPE } from 'app/config/error.constants';

@Component({
  standalone: true,
  selector: 'jhi-categorie-update',
  templateUrl: './categorie-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CategorieUpdateComponent implements OnInit {
  isSaving = false;
  categorie: ICategorie | null = null;

  errorCategoryExists=false;

  editForm: CategorieFormGroup = this.categorieFormService.createCategorieFormGroup();

  constructor(
    protected categorieService: CategorieService,
    protected categorieFormService: CategorieFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ categorie }) => {
      this.categorie = categorie;
      if (categorie) {
        this.updateForm(categorie);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.errorCategoryExists = false;
    this.isSaving = true;
    const categorie = this.categorieFormService.getCategorie(this.editForm);
    if (categorie.id !== null) {
      this.subscribeToSaveResponse(this.categorieService.update(categorie));
    } else {
      this.subscribeToSaveResponse(this.categorieService.create(categorie));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorie>>): void {
     result.subscribe(
         (res: HttpResponse<ICategorie>) => {
                    this.onSaveSuccess();
                },
         (errorResponse: HttpErrorResponse) => {
              if (errorResponse.status === 400 && errorResponse.error.type === CATEGORY_ALREADY_USED_TYPE) {
                    // La categorie existe déjà
                    this.errorCategoryExists = true;
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

  protected updateForm(categorie: ICategorie): void {
    this.categorie = categorie;
    this.categorieFormService.resetForm(this.editForm, categorie);
  }
}
