import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../components/confirm-delete-component/confirm-delete-component';

@Directive({
  selector: '[confirmDelete]',
  standalone: false,
})
export class ConfirmDeleteDirective {
  @Input('confirmDelete') confirmCallback?: () => void;

  constructor(private dialog: MatDialog) {}

  @HostListener('click', ['$event'])
  async onClick(event: MouseEvent) {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '300px',
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result === true && this.confirmCallback) {
      this.confirmCallback();
    }
  }
}
