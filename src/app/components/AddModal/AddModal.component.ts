import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { VehicleService } from '../../services/vehicle.service';
import { DataService } from '../../data.service';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
  imports: [
    RouterOutlet,
    NzDividerModule,
    NzTableModule,
    NzDividerModule,
    NzDropDownModule,
    FormsModule,
    NzSelectModule,
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
  ],
})
export class AddModalComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private dataService: DataService,
    private vehicleService: VehicleService
  ) {
    this.validateForm = this.fb.group({
      model: this.fb.control('model', [Validators.required]),
      manufacturer: this.fb.control('manufacturer', [Validators.required]),
      licensePlate: this.fb.control('licensePlate', [Validators.required]),
    });
  }
  validateForm: any;
  isVisible = false;
  // @Input() vehicle!: any;
  @Input() fleetId!: any;
  // @Input() dataset!: any;
  @Output() dataFetched = new EventEmitter<string>();
  private destroy$ = new Subject<void>();

  vehicle = { model: '', manufacturer: '', licensePlate: '' };

  openModal(): void {
    this.isVisible = true;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  HandleSubmit(id: string): void {
    try {
      this.vehicleService.create(id, this.vehicle).subscribe((data) => {
        this.dataService.getData(this.fleetId).subscribe((vehicles) => {
          this.dataFetched.emit(vehicles);
        });
        this.isVisible = false;
      });
    } catch (error: any) {
      alert(error.message);
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.vehicle = { ...this.vehicle };
  }
}
