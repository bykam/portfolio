import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideTranslateService({ defaultLanguage: 'it' }),
    provideHttpClient(),
    provideTranslateHttpLoader({
      prefix: 'i18n/',
      suffix: '.json',
    }),
    provideAppInitializer(() => {
      const iconRegistry = inject(MatIconRegistry);
      iconRegistry.setDefaultFontSetClass('material-symbols-outlined', 'mat-ligature-font');
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      const saved = localStorage.getItem('portfolio-lang');
      const lang = saved === 'en' || saved === 'it' ? saved : 'it';
      translate.use(lang);
    }),
  ],
};
