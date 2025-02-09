import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

export enum VehicleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}


@Entity()
export class VehicleStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.statusHistory, {
    onDelete: 'CASCADE',
  })
  vehicle: Vehicle;

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.INACTIVE,
  })
  previousStatus: VehicleStatus;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: VehicleStatus, default: VehicleStatus.ACTIVE })
  newStatus: VehicleStatus;
}
