// All your base are belong to https://codepen.io/edalgrin/pen/qBaKoBX

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-portal',
  standalone: true,
  templateUrl: './portal.html',
  styleUrls: ['./portal.scss']
})
export class Portal {
  @Input() size: number = 300;  
}