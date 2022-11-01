import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

<<<<<<< HEAD
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
// betik dil
=======
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
>>>>>>> 4f5a24619d614679c6b7b8666dc234f34d5f8bb9
