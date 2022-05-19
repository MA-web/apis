import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs';
import { LoadingService } from './shared/services/LoadingService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  // For Progressbar

  constructor(
    public translate: TranslateService,
    private _loading: LoadingService,
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.listenToLoading();
  }


  /**
* Listen to the loadingSub property in the LoadingService class. This drives the
* display of the loading spinner.
*/
  listenToLoading(): void {
    this.loading = true;
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
