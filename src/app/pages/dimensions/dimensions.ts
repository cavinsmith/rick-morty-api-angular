import { Component, inject } from '@angular/core';
import { Title } from "../../components/title/title";
import { Text } from '../../components/text/text';
import { DimensionsFacade } from '../../store/facades/dimensions.facade';
import { CommonModule } from '@angular/common';
import { Loader } from "../../components/loader/loader"
import { Link } from "../../components/link/link";
import * as routesConstants from '../../constants/routes';

@Component({
  selector: 'app-page-dimensions',
  imports: [Title, CommonModule, Loader, Text, Link],
  templateUrl: './dimensions.html',
  styleUrl: './dimensions.scss'
})
export class Dimensions {
  dimensionsFacade = inject(DimensionsFacade);
  currentPage: number = 1;
  dimensions$ = this.dimensionsFacade.getAllDimensionNames();
  dimensionsRoute = routesConstants.ROUTE_DIMENSION;
}
