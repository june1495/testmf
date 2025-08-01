const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfCrud',

  exposes: {
    './UserModule': './projects/mf-crud/src/app/presentation/pages/user-crud/user.module.ts',
  },

  shared: {
      '@angular/core': { singleton: true, strictVersion: true },
  '@angular/common': { singleton: true, strictVersion: true },
  '@angular/router': { singleton: true, strictVersion: true },
  '@angular/material': { singleton: true, strictVersion: true },
  '@angular/cdk': { singleton: true, strictVersion: true },
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  sharedMappings:["@commons-lib"]

});
