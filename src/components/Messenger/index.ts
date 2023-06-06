import Block from "../Block";
import { MessengerBase, withSelectedChatMessages } from "./Messenger";

export const Messenger = withSelectedChatMessages(MessengerBase as typeof Block);
