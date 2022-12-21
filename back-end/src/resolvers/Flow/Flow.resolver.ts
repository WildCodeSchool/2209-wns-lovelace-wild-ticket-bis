import { Arg, Query, Resolver } from 'type-graphql'
import Flow from '../../models/Flow/Flow.entity'
import FlowRepository from '../../models/Flow/Flow.repository'

@Resolver(Flow)
export default class FlowResolver {
  @Query(() => [Flow])
  flowsByUser(@Arg('userId') userId: string): Promise<Flow[]> {
    return FlowRepository.getUserFlows(userId)
  }
}
