import { Module } from '@nestjs/common';
import { LeanService } from './lean.service';

@Module({
    providers: [LeanService],
    exports: [LeanService],
})
export class LeanModule {}