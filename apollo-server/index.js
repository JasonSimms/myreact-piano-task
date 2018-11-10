const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Some song title',
        duration: 5,
        keysPlayed: ["D", "E", "F"],
        keysTimeStamps: [1.0005,2.555512,3]
    },
    {
        id: 2,
        duration: 4,
        title: "NoTitle",
        keysPlayed: ["D", "E", "F"],
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
        addSong(title: String, music: [String]): Song
    }
`

const resolvers = {
    Query: {
        songs: () => songs,
    },
    Mutation: {
        addSong: (_, { title, music }) => {
            const newSong = { 
                id: songs.length + 1,
                title,
                music,
                length,
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
