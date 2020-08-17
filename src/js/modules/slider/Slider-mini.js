import Slider from './Slider';

export default class MiniSlider extends Slider{
    constructor(container, next, prev, activeClass, animate){
        super(container, next, prev, activeClass, animate);
    }
    
    decorizeSliders() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            
            if(this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        })

        if(!this.slides[0].closest('button')){
            this.slides[0].classList.add(this.activeClass);
        }

        if(this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    nextSlide() {
        if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName == 'BUTTON'){
            this.container.appendChild(this.slides[0]);
            this.container.appendChild(this.slides[1]);
            this.container.appendChild(this.slides[2]); 
            this.decorizeSliders();
        } else if(this.slides[1].tagName == 'BUTTON'){
            this.container.appendChild(this.slides[1]);
            this.decorizeSliders();
        } else{ 
            this.container.appendChild(this.slides[0]);
            this.decorizeSliders();
        } 
    }

    bindTriggers(){
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            for(let i = this.slides.length - 1; i > 0; i--){
                if(this.slides[i].tagName !== 'BUTTON'){
                    let active = this.slides[i];
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSliders();
                    break;
                }
            }
        });
    }

    init(){
        try{
            this.container.style.cssText = `
                display: flex;
                flex-wrap: wrap;
                overflow: hidden;
                align-items: flex-start;
            `;

            this.bindTriggers();
            this.decorizeSliders();
            if(this.autoplay){
                setInterval(() => this.nextSlide(), 5000)
            }
        } catch(e){};
    }
}