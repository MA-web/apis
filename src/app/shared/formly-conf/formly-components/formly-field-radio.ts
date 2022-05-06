import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-radio',
  template: `
  <div class="row">
  <div class="col-md-6 "  *ngFor="let option of to.options; let i = index">
  <input type="radio"  [name]="to.name" [id]="'option-'+(i+1)"  [value]="option.key" [formControl]="formControl"
           [formlyAttributes]="field" [required]="to.required">
  <label [for]="'option-'+(i+1)"  [class]="'option-1'">
        <div class="dot"></div>
        <span class="svg-icon ml-2"   [inlineSVG]="'assets/icons/' + option.icon" *ngIf="option.icon"></span>
        <div class="text">  {{ option.value }}</div>
      </label>
  </div>
  </div>
 `,
  styles: [`
  .radio-input{
    padding: .56rem 0.75rem;
    border-radius: 52px;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    span{
      margin-left:10px
    }
  }

  label{
  display: flex;
  height: 53px;
  width: 100%;
  align-items: center;
  border: 1px solid lightgrey;
  border-radius: 50px;
  padding-left: 20px;
  cursor: default;
  transition: all 0.3s ease;
  background: white;
}
input:checked ~ .option-1{
  background: white;
  border-color:#1AAFD1;
}

label .dot{
  height: 16px;
  width: 16px;
  border:1px solid #B6B6B6;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}
input:checked ~ .option-1 .dot{
  background: #1AAFD1;
  border-color:#1AAFD1;
}

label .dot::before{
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
  width: 9px;
  height: 9px;
  border-radius: 50%;
  transition: all 0.3s ease;
}
input:checked ~ .option-1 .dot::before{
  background: white;
  transform: translate(-50%, -50%) scale(1);
}

label .text{
  color: #333;
  font-size: 18px;
  font-weight: 400;
  padding-left: 10px;
  transition: color 0.3s ease;
}
input:checked ~ .option-1 .text{
  color: #1AAFD1;
}

input[type="radio"]{
  display: none;
}

input:checked ~ .option-1 .svg-icon ::ng-deep svg #Path_213 {
    fill: #1AAFD1;
}
 `]
})
export class FormlyFieldRadio extends FieldType { }
