import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { InboxControllerService, ItemCategoryDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { user } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @Input() home: boolean = false
  userData: user = undefined

  categories: Array<ItemCategoryDto> = [];
  messageCount: number;


  constructor(
    injector: Injector,
    private InboxControllerService: InboxControllerService,
  ) {
    super(injector)
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    const qSub = this.route.queryParams.subscribe(query => {

      const getItemsCategoryUsingGETSub = this.LookupControllerService.getItemsCategoryUsingGET().subscribe((res: Array<ItemCategoryDto>) => {
        this.categories.push({ categoryName:this._translateService.instant('selectCategory') })
        this.categories = res;
        this.fields = [

          {
            className: 'noFormGroup col-3 p-0',
            key: 'category',
            type: 'select',
            // defaultValue: this.categories[0]?.categoryId,
            templateOptions: {
              placeholder: 'Select Category',
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
        this.model.category = JSON.parse(query?.category)?.categoryId;
        this.model.searchKey = query?.searchKey
      }

    })
    this.unSubscription.push(qSub);

    if (this._sharedService.getUser()) {
      this.userData = this._sharedService.getUser()
    }


    if (this._sharedService.checkToken()) {
      this.countReceivedMessages()
    }
    const intervalSubscription = interval(10000).subscribe(() => {
      if (this._sharedService.checkToken()) {
        this.countReceivedMessages()
      }
    });
    this.unSubscription.push(intervalSubscription)

   const resetSearchSub = this._sharedService.resetSearch.subscribe(res =>{
      if(res) {
          this.model.searchKey = ''
          this.model.category = undefined
      }
    })
    this.unSubscription.push(resetSearchSub)
  }


  countReceivedMessages() {
    this.InboxControllerService.countReceivedMessagesUsingGET().subscribe((res: { [key: string]: number; }) => {
      if(res){
        this.messageCount = res?.receivedMessagesCount;
        if(window.localStorage.getItem('messageCount')){
          if(res?.receivedMessagesCount > JSON.parse(window.localStorage.getItem('messageCount'))){
            this._sharedService.RefreshInbox.next(true)
          }
        }
        window.localStorage.setItem('messageCount',String(res?.receivedMessagesCount))


      }

    })
  }

  onSignOut() {
    this._sharedService.signOut()
  }

  onReset(){
    if(this.userData?.role === 'ADMIN') {
      this.router.navigate(['/profile-admin/inbox'])
      return;
    }
    this.router.navigate(['/profile/inbox'])
  }
  onSubmit() {

    if (this.model.searchKey) {
      let categoryOBJ: ItemCategoryDto = this.categories.find(v => v.categoryId === this.model?.category)

      this.router.navigate(['/products'], { queryParams: { category: JSON.stringify({ categoryId: categoryOBJ?.categoryId, categoryName: categoryOBJ?.categoryName }), searchKey: this.model.searchKey, } })
    }
  }
}
