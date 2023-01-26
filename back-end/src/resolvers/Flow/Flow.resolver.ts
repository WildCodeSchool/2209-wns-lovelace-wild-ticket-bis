import { Args, Mutation, Resolver } from 'type-graphql';
import Flow from '../../models/Flow/Flow.entity';
import { AddFlowArgs } from './Flow.input';
import FlowRepository from '../../models/Flow/Flow.repository';

@Resolver(() => Flow)
export default class AddFlowResolver {
  @Mutation(() => Flow)
  addFlow(@Args() { id, flowName }: AddFlowArgs): Promise<Flow> {
    return FlowRepository.createFlow(flowName, id);
  }
}
