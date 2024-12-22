import { Footer } from '@/weatherForecast/components/Common/Footer';
import { NavBar } from '@/weatherForecast/components/Common/NavBar';
import { NextPage } from 'next';

export const useMainLayout = (Children: NextPage) => {
    return function wrapped() {

        return (
            <main className='container mx-auto'>
                <div className='bg-slate-100 dark:bg-slate-800'>
                    <NavBar />
                    <Children />
                    <Footer />
                </div>
            </main>
        );
    }
};

