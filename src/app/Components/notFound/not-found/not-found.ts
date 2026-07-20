import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../Services/Language.service';

@Component({
  selector: 'app-not-found',
  imports: [TranslatePipe],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {
  constructor(private router: Router, private langService: LanguageService) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateBack() {
    window.history.back();
  }
}
