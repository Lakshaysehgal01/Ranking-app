export interface User {
  _id: string;
  name: string;
  email: string;
  points: number;
}

export interface HistoryEntry {
  _id: string;
  userId: string;
  username: string;
  points: number;
  createdAt: string;
}

export const generateMockUsers = (): User[] => {
  const names = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Davis",
    "Diana Miller",
    "Ethan Wilson",
    "Fiona Brown",
    "George Taylor",
    "Hannah Lee",
    "Ian Clark",
    "Julia Anderson",
  ];

  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

  return names.map((name, index) => {
    const firstName = name.split(" ")[0].toLowerCase();
    const lastName = name.split(" ")[1].toLowerCase();
    const domain = domains[index % domains.length];

    return {
      _id: `user_${index + 1}`,
      name,
      email: `${firstName}.${lastName}@${domain}`,
      points: Math.floor(Math.random() * 1000) + 50,
    };
  });
};

export const generateRandomPoints = (): number => {
  return Math.floor(Math.random() * 100) + 10; // Random points between 10-109
};

// export const generateHistoryEntry = (
//   user: User,
//   points: number
// ): HistoryEntry => {
//   return {
//     _id: `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//     userId: user._id,
//     username: user.name,
//     points,
//     createdAt: new Date(),
//   };
// };
