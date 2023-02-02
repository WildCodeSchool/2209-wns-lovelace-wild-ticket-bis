import { Arg, Args, Int, Mutation, Resolver } from 'type-graphql';
import Flow from '../../models/Flow/Flow.entity';
import { AddFlowArgs } from './Flow.input';
import FlowRepository from '../../models/Flow/Flow.repository';
@Resolver(() => Flow)
export default class FlowResolver {
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
