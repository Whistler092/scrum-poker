export const CARDS = [
  { id: 0, key: 0, isActive: false },
  { id: 1, key: 1, isActive: false },
  { id: 2, key: 2, isActive: false },
  { id: 3, key: 3, isActive: false },
  { id: 4, key: 5, isActive: false },
  { id: 5, key: 8, isActive: false },
  { id: 6, key: 8, isActive: false },
  { id: 7, key: 11, isActive: false },
  { id: 8, key: 13, isActive: false },
  { id: 9, key: 21, isActive: false },
  { id: 10, key: "?", isActive: false },
  { id: 11, key: "∞", isActive: false },
];

export const getRandomPattern = () => {
  const patterns = {
    diamonds: "♦",
    clubs: "♣",
    hearts: "♥",
    spades: "♠",
  };

  const randonNumber = Math.floor(Math.random() * Object.keys(patterns).length);
  return {
    pattern: Object.entries(patterns)[randonNumber][0],
    icon: Object.entries(patterns)[randonNumber][1],
  };
};
