declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly GOOGLE_PLACE_API_KEY: string;
      readonly GOOGLE_PLACE_ID: string;
      readonly R2_ACCESS_KEY_ID: string;
      readonly R2_SECRET_ACCESS_KEY: string;
      readonly R2_BUCKET_NAME: string;
      readonly R2_ENDPOINT: string;
      readonly DATABASE_URI: string;
      readonly PAYLOAD_SECRET: string;
    }
  }
}

export {};
