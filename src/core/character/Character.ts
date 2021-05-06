export interface Character {
  id: string;
  name: string;
  faction: string;
  job: string;
  avatar: string;
  level: number;

  life: number;
  maxLife: number;

  mana: number;
  maxMana: number;

  str: number;
  int: number;
  dex: number;
}
