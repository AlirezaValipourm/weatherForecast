import { Swiper, SwiperSlide , useSwiper } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FC, ReactNode } from 'react';

interface ICarouselProps {
    slides: Array<ReactNode>
    dir: "rtl" | "ltr"
}

export const Carousel: FC<ICarouselProps> = ({ slides, dir }) => {

    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            className='w-full !py-6'
            navigation
            dir={dir}
            direction='horizontal'
            loop
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, waitForTransition: true, reverseDirection: dir == "ltr" ? true : false }}
            breakpoints={{
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {slides.map((slide, idx) => <SwiperSlide key={idx}>{slide}</SwiperSlide>)}
        </Swiper>
    );
}