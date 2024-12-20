import { useTranslations } from 'next-intl';
import { useMainLayout } from "../hooks/Layout/useMainLayout";
import { Landing } from "../screens/Landing";

const Home = () => {
  const t = useTranslations()
  return (
    <div
      className={`flex flex-col min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <Landing />
    </div>
  );
}

export default useMainLayout(Home)