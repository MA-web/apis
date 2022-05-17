import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';
import { IAlbum, Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'formly-repeat-type',
  template: `
<div class="button-container">
    <button type="button" class="apis-button btn btn-success border-radius-13 px-3 mb-4 text-capitalize" (click)="addItem()" *ngIf="!showForm">
      <span [inlineSVG]="'assets/icons/add.svg'"></span>
      {{to.textAdd}}
    </button>
</div>
<div  class="subform">
    <form [formGroup]="singleForm" *ngIf="showForm">
        <formly-form class="row" [model]="mdl" [fields]="singleField" [form]="singleForm" [options]="ops">
        <div class="button-items">
              <button type="button" class="apis-button btn btn-success border-radius-13 px-2 mt-md-4" (click)="save(mdl)"  [disabled]="singleForm.invalid">
              <span [inlineSVG]="'assets/icons/check.svg'"></span>
            </button>
            <button type="button" class="apis-button btn btn-danger border-radius-13   px-2 mt-md-4" (click)="hideForm()" >
              <span [inlineSVG]="'assets/icons/cancel.svg'"></span>
            </button>
            </div>
        </formly-form>
    </form>
</div>
  <div class="table-responsive">
  <table class="table" *ngIf="model.length > 0">
    <tbody>
      <tr *ngFor="let item of formControl.value; let i =index">
      <td class="px-2 py-0 align-middle"> <span class="index ">{{i+1}}</span></td>
        <td class="px-2 py-0 align-middle" *ngIf="to.columnLevel">{{'Quantity #0'+i+1}}</td>
        <td class="px-2 py-0 align-middle" *ngFor="let field of field.fieldArray.fieldGroup">
          <span class="main2-color" *ngIf="field?.templateOptions?.label">{{field?.templateOptions?.label  | translate}} * &nbsp;: </span>
          <span class="main2-color" *ngIf="field?.templateOptions?.text">{{field?.templateOptions?.text  | translate}}  &nbsp; </span>
              <ng-container *ngIf="to.columnLevel; else elseTemplate">
              {{item[field.key]?.value }} {{item[field.key]?.type }}
              </ng-container>
              <ng-template #elseTemplate>
              <ng-container *ngIf="field.key ==='UploadFile'; else elseTemplateValue">
              <img src="" imgPreview [image]="item[field.key][0]" class="media-object" width="45" (click)="onView(item[field.key][0],i)" />
              </ng-container>
              <ng-template #elseTemplateValue>
              {{item[field.key]}}
              </ng-template>
              </ng-template>
      </td>
           <td class="px-2 py-0 align-middle">
            <div class="button-items">
              <button type="button" class="apis-button btn btn-outline-info border-radius-13 py-2" (click)="editForm(i)">
              <span [inlineSVG]="'assets/icons/edit.svg'" ></span>
            </button>
              <button type="button" class="apis-button btn btn-danger border-radius-13 py-2" (click)="remove(i);hideForm()">
                <span [inlineSVG]="'assets/icons/delete.svg'"></span>
              </button>
            </div>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
  `,
  styles: [
    `
   :host ::ng-deep .btn-danger {
  &:hover,
  &:focus {
    svg path#Path_571{
      fill: #fff !important;
    }
  }
}
.table th, .table td{
  color:#756F86;
  font-weight:bold;
}
  `
  ]
})
export class FormlyRepeatType extends FieldArrayType implements OnInit {
  showForm = true;
  singleForm = new FormGroup({});
  singleField: any = [];
  ops: any = {};
  mdl = {};
  index = -1;
  constructor(builder: FormlyFormBuilder, private lightbox: Lightbox) {
    super(builder);
  }
  ngOnInit() {
    this.singleField = JSON.parse(JSON.stringify(this.field?.fieldArray?.fieldGroup));
  }
  addItem() {
    this.mdl = {}
    this.showForm = true;
    // this.ops?.resetModel();
  }
  editForm(index: any) {
    var model = this.model;
    this.index = index;
    this.mdl = model[index];
    this.showForm = true;
  }
  hideForm() {
    this.showForm = false;
    this.ops?.resetModel();
    this.index = -1;
  }
  save(model: any) {
    if (this.singleForm.valid) {
      if (this.index == -1) {
        this.add(undefined, model);
      } else {
        this.formControl.at(this.index)?.patchValue(model);
      }

      this.hideForm();
      this.ops?.resetModel();
      this.mdl = {}
    }
  }
  onView(item: any) {
    if (item) {
      let al: Array<any> = []
      let reader = new FileReader();
      reader.onload = (event: any) => {
        al.push({ 'src': event?.target?.result, 'caption': item?.name });
        if (al?.length) {
          this.lightbox.open(al, 0, {
            showZoom: true,
            enableTransition: true,
            showDownloadButton: true,
          });
        }
      }
      reader.readAsDataURL(item);

    }

  }
}
