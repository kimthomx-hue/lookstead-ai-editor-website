const HELP_FEATURED_COUNT = 6;

const HELP_FAQS = [
  {
    q: 'What can I do in Lookstead AI Editor today?',
    a: 'Import a video from Photos or Files, trim the clip, choose a vertical or square format, add cropped photo overlays, and export to your camera roll. AI clip suggestions and YouTube import are planned — not live yet.',
  },
  {
    q: 'Why does export say I need a development build?',
    a: 'Trimming and export use native video modules that are not included in Expo Go. Install a development build (npx expo run:ios or TestFlight) to export on your iPhone.',
  },
  {
    q: 'How do photo overlays work?',
    a: 'Tap Add photo in the editor, crop with the same pinch-and-drag crop tool as our Lookstead photo flow, then drag the overlay on the preview. Overlays are burned in on export when your build supports FFmpeg processing.',
  },
  {
    q: 'Which video formats are supported?',
    a: 'Common MP4 and MOV files from your camera roll work best. Very large files may take longer to import and export.',
  },
  {
    q: 'Can I import from YouTube?',
    a: 'Not yet. The Home screen accepts YouTube links for validation only and shows a coming-soon message. We will add a compliant workflow later.',
  },
  {
    q: 'Where are my projects stored?',
    a: 'Projects and edit settings are stored on your device. Sign in with Apple, Google, or email to keep your account; cloud project sync may arrive in a later release.',
  },
  {
    q: 'How do I delete local data?',
    a: 'Profile → Delete all data on this device clears onboarding preferences. Delete individual projects from the editor trash icon.',
  },
  {
    q: 'Do I need an account?',
    a: 'No for basic editing. Create an account to save preferences across devices when cloud sync is available.',
  },
  {
    q: 'Is there a subscription?',
    a: 'The marketing site lists flexible pricing for the future. In-app subscriptions are not active in this release.',
  },
  {
    q: 'How do I contact support?',
    a: 'Email support@lookstead.com with your device, app version, and a short description. Do not send passwords.',
  },
];

(function initHelpFaq() {
  const list = document.getElementById('faq-list');
  const seeAllBtn = document.getElementById('faq-see-all');
  if (!list) {
    return;
  }

  let showAll = false;

  function render() {
    const items = showAll ? HELP_FAQS : HELP_FAQS.slice(0, HELP_FEATURED_COUNT);
    list.innerHTML = '';

    items.forEach((item, index) => {
      const details = document.createElement('details');
      details.className = 'faq-item';
      if (index === 0) {
        details.open = true;
      }

      const summary = document.createElement('summary');
      summary.className = 'faq-question';
      summary.innerHTML =
        '<span class="faq-question-text"></span><span class="faq-chevron" aria-hidden="true"></span>';
      summary.querySelector('.faq-question-text').textContent = item.q;

      const answer = document.createElement('p');
      answer.className = 'faq-answer';
      answer.textContent = item.a;

      details.appendChild(summary);
      details.appendChild(answer);
      list.appendChild(details);
    });

    if (seeAllBtn) {
      if (HELP_FAQS.length <= HELP_FEATURED_COUNT) {
        seeAllBtn.hidden = true;
      } else {
        seeAllBtn.hidden = showAll;
        seeAllBtn.textContent = showAll ? 'Show less' : 'See all questions';
      }
    }
  }

  if (seeAllBtn) {
    seeAllBtn.addEventListener('click', () => {
      showAll = !showAll;
      render();
    });
  }

  render();
})();
