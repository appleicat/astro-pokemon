import { styled } from "@linaria/react";

import type { pokemons } from "@/pages/index.astro";

const Main = styled.div`
  flex: 1;
  height: 500px;
  background-color: black;
`;

const Container = styled.div`
  padding: 44px;
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 1;
  color: #a0a0a0;
  text-transform: capitalize;
`;

const Image = styled.img`
  height: 200px;
  object-position: center;
  object-fit: contain;
  image-rendering: pixelated;
`;

const Info = styled.div`
  color: #a0a0a0;
  font-size: 17px;
  line-height: 1.5;
`;

export default function Showcase({ data }: { data: pokemons[number] }) {
  return (
    <Main>
      <Container>
        <Title>{data.name}</Title>
        <Image src={data.image} />
        <Info>
          <div>Id: {data.id}</div>
          <div>height: {data.height}</div>
          <div>attack: {data.attack}</div>
        </Info>
      </Container>
    </Main>
  );
}
