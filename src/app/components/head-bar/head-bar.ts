import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-head-bar',
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  carCount = input(0);
  brandCount = input(0);
}
