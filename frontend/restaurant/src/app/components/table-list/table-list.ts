import { Component, Input, SimpleChanges } from '@angular/core';
import { Table, TableService } from '../../../services/table.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-list',
  imports: [CommonModule],
  templateUrl: './table-list.html',
  styleUrl: './table-list.scss'
})
export class TableList {
  @Input() tables: Table[] = [];

  ngOnChanges(changes: any) {
    if (changes.tables?.currentValue) {
      // console.log('Tables updated:', changes.tables.currentValue);
      this.tables = changes.tables.currentValue;
    }
  }
}
