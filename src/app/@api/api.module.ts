import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { InboxControllerService } from './api/inboxController.service';
import { InquiryControllerService } from './api/inquiryController.service';
import { ItemCategoryControllerService } from './api/itemCategoryController.service';
import { ItemControllerService } from './api/itemController.service';
import { JwtAuthenticationControllerService } from './api/jwtAuthenticationController.service';
import { LookupControllerService } from './api/lookupController.service';
import { OriginControllerService } from './api/originController.service';
import { PublicDataControllerService } from './api/publicDataController.service';
import { QuotationControllerService } from './api/quotationController.service';
import { RegisterControllerService } from './api/registerController.service';
import { SupplierControllerService } from './api/supplierController.service';
import { SupplierEmployeeControllerService } from './api/supplierEmployeeController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    InboxControllerService,
    InquiryControllerService,
    ItemCategoryControllerService,
    ItemControllerService,
    JwtAuthenticationControllerService,
    LookupControllerService,
    OriginControllerService,
    PublicDataControllerService,
    QuotationControllerService,
    RegisterControllerService,
    SupplierControllerService,
    SupplierEmployeeControllerService,
    UserControllerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): any {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
