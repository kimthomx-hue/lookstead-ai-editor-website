(function initPricingPage() {
  var root = document.getElementById('plan-list');
  if (!root || !window.LOOKSTEAD_PLANS) {
    return;
  }

  var data = window.LOOKSTEAD_PLANS;
  var billing = 'monthly';
  var expandedPlan = null;

  var toggleMonthly = document.getElementById('billing-monthly');
  var toggleAnnual = document.getElementById('billing-annual');
  var toggleHint = document.getElementById('billing-hint');
  function priceLines(planId) {
    if (planId === 'free') {
      return { main: 'Free', sub: data.planCopy.free.priceHint };
    }
    var prices = data.marketingPrices[planId];
    var annual = data.marketingAnnualPrices[planId];
    if (billing === 'annual') {
      return {
        main: annual.yearlyAmount + ' per year',
        sub: annual.perMonthEquivalent + '/mo equivalent · ' + annual.savingsHint,
      };
    }
    return {
      main: prices.introLabel,
      sub: prices.recurringLabel,
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
        billing === 'annual' ? 'Save with annual billing' : 'Intro offers on monthly plans';
    }
    render();
  }

  function render() {
    root.innerHTML = '';

    data.planOrder.forEach(function (planId) {
      var copy = data.planCopy[planId];
      var lines = priceLines(planId);
      var benefits = data.planBenefits[planId] || [];
      var isRecommended = planId === data.recommendedPaidPlan;
      var isExpanded = expandedPlan === planId;
      var projects = data.maxActiveProjects[planId];
      var resolution = data.maxExportResolution[planId];

      var card = document.createElement('article');
      card.className = 'plan-card' + (isRecommended ? ' plan-card-recommended' : '');

      var header = document.createElement('div');
      header.className = 'plan-card-header';

      if (isRecommended) {
        var badge = document.createElement('span');
        badge.className = 'plan-badge';
        badge.textContent = 'Recommended';
        header.appendChild(badge);
      }

      var titleRow = document.createElement('div');
      titleRow.className = 'plan-title-row';

      var titleBlock = document.createElement('div');
      titleBlock.className = 'plan-title-block';

      var title = document.createElement('h2');
      title.className = 'plan-title';
      title.textContent = copy.title;

      var priceMain = document.createElement('p');
      priceMain.className = 'plan-price-main';
      priceMain.textContent = lines.main;

      titleBlock.appendChild(title);
      titleBlock.appendChild(priceMain);

      if (planId !== 'free') {
        var priceSub = document.createElement('p');
        priceSub.className = 'plan-price-sub';
        priceSub.textContent = lines.sub;
        titleBlock.appendChild(priceSub);
      } else {
        var priceSubFree = document.createElement('p');
        priceSubFree.className = 'plan-price-sub';
        priceSubFree.textContent = lines.sub;
        titleBlock.appendChild(priceSubFree);
      }

      var meta = document.createElement('p');
      meta.className = 'plan-meta';
      meta.textContent =
        'Up to ' + projects + ' projects · ' + resolution + ' export max';

      var blurb = document.createElement('p');
      blurb.className = 'plan-blurb';
      blurb.textContent = copy.subtitle;

      titleBlock.appendChild(meta);
      titleBlock.appendChild(blurb);
      titleRow.appendChild(titleBlock);
      header.appendChild(titleRow);
      card.appendChild(header);

      var benefitsToggle = document.createElement('button');
      benefitsToggle.type = 'button';
      benefitsToggle.className = 'plan-benefits-toggle';
      benefitsToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      benefitsToggle.innerHTML =
        '<span>See benefits</span><span class="plan-chevron" aria-hidden="true"></span>';
      benefitsToggle.addEventListener('click', function () {
        expandedPlan = expandedPlan === planId ? null : planId;
        render();
      });
      card.appendChild(benefitsToggle);

      if (isExpanded) {
        var list = document.createElement('ul');
        list.className = 'plan-benefits-list';
        benefits.forEach(function (b) {
          var item = document.createElement('li');
          item.className = 'plan-benefit-item';
          item.innerHTML =
            '<strong></strong><span></span>';
          item.querySelector('strong').textContent = b.title;
          item.querySelector('span').textContent = b.subtitle;
          list.appendChild(item);
        });
        card.appendChild(list);
      }

      root.appendChild(card);
    });
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
