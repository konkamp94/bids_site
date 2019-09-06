import { TestBed } from '@angular/core/testing';

import { CategoriesListService } from './categories-list.service';

describe('CategoriesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesListService = TestBed.get(CategoriesListService);
    expect(service).toBeTruthy();
  });
});
