import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent extends AppBaseComponent implements OnInit {


  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        className:'col-sm-6 col-12',
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('firstName'),
          readonly:true
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'lastName',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('lastName'),
          readonly:true
        }
      },
      {
        className:'col-12',
        key: 'gender',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('gender'),
          options:[]
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'telephone',
        type: 'phone',
        templateOptions: {
          label: this._translateService.instant('telephone'),
          required:true
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Landline',
        type: 'input',
        templateOptions: {
          type:'number',
          label: this._translateService.instant('Landline')
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Fax',
        type: 'input',
        templateOptions: {
          type:'number',
          label: this._translateService.instant('Fax')
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Skype',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('Skype')
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Company',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('Company'),
          readonly:true
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'EstablishmentDate',
        type: 'input',
        templateOptions: {
          type:'date',
          label: this._translateService.instant('EstablishmentDate')
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'companyLocation',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('companyLocation'),
          options:[],
          disabled:true

        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'city',
        type: 'select',
        templateOptions: {
          multiple:true,
          label: this._translateService.instant('city'),
          options:[],

        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Street',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('Street'),
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Postal_zip_code',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('Postal_zip_code'),
        }
      },

      {
        className:'col-sm-6 col-12',
        key: 'Website',
        type: 'input',
        templateOptions: {
          type:'url',
          label: this._translateService.instant('Website'),
        }
      },

      {
        className:'col-sm-6 col-12',
        key: 'numEmployees',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('numEmployees'),
          options:[]
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Title',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('Title'),
        }
      },
      {
        className:'col-sm-6 col-12',
        key: 'Type',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('Type'),
        }
      },
      {
        className:'col-12',
        key: 'AboutMe',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('AboutMe'),
        }
      },
    ]


  }

  files: File[] = [];

	onSelect(event:any) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event:any,i:any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}



  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }

}
