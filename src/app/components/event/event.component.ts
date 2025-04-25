import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Event,EventService } from '../../services/event.service';


@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // ✅ FormsModule ici
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events: Event[] = [];
  newEvent: Event = { nom: '', prenom: '', date: 0};
  searchCategorie = '';
  searchPrixMax: number = 0;
  showForm = false;
  editMode = false;
  selectedId: number | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.chargerEvents();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.editMode = false;
    this.newEvent = { nom: '', prenom: '', date: 0 };
  }

  chargerEvents() {
    this.eventService.getAllEvents().subscribe(p => this.events = p);
  }

  rechercher() {
    this.eventService.rechercher(this.searchCategorie, this.searchPrixMax)
      .subscribe(result => this.events = result);
  }



  saveEvent() {
    if (this.editMode && this.selectedId) {
      this.eventService.updateEvent(this.selectedId, this.newEvent).subscribe(() => {
        this.chargerEvents();
        this.toggleForm();
      });
    } else {
      this.eventService.createEvent(this.newEvent).subscribe(() => {
        this.chargerEvents();
        this.toggleForm();
      });
    }
  }

  supprimerEvent(id: number | undefined) {
    if (id) {
      this.eventService.deleteEvent(id).subscribe(() => this.chargerEvents());
    }
  }

  modifierEvent(p: Event) {
    this.newEvent = { ...p };
    this.selectedId = p.id!;
    this.editMode = true;
    this.showForm = true;
  }
}
