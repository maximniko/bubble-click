import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'my-money-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      Footer menu
      <!--  <p class="text-center">© {{ currentYear() }} Company, Inc. All rights reserved.</p>-->
    </footer>
  `,
  host: {'class': 'footer mt-auto py-3'}
})
export class FooterComponent {
}
