import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {routeCreator} from '../../bubble-click.routes';
import {TwaService} from '../../../../common/services/twa.service';
import {Router} from '@angular/router';
import {symbols} from '../../../../common/components/symbols/symbols';
import {Localisation} from '../../../../common/services/localisation';

@Component({
  standalone: true,
  imports: [CommonModule, MainComponent],
  templateUrl: './balance.component.html',
  host: {class: 'd-flex flex-column h-100'},
})
export class BalanceComponent implements OnInit, OnDestroy {
  constructor(
    private twa: TwaService,
    private router: Router,
    protected localisation: Localisation,
  ) {
  }

  ngOnInit() {
    this.twa.backButtonOnClick(() => this.goBack())
  }

  ngOnDestroy() {
    this.twa.offBackButton(() => this.goBack())
  }

  goBack() {
    this.router.navigate([routeCreator.main()])
  }

  protected readonly symbols = symbols;
}
