import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiModule, Configuration, ConfigurationParameters } from './@api';
import { environment } from 'src/environments/environment';
import { HttpInterceptors } from './shared/interceptor/http-interceptor';
import { HttpRequestInterceptor } from './shared/interceptor/http-loader-interceptor';
import { LoadingService } from './shared/services/LoadingService';
import { HttpErrorInterceptor } from './shared/interceptor/http-error.interceptor';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

export function apiConfigFactory(): Configuration {


  const params: ConfigurationParameters = {
      basePath: environment.apiURL,

  };
  return new Configuration(params);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ApiModule.forRoot(apiConfigFactory),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true,   deps: [] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true,   deps: [LoadingService] },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true , deps:[]},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
