import Slider from './Slider';

export default class MainSlider extends Slider {
    constructor(btns) {
        super(btns);
    } 
    
    showSlides(n) {
        if(n > this.slides.length) {
            this.slideIndex = 1;
        }
        if(n < 1) {
            this.slideIndex = this.slides.length;
        }

        try{
            this.hanson.style.opacity = '0';

            if(n === 3){ 
                this.hanson.classList.add('animated');
                setTimeout(() => {
                    this.hanson.style.opacity = '1'; 
                    this.hanson.classList.add('slideInUp');
                }, 3000) 
            } else {
                this.hanson.classList.remove('slideInUp');
                this.hanson.style.opacity = '0'; 
            }
        } catch(e){}; 
    
        this.slides.forEach(slide => {
            slide.style.display = 'none';
        })

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlide(n) {
        this.showSlides(this.slideIndex += n);
    } 

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.plusSlide(1); 
            })

            btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
                e.preventDefault();
                this.slideIndex = 1;
                this.showSlides(this.slideIndex);
            })
        })

        document.querySelectorAll('.nextmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlide(1);
            })
        })

        document.querySelectorAll('.prevmodule').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.plusSlide(-1);
            })
        }) 

    }

    render(){
        if(this.container){
            try{
                this.hanson = document.querySelector('.hanson');
                this.hanson.style.opacity = '0';
            } catch(e){} 

            this.showSlides(this.slideIndex);
            this.bindTriggers();
        };
    }
}