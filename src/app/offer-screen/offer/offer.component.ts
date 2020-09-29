import { IdentityService } from './../../services/identity.service';
import { CommentToAdd } from './../../interfaces/CommentToAdd';
import { PagedResult } from './../../model/Paged-result';
import { CommentService } from './../../services/comment.service';
import { BehaviorSubject } from 'rxjs';
import { Offer } from './../../model/Offer';
import { Comment } from './../../model/Comment';
import { OfferService } from './../../services/offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {

  public comments$ = new BehaviorSubject<Comment[]>([]);
  public offerDetails$ = new BehaviorSubject<Offer[]>([]);
  public tempOffer: Offer;
  public loading = true;
  public comments: Comment[] = [];
  newComment: string;
  public owner: string;


  constructor(
    private router: Router,
    private offerService: OfferService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private identityService: IdentityService
  )
  {
    this.owner = identityService.currentUser$.value;
  }

  ngOnInit() {
    this.comments$.subscribe(commentsResult => {
      this.comments = commentsResult;
    });
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.offerService.getById(id).subscribe((offerDetails: Offer) => {
      // this.offerDetails$.next(offerDetails);
      this.tempOffer = new Offer(offerDetails);
      this.loading = false;
    });
    this.getComments(1);
  }

  getComments(page: number) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.commentService.getPagedAndFiltered(page, null, id).subscribe((result: PagedResult<Comment>) => {
      let comments = [];
      result.items.forEach(comment => {
        comments.push(new Comment(comment));
      });
      this.comments$.next(comments);
      console.log(comments);
    });
  }

  openOwnerProfile()  {
    this.router.navigateByUrl(`/user-profile/${this.tempOffer.authorUserName}`);
  }

  addComment() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    let commentToadd: CommentToAdd = ({
      text: this.newComment,
      isPositive: false,
      offerId: id
    });
    this.commentService.addComment(commentToadd).subscribe( () => {
      this.getComments(1);
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

}
