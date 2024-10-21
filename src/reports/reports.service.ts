import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repository: Repository<Report>,
  ) {}

  create(user: User, body: CreateReportDto) {
    const report = this.repository.create(body);
    report.user = user;
    return this.repository.save(report);
  }
}
