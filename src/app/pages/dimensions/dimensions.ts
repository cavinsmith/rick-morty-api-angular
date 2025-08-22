import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Link } from '../../components/link/link';
import { Loader } from '../../components/loader/loader';
import { Text } from '../../components/text/text';
import { Title } from '../../components/title/title';
import * as routesConstants from '../../constants/routes';
import { DimensionsFacade } from '../../store/facades/dimensions.facade';

@Component({
  selector: 'app-page-dimensions',
  imports: [Title, CommonModule, Loader, Text, Link],
  templateUrl: './dimensions.html',
  styleUrl: './dimensions.scss',
})
export class Dimensions {
  dimensionsFacade = inject(DimensionsFacade);
  currentPage = 1;
  dimensions$ = this.dimensionsFacade.getAllDimensionNames();
  dimensionsRoute = routesConstants.ROUTE_DIMENSION;
}
