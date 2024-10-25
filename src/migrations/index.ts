import * as migration_20241017_210828_initial from './20241017_210828_initial';
import * as migration_20241025_001431_cms_setup_before_deployment from './20241025_001431_cms_setup_before_deployment';

export const migrations = [
  {
    up: migration_20241017_210828_initial.up,
    down: migration_20241017_210828_initial.down,
    name: '20241017_210828_initial',
  },
  {
    up: migration_20241025_001431_cms_setup_before_deployment.up,
    down: migration_20241025_001431_cms_setup_before_deployment.down,
    name: '20241025_001431_cms_setup_before_deployment'
  },
];
