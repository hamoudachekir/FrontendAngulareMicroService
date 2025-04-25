import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // ✅ KEEP THIS
import { ProduitsComponent } from './components/produits/produits.component'; // ✅
import { EventComponent } from './components/event/event.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,  // ✅ required here
    ProduitsComponent,
    EventComponent
  ],  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionproduit-frontend';
}
