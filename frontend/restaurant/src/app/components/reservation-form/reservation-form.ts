import { Component, EventEmitter, Output } from '@angular/core';
import { Table, TableService } from '../../../services/table.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss'
})
export class ReservationForm {
  @Output() tablesChanged = new EventEmitter<boolean>();
  @Output() reservationIdChanged = new EventEmitter<number>();

  size: number = 1;
  message: string = '';
  error: boolean = false;

  constructor(private tableService: TableService) {}

  reservation() {
    this.tableService.reservation(this.size).subscribe({
      next: this.handleSuccess.bind(this),
      error: this.handleError.bind(this)
    });

    this.tablesChanged.emit(true);
  }

  handleSuccess(res: any) {
    this.message = `Table ${res.table.id} réservée (${res.table.capacity} places)`;
    this.error = false;
    this.reservationIdChanged.emit(res.table.id);
  }

  handleError(err: any) {
    this.message = err.error.message || 'Erreur';
    this.error = true;
  }
}
