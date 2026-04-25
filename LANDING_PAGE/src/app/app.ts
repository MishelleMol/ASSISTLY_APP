import { Component } from '@angular/core';
import { NavbarComponent } from '../../Components/navbar/navbar';
import { FooterComponent } from '../../Components/footer/footer';
import { CtaComponent } from '../../Components/cta/cta';
import { HeroComponent } from '../../Components/hero/hero';
import { ProblemComponent } from '../../Components/problem/problem';
import { SolutionComponent } from '../../Components/solution/solution';
import { HowItWorksComponent } from '../../Components/how-it-works/how-it-works';
import { FeaturesComponent } from '../../Components/features/features';
import { BusinessModelComponent } from '../../Components/business-model/business-model';
import { ValuePropComponent } from '../../Components/value-prop/value-prop';
import { VisionComponent } from '../../Components/vision/vision';
import {FoundersComponent} from '../../Components/founders/founders';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CtaComponent,
    HeroComponent,
    ProblemComponent,
    SolutionComponent,
    HowItWorksComponent,
    FeaturesComponent,
    BusinessModelComponent,
    ValuePropComponent,
    VisionComponent,
    FoundersComponent, 
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}