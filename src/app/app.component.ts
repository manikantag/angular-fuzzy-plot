import { Component } from '@angular/core';
import { randomInt } from './utils'
import testData from "./test-memberships-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data = testData;

  onMembershipClick(membership) {
    alert(`Selected membership: ${membership.name}`);
  }

  generateTestData() {
    const newData = [];

    const numOfFns = randomInt(3, 11);

    for (let i = 0; i < numOfFns; i++) {
      const upperStart = i > 0 ? newData[i - 1].upperTop2 : 0;
      const upperTop1 = i > 0 ? newData[i - 1].upperEnd : 0;
      const upperTop2 = upperTop1 + randomInt(10000, 100000);
      const upperEnd = upperTop2 + (i < numOfFns - 1 ? randomInt(10000, 30000) : 0);

      newData.push({
        name: `F${i}`,
        upperStart,
        upperTop1,
        upperTop2,
        upperEnd
      });
    }

    this.data = newData;
  }
}
