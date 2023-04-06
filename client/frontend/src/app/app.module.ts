import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditleadComponent } from './components/editlead/editlead.component';
import { LeadcreationComponent } from './components/leadcreation/leadcreation.component';
import { LeaddashboardComponent } from './components/leaddashboard/leaddashboard.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginComponent } from './components/login/login.component';
import { ProductdashboardComponent } from './components/productdashboard/productdashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { SisCalculationComponent } from './components/sis-calculation/sis-calculation.component';
import { SisRiderCalculationComponent } from './components/sis-rider-calculation/sis-rider-calculation.component';
import { SisRiderSelectionComponent } from './components/sis-rider-selection/sis-rider-selection.component';
import { SisSummaryComponent } from './components/sis-summary/sis-summary.component';
import { SispersonalComponent } from './components/sispersonal/sispersonal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthguardService } from './services/authguard.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TokenInterceptor } from './services/token.interceptor';
import { MainService } from './services/main.service';
import { LoaderService } from './services/loader.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxUiLoaderModule,NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { HeaderComponent } from './components/header/header.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    EditleadComponent,
    LeadcreationComponent,
    LeaddashboardComponent,
    LoaderComponent,
    LoginComponent,
    ProductdashboardComponent,
    RegisterComponent,
    SisCalculationComponent,
    SisRiderCalculationComponent,
    SisRiderSelectionComponent,
    SisSummaryComponent,
    SispersonalComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    FontAwesomeModule,
    NgbModule,
    BrowserAnimationsModule,
    // NgxSpinnerModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule,
    Ng2SearchPipeModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [
    AuthguardService,
    {provide:LocationStrategy,useClass:PathLocationStrategy},
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
    // { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    MainService,
    TokenInterceptor,
    AuthguardService,
    LoaderService
    // InterceptorService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
