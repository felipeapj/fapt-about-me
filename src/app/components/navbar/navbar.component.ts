import { FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from './../../services/storage.service';
import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_THEME_KEY = 'theme';
const STORAGE_LANGUAGE_KEY = 'language';

@Component({
  selector: 'fapt-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  public form!: FormGroup;
  public style = 'lightMode';
  public items!: MenuItem[];
  public languageOptions!: string[];

  constructor(private readonly fb: FormBuilder, private readonly themeService: ThemeService, private readonly storageService: StorageService, private readonly translate: TranslateService) {}

  ngOnInit(): void {
    this.buildComponent();
    this.buildForm();
    this.subscribeForm();

    const darkMode = this.storageService.get(STORAGE_THEME_KEY) == 'bootstrap4-dark-blue';
    const language = this.storageService.get(STORAGE_LANGUAGE_KEY, 'en');

    this.form.controls['darkMode'].setValue(darkMode);
    this.form.controls['language'].setValue(language);
  }

  buildComponent(): void {
    this.languageOptions = [
      'pt-br',
      'en'
    ];
  }

  buildForm(): void {

    this.form = this.fb.group({
      darkMode: [false],
      language: ['en']
    })
  }

  subscribeForm(): void {
    this.form.controls['darkMode'].valueChanges.subscribe((darkMode): void => {
      const theme = darkMode ? 'bootstrap4-dark-blue' : 'bootstrap4-light-blue';
      this.themeService.switchTheme(theme);
      this.storageService.set(STORAGE_THEME_KEY, theme);
      this.style = darkMode ? 'darkMode' : 'lightMode'
    })

    this.form.controls['language'].valueChanges.subscribe((language): void => {
      this.translate.use(language);
      this.storageService.set(STORAGE_LANGUAGE_KEY, language);
    });
  }
}
