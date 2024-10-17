import * as migration_20241017_210828_initial from './20241017_210828_initial';

export const migrations = [
  {
    up: migration_20241017_210828_initial.up,
    down: migration_20241017_210828_initial.down,
    name: '20241017_210828_initial'
  },
];
