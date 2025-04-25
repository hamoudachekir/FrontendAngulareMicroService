import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ KEEP THIS
import { ProduitsComponent } from './components/produits/produits.component'; // ✅

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,  // ✅ required here
    ProduitsComponent
  ],  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionproduit-frontend';
}
