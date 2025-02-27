import { useState } from "react";
import { styled } from "@linaria/react";

import type { pokemons } from "@/pages/index.astro";

import Chips from "@/components/react/Chips";
import Showcase from "@/components/react/Showcase";

const Container = styled.main`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
`;

export default function Main({ data }: { data: pokemons }) {
  const [selected, setSelected] = useState<number>(0);

  const changeSelected = (id: number) => {
    setSelected(id);
  };

  return (
    <Container>
      <Chips data={data} changeSelected={changeSelected} />
      <Showcase data={data.at(selected)} />
    </Container>
  );
}
