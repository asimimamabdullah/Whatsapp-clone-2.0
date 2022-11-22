export const listChatRooms = `
query GetUser($id: ID!) {
   getUser(id: $id) {
     id
     ChatRooms {
       items {
         chatRoom {
           id
           LastMessage {
             id
             createdAt
             text
           }
           users {
             items {
               user {
                 id
                 image
                 name
               }
             }
           }
         }
       }
     }
   }
 }
`;
