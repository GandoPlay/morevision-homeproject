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
  selector: 'add-fleet',
  templateUrl: './add-fleet.component.html',
  styleUrls: ['./add-fleet.component.css'],
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
export class AddFleetComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private vehicleService: VehicleService
  ) {
    this.validateForm = this.fb.group({
      name: this.fb.control('name', [Validators.required]),
    });
  }
  validateForm: any;
  isVisible = false;

  @Output() dataFetched = new EventEmitter<string>();
  private destroy$ = new Subject<void>();

  fleet = { name: '' };

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

  HandleSubmit(): void {
    try {
      this.vehicleService.createFleet(this.fleet.name).subscribe((data) => {
        this.vehicleService.getFleets().subscribe((fleets) => {
          this.dataFetched.emit(fleets);
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
    this.fleet = { ...this.fleet };
  }
}
