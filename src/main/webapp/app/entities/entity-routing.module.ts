import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'article',
        data: { pageTitle: 'stockManagementApp.article.home.title' },
        loadChildren: () => import('./article/article.routes'),
      },
      {
        path: 'categorie',
        data: { pageTitle: 'stockManagementApp.categorie.home.title' },
        loadChildren: () => import('./categorie/categorie.routes'),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
