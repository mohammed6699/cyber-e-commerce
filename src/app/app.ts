import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./Components/navbar/navbar";
import { ProductPage } from "./Features/product-page/product-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, ProductPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cyber-e-commerce');
}
