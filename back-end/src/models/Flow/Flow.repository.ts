import { Repository } from 'typeorm'
import { getRepository } from '../../database/utils'
import AppUser from '../AppUser/AppUser.entity'
import FlowDb from './Flow.db'
import Flow from './Flow.entity'

export default class FlowRepository extends FlowDb {
  static async clearRepository(): Promise<void> {
    this.repository.delete({})
  }

  static createFlow(flowName: string, appUser: AppUser): Promise<Flow> {
    const flow = new Flow(flowName, appUser)
    return this.saveFlow(flow)
  }
}
