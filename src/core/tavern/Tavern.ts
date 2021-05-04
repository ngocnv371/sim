import { Character } from "../character/Character";
import { FACTION_NONE } from "../battle/Config";
import { TavernState } from "./TavernState";
import faker from "faker";

export function refresh(state: TavernState) {
	const ones = attractAdventurers(state);
	state.adventurers = ones;
}

export function removeOne(state: TavernState, one: Character) {
	state.adventurers = state.adventurers.filter(a => a.id != one.id)
}

export function attractAdventurers(state: TavernState): Character[] {
  const bag: Character[] = [];
  const num = 20;
  for (let index = 0; index < num; index++) {
    const maxLife = faker.datatype.number({ min: 100, max: 200 });
    const maxMana = faker.datatype.number({ min: 100, max: 200 });
    const one: Character = {
      id: faker.random.alphaNumeric(10),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,

      life: faker.datatype.number(maxLife),
      maxLife,

      mana: faker.datatype.number(maxLife),
      maxMana,

      int: faker.datatype.number({ min: 20, max: 50 }),
      str: faker.datatype.number({ min: 20, max: 50 }),
      dex: faker.datatype.number({ min: 20, max: 50 }),

      faction: FACTION_NONE,
    };
    bag.push(one);
  }
  return bag;
}
