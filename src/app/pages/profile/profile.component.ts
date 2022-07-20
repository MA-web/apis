import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends AppBaseComponent implements OnInit {

  ngOnInit(): void {

  }

}
