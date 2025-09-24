document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // Плавный скролл по якорям
    // =========================================================================
    const smoothScroll = (targetId) => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Добавляем обработчики событий для всех ссылок навигации
    document.querySelectorAll('.main-nav a[href^="#"], .btn-tertiary, .btn-secondary, .map-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                smoothScroll(targetId);
            }
        });
    });

    // =========================================================================
    // Мобильная навигация
    // =========================================================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileNavToggle.querySelector('i').classList.toggle('fa-bars');
        mobileNavToggle.querySelector('i').classList.toggle('fa-times');
    });

    // =========================================================================
    // Модальное окно "Экстренный вызов"
    // =========================================================================
    const callModal = document.getElementById('call-modal');
    const callBtn = document.getElementById('call-modal-btn');
    const closeBtn = document.querySelector('.close-btn');

    callBtn.addEventListener('click', (e) => {
        e.preventDefault();
        callModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Запрещаем скролл
    });

    closeBtn.addEventListener('click', () => {
        callModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Разрешаем скролл
    });

    window.addEventListener('click', (e) => {
        if (e.target === callModal) {
            callModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // =========================================================================
    // Аккордеон для FAQ
    // =========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const parentItem = header.parentElement;
            const content = header.nextElementSibling;

            // Если элемент уже активен, закрываем его
            if (parentItem.classList.contains('active')) {
                parentItem.classList.remove('active');
                content.style.maxHeight = '0';
                content.style.padding = '0 30px';
            } else {
                // Закрываем все остальные активные элементы
                document.querySelectorAll('.accordion-item.active').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = '0';
                    item.querySelector('.accordion-content').style.padding = '0 30px';
                });
                // Открываем текущий элемент
                parentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 40 + 'px'; // 40px - padding
                content.style.padding = '20px 30px';
            }
        });
    });

    // =========================================================================
    // Слайдер для отзывов
    // =========================================================================
    const reviewsSlider = document.querySelector('.reviews-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (reviewsSlider) {
        reviewsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            reviewsSlider.classList.add('active');
            startX = e.pageX - reviewsSlider.offsetLeft;
            scrollLeft = reviewsSlider.scrollLeft;
        });
        reviewsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            reviewsSlider.classList.remove('active');
        });
        reviewsSlider.addEventListener('mouseup', () => {
            isDown = false;
            reviewsSlider.classList.remove('active');
        });
        reviewsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - reviewsSlider.offsetLeft;
            const walk = (x - startX) * 2; // Увеличиваем скорость
            reviewsSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // =========================================================================
    // Динамическое добавление контента (пример)
    // =========================================================================
    const addDynamicContent = () => {
        const vacanciesList = document.querySelector('.vacancies-list');
        const moreVacancies = [
            {
                title: 'Специалист по охране труда',
                salary: 'По договоренности',
                description: 'Организация и контроль мероприятий по охране труда на объектах компании.',
                requirements: ['Опыт работы от 2 лет', 'Знание законодательных норм', 'Навыки проведения инструктажей']
            },
            {
                title: 'Младший спасатель',
                salary: 'По результатам собеседования',
                description: 'Помощь старшим спасателям в проведении работ. Требуется физическая подготовка.',
                requirements: ['Высокая физическая выносливость', 'Начальная подготовка', 'Готовность к обучению']
            },
        ];

        moreVacancies.forEach(vacancy => {
            const vacancyItem = document.createElement('div');
            vacancyItem.classList.add('vacancy-item');

            let requirementsHtml = vacancy.requirements.map(req => `<li><i class="fas fa-check-circle"></i> ${req}</li>`).join('');

            vacancyItem.innerHTML = `
                <div class="vacancy-header">
                    <h3>${vacancy.title}</h3>
                    <span>Зарплата: ${vacancy.salary}</span>
                </div>
                <p class="vacancy-description">${vacancy.description}</p>
                <ul class="vacancy-requirements">
                    ${requirementsHtml}
                </ul>
                <a href="mailto:hr@akberen.kz" class="btn btn-apply">Откликнуться</a>
            `;
            vacanciesList.appendChild(vacancyItem);
        });
    };

    // Вызываем функцию для добавления дополнительного контента при загрузке страницы
    addDynamicContent();
});
