import { Component, Injector, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PagePublicItemDto, PublicDataControllerService, PublicItemDto } from '../@api';
import { AppBaseComponent } from '../shared/components/app-base/app-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AppBaseComponent implements OnInit {

  products : Array<PublicItemDto> = [];
  constructor(
    injector: Injector,
    private _publicDataControllerService:PublicDataControllerService
    ){
    super(injector);
  }

  ngOnInit(): void {

   const sub =  this._publicDataControllerService.getLatestPublishedProductsUsingGET().pipe(take(1)).subscribe((res:PagePublicItemDto)=>{
     if(res)  this.products = res.content
    })
    this.unSubscription.push(sub)
  }

}
