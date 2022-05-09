import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'formly-field-phone',
  template: `
 <div class="form-group w-100 input-apis" style="direction: ltr;">
  <label for="addressType"> {{to.label}}</label>
    <ngx-intl-tel-input
  	[cssClass]="{ 'form-control' : 1, 'is-invalid': !formControl.valid && formControl.touched }"
		[preferredCountries]="preferredCountries"
		[enableAutoCountrySelect]="false"
		[enablePlaceholder]="true"
		[searchCountryFlag]="true"
		[searchCountryField]="[SearchCountryField.Iso2, SearchCountryField.Name]"
		[selectFirstCountry]="false"
		[selectedCountryISO]="CountryISO.Egypt"
		[maxLength]="15"
		[phoneValidation]="true"
		[enableAutoCountrySelect]="true"
    [formControl]="formControl" [formlyAttributes]="field"
	></ngx-intl-tel-input>
  <small style="padding: 0 1em;margin-top: 0.6666666667em;" class="text-danger" *ngIf="!formControl.value && formControl.touched ">{{'validations.required' |translate}}</small>
	<small style="padding: 0 1em;margin-top: 0.6666666667em;" class="text-danger" *ngIf="formControl.value &&!formControl.valid && formControl.touched">{{'validations.phone' |translate}}</small>
</div>
 `
})
export class FormlyFieldPhone extends FieldType {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [ CountryISO.Egypt];
}
