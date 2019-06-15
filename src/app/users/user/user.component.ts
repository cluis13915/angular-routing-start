import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // NOTE: Use .subscribe() when the route can be reached within itself with
    // diferent parameters.
    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.user.id = params['id'];
        this.user.name  = params['name'];
      });
  }

  ngOnDestroy() {
    // NOTE: Is not neccessary because Angular already do it for us, but in order
    // to understand what is happending behind the scenes, can be added manually
    // and it doesn't hurt our application.
    this.paramsSubscription.unsubscribe();
  }
}
