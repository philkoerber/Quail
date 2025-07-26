import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation -->
      <nav *ngIf="isAuthenticated" class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-xl font-bold text-gray-900">Quail</h1>
              </div>
              <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a routerLink="/dashboard" routerLinkActive="border-primary-500 text-gray-900" 
                   class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </a>
                <a routerLink="/strategies" routerLinkActive="border-primary-500 text-gray-900"
                   class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Strategies
                </a>
              </div>
            </div>
            <div class="flex items-center">
              <button (click)="logout()" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
    isAuthenticated = false;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        this.authService.isAuthenticated$.subscribe(
            isAuth => this.isAuthenticated = isAuth
        );
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
} 