export interface Character {
  id: number;
  character_name: string;
  imgSrc: string;
}

export const characters: Character[] = [
  {
    id: 0,
    character_name: "Fox",
    imgSrc: "../images/characterIcons/Fox.png",
  },
  {
    id: 1,
    character_name: "Marth",
    imgSrc: "../images/characterIcons/Marth.png",
  },
  {
    id: 2,
    character_name: "Jigglypuff",
    imgSrc: "../images/characterIcons/Jigglypuff.png",
  },
  {
    id: 3,
    character_name: "Falco",
    imgSrc: "../images/characterIcons/Falco.png",
  },
  {
    id: 4,
    character_name: "Sheik",
    imgSrc: "../images/characterIcons/Sheik.png",
  },
];
