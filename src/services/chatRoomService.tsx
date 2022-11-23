import { API, graphqlOperation, Auth } from "aws-amplify";
import { GetUserQuery } from "../API";
import { GraphQLResult } from "@aws-amplify/api-graphql";

export const getCommonChatRoomWithUser = async (userID: any) => {
	const authUser = await Auth.currentAuthenticatedUser();
	// get all chatrooms of user1

	const response = await (API.graphql(
		graphqlOperation(listChatRooms, { id: authUser.attributes?.sub }),
	) as Promise<GraphQLResult<GetUserChatRooms>>);

	const chatRooms = response.data?.getUser.ChatRooms.items || [];

	const chatRoom = chatRooms.find((chatRoomItem) =>
		chatRoomItem?.chatRoom.users.items.some(
			(useritem) => useritem?.user.id === userID,
		),
	);

	console.log(
		"chatroom service:..........................................",
		chatRoom,
	);
	// chatRooms
	//
	// get all chatrooms of user2
	// remove chat rooms with more than 2 users
	// get the common chatrooms
	return chatRoom;
};

export interface ChatRoomQueryForChatRoomService {
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
}

export interface GetUserChatRooms {
	getUser: {
		id: string;
		ChatRooms: {
			items: Array<{
				chatRoom: {
					id: string;
					users: {
						items: Array<{
							user: {
								id: string;
							};
						} | null>;
					};
				};
			} | null>;
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
