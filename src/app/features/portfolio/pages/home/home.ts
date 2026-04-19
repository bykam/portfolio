import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Header } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
