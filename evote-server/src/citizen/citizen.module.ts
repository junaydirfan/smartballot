import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citizen } from './entities/citizen.entity';
import { CitizenService } from './citizen.service';
import { CitizenController } from './citizen.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Citizen])], // Register the Citizen entity
    controllers: [CitizenController],
    providers: [CitizenService],
    exports: [CitizenService], // Export if needed in other modules
})
export class CitizenModule {}