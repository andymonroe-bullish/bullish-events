/*  ============================================
    BULLISH EVENTS — Placeholder Quiz Logic
    Replace this file with the real AI-powered quiz
    ============================================ */

const answers = {};
let currentStep = 1;
const totalSteps = 5;

function init() {
  const modal = document.getElementById('quizModal');
  const modalClose = document.getElementById('modalClose');

  // Open modal from any quiz trigger button
  document.querySelectorAll('.quiz-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      resetQuiz();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal with X button
  modalClose.addEventListener('click', closeModal);

  // Close modal by clicking backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Close modal when "Book a Discovery Call" is clicked in results
  document.querySelector('.modal-cta-link').addEventListener('click', () => {
    closeModal();
  });

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', handleOptionClick);
  });

  document.getElementById('retakeQuiz').addEventListener('click', resetQuiz);
  updateProgress();
}

function closeModal() {
  document.getElementById('quizModal').classList.remove('active');
  document.body.style.overflow = '';
}

function handleOptionClick(e) {
  const btn = e.currentTarget;
  const question = btn.closest('.quiz-question');
  const step = parseInt(question.dataset.step);

  // Mark selected
  question.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  btn.classList.add('selected');

  // Store answer
  answers[step] = btn.dataset.value;

  // Brief delay then advance
  setTimeout(() => {
    if (step < totalSteps) {
      goToStep(step + 1);
    } else {
      showResult();
    }
  }, 300);
}

function goToStep(step) {
  currentStep = step;

  document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
  document.querySelector(`.quiz-question[data-step="${step}"]`).classList.add('active');

  updateProgress();
}

function updateProgress() {
  const pct = (currentStep / totalSteps) * 100;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('stepText').textContent = `Question ${currentStep} of ${totalSteps}`;
}

function showResult() {
  // Hide questions and progress
  document.getElementById('quizQuestions').style.display = 'none';
  document.querySelector('.quiz-progress').style.display = 'none';
  document.querySelector('.placeholder-notice').style.display = 'none';

  // Determine recommendation (placeholder logic)
  const rec = getRecommendation();

  document.getElementById('resultDescription').textContent = rec.description;
  document.getElementById('resultEventType').textContent = rec.eventType;
  document.getElementById('resultEventDetails').textContent = rec.details;

  document.getElementById('quizResult').style.display = 'block';
}

function getRecommendation() {
  // Simple placeholder logic — will be replaced by AI
  const goal = answers[3];
  const budget = answers[4];
  const size = answers[5];

  if (budget === 'premium' || size === 'large') {
    return {
      eventType: 'Large-Scale Conference',
      description: 'Based on your answers, you\'re ready for something big.',
      details: 'A multi-day conference with keynote speakers, breakout sessions, and networking events. This format maximizes authority and creates massive brand visibility. Expect 500+ attendees and a high-touch, high-production experience.'
    };
  }

  if (goal === 'revenue' || budget === 'high') {
    return {
      eventType: 'Premium Workshop / Retreat',
      description: 'You\'re in a great position to host a high-value, intimate event.',
      details: 'A 1-2 day premium workshop or retreat with 30-100 attendees. High ticket price, deep transformation, and strong revenue potential. This format builds deep relationships and positions you as the go-to expert.'
    };
  }

  if (goal === 'community') {
    return {
      eventType: 'Community Meetup Series',
      description: 'Community is your superpower — let\'s amplify it.',
      details: 'A recurring local or regional meetup that brings your community together in person. Low cost, high engagement, and a powerful way to turn online followers into lifelong fans. Start with 30-100 people and scale.'
    };
  }

  if (goal === 'leads') {
    return {
      eventType: 'Free VIP Dinner / Roundtable',
      description: 'The best leads come from real conversations.',
      details: 'An exclusive, invite-only dinner or roundtable with 10-30 high-value prospects. Low overhead, high conversion. This format is perfect for building trust quickly and closing deals in a relaxed setting.'
    };
  }

  // Default
  return {
    eventType: 'Half-Day Workshop',
    description: 'A workshop is the perfect starting point for your first event.',
    details: 'A focused half-day workshop with 30-100 attendees. Affordable to produce, easy to fill, and a great way to test the waters. You\'ll generate leads, build authority, and get real feedback from your audience.'
  };
}

function resetQuiz() {
  // Reset state
  Object.keys(answers).forEach(k => delete answers[k]);
  currentStep = 1;

  // Reset UI
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
  document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
  document.querySelector('.quiz-question[data-step="1"]').classList.add('active');

  document.getElementById('quizQuestions').style.display = '';
  document.querySelector('.quiz-progress').style.display = '';
  document.querySelector('.placeholder-notice').style.display = '';
  document.getElementById('quizResult').style.display = 'none';

  updateProgress();
}

document.addEventListener('DOMContentLoaded', init);
