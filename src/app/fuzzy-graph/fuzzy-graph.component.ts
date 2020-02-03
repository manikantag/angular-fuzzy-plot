import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "fuzzy-graph",
  templateUrl: "./fuzzy-graph.component.html",
  styleUrls: ["./fuzzy-graph.component.css"]
})
export class FuzzyGraphComponent {

  _memberships;

  @Input() set memberships(newMemberships: [any]) {
    const firstFnUpperStart = newMemberships[0].upperStart;
    const lastFnUpperEnd = newMemberships[newMemberships.length - 1].upperEnd;

    const valueToRangeMapper = ((): ((val: number) => number) => {
      return (val: number) => this.mapValueInRangeToPct(
        firstFnUpperStart,
        lastFnUpperEnd,
        val
      );
    })();

    newMemberships.map(membership => {
      const fuzzyAreaStart = valueToRangeMapper(membership.upperStart);
      const fuzzyAreaEnd = valueToRangeMapper(membership.upperEnd);
      const coreAreaStart = valueToRangeMapper(membership.upperTop1);
      const coreAreaEnd = valueToRangeMapper(membership.upperTop2);

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

  @Output() onSelect = new EventEmitter();

  constructor() { }

  onMembershipClick(memebership) {
    this.onSelect.emit(memebership);
  }

  mapValueInRangeToPct(min: number, max: number, val: number): number {
    return ((val - min) / (max - min)) * 100;
  }
}
