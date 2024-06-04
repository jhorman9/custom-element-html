class CustomCarousel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
          }
          .carousel {
            overflow: hidden;
            width: 500px;
            margin: 0 auto;
            position: relative;
            border-radius: 14px;
          }
          .carousel-inner {
            display: flex;
            transition: transform 0.5s ease;
            will-change: transform;
          }
          .carousel-item {
            min-width: 500px;
            height: 500px;
          }
          .prev, .next {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 10px;
          }
          .prev {
            left: 0;
          }
          .next {
            right: 0;
          }
          .carousel img{
            width: 100%;
            object-fit: cover;
          }
          .nav-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border: 1px solid #ccc;
            cursor: pointer;
            transition: background-color 0.3s;
          }
        
          .nav-button:hover {
            background-color: #f0f0f0;
          }
        
          .nav-button svg {
            width: 24px;
            height: 24px;
          }
        </style>
        <div class="carousel">
          <div class="carousel-inner"></div>
          <div class="nav-button prev">
            <svg viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
            </div>

            <div class="nav-button next">
            <svg viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
            </div>
        </div>
      `;
      this.carouselInner = this.shadowRoot.querySelector('.carousel-inner');
      this.currentSlide = 0;
      this.prevButton = this.shadowRoot.querySelector('.prev');
      this.nextButton = this.shadowRoot.querySelector('.next');
      this.prevButton.addEventListener('click', this.prev.bind(this));
      this.nextButton.addEventListener('click', this.next.bind(this));
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const items = Array.from(this.querySelectorAll('.carousel-item'));
      this.carouselInner.innerHTML = '';
      items.forEach(item => {
        this.carouselInner.appendChild(item.cloneNode(true));
      });
      this.update();
    }

    update() {
      const offset = -this.currentSlide * 500;
      this.carouselInner.style.transform = `translateX(${offset}px)`;
    }

    next() {
      const items = this.querySelectorAll('.carousel-item').length;
      this.currentSlide = (this.currentSlide + 1) % items;
      this.update();
    }

    prev() {
      const items = this.querySelectorAll('.carousel-item').length;
      this.currentSlide = (this.currentSlide - 1 + items) % items;
      this.update();
    }
  }

  customElements.define('custom-carousel', CustomCarousel);