import { Component, Input, Output, EventEmitter } from "@angular/core";
import Membership from '../model/Membership';

/**
 * Fuzzy set data graph
 * 
 * @author Manikanta G
 */
@Component({
  selector: "fuzzy-graph",
  templateUrl: "./fuzzy-graph.component.html",
  styleUrls: ["./fuzzy-graph.component.css"]
})
export class FuzzyGraphComponent {

  _memberships: [Membership];

  /**
   * Calculate required values from the given fuzzy set.
   */
  @Input() set memberships(newMemberships: [Membership]) {
    // Get the minimum & maximum values in our dataset as the plot
    // needs to adjusted with all inbetween values with in this range.
    const firstFnUpperStart = newMemberships[0].upperStart;
    const lastFnUpperEnd = newMemberships[newMemberships.length - 1].upperEnd;

    // Create a partial function for percentile calculation
    const valueToRangeMapper = ((): ((val: number) => number) => {
      return (val: number) => this.mapValueInRangeToPct(
        firstFnUpperStart,
        lastFnUpperEnd,
        val
      );
    })();

    newMemberships.map(membership => {
      // Calculate Fuzzy & core area start & end values.
      const fuzzyAreaStart = valueToRangeMapper(membership.upperStart);
      const fuzzyAreaEnd = valueToRangeMapper(membership.upperEnd);
      const coreAreaStart = valueToRangeMapper(membership.upperTop1);
      const coreAreaEnd = valueToRangeMapper(membership.upperTop2);

      // Calculate different dimensions required for the plot
      membership.preFuzzyStart = fuzzyAreaStart + '%';
      membership.preFuzzyWidth = (coreAreaStart - fuzzyAreaStart) + '%';
      membership.coreWidth = (coreAreaEnd - coreAreaStart) + '%';
      membership.postFuzzyWidth = (fuzzyAreaEnd - coreAreaEnd) + '%';
    });

    this._memberships = newMemberships;
  };

  get memberships() {
    return this._memberships;
  }

  /**
   * Emits the selected Membership object to parent component.
   */
  @Output() onSelect = new EventEmitter();

  constructor() { }

  onMembershipClick(memebership: Membership) {
    this.onSelect.emit(memebership);
  }

  /**
   * Maps given number in the `min` &amp; `max` range to a proportinal percentile value.
   * @param min Range minimum value
   * @param max Range maximum value
   * @param val Value for which the percentile needed
   */
  mapValueInRangeToPct(min: number, max: number, val: number): number {
    return ((val - min) / (max - min)) * 100;
  }
}
