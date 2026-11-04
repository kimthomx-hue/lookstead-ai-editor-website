(function initPricingPage() {
  var root = document.getElementById('plan-list');
  if (!root || !window.LOOKSTEAD_PLANS) {
    return;
  }

  var data = window.LOOKSTEAD_PLANS;
  var billing = 'monthly';

  var toggleMonthly = document.getElementById('billing-monthly');
  var toggleAnnual = document.getElementById('billing-annual');
  var toggleHint = document.getElementById('billing-hint');

  function priceDisplay(planId) {
    if (planId === 'free') {
      return {
        amount: '£0',
        period: '/month',
        offer: null,
        after: null,
        save: null,
      };
    }

    var prices = data.marketingPrices[planId];
    var annual = data.marketingAnnualPrices[planId];

    if (billing === 'annual') {
      return {
        amount: annual.yearlyAmount,
        period: '/year',
        offer: null,
        after: annual.perMonthEquivalent + '/mo equivalent',
        save: annual.savingsHint,
      };
    }

    if (planId !== 'pro') {
      return {
        amount: prices.recurringAmount,
        period: '/month',
        offer: null,
        after: 'Billed monthly. Cancel anytime.',
        save: null,
      };
    }

    return {
      amount: prices.introAmount,
      period: ' first month',
      offer: '£1 for the first month for eligible new Pro subscribers',
      after: 'Then ' + prices.recurringAmount + '/month',
      save: null,
    };
  }

  function setBilling(next) {
    billing = next;
    if (toggleMonthly && toggleAnnual) {
      toggleMonthly.classList.toggle('is-active', billing === 'monthly');
      toggleAnnual.classList.toggle('is-active', billing === 'annual');
      toggleMonthly.setAttribute('aria-pressed', billing === 'monthly' ? 'true' : 'false');
      toggleAnnual.setAttribute('aria-pressed', billing === 'annual' ? 'true' : 'false');
    }
    if (toggleHint) {
      toggleHint.textContent =
        billing === 'annual'
          ? 'Annual plans show how much you save vs paying monthly'
          : 'Pro is £1 for the first month for eligible new subscribers';
    }
    render();
  }

  function render() {
    root.innerHTML = '';

    data.planOrder.forEach(function (planId) {
      var copy = data.planCopy[planId];
      var display = priceDisplay(planId);
      var benefits = data.planBenefits[planId] || [];
      var isRecommended = planId === data.recommendedPaidPlan;
      var projectsLabel = data.activeProjectsLimitLabel(planId);
      var importLimitLabel = data.externalVideoImportsLimitLabel(planId);
      var exportNote = data.exportQualityNote || 'Pro export quality on every plan';

      var card = document.createElement('article');
      card.className = 'plan-card' + (isRecommended ? ' plan-card-featured' : '');

      var title = document.createElement('h3');
      title.className = 'plan-title';
      title.textContent = copy.title;

      var priceRow = document.createElement('p');
      priceRow.className = 'plan-price-row';
      priceRow.innerHTML =
        '<span class="plan-price-amount"></span><span class="plan-price-period"></span>';
      priceRow.querySelector('.plan-price-amount').textContent = display.amount;
      priceRow.querySelector('.plan-price-period').textContent = display.period;

      card.appendChild(title);
      card.appendChild(priceRow);

      if (display.offer) {
        var offer = document.createElement('p');
        offer.className = 'plan-price-offer';
        offer.textContent = display.offer;
        card.appendChild(offer);
      }

      if (display.after) {
        var after = document.createElement('p');
        after.className = 'plan-price-after';
        after.textContent = display.after;
        card.appendChild(after);
      }

      if (display.save) {
        var save = document.createElement('p');
        save.className = 'plan-price-save';
        save.textContent = display.save;
        card.appendChild(save);
      }

      var blurb = document.createElement('p');
      blurb.className = 'plan-blurb';
      blurb.textContent = copy.subtitle;

      var meta = document.createElement('p');
      meta.className = 'plan-meta';
      meta.textContent = projectsLabel + ' · ' + importLimitLabel + ' · ' + exportNote;

      var includesLabel = document.createElement('p');
      includesLabel.className = 'plan-includes-label';
      includesLabel.textContent = "What's included";

      var list = document.createElement('ul');
      list.className = 'plan-includes-list';
      benefits.forEach(function (b) {
        var item = document.createElement('li');
        item.className = 'plan-includes-item';
        item.innerHTML =
          '<span class="plan-check" aria-hidden="true"></span><span></span>';
        item.querySelector('span:last-child').textContent = b.title;
        list.appendChild(item);
      });

      var cta = document.createElement('a');
      cta.className = 'plan-cta app-store-link';
      cta.href = '/download/';
      cta.textContent = planId === 'free' ? 'Get started free' : 'Get started';

      card.appendChild(blurb);
      card.appendChild(meta);
      card.appendChild(includesLabel);
      card.appendChild(list);
      card.appendChild(cta);

      root.appendChild(card);
    });

    if (window.__looksteadBindAppStoreLinks) {
      window.__looksteadBindAppStoreLinks();
    }
  }

  if (toggleMonthly) {
    toggleMonthly.addEventListener('click', function () {
      setBilling('monthly');
    });
  }
  if (toggleAnnual) {
    toggleAnnual.addEventListener('click', function () {
      setBilling('annual');
    });
  }

  setBilling('monthly');
})();
