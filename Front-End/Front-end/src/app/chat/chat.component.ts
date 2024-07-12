import { Component } from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgClass,
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {


   chatData = [
    { sender: 'Alice', receiver: 'Me', message: 'Hello!', timestamp: new Date('March 3, 2024 21:50:00') },
    { sender: 'Me', receiver: 'Alice', message: 'Hi Alice!', timestamp: new Date('March 3, 2024 21:52:00') },
    { sender: 'Alice', receiver: 'Me', message: 'How are you?', timestamp: new Date('March 3, 2024 21:53:00') },

    { sender: 'Bob', receiver: 'Me', message: 'Hey there!', timestamp: new Date('March 3, 2024 21:54:00') },
    { sender: 'Me', receiver: 'Bob', message: 'Hey Bob!', timestamp: new Date('March 3, 2024 21:55:00') },
    { sender: 'Bob', receiver: 'Me', message: 'I\'m good, thanks.', timestamp: new Date('March 3, 2024 21:56:00') },

    { sender: 'Charlie', receiver: 'Me', message: 'Hi!', timestamp: new Date('March 3, 2024 21:57:00') },
    { sender: 'Me', receiver: 'Charlie', message: 'Hello Charlie!', timestamp: new Date('March 3, 2024 21:58:00') },
    { sender: 'Charlie', receiver: 'Me', message: 'What\'s up?', timestamp: new Date('March 3, 2024 21:59:00') },

    { sender: 'Dave', receiver: 'Me', message: 'Hello!', timestamp: new Date('March 3, 2024 22:00:00') },
    { sender: 'Me', receiver: 'Dave', message: 'Hi Dave!', timestamp: new Date('March 3, 2024 22:01:00') },
    { sender: 'Dave', receiver: 'Me', message: 'Not much, just working.', timestamp: new Date('March 3, 2024 22:02:00') },

    { sender: 'Eve', receiver: 'Me', message: 'Hey!', timestamp: new Date('March 3, 2024 22:03:00') },
    { sender: 'Me', receiver: 'Eve', message: 'Hey Eve!', timestamp: new Date('March 3, 2024 22:04:00') },
    { sender: 'Eve', receiver: 'Me', message: 'How\'s it going?', timestamp: new Date('March 3, 2024 22:05:00') }
  ];

  participants: string[] = [];
  selectedParticipant: string | null = null;

  constructor() {
    this.participants = Array.from(new Set(this.chatData.map(chat => chat.sender))).filter(sender => sender !== 'Me');
  }

  get filteredChats() {
    return this.selectedParticipant ?
      this.chatData.filter(chat =>
        (chat.sender === 'Me' && chat.sender !== this.selectedParticipant && chat.receiver === this.selectedParticipant) || // My messages to selected participant
        (chat.sender === this.selectedParticipant && chat.sender !== 'Me' && chat.receiver === 'Me') // Selected participant's messages to me
      ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()) :
      [];
  }

  showChats(participant: string) {
    this.selectedParticipant = participant;
  }
}
