import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private statusSubject = new BehaviorSubject<
    'awaiting_message' | 'responding'
  >('awaiting_message');
  status$ = this.statusSubject.asObservable();

  private abortController: AbortController | null = null;

  constructor() {}

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  addMessage(role: 'user' | 'assistant' | 'system', content: string) {
    const newMessage: Message = {
      id: this.generateId(),
      role,
      content,
      createdAt: new Date(),
    };

    const updatedMessages = [...this.messagesSubject.value, newMessage];
    this.messagesSubject.next(updatedMessages);

    if (role === 'user') {
      this.sendMessage(newMessage);
    }
  }

  async sendMessage(userMessage: Message) {
    this.statusSubject.next('responding');
    this.abortController = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: this.messagesSubject.value }),
        headers: { 'Content-Type': 'application/json' },
        signal: this.abortController.signal,
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage: Message = {
        id: this.generateId(),
        role: 'assistant',
        content: '',
        createdAt: new Date(),
      };

      const updatedMessages = [...this.messagesSubject.value, assistantMessage];
      this.messagesSubject.next(updatedMessages);

      let buffer = '';
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Split by newlines to process each event
        let lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;

          // Try to extract only the text chunks (e.g., lines like 0:"text")
          const match = trimmed.match(/^0:"(.*)"$/);
          if (match) {
            assistantMessage.content += match[1];
            this.messagesSubject.next([
              ...this.messagesSubject.value.slice(0, -1),
              { ...assistantMessage },
            ]);
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.warn('Fetch aborted');
      } else {
        console.error(err);
      }
    } finally {
      this.abortController = null;
      this.statusSubject.next('awaiting_message');
    }
  }

  abortResponse() {
    this.abortController?.abort();
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }
}
