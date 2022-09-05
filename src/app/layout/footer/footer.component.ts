import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PublicDataControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends AppBaseComponent implements OnInit {
  emailControl = new FormControl('');
  constructor(Injector: Injector,
    private publicDataControllerService: PublicDataControllerService
  ) {
    super(Injector)
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.emailControl.value)
    this.publicDataControllerService.subscribeEmailUsingPUT({ email: this.emailControl.value }).subscribe(() => {
      console.log('success');
      this.isLoading = false;
      this.emailControl.patchValue('');
      this.toaster.success(this._translateService.instant("subscribedSuccessfully"))

    })
  }

}
