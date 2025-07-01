// import { ChatClient } from '@azure/communication-chat';

// export type Sender = {
//     userId: string;
//     displayName: string | undefined;
// };

// interface ChatUser {
//     kind: string;
//     communicationUserId?: string;
// }

// type MessageType = 'text' | 'image' | 'file' | 'url' | 'emoji' | 'call' | 'info' | 'reaction';

// type ModuleType =
//     | 'task'
//     | 'expense'
//     | 'invoice'
//     | 'vendor_payment'
//     | 'meeting'
//     | 'service_request'
//     | 'tax_filing'
//     | 'invoice_submission';

// export type CustomMessage = {
//     id: string;
//     content: {
//         message: string;
//         attachments: any[];
//     };
//     createdOn: Date;
//     deletedOn: Date | null;
//     type: MessageType;
//     isSending: boolean;
//     metadata: {
//         type: MessageType;

//         name?: string;
//         mime_type?: string;
//         url?: string;
//         size?: number;
//         extension?: string;

//         title?: string;
//         description?: string;
//         favicon?: string;
//         image?: string;

//         is_reply?: string; // whether it is a reply or not
//         ref_type?: MessageType | ModuleType; // 'text' | 'image' | 'file' | 'url' | 'emoji' | <module_name>
//         ref?: string; // id of replied message or document
//         ref_content?: string; // main content/name of the replied message or document
//         ref_image?: string; // replied message image if any
//         ref_company_id?: string; // company id of the replied document
//         ref_company_name?: string; // company name of the replied
//     };
//     sender: ChatUser;
//     sequenceId: string;
//     version: string;
//     senderDisplayName: string;
// };

// export type Page = {
//     data: CustomMessage[];
//     hasMore: boolean;
//     pageNum: number;
// };

// export type LastMessage = {
//     id: string;
//     content: {
//         message: string;
//         attachments: any[];
//     };
//     createdOn: Date;
//     deletedOn?: Date;
//     type: string;
//     metadata: {
//         type: string;
//     };
// };

// export type Chat = {
//     threadId: string;
//     topic: string;
//     sender: Sender;
//     lastMessage: LastMessage | null;
//     unreadCount: number;
//     lastReadMessageId: string;
//     lastReadOn: Date;
//     isTyping: boolean;
// };

// export type ChatProfile = {
//     chat_thread_id: string;
//     members: {
//         id: string;
//         name: string;
//         image: string;
//         acs_user_id: string;
//     }[];
// };

// export type ChatNotification = {
//     id: string;
//     threadId: string;
//     content: {
//         message: string;
//         attachments: any[];
//     };
//     createdOn: Date;
//     deletedOn?: Date;
//     message: string;
//     metadata: CustomMessage['metadata'];
//     // recipient?: ChatUser;
//     sender: ChatUser;
//     senderDisplayName: string;
//     type: string;
//     version: string;
// };

// export type ChatState = {
//     chats: Chat[];
//     profiles: ChatProfile[];
//     isLoading: boolean;
//     isLoadingChats: boolean;
//     isLoadingProfiles: boolean;
//     isNotificationsStarted: boolean;
//     error: any;
//     unreadChats: number;
//     notification: ChatNotification | null;
//     acsToken: string;
//     chatClient: ChatClient | null;
//     lastSeenMessages: {
//         [threadId: string]: {
//             messageId: string;
//             readOn: Date;
//         };
//     };
// };

// export type VideoCallState = {
//     page: string;
//     mode: string;
//     acsUserId: string;
//     acsToken: string;
//     profile: {
//         name: string;
//         image: string;
//     };
//     cameraOn: boolean;
//     microphoneMuted: boolean;
//     sharingScreen: boolean;
//     call: any;
// };
