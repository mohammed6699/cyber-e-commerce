import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { FormInput } from "../../Shared/form-input/form-input";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslatePipe, FormInput],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  loginForm!: FormGroup;
  private passwordRegex = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$';
  currentLang: any
  constructor(
     private route: Router,
      private toast: HotToastService,
      private fb: FormBuilder,
      private translateSer: TranslateService
  ){}
  ngOnInit(): void {
    this.buildLoginForm();
    this.currentLang = localStorage.getItem('language')
  }
  buildLoginForm(){
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]]
    })
  }
  submitForm(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    let token = 'aaaaaaaaaaaaaaaannnnnnnnnrrrrrrrr8888#########'
    localStorage.setItem('access-token', token);
    localStorage.setItem('user', JSON.stringify(this.loginForm.value));
    this.toast.success(this.translateSer.instant('login.logged_in_successfully'), {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.route.navigate(['/home']);
  }

}
