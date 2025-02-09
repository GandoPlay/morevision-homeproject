import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity()
export class Fleet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.fleet)
  vehicles: Vehicle[];
}
