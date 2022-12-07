import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent{

  constructor(
      public _router: Router
  ) {
  }

  /**
   * Navigate to passed link
   * @param link
   */
  public onNavigateTo(link: string): void {
    this._router.navigate([`main/${link}`]).then();
  }

}
