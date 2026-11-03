/**
 * Marketing subscription copy (mirrors lookstead-ai-editor/constants/subscriptions.ts).
 * Update both files whenever pricing, benefits, or plan limits change.
 */
(function () {
  var FREE_MONTHLY_AI_CREDITS = 10;

  var MARKETING_PRICES = {
    pro: {
      introLabel: '£1 first month',
      recurringLabel: '£8.99/month after',
      introAmount: '£1',
      recurringAmount: '£8.99',
    },
    creator: {
      introLabel: '£4.99 first month',
      recurringLabel: '£19.99/month after',
      introAmount: '£4.99',
      recurringAmount: '£19.99',
    },
    studio: {
      introLabel: '£14.99 first month',
      recurringLabel: '£54.99/month after',
      introAmount: '£14.99',
      recurringAmount: '£54.99',
    },
  };

  var MARKETING_ANNUAL_PRICES = {
    pro: {
      yearlyAmount: '£89.99',
      perMonthEquivalent: '£7.50',
      savingsAmount: '£18',
      savingsHint: 'Save £18 vs 12 monthly payments',
    },
    creator: {
      yearlyAmount: '£199.99',
      perMonthEquivalent: '£16.67',
      savingsAmount: '£40',
      savingsHint: 'Save £40 vs 12 monthly payments',
    },
    studio: {
      yearlyAmount: '£549.99',
      perMonthEquivalent: '£45.83',
      savingsAmount: '£110',
      savingsHint: 'Save £110 vs 12 monthly payments',
    },
  };

  var PLAN_COPY = {
    free: {
      title: 'Free',
      subtitle: 'Start editing with core tools and 720p export.',
      priceHint: '£0/month',
    },
    pro: {
      title: 'Pro',
      subtitle: 'No watermark, 1080p export, AI captions and premium styles.',
      priceHint: MARKETING_PRICES.pro.introLabel,
    },
    creator: {
      title: 'Creator',
      subtitle: 'More projects, advanced AI clip tools and brand presets.',
      priceHint: MARKETING_PRICES.creator.introLabel,
    },
    studio: {
      title: 'Studio',
      subtitle: 'Maximum AI allowance, batch clips and priority processing.',
      priceHint: MARKETING_PRICES.studio.introLabel,
    },
  };

  var PLAN_BENEFITS = {
    free: [
      { title: 'Basic video editing', subtitle: 'Trim, text overlays and timeline editing.' },
      { title: 'Unlimited active projects', subtitle: 'Create as many edits as you need on Free.' },
      { title: '720p export', subtitle: 'Share drafts with a Lookstead watermark.' },
      {
        title: 'Limited AI credits',
        subtitle: FREE_MONTHLY_AI_CREDITS + ' AI actions per month.',
      },
      { title: 'Basic styles', subtitle: 'Core caption and edit presets.' },
    ],
    pro: [
      { title: 'No watermark', subtitle: 'Clean exports for social and clients.' },
      { title: '1080p export', subtitle: 'Sharp HD output for every platform.' },
      { title: 'AI clip detection', subtitle: 'Find strong moments automatically.' },
      { title: 'AI captions', subtitle: 'Generated captions with premium animated styles.' },
      { title: 'More AI credits', subtitle: 'Higher monthly allowance than Free.' },
    ],
    creator: [
      { title: 'Everything in Pro', subtitle: 'All Pro export and AI caption features.' },
      { title: 'More active projects', subtitle: 'Keep more edits in progress at once.' },
      { title: 'Advanced AI clip selection', subtitle: 'Fine-tune which moments make the cut.' },
      { title: 'Custom brand presets', subtitle: 'Save fonts, colors and layouts.' },
      { title: 'Priority rendering', subtitle: 'Faster export queue when supported.' },
    ],
    studio: [
      { title: 'Everything in Creator', subtitle: 'Full Creator toolkit included.' },
      { title: 'Highest AI allowance', subtitle: 'Built for daily publishing teams.' },
      { title: 'Batch short creation', subtitle: 'Generate multiple clips from one source.' },
      { title: 'Advanced moment detection', subtitle: 'Deep AI scan for hooks and peaks.' },
      {
        title: 'Premium templates',
        subtitle: 'Studio brand kits and higher-res export where supported.',
      },
    ],
  };

  var MAX_ACTIVE_PROJECTS = { free: null, pro: 12, creator: 30, studio: 100 };

  function activeProjectsLimitLabel(planId) {
    var limit = MAX_ACTIVE_PROJECTS[planId];
    if (limit == null) {
      return 'Unlimited active projects';
    }
    return 'Up to ' + limit + ' active projects';
  }

  window.LOOKSTEAD_PLANS = {
    planOrder: ['free', 'pro', 'creator', 'studio'],
    recommendedPaidPlan: 'pro',
    freeMonthlyAiCredits: FREE_MONTHLY_AI_CREDITS,
    marketingPrices: MARKETING_PRICES,
    marketingAnnualPrices: MARKETING_ANNUAL_PRICES,
    planCopy: PLAN_COPY,
    planBenefits: PLAN_BENEFITS,
    maxActiveProjects: MAX_ACTIVE_PROJECTS,
    maxExportResolution: { free: '720p', pro: '1080p', creator: '1080p', studio: 'Original' },
    activeProjectsLimitLabel: activeProjectsLimitLabel,
  };
})();
