import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-aboutus-page',
  imports: [TranslatePipe],
  templateUrl: './aboutus-page.html',
  styleUrl: './aboutus-page.css',
})
export class AboutusPage {}
