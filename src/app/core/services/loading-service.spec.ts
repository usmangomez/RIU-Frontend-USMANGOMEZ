import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading-service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoading should be false initially', () => {
    expect(service.isLoading()).toBeFalse();
  });

  it('isLoading should be true after increment', () => {
    service.increment();
    expect(service.isLoading()).toBeTrue();
  });

  it('isLoading should be false after increment then decrement', () => {
    service.increment();
    service.decrement();
    expect(service.isLoading()).toBeFalse();
  });

  it('count should not go below zero', () => {
    service.decrement();
    expect(service.isLoading()).toBeFalse();
  });
});
