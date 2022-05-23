import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCategoryDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { user } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends AppBaseComponent implements OnInit {
  @Input() home: boolean = false
  userData: user = undefined

  categories: Array<ItemCategoryDto> = [];



  constructor(
    injector: Injector,
  ) {
    super(injector)
  }

  ngOnInit(): void {
    const qSub = this.route.queryParams.subscribe(query => {

      const getItemsCategoryUsingGETSub = this.LookupControllerService.getItemsCategoryUsingGET().subscribe((res: Array<ItemCategoryDto>) => {
        this.categories = res;
        this.fields = [

          {
            className: 'noFormGroup col-3 p-0',
            key: 'category',
            type: 'select',
            defaultValue: this.categories[0]?.categoryId ,
            templateOptions: {
              options: this.categories?.map(v => ({ label: v?.categoryName, value: v?.categoryId })),
            }
          },
          {
            className: 'noFormGroup col-9  p-0',
            key: 'searchKey',
            type: 'input',
          },
        ]

      })
      this.unSubscription.push(getItemsCategoryUsingGETSub)

      if (query.searchKey) {

        this.model.category =   JSON.parse(query?.category)?.categoryId;
        this.model.searchKey = query?.searchKey
      }

    })
    this.unSubscription.push(qSub);

    if (this._sharedService.getUser()) {
      this.userData = this._sharedService.getUser()
    }




  }


  onSignOut() {
    this._sharedService.signOut()
  }

  onSubmit() {
    console.log(this.model.category);
    if (this.model.searchKey) {
      let categoryOBJ:ItemCategoryDto =   this.categories.find( v => v.categoryId ===this.model?.category)

      this.router.navigate(['/products'], { queryParams: { category: JSON.stringify({ categoryId: categoryOBJ?.categoryId, categoryName: categoryOBJ?.categoryName }), searchKey: this.model.searchKey, } })
    }
  }
}
