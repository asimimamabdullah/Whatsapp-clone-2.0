/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      name
      status
      image
      ChatRooms {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      status
      image
      ChatRooms {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      status
      image
      ChatRooms {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      users {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      users {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      name
      image
      Messages {
        items {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      LastMessage {
        id
        createdAt
        text
        chatroomID
        userID
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      users {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      chatRoomLastMessageId
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      createdAt
      text
      chatroomID
      userID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      createdAt
      text
      chatroomID
      userID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      createdAt
      text
      chatroomID
      userID
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateUserChatRoom = /* GraphQL */ `
  subscription OnCreateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onCreateUserChatRoom(filter: $filter) {
      id
      userID
      chatRoomID
      user {
        id
        name
        status
        image
        ChatRooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      chatRoom {
        id
        name
        image
        Messages {
          nextToken
          startedAt
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUserChatRoom = /* GraphQL */ `
  subscription OnUpdateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onUpdateUserChatRoom(filter: $filter) {
      id
      userID
      chatRoomID
      user {
        id
        name
        status
        image
        ChatRooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      chatRoom {
        id
        name
        image
        Messages {
          nextToken
          startedAt
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUserChatRoom = /* GraphQL */ `
  subscription OnDeleteUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
  ) {
    onDeleteUserChatRoom(filter: $filter) {
      id
      userID
      chatRoomID
      user {
        id
        name
        status
        image
        ChatRooms {
          nextToken
          startedAt
        }
        Messages {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      chatRoom {
        id
        name
        image
        Messages {
          nextToken
          startedAt
        }
        LastMessage {
          id
          createdAt
          text
          chatroomID
          userID
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        users {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        chatRoomLastMessageId
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
