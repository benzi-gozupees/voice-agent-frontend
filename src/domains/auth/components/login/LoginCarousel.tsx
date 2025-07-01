import { Image, Spacer } from '@nextui-org/react';

import carouselUser from '@assets/images/login-carousel-user.png';
import Carousel from '@components/molecular/Carousel';

function Content() {
    return (
        <div className="w-full max-w-[500px] h-[300px] p-8">
            <div className="flex items-center gap-4">
                <Image
                    className="min-w-20"
                    height={72}
                    radius="none"
                    src={carouselUser}
                    width={80}
                />
                <div className="space-y-1">
                    <p className="text-secondary text-2xl font-semibold">Sandeep Bansal</p>
                    <p className="text-default-500 font-light text-sm">Founder and CEO, GoZupees</p>
                </div>
            </div>
            <Spacer y={8} />
            <p className="text-default-700 font-medium text-lg line-clamp-4">
                &ldquo;Hire ready-made AI workers to do the jobs your team can't scale - phone calls, appointments, lead qualification, follow-ups, and more.&rdquo;
            </p>
        </div>
    );
}
function Content2() {
    return (
        <div className="w-full max-w-[500px] h-[300px] p-8">
            <div className="flex items-center gap-4">
                <Image
                    className="min-w-20"
                    height={72}
                    radius="none"
                    src={carouselUser}
                    width={80}
                />
                <div className="space-y-1">
                    <p className="text-secondary text-2xl font-semibold">Sandeep Bansal</p>
                    <p className="text-default-500 font-light text-sm">Founder and CEO, GoZupees</p>
                </div>
            </div>
            <Spacer y={8} />
            <p className="text-default-700 font-medium text-lg line-clamp-4">
                &ldquo;Your friendly healthcare assistants who makes scheduling appointments as easy as a smile. Always ready to help with your dental care needs.&rdquo;
            </p>
        </div>
    );
}
function Content3() {
    return (
        <div className="w-full max-w-[500px] h-[300px] p-8">
            <div className="flex items-center gap-4">
                <Image
                    className="min-w-20"
                    height={72}
                    radius="none"
                    src={carouselUser}
                    width={80}
                />
                <div className="space-y-1">
                    <p className="text-secondary text-2xl font-semibold">Sandeep Bansal</p>
                    <p className="text-default-500 font-light text-sm">Founder and CEO, GoZupees</p>
                </div>
            </div>
            <Spacer y={8} />
            <p className="text-default-700 font-medium text-lg line-clamp-4">
                &ldquo;Your power solutions expert with the wisdom of ancient philosophy and modern sales expertise. Let him energize your business decisions.&rdquo;
            </p>
        </div>
    );
}

function LoginCarousel() {
    return (
        <div className="flex-grow h-full lg:flex justify-center items-center bg-[#E6F4FF] relative hidden">
            <div className="absolute bottom-0 left-0 bg-primary w-[50%] h-[50%]" />
            <div className="flex justify-center items-center bg-light w-full max-w-[700px] py-16 lg:py-24 rounded-br-[284px] z-10 m-6">
                <div className="w-full max-w-[500px] h-[300px] scale-100 md:scale-75 lg:scale-100">
                    <Carousel>
                        <Content />
                        <Content2 />
                        <Content3/>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default LoginCarousel;
