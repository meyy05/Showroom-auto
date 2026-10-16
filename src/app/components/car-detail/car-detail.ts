import { AfterViewInit, Component, ElementRef, HostListener, ViewChild, inject, input, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
import { Favorites } from '../../services/favorites';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-car-detail',
  styleUrl: './car-detail.css',
  templateUrl: './car-detail.html',
})
export class CarDetail implements AfterViewInit {
  readonly faXmark = faXmark;
  readonly faHeart = faHeart;
  readonly faChevronLeft = faChevronLeft;
  readonly faChevronRight = faChevronRight;
  readonly fav = inject(Favorites);

  car = input.required<Auto>();
  closed = output<void>();
  prev = output<void>();
  next = output<void>();

  @ViewChild('dlg') private dlg!: ElementRef<HTMLDialogElement>;

  ngAfterViewInit() {
    // native modal: focus trap, Escape to close and backdrop come for free
    this.dlg.nativeElement.showModal();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === this.dlg.nativeElement) this.dlg.nativeElement.close();
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') this.prev.emit();
    if (event.key === 'ArrowRight') this.next.emit();
  }
}
