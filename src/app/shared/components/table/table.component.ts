import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableColumn } from './type';

@Component({
  selector: 'c-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent<T> {
  @Input() items: T[] = [];
  @Input() columns: TableColumn[] = [];

  @Output() onRowClick = new EventEmitter<T>();

  public handleRowClicked(item: T): void {
    this.onRowClick.emit(item);
  }
}
