import { Component, ViewChild } from '@angular/core';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EditModalComponent } from '../EditModal/EditModal.component';
import { LoggerModalComponent } from '../LoggerModal/logger.component';
import { AddModalComponent } from '../AddModal/AddModal.component';
import { VehicleService } from '../../services/vehicle.service';
import { DataService } from '../../data.service';

@Component({
  standalone: true,
  selector: 'prefix-root',
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
  ],
  templateUrl: './prefix.component.html',
  styleUrl: './prefix.component.css',
})
export class PrefixComponent {
  title = 'web';

  dataset: any;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.vehicleService.getPrefix().subscribe((data) => {
      this.dataset = data;
    });
  }
}
