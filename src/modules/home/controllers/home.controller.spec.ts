import { Test, TestingModule } from '@nestjs/testing'
import { HomeController } from './home.controller'
import { HomeService } from '../services/home.service'

describe('HomeController', () => {
    let homeController: HomeController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [HomeController],
            providers: [HomeService],
        }).compile()

        homeController = app.get<HomeController>(HomeController)
    })

    describe('root', () => {
        it('should return "[Teste - API - SERASA]"', () => {
            expect(homeController.getHello()).toBe('[Teste - API - SERASA]')
        })
    })
})
