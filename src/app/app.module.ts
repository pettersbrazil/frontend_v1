import { NgModule } from "@angular/core";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ErrorInterceptorProvider } from "./core/interceptors/error.interceptor";
import { AuthInterceptorProvider } from "./core/interceptors/auth.interceptor";
import { AuthModule } from "./pages/auth/auth.module";

import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
