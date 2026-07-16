import { DOCUMENT, inject, Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    // handle the lang. state using behaviour subject
    private languageSubject = new BehaviorSubject<string>('en');
    language$ = this.languageSubject.asObservable();
    constructor(
        private translate: TranslateService,
        private document: Document
    ) {
        const storedLang = localStorage.getItem('language') || 'en';
        this.languageSubject.next(storedLang);
        translate.setFallbackLang(storedLang);
        translate.use(storedLang);

    }
    changeLang(lang: string){
        localStorage.setItem('language', lang);
        this.translate.use(lang);
        this.changeDireection(lang)
        this.languageSubject.next(lang)
    }
    private changeDireection(lang: string){
        const htmlTag = this.document.documentElement;
        htmlTag.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
        htmlTag.setAttribute('lang', lang);
        if(lang === 'ar'){
            this.document.body.classList.add('rtl-mode');
        }else{
            this.document.body.classList.add('ltr-mode');
        }
    }
}