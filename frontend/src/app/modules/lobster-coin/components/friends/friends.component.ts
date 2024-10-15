import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {Router} from "@angular/router";
import {TwaService} from "../../../../common/services/twa.service";
import {debounceTime, Subscription} from "rxjs";
import {Localisation} from "../../../../common/services/localisation";

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './friends.component.html',
  host: {class: 'd-flex flex-column h-100'},
})
export class FriendsComponent implements OnInit, OnDestroy {
  constructor(
    protected twa: TwaService,
    protected location: Location,
  ) {
  }

  ngOnInit(): void {
    this.twa.backButtonOnClick(() => this.goBack())
  }

  ngOnDestroy(): void {
    this.twa.offBackButton(() => this.goBack())
  }

  goBack() {
    this.location.back()
  }
}
