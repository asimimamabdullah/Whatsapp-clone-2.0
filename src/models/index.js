// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, ChatRoom, Message, UserChatRoom } = initSchema(schema);

export {
  User,
  ChatRoom,
  Message,
  UserChatRoom
};