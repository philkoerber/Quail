import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StrategyListComponent } from './components/strategy-list/strategy-list.component';
import { StrategyFormComponent } from './components/strategy-form/strategy-form.component';
import { StrategyDetailComponent } from './components/strategy-detail/strategy-detail.component';
import { BacktestResultsComponent } from './components/backtest-results/backtest-results.component';
import { AuthGuard } from './guards/auth.guard';
import { authInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        StrategyListComponent,
        StrategyFormComponent,
        StrategyDetailComponent,
        BacktestResultsComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: AppComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'strategies', component: StrategyListComponent, canActivate: [AuthGuard] },
            { path: 'strategies/new', component: StrategyFormComponent, canActivate: [AuthGuard] },
            { path: 'strategies/:id', component: StrategyDetailComponent, canActivate: [AuthGuard] },
            { path: 'backtests/:id', component: BacktestResultsComponent, canActivate: [AuthGuard] },
        ])], providers: [provideHttpClient(withInterceptorsFromDi(), withInterceptors([authInterceptor]))]
})
export class AppModule { } 