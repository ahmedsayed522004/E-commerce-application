import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  PLATFORM_ID,
  Renderer2,
  Signal,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { stored_Keys } from '../../../core/constants/storedKeys';
import { CartService } from '../../../features/cart/services/cart.service';
import { ServiceService } from '../../../features/whishlist/services/whishlist.service';
import { AuthService } from './../../../core/auth/service/authentication/auth.service';
import { FlowbiteService } from './../../../core/services/flowbite/flowbite.service';
interface Language {
  code: string;
  name: string;
  flag: string;
}
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  whishListData() {
    throw new Error('Method not implemented.');
  }

  Home: string | null | undefined;

  constructor(private FlowbiteService: FlowbiteService) {}
  @Input({ required: true }) islogin!: boolean;

  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly whishlistService = inject(ServiceService);
  private readonly plat_id = inject(PLATFORM_ID);
  count: Signal<number> = computed(() => this.cartService.cartCount());
  count2: Signal<number> = computed(() => this.whishlistService.whishListCount());
  menuOpen = signal(false);

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.whishlistService.getLoggedUserWhishlist().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.whishlistService.whishListCount.set(res.data.length);
        }
      },
    });
    if (isPlatformBrowser(this.plat_id)) {
      const token = localStorage.getItem(stored_Keys.userToken);
      if (token) {
        this.getAllCartData();
      }
    }
  }

  getAllCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
  }
  singnOut(): void {
    this.authService.userLogout();
  }

  // staert dropdown
  // ================= DROPDOWN LOGIC =================
  private translateService = inject(TranslateService);
  private renderer = inject(Renderer2);
  isOpen = false;

  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  selectedLanguage: Language = {
    code: this.translateService.getCurrentLang(),
    name: 'english',
    flag: 'us',
  };

  // فتح وقفل الدروب داون
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // اختيار لغة + تغيير اللغة في ngx-translate

  selectLanguage(lang: Language): void {
    this.selectedLanguage = lang;
    this.isOpen = false;

    this.translateService.use(lang.code);

    this.renderer.setAttribute(document.documentElement, 'lang', lang.code);

    this.renderer.setAttribute(
      document.documentElement,
      'dir',
      lang.code === 'en' || lang.code === 'de' ? 'ltr' : 'rtl',
    );
  }
}
