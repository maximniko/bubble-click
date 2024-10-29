import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/_layout/header/header.component";
import {FooterComponent} from "./components/_layout/footer/footer.component";
import {SymbolsComponent} from "../../common/components/symbols/symbols.component";
import {TwaService} from "../../common/services/twa.service";

@Component({
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SymbolsComponent],
  template: `
    <main class="main d-flex flex-column h-100">
      <my-money-header></my-money-header>
      <router-outlet></router-outlet>
    </main>
    <my-money-footer></my-money-footer>
    <app-symbols></app-symbols>`,
  host: {'class': 'd-flex flex-column h-100'}
})
export class LobsterCoinComponent implements OnInit {
  constructor(private twa: TwaService) {
  }

  ngOnInit() {
    this.twa.ready()
    this.twa.expand()
  }
}
