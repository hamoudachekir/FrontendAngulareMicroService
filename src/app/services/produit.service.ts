import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produit {
  id?: number;
  nom: string;
  categorie: string;
  prix: number;
  stock: number;
  remise: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = 'http://localhost:8086/produits'; // ✅ Make sure it's this!


  constructor(private http: HttpClient) {}

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl}/afficher`);
  }
  createProduit(produit: Produit): Observable<Produit> {
  return this.http.post<Produit>(`${this.baseUrl}/add`, produit);
}
rechercher(categorie: string, prixMax: number): Observable<Produit[]> {
  return this.http.get<Produit[]>(`${this.baseUrl}/search?categorie=${categorie}&prixMax=${prixMax}`);
}

applyPromotions(): Observable<Produit[]> {
  return this.http.put<Produit[]>(`${this.baseUrl}/apply-promo`, {});
}

updateProduit(id: number, produit: Produit): Observable<Produit> {
  return this.http.put<Produit>(`${this.baseUrl}/${id}`, produit);
}

deleteProduit(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}


}
