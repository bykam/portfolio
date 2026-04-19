import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
