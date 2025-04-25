import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Produit, ProduitService } from '../../services/produit.service';


@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // ✅ FormsModule ici
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits: Produit[] = [];
  newProduit: Produit = { nom: '', categorie: '', prix: 0, stock: 0, remise: 0 };
  searchCategorie = '';
  searchPrixMax: number = 0;
  showForm = false;
  editMode = false;
  selectedId: number | null = null;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.chargerProduits();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.editMode = false;
    this.newProduit = { nom: '', categorie: '', prix: 0, stock: 0, remise: 0 };
  }

  chargerProduits() {
    this.produitService.getAllProduits().subscribe(p => this.produits = p);
  }

  rechercher() {
    this.produitService.rechercher(this.searchCategorie, this.searchPrixMax)
      .subscribe(result => this.produits = result);
  }

  appliquerPromotions() {
    this.produitService.applyPromotions().subscribe(result => this.produits = result);
  }

  saveProduit() {
    if (this.editMode && this.selectedId) {
      this.produitService.updateProduit(this.selectedId, this.newProduit).subscribe(() => {
        this.chargerProduits();
        this.toggleForm();
      });
    } else {
      this.produitService.createProduit(this.newProduit).subscribe(() => {
        this.chargerProduits();
        this.toggleForm();
      });
    }
  }

  supprimerProduit(id: number | undefined) {
    if (id) {
      this.produitService.deleteProduit(id).subscribe(() => this.chargerProduits());
    }
  }

  modifierProduit(p: Produit) {
    this.newProduit = { ...p };
    this.selectedId = p.id!;
    this.editMode = true;
    this.showForm = true;
  }
}
