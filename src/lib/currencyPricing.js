// Centralized Current Market Pricing & Multi-Currency i18n Converter
// Converts base BDT market prices into the active i18n language currency:
// - 'bn' (Bangla)  -> BDT (৳১৫,০০০ BDT)
// - 'en' (English) -> USD ($125)
// - 'ar' (Arabic)  -> SAR (470 ر.س)
// - 'zh' (Chinese) -> CNY (¥900)

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBanglaNumber(num) {
  const formatted = Number(num).toLocaleString('en-IN');
  return formatted.replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/**
 * Current market base prices in BDT for each service's 3 pricing tiers:
 * [Tier 1 (Starter), Tier 2 (Growth/Pro), Tier 3 (Enterprise)]
 */
export const MARKET_SERVICE_PRICES_BDT = {
  webDev: [15000, 28000, 55000],
  webApp: [35000, 65000, 120000],
  ecommerce: [25000, 45000, 85000],
  design: [8000, 18000, 35000],
  apiIntegration: [8000, 18000, 35000],
  databaseService: [10000, 22000, 40000],
  maintenanceService: [5000, 12000, 25000],
  seoService: [10000, 20000, 38000],
  paymentGatewayService: [7000, 15000, 30000],
  automationService: [8000, 20000, 40000],
  dashboard: [25000, 45000, 85000],
  securityService: [10000, 22000, 42000],
  pluginDev: [12000, 25000, 48000],
};

/**
 * Converts a BDT amount into a clean market price string for the target language.
 * Exchange rates approximated to current market standards:
 * - 1 USD ≈ 120 BDT
 * - 1 SAR ≈ 32 BDT
 * - 1 CNY ≈ 16.5 BDT
 */
export function formatMarketPrice(bdtAmount, lang = 'en', options = {}) {
  const rawBdt = Number(bdtAmount) || 0;
  const code = (lang || 'en').toLowerCase().split('-')[0];

  if (rawBdt === 0) {
    if (code === 'bn') return options.compact ? '৳০' : '৳০ BDT';
    if (code === 'ar') return '0 ر.س';
    if (code === 'zh') return '¥0';
    return options.withCode ? '$0 USD' : '$0';
  }

  let formatted = '';

  if (code === 'bn') {
    formatted = options.compact
      ? `৳${toBanglaNumber(rawBdt)}`
      : `৳${toBanglaNumber(rawBdt)} BDT`;
  } else if (code === 'ar') {
    // 1 SAR ≈ 32 BDT, rounded to nearest 5
    const sar = Math.max(5, Math.round(rawBdt / 32 / 5) * 5);
    formatted = `${sar.toLocaleString('en-US')} ر.س`;
  } else if (code === 'zh') {
    // 1 CNY ≈ 16.5 BDT, rounded to nearest 10
    const cny = Math.max(10, Math.round(rawBdt / 16.5 / 10) * 10);
    formatted = `¥${cny.toLocaleString('en-US')}`;
  } else {
    // Default English ('en'): USD ($), 1 USD ≈ 120 BDT, rounded to nearest 5
    const usd = Math.max(5, Math.round(rawBdt / 120 / 5) * 5);
    formatted = options.withCode ? `$${usd.toLocaleString('en-US')} USD` : `$${usd.toLocaleString('en-US')}`;
  }

  return options.prefixPlus && rawBdt > 0 ? `+${formatted}` : formatted;
}

/**
 * Returns localized plans for a given service key, ensuring all plan prices
 * reflect current market rates and convert dynamically with i18n language.
 */
export function getLocalizedServicePlans(serviceKey, plans = [], lang = 'en') {
  const tierPricesBdt = MARKET_SERVICE_PRICES_BDT[serviceKey];
  if (!Array.isArray(plans)) return [];

  return plans.map((plan, idx) => {
    const bdt = tierPricesBdt?.[idx];
    if (bdt) {
      return {
        ...plan,
        price: formatMarketPrice(bdt, lang),
        baseBdt: bdt,
      };
    }
    return plan;
  });
}

/**
 * Automatically updates all service pricing plans inside i18n resources
 * so any `t('<service>.pricing.plans')` call returns the proper currency & market price.
 */
export function applyMarketPricesToResources(resources) {
  if (!resources) return resources;

  const languages = ['en', 'bn', 'ar', 'zh'];

  languages.forEach((lang) => {
    const trans = resources[lang]?.translation;
    if (!trans) return;

    Object.entries(MARKET_SERVICE_PRICES_BDT).forEach(([serviceKey, bdtTiers]) => {
      const plans = trans[serviceKey]?.pricing?.plans;
      if (Array.isArray(plans)) {
        plans.forEach((plan, idx) => {
          if (bdtTiers[idx]) {
            plan.price = formatMarketPrice(bdtTiers[idx], lang);
          }
        });
      }
    });
  });

  return resources;
}

