import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuzzyGraphComponent } from './fuzzy-graph.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import testMemberships from '../test-memberships-data'

describe('FuzzyGraphComponent', () => {
  let component: FuzzyGraphComponent;
  let fixture: ComponentFixture<FuzzyGraphComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FuzzyGraphComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuzzyGraphComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have total plots match the membership functions in the given data', () => {
    component.memberships = testMemberships;
    fixture.detectChanges();
    expect(de.queryAll(By.css('.membership-plot')).length).toBe(3);
  });


  it('should not have first membership left fuzzy area & last membership right fuzzy area', () => {
    component.memberships = testMemberships;
    fixture.detectChanges();

    let firstMembershipLeftFuzzyAreaEle = de.query(By.css('.membership-plot:first-child .fuzzy-area-left')).nativeElement;
    expect(firstMembershipLeftFuzzyAreaEle.style.width).toBe('0%');

    let lastMembershipRightFuzzyAreaEle = de.query(By.css('.membership-plot:last-child .fuzzy-area-right')).nativeElement;
    expect(lastMembershipRightFuzzyAreaEle.style.width).toBe('0%');
  });


  it('should not have core ranges overlapped', () => {
    component.memberships = testMemberships;
    fixture.detectChanges();

    const allCoreAreas = de.queryAll(By.css('.core-area'));

    for (let i = 1; i < allCoreAreas.length; i++) {
      const currentCoreAreaLeftPos = allCoreAreas[i].nativeElement.getBoundingClientRect().left;
      const prevCoreAreaLeftPos = allCoreAreas[i - 1].nativeElement.getBoundingClientRect().left;
      expect(currentCoreAreaLeftPos).toBeGreaterThan(prevCoreAreaLeftPos);
    }
  });


  it('should have adjacent membership functions fuzzy area overlap', () => {
    component.memberships = testMemberships;
    fixture.detectChanges();

    const allLeftFuzzyAreas = de.queryAll(By.css('.fuzzy-area-left'));
    const allRightFuzzyAreas = de.queryAll(By.css('.fuzzy-area-right'));

    // left fuzzy area should overlap with previous right fuzzy area (except first one)
    for (let i = 1; i < allLeftFuzzyAreas.length; i++) {
      const currLeftFuzzyAreaEle = allLeftFuzzyAreas[i].nativeElement;
      const prevRightFuzzyArea = allRightFuzzyAreas[i - 1].nativeElement;

      // Check if widths are matching or not
      expect(currLeftFuzzyAreaEle.style.width).toBe(prevRightFuzzyArea.style.width);

      // Check if 'left' position of the fuzzy areas are matching or not
      // (as we are setting '1eft' style, `style.left` will give proper value).
      expect(currLeftFuzzyAreaEle.style.left).toBe(prevRightFuzzyArea.style.left);
    }
  });

});
