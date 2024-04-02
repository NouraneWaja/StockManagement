import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [SharedModule, RouterModule],
})
export default class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;

  currentDate: Date = new Date();

  numberOfUsers: number = 0;
  numberOfArticles: number=0;

  isAdmin=false;

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
     this.accountService.identity().subscribe((account) => {
         if (account?.authorities?.includes('ROLE_ADMIN')) {
           this.isAdmin = true;
           this.fetchNumberOfUsers();
         }
       });
    this.fetchNumberOfArticles();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

 fetchNumberOfUsers() {
    this.http.get<number>('/api/admin/users/count').subscribe(
      (response) => {
        this.numberOfUsers = response;
      },
      (error) => {
        console.error('Erreur ', error);
      }
    );}

    fetchNumberOfArticles() {
       this.http.get<number>('/api/articles/count').subscribe(
       (response) => {
          this.numberOfArticles = response;
       },
       (error) => {
          console.error('Erreur ', error);
       }
    );}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
