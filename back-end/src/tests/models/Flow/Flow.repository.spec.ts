import AppUser from '../../../models/AppUser/AppUser.entity';
import Flow from '../../../models/Flow/Flow.entity';
import FlowRepository from '../../../models/Flow/Flow.repository';

describe('Flow', () => {
  describe('getFlowByName', () => {
    describe('when user has flow', () => {
      it('return flow by name', () => {
        const user = new AppUser(
          'Harry',
          'Potter',
          'harrypotter@email.com',
          'hashedPassword'
        );
        const flow = new Flow('FlowName', user);

        expect(FlowRepository.getFlowByName(flow.flowName)).toStrictEqual(
          'FlowName'
        );
      });
    });
  });
});
