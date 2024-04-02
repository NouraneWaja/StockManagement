import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { ProfileService } from './profile.service';

@Component({
  standalone: true,
  selector: 'jhi-page-ribbon',
  template: `
    <div class="ribbon" *ngIf="ribbonEnv$ | async as ribbonEnv">
      <a href="" jhiTranslate="global.ribbon.{{ ribbonEnv }}">{{ { dev: 'Développement' }[ribbonEnv] || '' }}</a>
    </div>
  `,
  styleUrls: ['./page-ribbon.component.scss'],
  imports: [SharedModule],
})
export default class PageRibbonComponent implements OnInit {
  ribbonEnv$?: Observable<string | undefined>;

  constructor(private profileService: ProfileService) {}

ngOnInit(): void {
  this.ribbonEnv$ = this.profileService.getProfileInfo().pipe(
    map(profileInfo => {
      // Ne pas afficher la bande "Développement" en mode "production"
      return profileInfo.ribbonEnv === 'prod' ? undefined : profileInfo.ribbonEnv;
    })
  );
}
  /* ngOnInit(): void {
    this.ribbonEnv$ = this.profileService.getProfileInfo().pipe(map(profileInfo => profileInfo.ribbonEnv));
  } */
}
