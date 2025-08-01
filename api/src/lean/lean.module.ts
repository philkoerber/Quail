import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeanService } from './lean.service';

@Module({
    imports: [HttpModule],
    providers: [LeanService],
    exports: [LeanService],
})
export class LeanModule { }