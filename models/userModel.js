const database = [
  {
    id: "1",
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    reminders: [],
    role: "admin"
  },
  {
    id: "2",
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    reminders: [{
      id: "1",
      title: "Feed the dog",
      description: "Feed the dog before 8pm",
      completed: false,
      banner: "water"
    },
    {
      id: "2",
      title: "Walk the dog",
      description: "Walk the dog before 10pm",
      completed: false,
      banner: "phone"
    }, {
      id: "3",
      title: "Pet the dog",
      description: "Feed the dog before 11pm",
      completed: false,
      banner: "grass"
    }],
    role: "user"
  },
  {
    id: "3",
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    reminders: [{
      id: "1",
      title: "Feed the cat",
      description: "Feed the cat before 8pm",
      completed: false,
      banner: "cat"
    },
    {
      id: "2",
      title: "Walk the cat",
      description: "Walk the cat before 10pm",
      completed: false,
      banner: "car"
    }, {
      id: "3",
      title: "Pet the cat",
      description: "Feed the cat before 11pm",
      completed: false,
      banner: "spy"
    }],
    role: "user"
  },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { database, userModel };
