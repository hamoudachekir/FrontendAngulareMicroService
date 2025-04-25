import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Event {
  id?: number;
  nom: string;
  prenom: string;
  date: number;
 
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8086/events'; // ✅ Make sure it's this!


  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/afficher`);
  }
  createEvent(event: Event): Observable<Event> {
  return this.http.post<Event>(`${this.baseUrl}/add`, event);
}
rechercher(nom: string, prixMax: number): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.baseUrl}/search?categorie=${nom}&prixMax=${prixMax}`);
}



updateEvent(id: number, event: Event): Observable<Event> {
  return this.http.put<Event>(`${this.baseUrl}/${id}`, event);
}

deleteEvent(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}


}
