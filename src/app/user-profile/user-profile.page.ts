import { async } from '@angular/core/testing';
import { AlertController } from '@ionic/angular';
import { Comment } from './../model/Comment';
import { CommentService } from './../services/comment.service';
import { UserBuilder } from './../model/User.builder';
import { IdentityService } from './../services/identity.service';
import { UserService } from './../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../model/User';
import { BehaviorSubject } from 'rxjs';
import { UserData } from './../interfaces/UserData';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from '../model/Paged-result';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public comments$ = new BehaviorSubject<Comment[]>([]);
  user$ = new BehaviorSubject<User>(null);
  user = new User();
  currentUser: string;
  loading = true;
  name: string;
  isOwner: boolean;
  public comments: Comment[] = [];
  newComment: string;
  public owner: string;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private identityService: IdentityService,
    private activatedroute: ActivatedRoute,
    private commentService: CommentService,
    private allerController: AlertController)
    {
      this.identityService.user$.subscribe(userInfromations => {
        this.user = userInfromations;
      });

      this.isOwner = this.isProfileOwner();
      this.comments$.subscribe(commentsResult => {
        this.comments = commentsResult;
      });

      this.owner = this.identityService.currentUser$.value;
    }

  ngOnInit() {
    const username = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUserByName(username).subscribe ((userDetails: User) => {
      this.userService.getUserIdentityData(username).subscribe(identityUser => {
        this.user$.next(new UserBuilder().addApplicationData(userDetails).addIdentityData(identityUser).build());
        this.identityService.user$.next(new UserBuilder().addApplicationData(userDetails).addIdentityData(identityUser).build());
        this.loading = false;
        this.name = this.user$.value.userName;
      });
    });
    this.getComments(1);
  }

  openProfileDataeditor() {
    this.router.navigateByUrl('/edit-profile');
  }

  isProfileOwner(): boolean {
    if (this.identityService.currentUser$.value === this.activatedRoute.snapshot.paramMap.get('id')) {
      return true;
    }
    else {
      return false;
    }
  }

  openUserOffers(){
    this.router.navigateByUrl(`user-offers/${this.user.userName}`);
  }

  getComments(page: number) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.commentService.getPagedAndFiltered(page, id).subscribe((result: PagedResult<Comment>) => {
      let comments = [];
      result.items.forEach(comment => {
        comments.push(new Comment(comment));
      });
      this.comments$.next(comments);
      console.log(comments);
    });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe(() => {
      this.getComments(1);
    });
  }

  setToPositive(id: string) {
    this.commentService.setToPositive(id).subscribe(() => {
      this.getComments(1);
    });
  }

  openChat() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    id.toString();
    const username = this.user.userName.toString();
    this.router.navigateByUrl(`message-screen/${username}`);
  }

  deleteAccount() {
    this.deleteAccountAlert();
  }

  async deleteAccountAlert() {
    const alert = await this.allerController.create({
      header: 'Uwaga!',
      message: 'Czy na pewno chcesz usunąć swoje konto? Niedowracalnie usunięte zostaną wszystkie zasoby związane z twoim kontem',
      buttons: [
        {
          text: 'Tak',
          handler: () => {
            this.removeUser();
          }
        },
          {
            text: 'Nie'
          }
      ]
    });
    await alert.present();
  }

  removeUser() {
    this.userService.deleteUser(this.identityService.user$.value.applicationId)
    .subscribe(result => {
      console.log('Usunięto konto');
      this.identityService.logout();
    });
  }

}
