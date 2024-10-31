import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';

@Component({
  standalone: true,
  imports: [CommonModule, MainComponent],
  templateUrl: './balance.component.html',
  host: {class: 'd-flex flex-column h-100'},
})
export class BalanceComponent {
}
