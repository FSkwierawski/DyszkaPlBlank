import { IdentityService } from './../../services/identity.service';
import { Message } from './../../model/Message';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  messages$ = new BehaviorSubject<Message[]>([]);
  messages: Message[];
  owner: string;
  newMessage: string;
  addressee: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private identityService: IdentityService
  ) {
    this.messages$.subscribe((messages) => {
      this.messages = messages;
      this.messages.reverse();
    });
    this.owner = this.identityService.currentUser$.value;
  }

  ngOnInit() {
    const username = this.activatedRoute.snapshot.paramMap.get("id");
    this.messageService
      .getMessages(1, username)
      .subscribe((messages: Message[]) => {
        this.messages$.next(messages["items"]);
        console.log(this.messages$.value);
        this.addressee = username;
      });
  }
  addMessage() {
    this.messageService.addMessage({
      text: this.newMessage,
      receiverUserName: this.activatedRoute.snapshot.paramMap.get("id")
    }).subscribe(() => {
      const username = this.activatedRoute.snapshot.paramMap.get("id");
      this.messageService
        .getMessages(1, username)
        .subscribe((messages: Message[]) => {
          this.messages$.next(messages["items"]);
          console.log(this.messages$.value);
        });
    });
  }
}
