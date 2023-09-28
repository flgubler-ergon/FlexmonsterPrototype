import {Component, OnInit} from '@angular/core';
import {TrustedTypesService} from './services/trusted-types.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pivot-angular';

  constructor(private readonly trustedTypesService: TrustedTypesService) {}
  ngOnInit(): void {
    this.trustedTypesService.createDefaultPolicy()
  }
}
