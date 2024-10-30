import {Component, inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {routeCreator} from "../../../lobster-coin.routes";
import {symbols} from "../../../../../common/components/symbols/symbols";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Localisation} from "../../../../../common/services/localisation";
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {Subscription} from 'rxjs';
import {BankService} from '../../../domains/bank/services/bank/bank.service';

@Component({
  selector: 'my-money-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  protected balance: number = 0

  private offcanvasService = inject(NgbOffcanvas)
  private coinsSubscription?: Subscription

  constructor(
    protected localisation: Localisation,
    protected coinsService: CoinsService,
    protected bankService: BankService,
  ) {
  }

  ngOnInit() {
    this.coinsSubscription = this.coinsService.balanceSubject.subscribe(v => this.balance = v)
  }

  ngOnDestroy() {
    this.coinsSubscription?.unsubscribe()
  }

  protected readonly routeCreator = routeCreator;
  protected readonly symbols = symbols;

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'})
    // .result.then(
    // (result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // },
    // (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // },
    // )
  }

  protected resetStorages() {
    this.coinsService.saveBalance(0)
    this.bankService.saveBalance(0)
  }
}
