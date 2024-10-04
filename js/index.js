class Controle {
    constructor() {
        // Inicializa o componente, chamando métodos e selecionando elementos do DOM.
        this.headerBar(); // Configura a visibilidade da barra de cabeçalho baseado no scroll.
        this.searchBoxAnimation(); // Adiciona animação à caixa de pesquisa.
        this.main_background_screen(); // Configura o fundo de tela principal.
        
        this.header = document.querySelector('header');

        /* Configuração do Carrossel */
        this.slideContainer = document.querySelector('.slide');
        this.slideWidth = document.querySelector('.imgSerie').offsetWidth + 800; // Ajusta a largura do slide (incluindo margem).
        this.rightArrow = document.querySelector('#rightArrow');
        this.leftArrow = document.querySelector('#leftArrow');
        this.slides = Array.from(this.slideContainer.children); // Converte os slides em um array.

        this.initSlideControl(); // Inicializa os controles do slide.
    }

    setupInfiniteScroll() {
        // Clona os primeiros e últimos slides para a rotação infinita.
        const img1 = this.slides[0].cloneNode(true);
        const img2 = this.slides[this.slides.length - 1].cloneNode(true);
        const img4 = this.slides[2].cloneNode(true);
        const img5 = this.slides[3].cloneNode(true);
        const img6 = this.slides[4].cloneNode(true);

        // Adiciona os clones ao contêiner de slides quando o botão direito é clicado.
        this.rightArrow.addEventListener('click', () => {
            this.slideContainer.appendChild(img1);
            this.slideContainer.appendChild(img2);
            this.slideContainer.appendChild(img4);
            this.slideContainer.appendChild(img5);
            this.slideContainer.appendChild(img6);
        });
    }

    getCurrentTransform() {
        // Obtém a transformação atual do slide usando a propriedade de transformação do estilo computado.
        const matrix = getComputedStyle(this.slideContainer).transform;//obtém o valor da propriedade CSS transform
        if (matrix === 'none') return 0;//verifica se o valor da propriedade transform é 'none'
        const values = matrix.match(/matrix\(([^)]+)\)/)[1].split(', ');//procura uma string no formato matrix(...)
        return parseFloat(values[4]);//corresponde ao valor da translação horizontal no matrix
    }

    moveSlide(direction) {
        // Calcula a transformação atual e a nova transformação baseada na direção.
        const currentTransform = this.getCurrentTransform();
        const newTransform = currentTransform + direction * this.slideWidth;

        // Move os slides aplicando a transformação calculada.
        this.slideContainer.style.transform = `translateX(${newTransform}px)`;

    }

    initSlideControl() {
        // Inicializa o controle de slides e eventos de clique nas setas.
        let slider = document.querySelector('.slider');

        this.rightArrow.addEventListener('click', () => {
            setTimeout(() => {
                this.moveSlide(-1);

                //Estilização
                this.leftArrow.classList.add('leftArrowActive');//Adiciona classe na seta

                //Adiciona estilos no scroll
                slider.style.margin='0';
                slider.style.width='100vw';

            }, 20);

            this.setupInfiniteScroll(); // Configura o scroll infinito após a movimentação.
        });

        this.leftArrow.addEventListener('click', () => {
            setTimeout(() => {
                this.moveSlide(1);
            }, 20);
        });
    }

    // Função que torna a barra de cabeçalho visível ou invisível com base na rolagem da página.
    headerBar() {
        let tag = document.querySelector('.mainNavigation');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                tag.setAttribute('id', 'visivel');
            } else {
                tag.setAttribute('id', 'naovisivel');
            }
        });
    }

    // Animação para a caixa de pesquisa.
    searchBoxAnimation() {
        window.addEventListener('click', (e) => {
            let buttonBox = document.querySelector("#searchtBoxInt");
            let inputSearch = document.querySelector('#searchtBoxInt__pesq');
            let search = document.querySelector('#search');

            // Verifica se o clique foi fora do elemento de pesquisa.
            if (!search.contains(e.target)) {
                buttonBox.classList.remove('search_box_styling');
                inputSearch.style.width = '0px';
            } else {
                buttonBox.classList.add('search_box_styling');
                inputSearch.style.width = '250px';
            }
        });
    }

    // Configura o fundo da tela principal e o comportamento do vídeo.
    main_background_screen() {
        let video = document.querySelector('#video');
        let ImgButton = document.querySelector('#muteImg');

        video.style.display = 'none';

        // Exibe o vídeo após um atraso e torna o fundo do cabeçalho transparente.
        setTimeout(() => {
            video.style.display = 'block';
            this.header.style.background = 'transparent';
        }, 3000);

        document.querySelector("#tagVideo").onended = () => {
            // Oculta o vídeo quando termina e restaura a imagem de fundo do cabeçalho.
            video.style.display = 'none';
            this.header.style.backgroundImage = 'url(https://occ-0-933-420.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABWMZa8iWRT8VWOH6tIdbS_gfxSRLwxaMw7QiiBwy-V-q52w2yA5aNeyVqGNrbS2MMXYV8o39ofeoVPFmmNYs7oqwj7yISMASgvQz.webp?r=618)';
            this.header.style.backgroundSize = 'cover'; // Ajusta o tamanho da imagem.
            ImgButton.src = "https://img.icons8.com/ios-glyphs/20/null/recurring-appointment.png"; // Atualiza o ícone do botão.
        };
    }
}

// Instancia a classe Controle.
new Controle();
