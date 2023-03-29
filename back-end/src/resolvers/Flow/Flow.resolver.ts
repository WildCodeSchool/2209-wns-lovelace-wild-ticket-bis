import { Arg, Args, Int, Mutation, Query, Resolver } from 'type-graphql';
import Flow from '../../models/Flow/Flow.entity';
import { AddFlowArgs, getTicketsByFlowIdArgs } from './Flow.input';
import FlowRepository from '../../models/Flow/Flow.repository';
@Resolver(() => Flow)
export default class FlowResolver {
  @Query(() => Flow)
  getTicketsByFlowId(
    @Args() { flowId }: getTicketsByFlowIdArgs
  ): Promise<Flow | null> {
    return FlowRepository.getFlowById(flowId);
  }

  @Mutation(() => Flow)
  addFlow(@Args() { id, flowName }: AddFlowArgs): Promise<Flow> {
    return FlowRepository.createFlow(flowName, id);
  }

  @Mutation(() => Int)
  deleteFlow(
    @Arg('arrayId', () => [String]) arrayId: string[]
  ): Promise<number> {
    return FlowRepository.deleteFlow(arrayId);
  }
}
