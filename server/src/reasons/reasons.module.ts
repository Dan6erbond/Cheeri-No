import { Module } from '@nestjs/common';
import { ReasonsResolver } from './reasons.resolver';
import { ReasonsService } from './reasons.service';

@Module({
  providers: [ReasonsResolver, ReasonsService]
})
export class ReasonsModule {}
