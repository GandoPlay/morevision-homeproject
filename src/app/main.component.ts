import { Component, ViewChild } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { VehicleService } from './services/vehicle.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EditModalComponent } from './components/EditModal/EditModal.component';
import { LoggerModalComponent } from './components/LoggerModal/logger.component';
import { AddModalComponent } from './components/AddModal/AddModal.component';
import { AddFleetComponent } from './components/AddFleet/AddFleet.component';

@Component({
  standalone: true,
  selector: 'main-root',
  imports: [
    RouterOutlet,
    EditModalComponent,
    RouterLinkActive,
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
    LoggerModalComponent,
    AddModalComponent,
    AddFleetComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  title = 'web';
  vehicles: any;
  selectedFleetId: any;
  currentStatus: any;

  fleets: any;

  @ViewChild(EditModalComponent) editModal!: EditModalComponent;
  @ViewChild(AddModalComponent) addModal!: AddModalComponent;

  constructor(
    private dataService: DataService,
    private vehicleService: VehicleService
  ) {}

  Delete(id: string): void {
    this.vehicleService.deleteVehicle(id).subscribe((data) => {
      this.dataService.getData(this.selectedFleetId).subscribe((data) => {
        this.vehicles = data;
      });
    });
  }

  onStatusChange(value: any): void {
    this.vehicleService
      .getData(this.selectedFleetId, value !== 'NONE' ? value : null)
      .subscribe((data) => {
        this.vehicles = data;
      });
  }
  updateVehicles(newData: any) {
    this.vehicles = newData;
  }
  updateFleets(newData: any) {

    this.fleets = newData;
  }

  onStatusLogChange(value: any, id: any): void {
    this.vehicleService.updateStatus(id, value).subscribe((data) => {
      this.dataService.getData(this.selectedFleetId).subscribe((data2) => {
        this.vehicles = data2;
      });
    });
  }
  onSelectionChange(value: string): void {
    this.dataService.getData(value).subscribe((data) => {
      this.vehicles = data;
    });
  }
  ngOnInit() {
    this.dataService.getFleets().subscribe((fleetsData) => {
      this.fleets = fleetsData;
      // Only fetch vehicles after fleets data is available
      if (this.fleets && this.fleets.length > 0) {
        const fleetId = this.fleets[0].id;
        this.dataService.getData(fleetId).subscribe((data) => {
          this.vehicles = data;
        });
      }
    });
  }
}
