import {
  AllStatusContainer,
  Divider,
  HeaderList,
  InputItem,
  ItemList,
  ListContainer,
  MainContainer,
  StatusContainer,
  StatusError,
  StatusNoScan,
  StatusValidate,
  StatusWaiting,
  TextElement,
  TextElementHeader,
} from './MesFlux.styled';
const MesFlux = (data: any) => {
  console.log(data);

  let flows: Array<any> = [];
  if (data.data) {
    flows = data.data.myProfile.flows;
  }

  return (
    <MainContainer>
      {/* Pour page flux  */}
      <HeaderList>
        <TextElementHeader>Date</TextElementHeader>
        <TextElementHeader>Nom de flu</TextElementHeader>
        <TextElementHeader>Nombre de tickets</TextElementHeader>
      </HeaderList>
      <Divider />
      <ListContainer>
        {data.data
          ? flows.map((e: any) => {
              console.log(e);
              return (
                <ItemList>
                  <InputItem type='checkbox'></InputItem>
                  <TextElement>15/10/22 11:35:56</TextElement>
                  <TextElement>{e.flowName}</TextElement>
                  <AllStatusContainer>
                    <StatusContainer>
                      <StatusNoScan> </StatusNoScan>0
                    </StatusContainer>
                    <StatusContainer>
                      <StatusWaiting></StatusWaiting>0
                    </StatusContainer>
                    <StatusContainer>
                      <StatusValidate></StatusValidate>0
                    </StatusContainer>
                    <StatusContainer>
                      <StatusError></StatusError>0
                    </StatusContainer>
                  </AllStatusContainer>
                </ItemList>
              );
            })
          : null}
      </ListContainer>
    </MainContainer>
  );
};

export default MesFlux;
