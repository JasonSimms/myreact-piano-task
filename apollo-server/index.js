const { ApolloServer, gql } = require('apollo-server');

const songs = [
    {
        id: 1,
        title: 'Some song title',
        music: [ 'C', 'D', 'E'],
        duration: 5
    },
    {
        id: 2,
        duration: 3.400000000000001,
        music: {0.8: "Ab4", 1.7999999999999998: "G4", 2.1999999999999997: "F4", 2.6: "E4", 3.0000000000000004: "Eb4"},
        title: "NoTitle"
    }
];

const typeDefs = gql`
    type Song {
        id: ID!
        title: String
        music: Object
        duration: Number
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
