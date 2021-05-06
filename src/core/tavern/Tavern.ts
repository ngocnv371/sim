import { Character } from "../character/Character";
import { FACTION_NONE } from "../battle/Config";
import { TavernState } from "../../store/modules/tavern/TavernState";
import faker from "faker";

export function refresh(state: TavernState) {
  const ones = attractAdventurers(state);
  state.adventurers = ones;
}

export function removeOne(state: TavernState, one: Character) {
  state.adventurers = state.adventurers.filter((a) => a.id != one.id);
}

export function attractAdventurers(state: TavernState): Character[] {
  const bag: Character[] = [];
  const num = 20;
  const jobs = ["Warrior", "Guardian", "Mage", "Healer"];
  for (let index = 0; index < num; index++) {
    const maxLife = faker.datatype.number({ min: 100, max: 200 });
    const maxMana = faker.datatype.number({ min: 100, max: 200 });
    const id = faker.random.alphaNumeric(10);
    const jobIndex = faker.datatype.number({min: 0, max: jobs.length - 1});
    const one: Character = {
      id,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      job: jobs[jobIndex],
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
