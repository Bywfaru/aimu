declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NEXT_PUBLIC_GOOGLE_PLACE_API_KEY: string;
    }
  }
}

export {};
