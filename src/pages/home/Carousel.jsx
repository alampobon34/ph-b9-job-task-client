import { Carousel, Typography, Button } from "@material-tailwind/react";


const SLIDERS = [
    {
        title: 'Apple iPhone 15 Pro Max',
        paragraph: "iPhone 15 Pro Max Features. Made of aerospace-grade titanium and collabs with awe-inspiring colors.",
        imageUrl: "https://images.macrumors.com/article-new/2023/09/iphone-15-pro-gray.jpg"
    },
    {
        title: "Samsung Galaxy Fold 5",
        paragraph: "Meet Galaxy Z Fold5, the new foldable phone with a long-lasting battery that puts a big screen.",
        imageUrl: "https://images.samsung.com/bd/smartphones/galaxy-z-fold5/images/galaxy-z-fold5-highlights-multitasking-mo.jpg?imbypass=true"
    },
    {
        title: 'Play Station 5',
        paragraph: "Incredible PS5 games available now · On-demand games with PlayStation Plus · Spectacular visuals at lightning speed.",
        imageUrl: "https://assets-prd.ignimgs.com/2023/10/10/ps5thumb-1696954542971.jpg"
    },

]

export default function CarouselSlider() {
    return (
        <Carousel className="">
            {
                SLIDERS.map((slider, index) => (
                    <div key={index} className="relative h-full w-full">
                        <img
                            src={slider?.imageUrl}
                            alt="image 1"
                            className="w-full object-contain h-[320px] md:h-[480px]"
                        />
                        <div className="absolute inset-0 grid h-full w-full items-center bg-black/40">
                            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    {slider.title}
                                </Typography>
                                <Typography
                                    variant="lead"
                                    color="white"
                                    className="mb-4 md:mb-6 opacity-80"
                                >
                                    <span className="block md:hidden">{slider.paragraph.length > 40 ? slider.paragraph.slice(0, 40) + '...' : slider.paragraph}</span>
                                    <span className="hidden md:block">{slider.paragraph}</span>
                                </Typography>
                                <div className="flex gap-2">
                                    <Button size="md" color="white">
                                        Explore
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </Carousel>
    );
}