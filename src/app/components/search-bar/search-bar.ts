import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
import { Favorites } from '../../services/favorites';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'power-desc';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faHeart = faHeart;
  readonly faXmark = faXmark;
  readonly fav = inject(Favorites);

  autos = input<Auto[]>([]);
  onSelectCar = output<Auto>();

  readonly searchTerm = signal('');
  readonly brand = signal('All');
  readonly sort = signal<SortKey>('default');
  readonly onlyFavs = signal(false);

  readonly brands = computed(() => [...new Set(this.autos().map(a => a.brand))]);

  readonly hasFilters = computed(
    () => !!this.searchTerm().trim() || this.brand() !== 'All' || this.onlyFavs() || this.sort() !== 'default',
  );

  readonly selectedAutos = computed(() => {
    const term = this.searchTerm().trim().toLocaleLowerCase();
    const brand = this.brand();
    const favs = this.onlyFavs();
    const ids = this.fav.ids();

    const list = this.autos().filter(
      a =>
        (brand === 'All' || a.brand === brand) &&
        (!favs || ids.includes(a.id)) &&
        `${a.brand} ${a.model}`.toLocaleLowerCase().includes(term),
    );

    switch (this.sort()) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'power-desc': return [...list].sort((a, b) => b.power - a.power);
      default: return list;
    }
  });

  setSort(value: string) {
    this.sort.set(value as SortKey);
  }

  reset() {
    this.searchTerm.set('');
    this.brand.set('All');
    this.sort.set('default');
    this.onlyFavs.set(false);
  }
}
