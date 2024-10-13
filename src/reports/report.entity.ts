import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  make: string;
  // @Column()
  // model: string;
  // @Column()
  // year: number;
  // @Column()
  // lng: number;
  // @Column()
  // lat: number;
  // @Column()
  // mileage: number;
  // @Column()
  // approved: boolean;
  // @Column()
  // createdAt: Date;
  // @Column()
  // updatedAt: Date;
  // @Column()
  // userId: number;
  // @ManyToOne(() => User, (user) => user.reports)
  // user: User;
  // @Column()
  // color: string;
  // @Column()
  // engineType: string;
  // @Column()
  // title: string;
  // @Column()
  // approvedBy: number;
  // @ManyToOne(() => User, (user) => user.approvedReports)
  // approvedByUser: User;
  // @Column()
  // rejectedBy: number;
  // @ManyToOne(() => User, (user) => user.rejectedReports)
  // rejectedByUser: User;
  // @Column()
  // rejectedAt: Date;
  // @Column()
  // approvedAt: Date;
  // @Column()
  // vin: string;
  // @Column()
  // yearOfManufacture: number;
  // @Column()
  // transmission: string;
  // @Column()
  // fuelType: string;
  // @Column()
  // condition: string;
  // @Column()
  // damage: string;
  // @Column()
  // description: string;
  // @Column()
  // location: string;
  // @Column()
  // approvedById: number;
  // @Column()
  // rejectedById: number;
  // @Column()
  // approvedByUserId: number;
  // @Column()
  // rejectedByUserId: number;
  // @Column()
  // approvedByUser: number;
  // @Column()
  // rejectedByUser: number;
  // @Column()
  // approvedByUser: User;
  // @Column()
  // rejectedByUser: User;
  // @Column()
  // approvedByUser: User;
}
