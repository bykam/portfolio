import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeService } from '@core/services/theme';

interface NavLink {
  id: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = this.themeService.isDark;
  protected readonly mobileMenuOpen = signal(false);

  protected readonly navLinks: NavLink[] = [
    { id: 'Home', path: '/', exact: true },
    { id: 'About', path: '/about' },
    { id: 'Projects', path: '/projects' },
  ];

  protected toggleTheme(): void {
    this.themeService.toggle();
  }

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  protected closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
