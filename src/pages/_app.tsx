import "@/jobApp/styles/globals.css";
import type { AppProps } from "next/app";
import { UserPreferencesStoreProvider } from "../stores/UserStore/UserPreferences.provider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "react-hot-toast";
import { NextIntlProvider } from "../components/Common/Next18IntlProvider";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>
    <UserPreferencesStoreProvider>
      <NextIntlProvider>
        <Component {...pageProps} />
      </NextIntlProvider>
    </UserPreferencesStoreProvider>
    <Toaster/>
  </QueryClientProvider>
    ;
}
