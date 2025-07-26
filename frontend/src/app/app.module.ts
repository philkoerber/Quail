import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StrategyListComponent } from './components/strategy-list/strategy-list.component';
import { StrategyFormComponent } from './components/strategy-form/strategy-form.component';
import { BacktestResultsComponent } from './components/backtest-results/backtest-results.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        StrategyListComponent,
        StrategyFormComponent,
        BacktestResultsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'strategies', component: StrategyListComponent, canActivate: [AuthGuard] },
            { path: 'strategies/new', component: StrategyFormComponent, canActivate: [AuthGuard] },
            { path: 'strategies/:id/edit', component: StrategyFormComponent, canActivate: [AuthGuard] },
            { path: 'backtests/:id', component: BacktestResultsComponent, canActivate: [AuthGuard] },
        ]),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { } 