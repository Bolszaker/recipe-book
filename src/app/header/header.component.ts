import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from 'src/shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  collapsed = true;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
    ){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user =>{
      this.isAuthenticated = user ? true : false;
    });
    this.onFetchRecipes();
  }

  onSaveRecipes(){
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
