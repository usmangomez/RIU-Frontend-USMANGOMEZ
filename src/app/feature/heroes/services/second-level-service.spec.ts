import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SecondLevelService } from './second-level-service';

describe('SecondLevelService', () => {
  let service: SecondLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(SecondLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('actionsPortal should be null initially', () => {
    expect(service.actionsPortal()).toBeNull();
  });

  it('setActions should update actionsPortal signal', () => {
    const mockPortal = {} as any;
    service.setActions(mockPortal);
    expect(service.actionsPortal()).toBe(mockPortal);
  });

  it('clearActions should reset actionsPortal to null', () => {
    service.setActions({} as any);
    service.clearActions();
    expect(service.actionsPortal()).toBeNull();
  });
});
