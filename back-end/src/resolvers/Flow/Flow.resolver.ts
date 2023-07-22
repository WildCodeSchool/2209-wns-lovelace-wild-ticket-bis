import {
  Arg,
  Args,
  Authorized,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import Flow from '../../models/Flow/Flow.entity';
import FlowRepository from '../../models/Flow/Flow.repository';
import { AddFlowArgs, getTicketsByFlowIdArgs } from './Flow.input';
@Resolver(() => Flow)
export default class FlowResolver {
  @Authorized()
  @Query(() => Flow)
  getTicketsByFlowId(
    @Args() { flowId }: getTicketsByFlowIdArgs
  ): Promise<Flow | null> {
    return FlowRepository.getFlowById(flowId);
  }

  @Authorized()
  @Mutation(() => Flow)
  addFlow(@Args() { id, flowName }: AddFlowArgs): Promise<Flow> {
    return FlowRepository.createFlow(flowName, id);
  }

  @Authorized()
  @Mutation(() => Int)
  deleteFlow(
    @Arg('arrayId', () => [String]) arrayId: string[]
  ): Promise<number> {
    return FlowRepository.deleteFlow(arrayId);
  }
}
