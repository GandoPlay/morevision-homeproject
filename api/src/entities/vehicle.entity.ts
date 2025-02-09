import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import {
  VehicleStatus,
  VehicleStatusHistory,
} from './vehicle-status-history.entity';
import { Fleet } from './fleet.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  licensePlate: string;

  @Column()
  manufacturer: string;

  @Column()
  model: string;

  @Column({ default: 'ACTIVE' })
  status: VehicleStatus;

  @OneToMany(() => VehicleStatusHistory, (history) => history.vehicle)
  statusHistory: VehicleStatusHistory[];
  @ManyToOne(() => Fleet, (fleet) => fleet.vehicles, {
    onDelete: 'CASCADE',
  })
  fleet: Fleet;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
