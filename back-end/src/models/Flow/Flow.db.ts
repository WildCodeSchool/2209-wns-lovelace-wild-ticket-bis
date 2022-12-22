import { Repository } from 'typeorm'
import { getRepository } from '../../database/utils'
import Flow from './Flow.entity'

export default class FlowDb {
  protected static repository: Repository<Flow>
  static async initializeRepository() {
    this.repository = await getRepository(Flow)
  }

  protected static saveFlow(flow: Flow): Promise<Flow> {
    return this.repository.save(flow)
  }
}
