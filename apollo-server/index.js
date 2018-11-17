const { ApolloServer, gql } = require("apollo-server");

const songs = [
  {
    id: 2,
    duration: 22,
    title: "NotStarWars",
    keysPlayed: [
      "D3",
      "D3",
      "D3",
      "G3",
      "D4",
      "C4",
      "B3",
      "A3",
      "G4",
      "D4",
      "C4",
      "B3",
      "A3",
      "G4",
      "D4",
      "C4",
      "B3",
      "C4",
      "A3",
      "D3",
      "D3",
      "D3",
      "G3"
    ],
    keysTimeStamps: [
      1.2,
      1.5999999999999999,
      1.9999999999999998,
      2.8000000000000003,
      4.400000000000001,
      5.600000000000002,
      6.000000000000003,
      6.800000000000003,
      8.000000000000004,
      9.599999999999998,
      10.799999999999994,
      11.199999999999992,
      11.59999999999999,
      12.599999999999987,
      13.999999999999982,
      15.199999999999978,
      15.799999999999976,
      16.199999999999974,
      16.799999999999972,
      19.599999999999962,
      19.79999999999996,
      20.39999999999996,
      21.799999999999955
    ]
  },
  {
    id: 1,
    duration: 32,
    title: "NotAdamsFamily",
    keysPlayed: [
      "G2",
      "C3",
      "E3",
      "C3",
      "G2",
      "F2",
      "D3",
      "Bb2",
      "B2",
      "D3",
      "B2",
      "G2",
      "E2",
      "C3",
      "G2",
      "C3",
      "E3",
      "C3",
      "A2",
      "F2",
      "D3",
      "C3",
      "B2",
      "G2",
      "A2",
      "B2",
      "C3"
    ],
    keysTimeStamps: [
      1.7999999999999998,
      3.2000000000000006,
      4.200000000000001,
      5.400000000000002,
      6.400000000000003,
      7.400000000000004,
      8.200000000000003,
      9.599999999999998,
      11.59999999999999,
      12.399999999999988,
      13.399999999999984,
      14.199999999999982,
      15.999999999999975,
      17.39999999999997,
      19.399999999999963,
      20.59999999999996,
      21.599999999999955,
      22.399999999999952,
      23.39999999999995,
      24.599999999999945,
      25.79999999999994,
      26.799999999999937,
      28.39999999999993,
      29.599999999999927,
      30.399999999999924,
      30.999999999999922,
      31.79999999999992
    ]
  }
];

const typeDefs = gql`
  type Song {
    id: ID!
    title: String
    keysPlayed: [String]
    keysTimeStamps: [Float]
    duration: Int
  }

  type Query {
    songs: [Song]
  }

  type Mutation {
    addSong(
      title: String
      keysPlayed: [String]
      keysTimeStamps: [Float]
      duration: Int
    ): Song
  }
`;

const resolvers = {
  Query: {
    songs: () => songs
  },
  Mutation: {
    addSong: (_, { title, keysPlayed, keysTimeStamps, duration }) => {
      const newSong = {
        id: songs.length + 1,
        title,
        keysPlayed,
        keysTimeStamps,
        duration
      };
      songs.push(newSong);

      return newSong;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const {
  NODE_ENV,
  PORT,
} = process.env;

const isNotProduction = NODE_ENV !== 'production';

console.log(
  '\nprocess.env.NODE_ENV', NODE_ENV,
  '\nprocess.env.PORT', PORT,
);




server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
