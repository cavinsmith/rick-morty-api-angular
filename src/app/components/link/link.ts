import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './link.html',
  styleUrls: ['./link.scss']
})
export class Link 
{
  @Input() link: string[] = ['/'];
  @Input() text: string = 'link';

}