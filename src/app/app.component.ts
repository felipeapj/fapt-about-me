import { StorageService } from './services/storage.service';
import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'fapt-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private primengConfig: PrimeNGConfig, private translate: TranslateService, private readonly storageService: StorageService) {
  }

  ngOnInit() {
      this.primengConfig.ripple = true;
      let langName = 'en';
      switch(this.translate.getBrowserLang()) {
        case 'en':
          langName = 'en';
          break;
        case 'pt':
          langName = 'pt-br';
          break;
        default: 'en'
      }
      const lang = this.storageService.get('lang', langName);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
  }
}
