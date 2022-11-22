import { API, graphqlOperation, Auth } from "aws-amplify";
import { GetUserQuery } from "../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";

export const getCommonChatRoomWithUser = async (userID: any) => {
	const authUser = await Auth.currentAuthenticatedUser();
	// get all chatrooms of user1

	const response = await (API.graphql(
		graphqlOperation(listChatRooms, { id: authUser.attributes?.sub }),
	) as Promise<GraphQLResult<GetUser>>);

	const chatRooms = response.data?.ChatRooms.items || [];

	console.log(chatRooms);
	// chatRooms
	//
	// get all chatrooms of user2
	// remove chat rooms with more than 2 users
	// get the common chatrooms
	return response;
};

interface ChatRoomQueryForChatRoomService {
	items: Array<{
		chatRoom: {
			id: string;
			users: {
				items: {
					user: {
						id: string;
					};
				};
			};
		};
	}>;
}

export interface GetUser {
	id: string;
	ChatRooms: {
		items: {
			chatRoom: {
				id: string;
				users: {
					items: {
						user: {
							id: string;
						};
					};
				};
			};
		};
	};
}

export const listChatRooms = `
query GetUser($id: ID!) {
   getUser(id: $id) {
     id
     ChatRooms {
       items {
         chatRoom {
           id
           users {
             items {
               user {
                 id
               }
             }
           }
         }
       }
     }
   }
 }
`;
