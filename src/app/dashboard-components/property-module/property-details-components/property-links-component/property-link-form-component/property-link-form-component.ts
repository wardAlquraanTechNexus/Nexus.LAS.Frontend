import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PropertyLinkDTO } from '../../../../../models/property-models/property-link/dtos/property-link-dto';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { PropertyDTO } from '../../../../../models/property-models/property/dtos/propery-dto';
import { map, Observable } from 'rxjs';
import { PropertyService } from '../../../../../services/property-services/property-service';
import { CommonStatus } from '../../../../../enums/common-status';

@Component({
  selector: 'app-property-link-form',
  standalone: false,
  templateUrl: './property-link-form-component.html',
  styleUrls: ['./property-link-form-component.scss']
})
export class PropertyLinkFormComponent extends BaseFormComponent {

  loadPropertiesFn!: (search: string) => Observable<PropertyDTO[]>;


  selectedProperty$!: Observable<PropertyDTO | undefined>;
  @Input() element!: PropertyLinkDTO;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private dlService: DynamicListService,
    private propertyService: PropertyService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();


    this.loadPropertiesFn = (search: string) => this.loadProperties(search);

    this.selectedProperty$ = this.loadProperties('', this.element.registerIdn || null).pipe(
      map(res => res.find(p => p.id === this.element.registerIdn))
    );


  }

  loadProperties(search: string, id: number | null = null): Observable<PropertyDTO[]> {
    return this.propertyService.getAllProperties({}).pipe(
      map(res => res.filter(p =>
        (p.code && p.code.toLowerCase().includes(search.toLowerCase())) &&
        (id === null || p.id === id) 
        && p.id != this.element.propertyLinksValue
        && p.status != CommonStatus[CommonStatus.New] 
      ))
    );  
  }

  onPropertyChange(selectedPropertyId: any) {
    this.selectedProperty$ = this.loadProperties('', selectedPropertyId || null).pipe(
      map(res => res.find(p => p.id === selectedPropertyId))
    );
  }







}