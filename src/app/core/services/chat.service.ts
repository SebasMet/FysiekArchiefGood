import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

/**
 * Manages the state and logic for the AI-powered chat.
 * This service sends the chat history to Supabase,
 * and processes the streamed response from the AI assistant.
 */
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

  // Used to cancel an in-progress fetch request.
  private abortController: AbortController | null = null;

  constructor() {}

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Adds a new message to the chat and, if it's a user message,
   * triggers the AI response.
   */
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
      this.sendMessage();
    }
  }

  //Sends the current conversation to the backend and processes the streamed AI response.
  async sendMessage() {
    this.statusSubject.next('responding');
    this.abortController = new AbortController();

    try {
      // Send the entire message history for context.
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

      // Add the assistant's message placeholder to the UI.
      const updatedMessages = [...this.messagesSubject.value, assistantMessage];
      this.messagesSubject.next(updatedMessages);

      let buffer = '';
      // Read the response stream chunk by chunk.
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        let lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Handle partial lines

        for (const line of lines) {
          if (!line.trim()) continue;
          
          // The stream sends data like `0:"text"`, so we extract the content.
          const match = line.match(/^0:"(.*)"$/);
          if (match) {
            assistantMessage.content += match[1];
            // Update the UI with the newly received text.
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

  /**
   * Aborts the current AI response.
   */
  abortResponse() {
    this.abortController?.abort();
  }

  /**
   * Clears the chat history.
   */
  clearMessages() {
    this.messagesSubject.next([]);
  }
}