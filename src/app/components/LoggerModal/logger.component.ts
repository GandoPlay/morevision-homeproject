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
  selector: 'logger-modal',
  templateUrl: './logger-modal.component.html',
  styleUrls: ['./logger-modal.component.css'],
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
export class LoggerModalComponent implements OnInit {
  historyLogs: any;
  isVisible = false;
  @Input() vehicle!: any;
  // @Input() fleetId!: any;
  // @Input() dataset!: any;
  // @Output() dataFetched = new EventEmitter<string>();

  constructor(private vehicleService: VehicleService) {}
  showModal(id: string): void {
    this.isVisible = true;

    this.vehicleService.getHistoryStatus(id).subscribe((data) => {
      this.historyLogs = data;
    });
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {}
}
