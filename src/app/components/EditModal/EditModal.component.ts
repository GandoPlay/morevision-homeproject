import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
interface Vehicle {
  model?: string;
  manufacturer?: string;
  licensePlate?: string;
}
@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
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
export class EditModalComponent implements OnInit {
  isEditVisible = false;
  @Input() vehicle!: any;
  @Input() fleetId!: any;
  @Input() dataset!: any;
  @Output() dataFetched = new EventEmitter<string>();

  Editedvehicle = { model: '', manufacturer: '', licensePlate: '' };

  constructor(
    private dataService: DataService,
    private vehicleService: VehicleService
  ) {}
  openEditModal(id: string): void {
    this.isEditVisible = true;
  }

  handleDataToSend() {
    let dataToSend: Vehicle = {};

    if (
      this.Editedvehicle.model !== '' &&
      this.Editedvehicle.model !== this.vehicle.model
    ) {
      dataToSend.model = this.Editedvehicle.model;
    }
    if (
      this.Editedvehicle.manufacturer !== '' &&
      this.Editedvehicle.manufacturer !== this.vehicle.manufacturer
    ) {
      dataToSend.manufacturer = this.Editedvehicle.manufacturer;
    }
    if (
      this.Editedvehicle.licensePlate !== '' &&
      this.Editedvehicle.licensePlate !== this.vehicle.licensePlate
    ) {
      dataToSend.licensePlate = this.Editedvehicle.licensePlate;
    }
    return dataToSend;
  }

  HandleEditSubmit(id: string): void {
    this.vehicleService
      .update(id, this.handleDataToSend())
      .subscribe((data) => {
        this.dataService.getData(this.fleetId).subscribe((vehicles) => {
          this.dataFetched.emit(vehicles);
        });
        this.isEditVisible = false;
      });
  }

  handleEditCancel(): void {
    this.isEditVisible = false;
  }

  handleEditOk(): void {
    this.isEditVisible = false;
  }

  ngOnInit(): void {
    this.Editedvehicle = { ...this.vehicle };

    // Initialization code here
  }
}
