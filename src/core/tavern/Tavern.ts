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
	const id = faker.random.alphaNumeric(10);
    const one: Character = {
      id,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      class: faker.name.jobType(),
      avatar: `https://i.pravatar.cc/150?t=${id}`,
      level: faker.datatype.number({ min: 1, max: 10 }),

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
