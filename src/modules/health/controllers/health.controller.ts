import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus'
import { HealthService } from '../services/health.service'

@Controller('health')
@ApiTags('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

    @Get('/readiness')
    @HealthCheck()
    async readiness(): Promise<HealthCheckResult> {
        return this.healthService.readiness()
    }

    @Get('/liveness')
    @HealthCheck()
    async liveness(): Promise<HealthCheckResult> {
        return this.healthService.liveness()
    }
}
