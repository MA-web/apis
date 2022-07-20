import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NewsDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent extends AppBaseComponent implements OnInit {
  @Input() news:NewsDto;

  ngOnInit(): void {
  }

  onView(){
    const navigationExtras: NavigationExtras = { state: { data: this.news } };
    this.router.navigate(['/news/details', this.news?.newsId], navigationExtras);
  }

}
