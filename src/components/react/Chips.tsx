import { styled } from "@linaria/react";

import type { pokemons } from "@/pages/index.astro";

const List = styled.ul`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 6px;
  list-style: none;
`;

const ListItem = styled.li``;

const Button = styled.button`
  background-color: #1986ec;
  border-radius: 44px;
  padding: 20px;
  font-size: 20px;
  color: white;
  border: none;
  cursor: pointer;
`;

export default function Chips({
  data,
  changeSelected,
}: {
  data: pokemons,
  changeSelected: (id: number) => void,
}) {
  return (
    <List>
      {data.map((pokemon, id) => (
        <ListItem key={id}>
          <Button
            onClick={() => {
              changeSelected(id);
            }}
          >
            {pokemon.name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
