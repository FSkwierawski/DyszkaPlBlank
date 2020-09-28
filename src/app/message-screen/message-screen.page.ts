import { Router } from '@angular/router';
import { Message } from './../model/Message';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-screen',
  templateUrl: './message-screen.page.html',
  styleUrls: ['./message-screen.page.scss'],
})
export class MessageScreenPage implements OnInit {

  inbox$ = new BehaviorSubject<Message[]>([]);
  inbox: Message[];

  constructor(
    private messageService: MessageService,
    private router: Router
  )
   {
      this.inbox$.subscribe(messages => {
        this.inbox = messages;
      });
   }

  ngOnInit() {
    this.messageService.getInbox(1).subscribe ((messages: Message[]) => {
      this.inbox$.next(messages['items']);
      console.log(this.inbox$.value);
    });
  }

  openConversation(username: string) {
    this.router.navigateByUrl(`message-screen/${username}`);
  }

}
