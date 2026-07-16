import { Component } from '@angular/core';
import { Navbar } from "../../Components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../Components/footer/footer";

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {}
