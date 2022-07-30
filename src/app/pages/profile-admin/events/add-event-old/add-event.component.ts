import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { CertificateTypeDto, EventControllerService, EventDto, IncotermDto, ItemCategoryDto, ItemControllerService, ItemDto, ItemSampleTypeDto, ItemSubcategoryDto, PaymentTermDto, PublicDataControllerService, SupplierCategoryDto, TransportationDto } from 'src/app/@api';
import { ItemAttachmentsDto } from 'src/app/@api/model/itemAttachmentsDto';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [DatePipe]
})
export class AddEventComponent extends AppBaseComponent implements OnInit, OnDestroy {

  eventId: number;
  eventIdAfterAdd: number;
  eventDetails: EventDto;

  uploadNewFile = false;

  profilePicture: string;

  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
    private _publicDataControllerService: PublicDataControllerService,
    private _eventControllerService: EventControllerService,
    private datePipe: DatePipe
  ) {
    super(injector);
    this.route.params.subscribe(param => {
      this.eventId = param['id']
    })
    this.isLoadingForm = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.getAttachmentsSource();


    let image: {};

    let observables: any = [
      this.LookupControllerService.getOriginsUsingGET(),
    ]

    if (this.eventId) {
      observables.push(this._publicDataControllerService.getEventByIdUsingGET(this.eventId))
    }

    const forkSub = forkJoin(observables).subscribe((res: any) => {
      console.log({res})
      this.eventDetails = res[1] ? res[1] : []
      this.profilePicture = this.eventDetails?.image?.reference


      if (this.eventId) {
        if(this.eventDetails?.image?.reference){
          image = this.eventDetails?.image
        }
      }
      
      this.isLoadingForm = false
      this.fields = [
                {
                  className: 'col-12',
                  key: 'title',
                  type: 'input',
                  defaultValue: this.eventDetails?.title,
                  templateOptions: {
                    label: this._translateService.instant('Title'),
                    required: true,
                  },
                },
                {
                  className: 'col-12',
                  key: 'image',
                  type: 'upload',
                  templateOptions: {
                    label: this._translateService.instant('Image'), // later
                    file: this.eventDetails?.image?.reference,
                    onSelect:()=>{
                      // alert(true)
                      this.uploadNewFile = true
                    }
                  }
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'eventDate',
                  type: 'input',
                  defaultValue: this.eventDetails?.eventDate ? new Date(this.eventDetails?.eventDate).toISOString().split('T')[0] : undefined,
                  templateOptions: {
                    type: 'date',
                    label: this._translateService.instant('eventDate'),
                    required: true,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'eventEndDate',
                  type: 'input',
                  defaultValue: this.eventDetails?.eventEndDate ? new Date(this.eventDetails?.eventEndDate).toISOString().split('T')[0] : undefined,
                  templateOptions: {
                    type: 'date',
                    label: this._translateService.instant('eventEndDate'),
                    required: true,
                  },
                },
                {
                  className: 'col-12',
                  key: 'city',
                  type: 'ng-select',
                  defaultValue: this.eventDetails?.city?.cityLookupId,
                  templateOptions: {
                    label: this._translateService.instant('city'),
                    required: true,
                    options: res[0]?.map(v => ({ label: v?.originName, value: v?.originId })),
                  },
                },
               
                {
                  className: 'col-12',
                  key: 'content',
                  type: 'textarea',
                  defaultValue: this.eventDetails?.content,
                  templateOptions: {
                    label: this._translateService.instant('Content'), // later
                    rows: 5,
                    required: true,
                  },
                },
              ]
      // if(this.productId){
      //   this.model.itemCategory = this.productDetails?.itemCategory?.categoryId;
      //   this.model.itemSubcategory =  this.productDetails?.itemSubcategory?.itemSubcategoryId

      // }
    })
    this.unSubscription.push(forkSub);


    const resDataSub = this.UploadFileService.resData.subscribe(res => {
      let addItemStorage
      var Values = [];
      //get olds values
      if (window.localStorage.getItem('addItemStorage')) {
        addItemStorage = window.localStorage.getItem('addItemStorage')
        Values = JSON.parse(addItemStorage);
      }

      //push new value
      Values.push(res);

      window.localStorage.setItem('addItemStorage', JSON.stringify(Values))

     
      if (JSON.parse(window.localStorage.getItem('addItemStorage'))?.length === this.beforeImagesLoaded?.length) {
        let finalUploaded = JSON.parse(window.localStorage.getItem('addItemStorage'))
     
        // let SupplementsFiles = []
        finalUploaded.forEach(element => {
          if (element.includes('/picture/')) {
            this.profilePicture = element

            image = {
              attachmentSource: {
                attachmentSourceId: this.attachmentSource[0]?.attachmentSourceId,
                attachmentSourceName: this.attachmentSource[0]?.attachmentSourceName
              },

              reference: element
            }
          }

        });


    


        this.updateAttachment(image)


      }



    })
    this.unSubscription.push(resDataSub)


    const removeIndexFromUploadAreaSub = this._sharedService.removeIndexFromUploadArea.subscribe(res => {
     
      if (res) {
          this.UploadFileService.deleteFile(res?.item?.file?.src)
          this.updateAttachment( image, 'removedSuccessfully')
      }
    })
    this.unSubscription.push(removeIndexFromUploadAreaSub)

    const sendEmptyAttachSub = this._sharedService.sendEmptyAttach.subscribe(res => {
      if (res) {
        if (this.eventDetails.image?.reference) {
          this.UploadFileService.deleteFile(this.eventDetails.image?.reference)
          this.eventDetails.image.reference = undefined
       
         this.updateAttachment( image, 'removedSuccessfully')
        }

      }
    })
    this.unSubscription.push(sendEmptyAttachSub)
  }



  updateAttachment(attachment, message?) {
    console.log('{updateAttachment}', attachment)
    let body: any | ItemAttachmentsDto = {
      attachment: attachment ? attachment : undefined,
    }
    this._itemControllerService.updateItemAttachmentsUsingPUT(body, this.eventId || this.eventIdAfterAdd).subscribe((res: ItemDto) => {
      console.log('sss', {res});
      
      this.toaster.success(this._translateService.instant( message ?message :'SuccessfullyDone' ))
      if(!this.eventId){
        this.options.resetModel()
        this._sharedService.dropzoneEmptySubj.next(true)
        window.location.reload()
      }
    })
  }

  onSubmit() {
    console.log(this)

    // this.isSubmit = true;


    function SupplementsExistFile(arr) {
      return arr.some(function (el) {
        if (el.UploadFile) {
          return true;
        }

      });
    }

    
  // city: CityDto;
  // content: string;
  // eventDate: Date;
  // eventEndDate: Date;
  // title: string;
  // eventId?: number;
  // image?: AttachmentDto;
  // status?: EventDto.StatusEnum;
    let eventDto: any | EventDto = {
      image: !this.uploadNewFile?  this.eventDetails?.image : {
        "attachmentSource": {
          "attachmentSourceId": 1,
          "attachmentSourceName": this.profilePicture
        },
        "reference": this.profilePicture
      },
      content: this.model?.content,
      city: { cityLookupId: 7 }, // need refactor
      // city: { cityLookupId: +this.model?.origin }, // need refactor

      eventDate: new Date(this.model?.eventDate),
      eventEndDate: new Date(this.model?.eventEndDate),
      title: this.model?.title,
      status: this.model?.status,
      eventId: this.eventId ? +this.eventId : undefined,
    }

    if (this.eventId) {
      console.log({eventDto});
      
      const addItemUsingPOSTSub = this._eventControllerService.updateEventUsingPUT(eventDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: EventDto) => {
        if (res) {
          window.localStorage.removeItem('addItemStorage')
          this.beforeImagesLoaded = []

          if (this.model?.image?.length) {
            this.beforeImagesLoaded?.push(this.model?.image[0])
            this.UploadFileService.uploadMultiple([this.model?.image[0]], `events/event-${res?.eventId}/picture`)
          }
          
          if (!this.model?.image?.length) {
            this.toaster.success(this._translateService.instant('SuccessfullyDone'))
          }
        }

      })
      this.unSubscription.push(addItemUsingPOSTSub)
    } else {
      const addItemUsingPOSTSub = this._eventControllerService.createEventUsingPOST(eventDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: EventDto) => {
        if (res) {
          window.localStorage.removeItem('addItemStorage')
          this.beforeImagesLoaded = []
          this.eventIdAfterAdd = res?.eventId
          if (this.model?.image?.length) {
            this.beforeImagesLoaded?.push(this.model?.image[0])
            this.UploadFileService.uploadMultiple([this.model?.image[0]], `events/event-${res?.eventId}/picture`)
          }


        }

      })
      this.unSubscription.push(addItemUsingPOSTSub)
    }







  }

  onSaveDraft() {
    // this._itemControllerService.addDraftedItemUsingPOST()
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.localStorage.removeItem('addItemStorage')
  }
}
