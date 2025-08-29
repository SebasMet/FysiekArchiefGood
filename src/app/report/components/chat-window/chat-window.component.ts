import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Message } from '@core/services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  standalone: false,
})
export class ChatWindowComponent implements OnInit {
  private _uuid: string = '';
  onEnter($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.send();
    }
  }
  handleSubmit() {
    this.send();
  }
  input = '';
  public messages: Message[] = [
    {
      id: '',
      role: 'assistant',
      content: 'Hoi Hoe kan ik je helpen?',
      createdAt: new Date(),
    },
  ];
  constructor(public chatService: ChatService, private route: ActivatedRoute) {
    this._uuid = this.route.snapshot.paramMap.get('uuid')!;

    this.chatService.messages$.subscribe((messages) => {
      this.messages = [
        {
          id: '2',
          role: 'assistant',
          content: 'Hoi Hoe kan ik je helpen?',
          createdAt: new Date(),
        },
        ...messages,
      ];
    });
  }

  ngOnInit(): void {
    console.log('ChatWindowComponent initialized');
    this.chatService.addMessage('system', `current dossier ID: ${this._uuid}`);
  }

  public formatRole(role: string): string {
    switch (role) {
      case 'user':
        return 'User 😀';
      case 'assistant':
        return 'RvIHH Assistent 🤖';
      case 'system':
        return 'System';
      default:
        return role;
    }
  }

  public send() {
    if (this.input.trim()) {
      this.chatService.addMessage('user', this.input.trim());
      this.input = '';
    }
  }
}
