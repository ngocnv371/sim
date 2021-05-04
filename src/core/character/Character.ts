export interface Character {
  id: string;
  name: string;
  faction: string;

  life: number;
  maxLife: number;

  mana: number;
  maxMana: number;

  str: number;
  int: number;
  dex: number;
}
