import { Component } from '@angular/core';
import { randomInt } from './utils'
import testData from "./test-memberships-data";
import Membership from './model/Membership';

/**
 * Root component
 * 
 * @author Manikanta G
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Assign with initial test data.
  data: Membership[] = testData;

  // Callback for Memnership selection.
  onMembershipClick(membership: Membership) {
    alert(`Selected membership: ${membership.name}`);
  }

  /**
   * Generates random test data which adheres the fuzzy set contract given.
   */
  generateTestData(): void {
    const newData = [];

    const numOfFns = randomInt(3, 11);

    for (let i = 0; i < numOfFns; i++) {
      // First function should not have pre-fuzzy area
      // Pre-fuzzy area should intersect with previous post-fuzzy area (except first function)
      const upperStart = i > 0 ? newData[i - 1].upperTop2 : 0;
      const upperTop1 = i > 0 ? newData[i - 1].upperEnd : 0;
      const upperTop2 = upperTop1 + randomInt(10000, 100000);
      // Last function should not have post fuzzy area
      const upperEnd = upperTop2 + (i < numOfFns - 1 ? randomInt(10000, 30000) : 0);

      // Ignoring 'lower' values for this exercise. 
      newData.push({
        name: `F${i}`,
        upperStart,
        upperTop1,
        upperTop2,
        upperEnd
      });
    }

    // Set new random data as component data
    this.data = newData;
  }
}
