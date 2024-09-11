import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'krm.client',
  appName: 'krm-client',
  webDir: 'dist',
  plugins: {          //
    CapacitorHttp: {  //
      enabled: true,  // Remover em PROD
    },                //
  },                  //
};

export default config;
