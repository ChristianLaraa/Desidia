let textWrapper = document.querySelector(".title");
textWrapper.innerHTML = textWrapper.textContent.replace(
/\S/g,
"<span class='letter'>$&</span>"
);
// Corrección del primer error, reemplazando AnimationEffect por anime
anime.timeline().add({
    targets: ".title .letter",
    translateY: [100, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 2000,
    delay: (el, i) => 4800 + 40 * i,
});

TweenMax.to(".box", 2.4, {
    y: "-100%",
    ease: Expo.easeInOut,
    delay: 1
});

TweenMax.from(".specific-img", 4, { // Reemplaza "img" con el selector específico
    scale: "2",
    ease: Expo.easeInOut,
    delay: 0
});

TweenMax.to(".wrapper-img", 2.4, {
    width: "400px", // Agrega unidades de medida
    height: "500px", // Agrega unidades de medida
    ease: Expo.easeInOut,
    delay: 3.6
});

TweenMax.from(".specific-img", 0.4, { // Reemplaza "img" con el selector específico
    opacity: 0,
    ease: Expo.easeInOut,
    delay: 3.4
});

TweenMax.to(".left", 2, {
    x: "-400px", // Agrega unidades de medida
    rotation: 10,
    ease: Expo.easeInOut,
    delay: 3.8
});

TweenMax.to(".right", 2, {
    x: "100px", // Agrega unidades de medida
    rotation: 10,
    ease: Expo.easeInOut,
    delay: 3.8
});

TweenMax.staggerFrom(
    [".menu > div", ".hero-container > div"], // Array de selectores
    2,
    {
        opacity: 0,
        y: 30,
        ease: Expo.easeInOut,
        delay: 4.2
    },
    0.1
);

/* SEGUNDO EFECTO JS */
const section = document.querySelector('.section'),
    sectionListItem = section.querySelectorAll('.section_list_item'),
    sectionListItemText = section.querySelectorAll('.section_list_item > h1'),
    sectionListFigure = section.querySelectorAll('.section_list_item_figure'),
    sectionMedia = section.querySelectorAll('.section_media');

const clipPath = {
    top: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    full: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    bottom: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
};
gsap.set(sectionMedia, {clipPath: clipPath.top});

const initAnimation = () => {
    gsap.set(sectionListItemText, { y: '100%'});

    const tlText = gsap.timeline({  defaults: {duration: 1.48, ease: 'expo.inOut'} });
    tlText.to(sectionListItemText, {
        y: '0%',
        stagger: 0.032, 
    }) 
    .from (
        sectionListFigure, 
        {
            width: 0,
            stagger: 0.032,
        },
        0.8
    );
    addEventListeners();
};
const addEventListeners = () => {
        sectionListItem.forEach((item, index)=> {
            const images = sectionMedia[index]?.children;

            item.addEventListener('mouseenter', () => {
                for (let i=0; i<images.length; i++) {
                    gsap.timeline({defaults: {duration: 0.64, ease: 'expo.inOut', overwrite: true},
                }).to(sectionMedia[index], {
                    clipPath: clipPath.full,
                });
                sectionListItem.forEach((otherItem)=> {
                    otherItem === item 
                    ? (otherItem.style.color = 'orange')
                    : (otherItem.style.opacity = 0.5);
                });
                }
            });
                item.addEventListener('mouseleave', ()=> {
                    for(let i = 0; i < images.length; i++){
                        gsap.timeline({defaults: {duration: 0.64, ease: 'expo.inOut', overwrite: true},
                    }).to(sectionMedia[index], {
                        clipPath: clipPath.bottom, 
                        onComplete: () => {
                            gsap.set(sectionMedia[index], {
                                clipPath: clipPath.top,
                            });
                        },
                    });
                    } 
                    sectionListItem.forEach((otherItem) => {
                        otherItem === item 
                        ? (otherItem.style.color = '#181818')
                        : (otherItem.style.opacity = 1);
                    });

                });
        });
};
initAnimation();


