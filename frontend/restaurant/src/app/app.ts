import { Component, signal } from '@angular/core';
import { ReservationForm } from './components/reservation-form/reservation-form';
import { TableList } from './components/table-list/table-list';
import { Table, TableService } from '../services/table.service';

@Component({
  selector: 'app-root',
  imports: [ReservationForm, TableList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('restaurant');

  tables: Table[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.loadTables();
  }

  loadTables() {
    this.tableService.getTables().subscribe(res => this.tables = res);
  }
}
