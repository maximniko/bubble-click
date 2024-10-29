import {Component, inject, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {routeCreator} from "../../../lobster-coin.routes";
import {symbols} from "../../../../../common/components/symbols/symbols";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Localisation} from "../../../../../common/services/localisation";
import {CoinsService} from '../../../domains/coins/services/coins.service';
import {Subscription} from 'rxjs';

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
  private coinsMessageSubscription?: Subscription
  protected messages: string[] = []

  constructor(
    protected localisation: Localisation,
    protected coinsService: CoinsService,
  ) {
  }

  ngOnInit() {
    this.coinsSubscription = this.coinsService.balanceSubject.subscribe(v => this.balance = v)
    this.coinsMessageSubscription = this.coinsService.message.subscribe(v => this.messages.push(v))
    // setTimeout(() => this.coinsService.loadBalance(), 1000)
  }

  ngOnDestroy() {
    this.coinsSubscription?.unsubscribe()
    this.coinsMessageSubscription?.unsubscribe()
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
}
