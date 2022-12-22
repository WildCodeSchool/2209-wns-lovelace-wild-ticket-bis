import AppUser from '../AppUser/AppUser.entity'
import AppUserRepository from '../AppUser/AppUser.repository'
import FlowDb from './Flow.db'
import Flow from './Flow.entity'

export default class FlowRepository extends FlowDb {
  static async initializeFlow(): Promise<void> {
    const user = await AppUserRepository.findOneByEmail('harrypotter@email.com')
    if (user) {
      await this.createFlow('Le camion vert', user)
    }
  }
  static async clearRepository(): Promise<void> {
    this.repository.delete({})
  }

  static async createFlow(flowName: string, appUser: AppUser): Promise<Flow> {
    const flow = new Flow(flowName, appUser)
    return this.saveFlow(flow)
  }

  static async getFlowByName(flowName: string): Promise<Flow | null> {
    return this.repository.findOneBy({ flowName })
  }
}
