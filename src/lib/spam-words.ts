// A comprehensive list of spam trigger words. 
// While not exhaustive, it covers many common categories.

export const SPAM_WORDS: Set<string> = new Set([
  // Urgency & Scarcity
  'act now', 'apply now', 'become a member', 'call now', 'clearance', 'click here',
  'limited time', 'offer expires', 'once in a lifetime', 'one time', 'order now',
  'urgent', 'while supplies last', 'exclusive deal', 'final', 'get it now',
  'instant', 'limited number', 'new customers only', 'now', 'supplies are limited',
  'take action', 'today', 'top dollar', 'what are you waiting for', 'you have been selected',

  // Financial & Money
  '$$$', 'affordable', 'bargain', 'best price', 'big bucks', 'cash', 'cents on the dollar',
  'cheap', 'collect', 'cost', 'credit', 'credit card', 'debt', 'discount',
  'dollars', 'double your income', 'earn', 'extra income', 'fast cash', 'finance',
  'financial freedom', 'for just $', 'free', 'hidden charges', 'income', 'investment',
  'loans', 'lowest price', 'million', 'money', 'money back', 'mortgage', 'no fees',
  'one hundred percent free', 'pennies a day', 'price', 'profit', 'pure profit', 'quote',
  'refinance', 'refund', 'save big', 'save up to', 'serious cash', 'subject to credit',
  'unsecured credit', 'unsecured debt', 'why pay more', 'winner', 'winning',

  // Overpromises & Claims
  '100% satisfied', 'all natural', 'amazing', 'be your own boss', 'cancel at any time',
  'certified', 'congratulations', 'drastically reduced', 'fantastic', 'for free',
  'freedom', 'guarantee', 'guaranteed', 'incredible', 'it\'s a miracle', 'life-changing',
  'lose weight', 'miracle', 'no catch', 'no gimmick', 'no obligation', 'no questions asked',
  'no risk', 'promise you', 'real thing', 'risk-free', 'satisfaction guaranteed',
  'stop snoring', 'success', 'the best', 'unbelievable', 'works in days',

  // Shady & Deceptive
  'additional income', 'be your own boss', 'card accepted', 'check or money order',
  'confidentiality', 'consolidate your debt', 'deal', 'direct email', 'direct marketing',
  'hidden assets', 'important information regarding', 'in accordance with the law',
  'junk', 'legal', 'lodged', 'not spam', 'opt-in', 'pre-approved', 'remove',
  'reverses aging', 'spam', 'this isn\'t spam', 'undisclosed recipient', 'unsolicited',
  'we hate spam',

  // Commands & Calls to Action
  'apply online', 'buy now', 'click below', 'click here', 'get started', 'info',
  'learn more', 'open this', 'order today', 'please read', 'see for yourself',
  'sign up free', 'subscribe', 'visit our website', 'web traffic',

  // Greetings & Punctuation
  'dear friend', 'hello', 'friend', 'greetings', '!', '!!', '!!!',

  // Other common triggers
  'ad', 'as seen on', 'beneficiary', 'billing', 'bonus', 'celebrity', 'click',
  'collect child support', 'compare rates', 'cures', 'deal', 'diagnostics',
  'extra', 'foreclosure', 'free gift', 'free trial', 'gift', 'giving away',
  'have you been turned down', 'hello', 'hidden', 'home based', 'insurance',
  'investment', 'legal', 'lottery', 'luxury', 'marketing', 'mass email', 'medicine',
  'meet singles', 'member', 'message contains', 'mlm', 'multi-level marketing',
  'name brand', 'online marketing', 'order status', 'passwords', 'performance',
  'prize', 'problem', 'promotion', 'purchase', 'rating', 'recipient', 'remove',
  'request', 'requires investment', 'reversed', 'sample', 'score', 'search engine',
  'cialis', 'viagra', 'valium', 'xanax', 'weight loss',
]);
