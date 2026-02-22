import bannerImg1 from '../assets/images/bannerImg1.jpeg'
import bannerImg2 from '../assets/images/bannerImg2.jpeg'
import bannerImg3 from '../assets/images/bannerImg3.jpeg'
import bannerImg4 from '../assets/images/bannerImg4.jpeg'
import bannerImg5 from '../assets/images/bannerImg5.jpg'

export const carouselSlides = [
    {
        id: 1,
        image: bannerImg1,
        title: "ΤΟ ΦΥΣΙΚΟ ΜΑΣ ΚΑΤΑΣΤΗΜΑ ΑΝΟΙΞΕ",
        subtitle: "ΚΟΜΝΗΝΩΝ 17, 7ΟΣ, ΚΕΝΤΡΟ ΘΕΣΣΑΛΟΝΙΚΗΣ",
        buttonText: "ΩΡΑΡΙΟ",
        position: "center 40%",
        redirection: "/contact"
    },
    {
        id: 2,
        image: bannerImg2,
        title: "Fall in love with the new arrivals",
        buttonText: "ΔΕΣ ΤΑ ΝΕΑ ΣΧΕΔΙΑ ΕΔΩ",
        position: "center 40%",
        redirection: "/new-arrivals"
    },
    {
        id: 3,
        image: bannerImg3,
        title: "Smell fwdelus",
        buttonText: "Δες ΤΑ ΝΕΑ ΑΡΩΜΑΤΑ ΕΔΩ",
        position: "center 90%",
        redirection: "/products/perfumes"
    },
    {
        id: 4,
        image: bannerImg4,
        title: "Vintage watches collection",
        buttonText: "ΒΡΕΣ ΤΑ ΕΔΩ",
        position: "center 40%",
        redirection: "/products/watches"
    },
    {
        id: 5,
        image: bannerImg5,
        title: "Crystals collection",
        buttonText: "ΒΡΕΣ ΤΑ ΕΔΩ",
        position: "center 40%",
        redirection: "/products/crystals"
    }
]