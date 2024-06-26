// import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements AfterViewInit {

//   @ViewChildren('carouselItem') carouselItems!: QueryList<ElementRef>;

//   currentItem: ElementRef | undefined;

//   ngAfterViewInit() {
//     // Initialize current item to the main carousel item
//     this.currentItem = this.carouselItems.find(item => item.nativeElement.classList.contains('my-carousel__item--main'));
//   }

//   moveRight() {
//     if (this.currentItem) {
//       const currentIndex = this.carouselItems.toArray().indexOf(this.currentItem);
//       const nextIndex = (currentIndex + 1) % this.carouselItems.length;

//       this.carouselItems.forEach(item => item.nativeElement.classList.remove('carousel__item--main'));
//       this.carouselItems.forEach(item => item.nativeElement.classList.remove('carousel__item--left'));
//       this.carouselItems.forEach(item => item.nativeElement.classList.remove('carousel__item--right'));

//       this.currentItem.nativeElement.classList.add('carousel__item--left');
//       this.currentItem = this.carouselItems.toArray()[nextIndex];
//       this.currentItem.nativeElement.classList.add('carousel__item--main');

//       const rightIndex = (nextIndex + 1) % this.carouselItems.length;
//       this.carouselItems.toArray()[rightIndex].nativeElement.classList.add('carousel__item--right');
//     }
//   }

//   moveLeft() {
//     if (this.currentItem) {
//       const currentIndex = this.carouselItems.toArray().indexOf(this.currentItem);
//       const prevIndex = (currentIndex - 1 + this.carouselItems.length) % this.carouselItems.length;

//       this.carouselItems.forEach(item => item.nativeElement.classList.remove('carousel__item--main'));
//       this.carouselItems.forEach(item => item.nativeElement.classList.remove('carousel__item--left'));
//       this.carouselItems.forEach(item => item.nativeElement.classList.remove('carousel__item--right'));

//       this.currentItem.nativeElement.classList.add('carousel__item--right');
//       this.currentItem = this.carouselItems.toArray()[prevIndex];
//       this.currentItem.nativeElement.classList.add('carousel__item--main');

//       const leftIndex = (prevIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
//       this.carouselItems.toArray()[leftIndex].nativeElement.classList.add('carousel__item--left');
//     }
//   }
// }












import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  swiper: Swiper | undefined;

  ngAfterViewInit() {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true
      },
      keyboard: {
        enabled: true
      },
      mousewheel: {
        thresholdDelta: 70
      },
      spaceBetween: 60,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
  }

 
  nextSlide() {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }

  prevSlide() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }
}



// import { Component, ElementRef, AfterViewInit } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements AfterViewInit {
//   galleryContainer!: HTMLElement;
//   galleryControlsContainer!: HTMLElement;
//   galleryControls = ['previous', 'next'];
//   galleryItems!: NodeListOf<Element>;

//   constructor(private elementRef: ElementRef) {}

//   ngAfterViewInit() {
//     this.galleryContainer = this.elementRef.nativeElement.querySelector('.gallery-container');
//     this.galleryControlsContainer = this.elementRef.nativeElement.querySelector('.gallery-controls');
//     this.galleryItems = this.galleryContainer.querySelectorAll('.gallery-item'); // Query inside galleryContainer

//     const exampleCarousel = new Carousel(this.galleryContainer, this.galleryItems, this.galleryControls, this.galleryControlsContainer);
//     exampleCarousel.setControls();
//     exampleCarousel.useControls();
//   }
// }

// export class Carousel {
//   carouselContainer: HTMLElement;
//   carouselControls: string[];
//   carouselArray: HTMLElement[];
//   carouselControlsContainer: HTMLElement;
//   currentIndex: number = 0;

//   constructor(container: HTMLElement, items: NodeListOf<Element>, controls: string[], controlsContainer: HTMLElement) {
//     this.carouselContainer = container;
//     this.carouselControls = controls;
//     this.carouselArray = Array.from(items) as HTMLElement[];
//     this.carouselControlsContainer = controlsContainer;

//     this.updateGallery();
//     this.setControls();
//   }

//   updateGallery() {
//     this.carouselArray.forEach((el, i) => {
//       if (i >= this.currentIndex && i < this.currentIndex + 5) {
//         el.classList.add(`gallery-item-${i + 1}`);
//       } else {
//         el.classList.remove(`gallery-item-${i + 1}`);
//       }
//     });
//   }

//   setCurrentState(direction: string) {
//     if (direction === 'previous') {
//       this.currentIndex = (this.currentIndex - 1 + this.carouselArray.length) % this.carouselArray.length;
//     } else if (direction === 'next') {
//       this.currentIndex = (this.currentIndex + 1) % this.carouselArray.length;
//     }
//     this.updateGallery();
//   }

//   setControls() {
//     // Add buttons for previous and next controls
//     this.carouselControls.forEach(control => {
//       const button = document.createElement('button');
//       button.className = `gallery-control-${control}`;
//       button.innerText = control.charAt(0).toUpperCase() + control.slice(1);
//       this.carouselControlsContainer.appendChild(button);

//       // Add click event listener for each control button
//       button.addEventListener('click', () => {
//         this.setCurrentState(control);
//       });
//     });

//     // Add click event listeners to images
//     this.carouselArray.forEach((img, index) => {
//       img.addEventListener('click', () => {
//         this.currentIndex = index;
//         this.updateGallery();
//       });
//     });
//   }

//   useControls() {
//     this.carouselControls.forEach(control => {
//       const button = this.carouselContainer.querySelector(`.gallery-control-${control}`);
//       if (button) {
//         button.addEventListener('click', () => {
//           this.setCurrentState(control);
//         });
//       }
//     });
//   }
// }
