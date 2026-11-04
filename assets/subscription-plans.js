/**
 * Marketing subscription copy (mirrors lookstead-ai-editor/constants/subscriptions.ts).
 * Update both files whenever pricing, benefits, or plan limits change.
 */
(function () {
  var FREE_MONTHLY_AI_CREDITS = 10;

  var MARKETING_PRICES = {
    pro: {
      introLabel: '£1 first month',
      recurringLabel: '£3.99/month after',
      introAmount: '£1',
      recurringAmount: '£3.99',
    },
    creator: {
      introLabel: '£11.99/month',
      recurringLabel: '£11.99/month',
      introAmount: '£11.99',
      recurringAmount: '£11.99',
    },
  };

  var MARKETING_ANNUAL_PRICES = {
    pro: {
      yearlyAmount: '£39.99',
      perMonthEquivalent: '£3.33',
      savingsAmount: '£7.89',
      savingsHint: 'Save £7.89 vs 12 monthly payments',
    },
    creator: {
      yearlyAmount: '£119.99',
      perMonthEquivalent: '£10.00',
      savingsAmount: '£23.89',
      savingsHint: 'Save £23.89 vs 12 monthly payments',
    },
  };

  var PLAN_COPY = {
    free: {
      title: 'Free',
      subtitle: 'Full professional export quality with core editing tools.',
      priceHint: '£0/month',
    },
    pro: {
      title: 'Pro',
      subtitle: 'No watermark, AI captions, clip detection and premium styles.',
      priceHint: MARKETING_PRICES.pro.introLabel,
    },
    creator: {
      title: 'Creator',
      subtitle: 'More projects, advanced AI clip tools and brand presets.',
      priceHint: MARKETING_PRICES.creator.introLabel,
    },
  };

  var PLAN_BENEFITS = {
    free: [
      { title: 'Basic video editing', subtitle: 'Trim, text overlays and timeline editing.' },
      { title: 'Unlimited active projects', subtitle: 'Create as many edits as you need on Free.' },
      {
        title: 'Pro export quality',
        subtitle: '1080p, 2K and 4K (where supported), frame rates and bitrate control.',
      },
      { title: 'Lookstead watermark', subtitle: 'Upgrade to Pro to export without the watermark.' },
      {
        title: 'Limited AI credits',
        subtitle: FREE_MONTHLY_AI_CREDITS + ' AI actions per month.',
      },
      { title: 'Basic styles', subtitle: 'Core caption and edit presets.' },
      { title: '1 external video import per day', subtitle: 'Import rights-cleared video files from direct download links.' },
    ],
    pro: [
      { title: 'No watermark', subtitle: 'Clean exports for social and clients.' },
      { title: 'AI clip detection', subtitle: 'Find strong moments automatically.' },
      { title: 'AI captions', subtitle: 'Generated captions with premium animated styles.' },
      { title: 'Premium editing styles', subtitle: 'Animated captions and pro looks.' },
      { title: 'More AI credits', subtitle: 'Higher monthly allowance than Free.' },
      { title: '10 external video imports per day', subtitle: 'Import rights-cleared video files from direct download links.' },
    ],
    creator: [
      { title: 'Everything in Pro', subtitle: 'All Pro AI and caption features.' },
      { title: 'More active projects', subtitle: 'Keep more edits in progress at once.' },
      { title: 'Advanced AI clip selection', subtitle: 'Fine-tune which moments make the cut.' },
      { title: 'Custom brand presets', subtitle: 'Save fonts, colors and layouts.' },
      { title: 'Priority rendering', subtitle: 'Faster export queue when supported.' },
      { title: 'Unlimited external video imports', subtitle: 'Import rights-cleared video files from direct download links.' },
    ],
  };

  var MAX_ACTIVE_PROJECTS = { free: null, pro: 12, creator: 30 };
  var MAX_DAILY_EXTERNAL_VIDEO_IMPORTS = { free: 1, pro: 10, creator: null };

  function activeProjectsLimitLabel(planId) {
    var limit = MAX_ACTIVE_PROJECTS[planId];
    if (limit == null) {
      return 'Unlimited active projects';
    }
    return 'Up to ' + limit + ' active projects';
  }

  function externalVideoImportsLimitLabel(planId) {
    var limit = MAX_DAILY_EXTERNAL_VIDEO_IMPORTS[planId];
    return limit == null
      ? 'Unlimited external video imports'
      : limit + ' external video import' + (limit === 1 ? '' : 's') + ' per day';
  }

  window.LOOKSTEAD_PLANS = {
    planOrder: ['free', 'pro', 'creator'],
    recommendedPaidPlan: 'pro',
    freeMonthlyAiCredits: FREE_MONTHLY_AI_CREDITS,
    marketingPrices: MARKETING_PRICES,
    marketingAnnualPrices: MARKETING_ANNUAL_PRICES,
    planCopy: PLAN_COPY,
    planBenefits: PLAN_BENEFITS,
    maxActiveProjects: MAX_ACTIVE_PROJECTS,
    maxDailyExternalVideoImports: MAX_DAILY_EXTERNAL_VIDEO_IMPORTS,
    exportQualityNote: '1080p, 2K and 4K exports included on Free (device permitting)',
    activeProjectsLimitLabel: activeProjectsLimitLabel,
    externalVideoImportsLimitLabel: externalVideoImportsLimitLabel,
  };
})();
