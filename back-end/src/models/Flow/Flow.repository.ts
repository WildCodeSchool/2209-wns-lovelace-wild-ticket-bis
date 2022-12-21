import AppUser from '../AppUser/AppUser.entity'
import AppUserRepository from '../AppUser/AppUser.repository'
import FlowDb from './Flow.db'
import Flow from './Flow.entity'

export default class FlowRepository extends FlowDb {
  static async initializeFlow(): Promise<void> {
    const signIn = await AppUserRepository.signIn(
      'harrypotter@email.com',
      'Harrypotter1!',
    )
    const userConnected = await AppUserRepository.findBySessionId(
      signIn.session.id,
    )
    if (userConnected) {
      this.createFlow('Le camion vert', userConnected)
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
