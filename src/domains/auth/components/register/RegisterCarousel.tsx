import carousel from '@assets/carousels/login1.png';
import Carousel from '@components/molecular/Carousel';

type Props = {};

function RegisterCarousel(props: Props) {
    return (
        <div className="flex-grow self-stretch h-full md:min-h-screen sm:flex justify-center items-center bg-[#E6F4FF] p-4 relative hidden">
            <div className="absolute bottom-0 left-0 bg-primary w-[50%] h-[350px]" />
            <div className="flex justify-center items-center bg-light w-full max-w-[730px] py-16 lg:py-24 rounded-br-[284px] z-10 m-6">
                <div className="w-full max-w-[500px] h-[300px]">
                    <Carousel>
                        <img alt="carousel" src={carousel} />
                        <img alt="carousel" src={carousel} />
                        <img alt="carousel" src={carousel} />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default RegisterCarousel;
