import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {symbols} from "./symbols";

@Component({
  selector: 'app-symbols',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './symbols.component.html',
})
export class SymbolsComponent {
  protected readonly symbols = symbols;
}
