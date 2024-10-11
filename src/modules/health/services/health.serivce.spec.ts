import { Test, TestingModule } from '@nestjs/testing'
import { HealthService } from './health.service'
import {
    HealthCheckResult,
    HealthCheckService,
    HealthIndicatorFunction,
    HttpHealthIndicator,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import { FakeHealthCheckResult, TestUtils } from '@common/test/test.utils'
import { ConfigService } from '@nestjs/config'

describe('HealthService', () => {
    const mockHttpHealthIndicator = {
        pingCheck: jest.fn(),
    }

    const mockConfigService = {
        get: jest.fn(),
    }

    const mockPostgreSQLHealthIndicator = {
        pingCheck: jest.fn(),
    }

    const mockHealthCheckService = {
        check: jest.fn(),
    }

    let healthService: HealthService
    const testeUtils = new TestUtils()

    beforeEach(async () => {
        jest.resetModules() // Most important - it clears the cache
        const service: TestingModule = await Test.createTestingModule({
            providers: [
                HealthService,
                {
                    provide: HealthCheckService,
                    useValue: mockHealthCheckService,
                },
                {
                    provide: HttpHealthIndicator,
                    useValue: mockHttpHealthIndicator,
                },
                {
                    provide: ConfigService,
                    useValue: mockConfigService,
                },
                {
                    provide: TypeOrmHealthIndicator,
                    useValue: mockPostgreSQLHealthIndicator,
                },
            ],
        }).compile()

        healthService = service.get<HealthService>(HealthService)
    })

    describe('root', () => {
        it('should be defined"', () => {
            expect(healthService).toBeDefined()
        })
    })

    describe('getUrl', () => {
        it('should mock process.env', () => {
            mockConfigService.get.mockImplementation((value: string) => {
                if (value === 'NODE_DOCKER_HOST') {
                    return 'dasa.com.br'
                } else if (value === 'NODE_DOCKER_PORT') {
                    return '4000'
                }
            })

            const res = healthService.getUrl()
            expect(res).toBe('http://dasa.com.br:4000')
        })
    })

    describe('readiness', () => {
        it('should return ok"', async () => {
            // const r = testeUtils.getHealthIndicatorResult('up')

            mockHttpHealthIndicator.pingCheck.mockImplementationOnce(() =>
                Promise.resolve(
                    new FakeHealthCheckResult('ok', testeUtils.getHealthIndicatorResult('up')),
                ),
            )

            mockPostgreSQLHealthIndicator.pingCheck.mockImplementationOnce(() =>
                Promise.resolve(
                    new FakeHealthCheckResult('ok', testeUtils.getHealthIndicatorResult('up')),
                ),
            )

            mockHealthCheckService.check.mockImplementationOnce(
                async (healthIndicators: HealthIndicatorFunction[]) => {
                    for await (const func of healthIndicators) {
                        await func()
                    }
                    return {
                        status: 'ok',
                    } as HealthCheckResult
                },
            )

            const result = await healthService.readiness()

            expect(result.status).toBe('ok')
        })
    })

    describe('liveness', () => {
        it('should return ok"', async () => {
            mockHttpHealthIndicator.pingCheck.mockImplementationOnce(() =>
                Promise.resolve(
                    new FakeHealthCheckResult('ok', testeUtils.getHealthIndicatorResult('up')),
                ),
            )

            mockHealthCheckService.check.mockImplementationOnce(() => {
                return {
                    status: 'ok',
                } as HealthCheckResult
            })

            const result = await healthService.liveness()

            expect(result.status).toBe('ok')
        })
    })
})
