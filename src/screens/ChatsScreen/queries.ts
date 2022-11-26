import { UserChatRoom } from "../../API";

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

export interface ListChatRoomsQueryOwn {
	getUser?: {
		__typename: "User";
		id: string;
		ChatRooms?: {
			__typename: "ModelUserChatRoomConnection";
			items: Array<UserChatRoom>;
			// {
			// 	__typename: "UserChatRoom";
			// 	id: string;
			// 	userID: string;
			// 	chatRoomID: string;
			// 	createdAt: string;
			// 	updatedAt: string;
			// 	_version: number;
			// 	_deleted?: boolean | null;
			// 	_lastChangedAt: number;
			// } | null>;
			nextToken?: string | null;
			startedAt?: number | null;
		} | null;
		createdAt: string;
		updatedAt: string;
		_version: number;
		_deleted?: boolean | null;
		_lastChangedAt: number;
	} | null;
}
