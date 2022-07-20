import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NewsDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-new-full-card',
  templateUrl: './new-full-card.component.html',
  styleUrls: ['./new-full-card.component.scss']
})
export class NewFullCardComponent  extends AppBaseComponent implements OnInit {
  @Input() news:NewsDto;
  @Input() reverse :boolean = false;


  ngOnInit(): void {
  }
  onView(){
    const navigationExtras: NavigationExtras = { state: { data: this.news } };
    this.router.navigate(['/news/details', this.news?.newsId], navigationExtras);
  }
}
