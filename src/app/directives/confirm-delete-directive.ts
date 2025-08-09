import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../components/confirm-delete-component/confirm-delete-component';
import { firstValueFrom } from 'rxjs';

@Directive({
  selector: '[confirmDelete]',
  standalone: false,
})
export class ConfirmDeleteDirective {
  @Input('confirmDelete') confirmCallback?: () => void;

  constructor(private dialog: MatDialog) {}

  @HostListener('click', ['$event'])
  async onClick(event: MouseEvent): Promise<void> {
    if ((event.target as HTMLElement).tagName.toLowerCase() === 'a') {
      event.preventDefault();
    }

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
    });

    try {
      const result = await firstValueFrom(dialogRef.afterClosed());

      if (result === true && this.confirmCallback) {
        this.confirmCallback();
      }
    } catch (error) {
      // handle if needed (usually won't throw)
      console.error('Error while waiting for dialog close:', error);
    }
  }
}
