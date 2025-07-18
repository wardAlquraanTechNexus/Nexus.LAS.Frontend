import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-person-details',
  standalone: false,
  templateUrl: './add-person-details.html',
  styleUrl: './add-person-details.scss'
})
export class AddPersonDetails implements OnInit{

  constructor(private cdRef: ChangeDetectorRef){
    
  }

  ngOnInit(): void {
  }

  
  imagePreview: string | ArrayBuffer | null = null;

onPhotoSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
      this.cdRef.detectChanges();
    };

    reader.readAsDataURL(file);
  }
}
}
