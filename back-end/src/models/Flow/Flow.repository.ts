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

  static async createFlow(flowName: string, userId: AppUser): Promise<Flow> {
    console.log(userId)
    const flow = new Flow(flowName)
    return this.saveFlow(flow)
  }

  static async getFlowByName(flowName: string): Promise<Flow | null> {
    return this.repository.findOneBy({ flowName })
  }

  static async getUserFlows(userId: string): Promise<Flow[]> {
    return await this.repository.find({ where: { id: userId } })
  }
}
