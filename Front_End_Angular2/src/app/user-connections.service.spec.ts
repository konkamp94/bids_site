import { TestBed } from '@angular/core/testing';

import { UserConnectionsService } from './user-connections.service';

describe('UserConnectionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserConnectionsService = TestBed.get(UserConnectionsService);
    expect(service).toBeTruthy();
  });
});
