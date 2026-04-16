import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuItem } from './button.types';

@Component({
  selector: 'bk-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, NgTemplateOutlet],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly variant = input<'filled' | 'outlined' | 'text' | 'tonal' | 'elevated'>('filled');
  readonly type = input<'button' | 'link' | 'menu'>('button');
  readonly menuItems = input<MenuItem[]>([]);
  readonly label = input<string>('');
  readonly link = input<string>('');
  readonly icon = input<string>('');
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly disabled = input<boolean>(false);

  protected onClickItem(ev: Event, item: MenuItem) {
    if (typeof item.command === 'function') {
      item.command(ev);
    }
  }

}
