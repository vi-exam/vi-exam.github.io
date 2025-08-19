document.addEventListener('DOMContentLoaded', () => {

  const questionsData = [
    // --- Môn Toán ---
    { domain: 'Mathematics', image: 'images/Math_0001_test_001_question_9_page_1_key_D_vqa.png', answer: 'D' },
    { domain: 'Mathematics', image: 'images/Math_0250_test_046_question_21_page_3_key_A_vqa.png', answer: 'A' },
    { domain: 'Mathematics', image: 'images/Math_0327_test_064_question_48_page_6_key_D_vqa.png', answer: 'D' },
    // --- Môn Vật Lý ---
    { domain: 'Physics', image: 'images/Physics_0005_test_002_question_8_page_1_key_C_vqa.png', answer: 'C' },
    { domain: 'Physics', image: 'images/Physics_0063_test_029_question_17_page_3_key_C_vqa.png', answer: 'C' },
    { domain: 'Physics', image: 'images/Physics_0123_test_053_question_33_page_4_key_D_vqa.png', answer: 'D' },
    // --- Môn Hóa Học ---
    { domain: 'Chemistry', image: 'images/Chemistry_0208_test_065_question_62_page_2_key_C_vqa.png', answer: 'C' },
    { domain: 'Chemistry', image: 'images/Chemistry_0229_test_074_question_55_page_2_key_C_vqa.png', answer: 'C' },
    { domain: 'Chemistry', image: 'images/Chemistry_0266_test_095_question_30_page_3_key_C_vqa.png', answer: 'C' },
    // --- Môn Sinh Học ---
    { domain: 'Biology', image: 'images/Biology_0062_test_014_question_116_page_5_key_A_vqa.png', answer: 'A' },
    { domain: 'Biology', image: 'images/Biology_0268_test_064_question_30_page_3_key_C_vqa.png', answer: 'C' },
    { domain: 'Biology', image: 'images/Biology_0310_test_081_question_111_page_18_key_B_vqa.png', answer: 'B' },
    // --- Môn Địa Lý ---
    { domain: 'Geography', image: 'images/Geography_0297_test_073_question_23_page_3_key_A_vqa.png', answer: 'A' },
    { domain: 'Geography', image: 'images/Geography_0344_test_085_question_4_page_1_key_B_vqa.png', answer: 'B' },
    { domain: 'Geography', image: 'images/Geography_0403_test_090_question_74_page_43_key_B_vqa.png', answer: 'B' },
    // --- Môn Lái Xe ---
    { domain: 'Driving Test', image: 'images/DrivingTest_0007_test_001_question_101_page_102_key_3_vqa.png', answer: '3' },
    { domain: 'Driving Test', image: 'images/DrivingTest_0090_test_001_question_184_page_185_key_2_vqa.png', answer: '2' },
    { domain: 'Driving Test', image: 'images/DrivingTest_0343_test_002_question_563_page_136_key_1_vqa.png', answer: '1' },
    // --- Môn IQ Test ---
    { domain: 'IQ Test', image: 'images/IQTest_0008_test_001_question_8_page_4_key_C_vqa.png', answer: 'C' },
    { domain: 'IQ Test', image: 'images/IQTest_0113_test_002_question_18_page_16_key_B_vqa.png', answer: 'B' },
    { domain: 'IQ Test', image: 'images/IQTest_0180_test_003_question_37_page_32_key_A_vqa.png', answer: 'A' },
  ];

  const galleryTrack = document.getElementById('gallery-track');
  const galleryFilters = document.getElementById('gallery-filters');
  const prevButton = document.getElementById('prev-slide-btn');
  const nextButton = document.getElementById('next-slide-btn');
  const slideCounter = document.getElementById('slide-counter');

  let currentIndex = 0;
  let currentQuestions = [];

  const updateSlider = () => {
    galleryTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    slideCounter.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === currentQuestions.length - 1;
  };

  const renderGallery = (domain) => {
    galleryTrack.innerHTML = '';
    currentQuestions = questionsData.filter(q => q.domain === domain);
    
    if (currentQuestions.length === 0) {
        galleryTrack.innerHTML = '<div class="gallery-slide-slider"><p class="gallery-empty-message">No questions found.</p></div>';
        slideCounter.textContent = '0 / 0';
        prevButton.disabled = true;
        nextButton.disabled = true;
        return;
    }

    currentQuestions.forEach(q => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide-slider';
        slide.innerHTML = `
            <div class="gallery-card-slider">
                <div class="card-image-container-slider">
                    <img src="${q.image}" alt="Sample question" onerror="this.parentElement.classList.add('image-not-found');">
                </div>
                <div class="card-text-content-slider">
                    <div class="card-tag">${q.domain}</div>
                    <p class="card-answer"><strong>Ground Truth:</strong> <span class="answer-text">${q.answer}</span></p>
                </div>
            </div>
        `;
        galleryTrack.appendChild(slide);
    });
    
    currentIndex = 0;
    updateSlider();
  };

  const renderFilters = () => {
      const domains = [...new Set(questionsData.map(q => q.domain))];
      galleryFilters.innerHTML = '';

      domains.forEach(domain => {
          const button = document.createElement('button');
          button.className = 'filter-button';
          button.dataset.domain = domain;
          
          const icons = {
              'Mathematics': 'fas fa-calculator',
              'Physics': 'fas fa-atom',
              'Chemistry': 'fas fa-flask',
              'Biology': 'fas fa-dna',
              'Geography': 'fas fa-globe',
              'Driving Test': 'fas fa-car',
              'IQ Test': 'fas fa-brain'
          };
          button.innerHTML = `<i class="${icons[domain] || 'fas fa-question-circle'}"></i> ${domain}`;

          button.addEventListener('click', () => {
              document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
              button.classList.add('active');
              renderGallery(domain);
          });
          galleryFilters.appendChild(button);
      });
  };
  
  // Event Listeners for navigation
  prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
      }
  });

  nextButton.addEventListener('click', () => {
      if (currentIndex < currentQuestions.length - 1) {
          currentIndex++;
          updateSlider();
      }
  });


  // Initial load
  renderFilters();
  const defaultFilter = document.querySelector('.filter-button[data-domain="Mathematics"]');
  if (defaultFilter) {
      defaultFilter.classList.add('active');
      renderGallery('Mathematics');
  }
});