const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Some song title',
        duration: 5,
        keysPlayed: ["D4", "E4", "F4"],
        keysTimeStamps: [1.0005,2.555512,3]
    },
    {
        id: 2,
        duration: 4,
        title: "NoTitle",
        keysPlayed: ["D3", "E3", "F3"],
        keysTimeStamps: [1.000005,2,3]
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
        addSong(title: String, keysPlayed: [String], keysTimeStamps: [String], duration: Int): Song
    }
`

const resolvers = {
    Query: {
        songs: () => songs,
    },
    Mutation: {
        addSong: (_, { title, keysPlayed, keysTimeStamps, duration }) => {
            const newSong = { 
                id: songs.length + 1,
                title,
                keysPlayed,
                keysTimeStamps,
                duration,
            };
            songs.push(newSong);

            return newSong;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Apollo server running: ${url}`);
});
