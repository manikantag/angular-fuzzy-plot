import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FuzzyGraphComponent } from './fuzzy-graph/fuzzy-graph.component';

/**
 * App module
 * 
 * @author Manikanta G
 */
@NgModule({
  declarations: [AppComponent, FuzzyGraphComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
