import React from 'react';
import styled from '@emotion/styled';
const Container = styled('div')({
  height: '100%',
  padding: '70px 20px 70px 20px',
  border: '1px solid black',
});

const HeaderCv = styled('div')({
  display: 'flex',
  alignContent: 'center',
  paddingBottom: '40px',
});

const HeaderLeftCv = styled('div')({
  borderBottom: '3px solid #111195',
  padding: '0 20px 0px 40px',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'center',
});

const HeaderRightCv = styled('div')({
  width: '120px',
  height: '120px',
  border: '3px solid #111195',
  borderRadius: '50%',
  textAlign: 'center',
  backgroundColor: '#fff',
  display: 'flex',
});

const AvatarCv = styled('img')({
  borderRadius: '50%',
});

const Content = styled('div')({
  display: 'grid',
  gridTemplateColumns: '5fr 7fr',
});

const ContentLeft = styled('div')({});

const ItemLeft = styled('div')({});
const Title = styled('div')({
  fontSize: '20px',
  fontWeight: '600',
  textTransform: 'uppercase',
});

const ContentRight = styled('div')({});
const Text = styled('p')({
  fontSize: '12px',
});

const Li = styled('li')({
  listStyle: 'none',
  display: 'flex',
  padding: '16px 0',
});

const ItemRight = styled('div')({});

const PreviewTheme1 = () => {
  return (
    <Container>
      <HeaderCv>
        <HeaderLeftCv>
          <p
            style={{
              fontSize: '40px',
              textTransform: 'uppercase',
              color: 'rgb(61, 61, 61)',
            }}
          >
            <span
              style={{
                fontWeight: '700',
                fontSize: '40px',
              }}
            >
              Dang
            </span>{' '}
            Van ABC
          </p>
          <p
            style={{
              fontSize: '14px',
              textTransform: 'uppercase',
              fontWeight: '600',
              letterSpacing: '1px',
              color: '#111195',
            }}
          >
            Software engineer
          </p>
        </HeaderLeftCv>
        <HeaderRightCv>
          <AvatarCv
            src="./images/image 50.png"
            alt=""
            style={{ borderRadius: '50%' }}
          />
        </HeaderRightCv>
      </HeaderCv>
      <Content>
        <ContentLeft>
          <ItemLeft>
            <Title>Contact</Title>
            <ul>
              <Li>
                <Text>icon</Text>
                <Text>0911878031</Text>
              </Li>
              <Li>
                <Text>icon</Text>
                <Text>0911878031</Text>
              </Li>
              <Li>
                <Text>icon</Text>
                <Text>0911878031</Text>
              </Li>
            </ul>
          </ItemLeft>
          <ItemLeft>
            <Title>Education</Title>
            <div>
              <h6>Đại học sài gòn</h6>
              <span>July 17</span> - <span>July 20</span>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem nam reiciendis commodi cumque debitis. Aliquid
                adipisci sequi quis quia deserunt, eligendi, numquam accusamus
                natus magnam, modi fugit voluptas mollitia repellat.
              </Text>
            </div>
          </ItemLeft>
          <ItemLeft>
            <div>
              <span>Englist</span>
              <div style={{ border: '1px solid #ccc', width: '100%' }}></div>
            </div>
            <Text>Trung bình</Text>
          </ItemLeft>
        </ContentLeft>
        <ContentRight>
          <ItemRight>
            <Title>Profile</Title>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
              perspiciatis corrupti ipsam id optio quis, eaque facere alias
              dignissimos molestiae provident debitis blanditiis reiciendis nisi
              nostrum iusto repellat veritatis iste.
            </Text>
          </ItemRight>
        </ContentRight>
      </Content>
    </Container>
  );
};

export default PreviewTheme1;
