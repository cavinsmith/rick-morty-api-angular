import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import * as routeConstants from '../../constants/routes';
import { Portal } from "../portal/portal";

interface RouteLink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, Portal],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Toolbar {
  links: RouteLink[] = [
    { path: routeConstants.ROUTE_SEARCH, label: 'Search' },
    { path: routeConstants.ROUTE_DIMENSIONS, label: 'Dimensions' },
    { path: routeConstants.ROUTE_LOCATIONS, label: 'Locations' },
    { path: routeConstants.ROUTE_EPISODES, label: 'Episodes' },
    { path: routeConstants.ROUTE_CHARACTERS, label: 'Characters' }
  ];

}
