import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptor/error.interceptor';
import { loadingScreenInterceptor } from './_interceptor/loading-screen.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { jwtInterceptor } from './_interceptor/jwt.interceptor';
import { jwtAdminInterceptor } from './_interceptor/jwt-admin.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([errorInterceptor,loadingScreenInterceptor,jwtInterceptor,jwtAdminInterceptor])),
    importProvidersFrom(HttpClientModule, CarouselModule.forRoot()),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
    importProvidersFrom(NgxSpinnerModule)
  ]
};

