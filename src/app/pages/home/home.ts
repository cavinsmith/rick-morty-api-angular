import { Component } from '@angular/core';
import { Title } from '../../components/title/title';
import { Text } from '../../components/text/text';

@Component({
  selector: 'app-page-search',
  imports: [Title, Text],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
