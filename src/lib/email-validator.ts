
import * as XLSX from 'xlsx';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A comprehensive list of disposable email providers
export const DISPOSABLE_DOMAINS = new Set([
  '0-mail.com', '027168.com', '0815.ru', '0815.su', '0clickemail.com', '0wnd.net', '0wnd.org',
  '10minutemail.co.za', '10minutemail.com', '123-m.com', '1fsdfdsfsdf.tk', '1pad.de',
  '20minutemail.com', '21cn.com', '2fdgdfgdfgdf.tk', '2prong.com', '30minutemail.com',
  '33mail.com', '3d-painting.com', '3trtretgfrfe.tk', '4gfdsgfdgfd.tk', '4warding.com',
  '5ghgfhgfhgfd.tk', '6hjgjhgkilkj.tk', '6paq.com', '7tags.com', '9ox.net', 'a-bc.net',
  'afrobacon.com', 'ajaxapp.net', 'amilegit.com', 'amiri.net', 'amiriindustries.com',
  'anonmails.de', 'anonymailer.de', 'anonymbox.com', 'antichef.com', 'antichef.net',
  'antireg.ru', 'antispam.de', 'antispam24.de', 'armyspy.com', 'artman-conception.com',
  'azmeil.tk', 'baxomale.ht.cx', 'beefmilk.com', 'bigstring.com', 'binkmail.com',
  'bio-muesli.net', 'bobmail.info', 'bodhi.lawlita.com', 'bofthew.com', 'bootybay.de',
  'boun.cr', 'bouncr.com', 'breakthru.com', 'brefmail.com', 'broadbandninja.com',
  'bsnow.net', 'bugmenot.com', 'bumpymail.com', 'cashette.com', 'centermail.com',
  'centermail.net', 'chammy.info', 'childsavetrust.org', 'chogmail.com', 'choicemail1.com',
  'clixser.com', 'cmail.net', 'cmail.org', 'coldemail.info', 'cool.fr.nf',
  'courriel.fr.nf', 'courrieltemporaire.com', 'cubiclink.com', 'curryworld.de',
  'cust.in', 'cuvox.de', 'dandikmail.com', 'dayrep.com', 'deadaddress.com', 'deadspam.com',
  'delikkt.de', 'despam.it', 'despammed.com', 'devnullmail.com', 'dfgh.net',
  'digitalsanctuary.com', 'dingbone.com', 'discardmail.com', 'discardmail.de',
  'disposableaddress.com', 'disposableemailaddresses.com', 'disposableinbox.com',
  'dispose.it', 'dispostable.com', 'dodgeit.com', 'dodgit.com', 'donemail.ru',
  'dontreg.com', 'dontsendmespam.de', 'drdrb.net', 'dump-email.info', 'dumpandjunk.com',
  'dumpyemail.com', 'e-mail.com', 'e-mail.org', 'e4ward.com', 'easytrashmail.com',
  'einmalmail.de', 'einrot.com', 'eintagsmail.de', 'emailgo.de', 'emailias.com',
  'emailigo.de', 'emailinfive.com', 'emailmiser.com', 'emailsensei.com',
  'emailtemporar.ro', 'emailtemporario.com.br', 'emailto.de', 'emailwarden.com',
  'emailx.at.hm', 'emailxfer.com', 'emeil.in', 'emeil.ir', 'emz.net', 'enterto.com',
  'ephemail.net', 'etranquil.com', 'etranquil.net', 'etranquil.org', 'evopo.com',
  'explodemail.com', 'fakeinbox.com', 'fakeinformation.com', 'fansworldwide.de',
  'fastacura.com', 'fastchevy.com', 'fastchrysler.com', 'fasternissan.com',
  'fastmazda.com', 'fastmitsubishi.com', 'fastsubaru.com', 'fastsuzuki.com',
  'fasttoyota.com', 'fastweird.com', 'filzmail.com', 'fizmail.com', 'fleckens.hu',
  'fr33mail.info', 'frapmail.com', 'friendlymail.co.uk', 'front14.org', 'fuckingduh.com',
  'fudgerub.com', 'fyii.de', 'garliclife.com', 'get1mail.com', 'get2mail.eu',
  'getawaysimple.com', 'getonemail.com', 'getosh.com', 'ghosttexter.de',
  'giantmail.de', 'girlsundertheinfluence.com', 'gishpuppy.com', 'gmial.com',
  'goemailgo.com', 'gotmail.com', 'gotmail.org', 'gotti.pro', 'gowikibooks.com',
  'gowikicampus.com', 'gowikicars.com', 'gowikifilms.com', 'gowikigames.com',
  'gowikimusic.com', 'gowikinetwork.com', 'gowikitravel.com', 'gowikitv.com',
  'great-host.in', 'greensloth.com', 'grr.la', 'gsrv.co.uk', 'guerillamail.biz',
  'guerillamail.com', 'guerillamail.de', 'guerillamail.net', 'guerillamail.org',
  'guerrillamail.blocker.com', 'gustr.com', 'harakirimail.com', 'hatespam.org',
  'herp.in', 'hidemail.de', 'hidzz.com', 'hmamail.com', 'hopemail.biz', 'hotpop.com',
  'hulapla.de', 'ieatspam.eu', 'ieatspam.info', 'ihateyoualot.info', 'iheartspam.org',
  'imails.info', 'inboxalias.com', 'inboxclean.com', 'inboxclean.org', 'inboxproxy.com',
  'incognitomail.com', 'incognitomail.net', 'incognitomail.org', 'instant-mail.de',
  'ipoo.org', 'irish2me.com', 'iwi.net', 'jetable.com', 'jetable.fr.nf', 'jetable.net',
  'jetable.org', 'jnxjn.com', 'jourrapide.com', 'jsrsolutions.com', 'junk1e.com',
  'kasmail.com', 'kaspop.com', 'keepmymail.com', 'killmail.com', 'killmail.net',
  'kir.ch.tc', 'klassmaster.com', 'klassmaster.net', 'klzlk.com', 'kulturbenoete.de',
  'kurzepost.de', 'lawlita.com', 'letthemeatspam.com', 'lhsdv.com', 'lifebyfood.com',
  'link2mail.net', 'litedrop.com', 'lol.ovpn.to', 'lolfreak.net', 'lookugly.com',
  'lortemail.dk', 'lr78.com', 'm4ilweb.info', 'maboard.com', 'mail-temporaire.fr',
  'mail.by', 'mail.mezimages.net', 'mail.svenz.eu', 'mail.ticket-please.ga',
  'mail2rss.org', 'mail333.com', 'mail4trash.com', 'mailbidon.com', 'mailblocks.com',
  'mailbucket.org', 'mailcat.biz', 'mailcatch.com', 'maildrop.cc', 'maileater.com',
  'maileimer.de', 'mailexpire.com', 'mailfa.tk', 'mailfall.com', 'mailforspam.com',
  'mailfreeonline.com', 'mailguard.me', 'mailin8r.com', 'mailinater.com',
  'mailinator.com', 'mailinator.net', 'mailinator.org', 'mailinator2.com',
  'mailincubator.com', 'mailismagic.com', 'mailme.ir', 'mailme.lv', 'mailme24.com',
  'mailmetrash.com', 'mailmoat.com', 'mailms.com', 'mailnator.com', 'mailnesia.com',
  'mailnull.com', 'mailorg.org', 'mailpick.biz', 'mailproxsy.com', 'mailrock.biz',
  'mailsac.com', 'mailscrap.com', 'mailshell.com', 'mailsiphon.com', 'mailslite.com',
  'mailtemp.info', 'mailtothis.com', 'mailtrash.net', 'mailtv.net', 'mailzilla.com',
  'makemetheking.com', 'manybrain.com', 'mbx.cc', 'mega.zik.dj', 'meinspamschutz.de',
  'meltmail.com', 'messagebeamer.de', 'mezimages.net', 'ministryofspam.com',
 'mintemail.com', 'mjukglass.nu', 'mohmal.com', 'moncourrier.fr.nf', 'monemail.fr.nf',
 'monmail.fr.nf', 'msa.minsmail.com', 'mt2009.com', 'mt2014.com', 'mycard.net.ua',
 'mycleaninbox.net', 'mymail-in.net', 'mypacks.net', 'mypartyclip.de',
 'myphantomemail.com', 'myspaceinc.com', 'myspaceinc.net', 'myspaceinc.org',
 'myspamgourmet.com', 'mytempemail.com', 'mytrashmail.com', 'nabuma.com',
 'neomailbox.com', 'nepwk.com', 'nervmich.net', 'nervtmich.net', 'netmails.com',
 'netmails.net', 'netzidiot.de', 'neverbox.com', 'nice-4u.com', 'no-spam.ws',
 'nobulk.com', 'noclickemail.com', 'nogmailspam.info', 'nomail.pw', 'nomail.xl.cx',
 'nomail2me.com', 'nomorespamemails.com', 'nospam.ze.tc', 'nospam4.us',
 'nospamfor.us', 'nospamthanks.info', 'notmailinator.com', 'nowmymail.com',
 'nurfuerspam.de', 'nus.edu.sg', 'objectmail.com', 'obobbo.com', 'odnorazovoe.ru',
 'oneoffemail.com', 'onewaymail.com', 'onlatedotcom.info', 'online.ms',
 'opayq.com', 'ordinaryamerican.net', 'otherinbox.com', 'ovpn.to', 'owlpic.com',
 'pancakemail.com', 'pcusers.otherinbox.com', 'pjjkp.com', 'plexolan.de',
 'poczta.onet.pl', 'politikerclub.de', 'poofy.org', 'pookmail.com', 'privacy.net',
 'privatdemail.net', 'proxymail.eu', 'prtnx.com', 'putthisinyourspamdatabase.com',
 'qq.com', 'quickinbox.com', 'rcpt.at', 'reallymymail.com', 'recode.me',
 'recursor.net', 'recyclemail.dk', 'redchan.it', 'regbypass.com', 'regbypass.comsafe-mail.net',
 'rejectmail.com', 'reliable-mail.com', 'rhyta.com', 'rmqkr.net', 'royal.net',
 'rtrtr.com', 's0ny.net', 'safe-mail.net', 'safersignup.de', 'safetymail.info',
 'safetypost.de', 'sandelf.de', 'saynotospam.com', 'schafmail.de', 'schrott-email.de',
 'secretemail.de', 'secure-mail.biz', 'selfdestructingmail.com', 'selfdestructingmail.org',
 'sendspamhere.com', 'senseless-entertainment.com', 'shared-mail.de', 'shieldemail.com',
 'shiftmail.com', 'shitmail.me', 'shitware.nl', 'shmeriously.com', 'shortmail.net',
 'sibmail.com', 'sinnlos-mail.de', 'slapsfromlastnight.com', 'slaskpost.se',
 'smashmail.de', 'smellfear.com', 'snakemail.com', 'sneakemail.com', 'sofimail.com',
 'sofort-mail.de', 'sogetthis.com', 'soodonims.com', 'spam.la', 'spam.su',
 'spam4.me', 'spamail.de', 'spamarrest.com', 'spambob.com', 'spambob.net',
 'spambob.org', 'spambog.com', 'spambog.de', 'spambog.ru', 'spambox.info',
 'spambox.irishspringrealty.com', 'spambox.us', 'spamcannon.com', 'spamcannon.net',
 'spamcero.com', 'spamcon.org', 'spamcorptastic.com', 'spamcowboy.com',
 'spamcowboy.net', 'spamcowboy.org', 'spamday.com', 'spamex.com', 'spamfree.eu',
 'spamfree24.com', 'spamfree24.de', 'spamfree24.eu', 'spamfree24.info',
 'spamfree24.net', 'spamfree24.org', 'spamgourmet.com', 'spamgourmet.net',
 'spamgourmet.org', 'spamherelots.com', 'spamhereplease.com', 'spamhole.com',
 'spamify.com', 'spaminator.de', 'spamkill.info', 'spaml.de', 'spammotel.com',
 'spamobox.com', 'spamoff.de', 'spamslicer.com', 'spamspot.com', 'spamstack.net',
 'spamthis.co.uk', 'spamthisplease.com', 'spamtrail.com', 'spamtrap.co',
 'spamtrap.it', 'spamtroll.net', 'speed.1s.fr', 'spoofmail.de', 'squizzy.de',
 'ssoia.com', 'startkeys.com', 'stinkefinger.net', 'stop-my-spam.com',
 'stuffmail.de', 'sudolife.me', 'sudolife.net', 'sudomail.com', 'sudomail.net',
 'sudouser.com', 'sudouser.net', 'super-auswahl.de', 'supergreatmail.com',
 'supermailer.jp', 'superrito.com', 'superstachel.de', 'suremail.info', 'talkinator.com',
 'teewars.org', 'teleworm.com', 'teleworm.us', 'temp-mail.org', 'temp-mail.ru',
 'tempe-mail.com', 'tempemail.co.za', 'tempemail.com', 'tempemail.net',
 'tempinbox.co.uk', 'tempinbox.com', 'tempmail.eu', 'tempmail.it', 'tempmail.us',
 'tempmail2.com', 'tempmaildemo.com', 'tempmailer.com', 'tempmailer.de',
 'tempomail.fr', 'temporaryemail.net', 'temporaryforwarding.com',
 'temporaryinbox.com', 'temporarymailaddress.com', 'tempr.email', 'thankyou2010.com',
 'thisisnotmyrealemail.com', 'throwawayemailaddress.com', 'throam.com',
 'tilien.com', 'tmail.ws', 'tmailinator.com', 'toomail.biz', 'tradermail.info',
 'trash-mail.at', 'trash-mail.com', 'trash-mail.de', 'trash2009.com',
 'trashbox.eu', 'trashdevil.com', 'trashemail.de', 'trashmail.at', 'trashmail.com',
 'trashmail.de', 'trashmail.me', 'trashmail.net', 'trashmail.org', 'trashmail.ws',
 'trashmailer.com', 'trashymail.com', 'trashymail.net', 'trialmail.de',
 'trillianpro.com', 'turual.com', 'twinmail.de', 'tyldd.com', 'uggsrock.com',
 'umail.net', 'upliftnow.com', 'uplipht.com', 'uroid.com', 'us.af',
 'venompen.com', 'veryrealemail.com', 'vidchart.com', 'viralplays.com',
 'vpn.st', 'vsimcard.com', 'vubby.com', 'wasteland.rfc822.org', 'webemail.me',
 'weg-werf-email.de', 'wegwerf-emails.de', 'wegwerfadresse.de', 'wegwerfemail.com',
 'wegwerfemail.de', 'wegwerfmail.de', 'wegwerfmail.net', 'wegwerfmail.org',
 'wetob.com', 'wh4f.org', 'whyspam.me', 'willhackforfood.biz', 'willselfdestruct.com',
 'winemaven.info', 'wronghead.com', 'wuzupmail.net', 'x.ip6.li', 'xagloo.com',
 'xemaps.com', 'xents.com', 'xmaily.com', 'xoxy.net', 'yep.it', 'yopmail.com',
 'yopmail.fr', 'yopmail.net', 'yourdomain.com', 'ypmail.webarnak.fr.eu.org',
 'yuurok.com', 'z1p.biz', 'za.com', 'zehnminuten.de', 'zehnminutenmail.de',
 'zippymail.info', 'zoaxe.com', 'zoemail.net', 'zomg.info'
]);

// A comprehensive list of role-based prefixes
export const ROLE_BASED_PREFIXES = new Set([
  'abuse', 'academic', 'account', 'accounting', 'accounts', 'ad', 'admin', 'administration',
  'administrator', 'administrators', 'admins', 'adminteam', 'adv', 'advertising', 'advisor',
  'agency', 'all', 'all-employees', 'all-staff', 'all-students', 'all-users', 'alpha',
  'analyst', 'answers', 'anti-spam', 'antispam', 'api', 'app', 'application', 'applications',
  'apply', 'apps', 'archives', 'art', 'artist', 'ask', 'assistance', 'associates', 'athletics',
  'auto', 'auto-reply', 'autoresponder', 'available', 'backup', 'bank', 'billing', 'billings',
 'board', 'book', 'booking', 'bookings', 'books', 'business', 'buy', 'ca', 'career', 'careers',
  'ceo', 'cfo', 'chairman', 'channel', 'CIO', 'clients', 'clinic', 'cloud', 'co-op', 'coach',
  'com', 'comments', 'commercial', 'communications', 'community', 'comp', 'company',
  'compliance', 'computer', 'comunicacao', 'comunicaciones', 'connect', 'consorzio', 'consult',
  'consultant', 'consulting', 'contact', 'contact-us', 'contacte', 'contacto', 'contactus',
  'contracts', 'contribute', 'coordinator', 'copyright', 'corp', 'corporate', 'correspondence',
  'courrier', 'creative', 'crew', 'csc', 'csr', 'customer', 'customer-service',
  'customerservice', 'customersupport', 'data', 'database', 'deals', 'dean', 'dev',
  'developer', 'developers', 'development', 'devnull', 'devops', 'digital', 'direct',
  'director', 'directors', 'directory', 'discuss', 'dispatch', 'dns', 'docs', 'doctor',
  'domain', 'domains', 'download', 'downloads', 'dreamteam', 'ecommerce', 'editor',
  'editorial', 'editors', 'education', 'email', 'emergency', 'employee', 'employees', 'employment',
 'engineering', 'enquiries', 'enquiry', 'enterprise', 'env', 'errors', 'estate', 'event',
  'events', 'everyone', 'exec', 'executive', 'expert', 'experts', 'export', 'facebook',
  'facilities', 'facility', 'faculty', 'family', 'faq', 'faqs', 'farm', 'feedback', 'finance',
  'financial', 'food', 'football', 'form', 'forms', 'forum', 'forums', 'founder', 'founders',
  'free', 'ftp', 'fun', 'funds', 'gallery', 'games', 'general', 'get', 'gettingstarted', 'gifts',
  'global', 'gmail', 'gov', 'grants', 'group', 'groups', 'guest', 'guidance', 'guides', 'head',
  'head.office', 'headoffice', 'health', 'hello', 'help', 'help-desk', 'helpdesk', 'home',
 'hosting', 'hostmaster', 'hotel', 'house', 'hr', 'human-resources', 'humanresources', 'iana',
  'idea', 'ideas', 'if', 'info', 'inform', 'information', 'informativo', 'infra', 'infrastructure',
 'institute', 'instructor', 'integration', 'integrations', 'interno', 'internet', 'interns',
  'internship', 'invest', 'investor', 'investorrelations', 'investors', 'invoice', 'invoices',
 'invoicing', 'ir', 'irc', 'is', 'isp', 'issues', 'it', 'it-support', 'itsupport', 'job', 'jobs',
  'join', 'joke', 'journal', 'junk', 'kontakt', 'kontor', 'lab', 'labor', 'labs', 'law',
  'lawyer', 'lead', 'leads', 'legal', 'library', 'licensing', 'list', 'list-request',
  'listproc', 'lists', 'listserv', 'login', 'logistics', 'love', 'lunch', 'maildaemon',
  'mailer-daemon', 'mailerdaemon', 'main', 'maintenance', 'majordomo', 'management',
  'manager', 'managers', 'map', 'market', 'marketing', 'master', 'math', 'media', 'meet',
  'member', 'members', 'membership', 'mentors', 'metrics', 'mgmt', 'minister', 'ministry',
  'misc', 'mkt', 'mobile', 'monitor', 'monitoring', 'news', 'newsletter', 'newsletters',
  'noc', 'no-reply', 'noreply', 'no-spam', 'nospam', 'notes', 'notifications', 'null',
  'office', 'official', 'online', 'operations', 'ops', 'order', 'orders', 'org', 'organization',
  'outreach', 'owner', 'owners', 'paris', 'partner', 'partners', 'partnerships', 'pastor',
 'people', 'personnel', 'phish', 'phishing', 'photo', 'photos', 'physician', 'pilot', 'plan',
  'planning', 'pm', 'police', 'policy', 'post', 'postbox', 'postmaster', 'pre-order', 'premium',
  'president', 'press', 'prime', 'principal', 'privacy', 'private', 'prod', 'product',
  'production', 'products', 'program', 'programs', 'project', 'projects', 'promo', 'promotions',
  'public', 'purchase', 'purchases', 'purchasing', 'python', 'qa', 'questions', 'random',
  'realestate', 'reception', 'recruit', 'recruiter', 'recruiters', 'recruiting', 'recruitment',
 'reference', 'register', 'registrar', 'registration', 'registrations', 'relations', 'release',
  'releases', 'remove', 'rental', 'rentals', 'report', 'reports', 'request', 'requests',
  'research', 'reservations', 'residents', 'returns', 'review', 'reviews', 'rfc', 'rnd',
  'roadmin', 'root', 'rr', 'rsvp', 'sale', 'sales', 'sample', 'samples', 'school', 'schools',
  'science', 'sde', 'secretary', 'security', 'sell', 'seller', 'seminar', 'send', 'senior',
 'server', 'service', 'services', 'shop', 'shopping', 'social', 'software', 'solution',
  'solutions', 'somebody', 'someone', 'spam', 'staff', 'start', 'state', 'static', 'stats',
  'student', 'students', 'studio', 'subscribe', 'subscriptions', 'suggestions', 'supervisor',
 'support', 'support-team', 'supportteam', 'survey', 'surveys', 'sys', 'sysadmin', 'system',
  'systems', 'talent', 'task', 'tasks', 'teacher', 'teachers', 'team', 'team-leaders',
  'teamleaders', 'teams', 'tech', 'technical', 'technology', 'test', 'testing', 'tests',
  'tickets', 'todo', 'tool', 'tools', 'trade', 'train', 'trainer', 'training', 'travel',
  'treasurer', 'tribe', 'trustee', 'undisclosed-recipients', 'unsubscribe', 'update',
  'updates', 'urgent', 'usa', 'usage', 'user', 'users', 'util', 'valid', 'validation',
  'vc', 'vendas', 'vendor', 'vendors', 'venture', 'verify', 'video', 'volunteer', 'volunteers',
  'vpn', 'web', 'web-master', 'webdev', 'webinar', 'webinars', 'webmaster', 'website',
  'welcome', 'whois', 'win', 'work', 'workshop', 'www'
]);

export const FREE_DOMAINS = new Set([
    'gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'hotmail.co.uk', 'hotmail.fr',
    'msn.com', 'yahoo.fr', 'wanadoo.fr', 'orange.fr', 'comcast.net', 'yahoo.co.uk',
    'yahoo.com.br', 'yahoo.co.in', 'live.com', 'rediffmail.com', 'free.fr',
    'gmx.de', 'web.de', 'yandex.ru', 'ymail.com', 'libero.it', 'outlook.com',
    'uol.com.br', 'bol.com.br', 'mail.ru', 'cox.net', 'hotmail.it', 'sbcglobal.net',
    'sfr.fr', 'live.fr', 'verizon.net', 'live.co.uk', 'googlemail.com', 'yahoo.es',
    'ig.com.br', 'live.nl', 'bigpond.com', 'terra.com.br', 'yahoo.it', 'neuf.fr',
    'yahoo.de', 'alice.it', 'rocketmail.com', 'att.net', 'laposte.net', 'facebook.com',
    'bellsouth.net', 'yahoo.in', 'hotmail.es', 'charter.net', 'yahoo.ca', 'yahoo.com.au',
    'rambler.ru', 'hotmail.de', 'tiscali.it', 'shaw.ca', 'yahoo.co.jp', 'sky.com',
    'earthlink.net', 'optonline.net', 'freenet.de', 't-online.de', 'aliceadsl.fr',
    'virgilio.it', 'home.nl', 'qq.com', 'telenet.be', 'me.com', 'yahoo.com.ar',
    'tiscali.co.uk', 'yahoo.com.mx', 'voila.fr', 'gmx.net', 'mail.com', 'planet.nl',
    'tin.it', 'live.it', 'ntlworld.com', 'arcor.de', 'yahoo.co.id', 'frontiernet.net',
    'hetnet.nl', 'live.com.au', 'yahoo.com.sg', 'zonnet.nl', 'club-internet.fr',
    'juno.com', 'optusnet.com.au', 'blueyonder.co.uk', 'bluewin.ch', 'skynet.be',
    'sympatico.ca', 'windstream.net', 'mac.com', 'centurytel.net', 'chello.nl',
    'live.ca', 'bigpond.net.au', 'protonmail.com'
]);

const COMMON_TYPOS: Record<string, string> = {
    'gnail.com': 'gmail.com',
    'gamil.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'yaho.com': 'yahoo.com',
    'yahho.com': 'yahoo.com',
    'hotmal.com': 'hotmail.com',
    'hotmial.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outlock.com': 'outlook.com'
};

const getDomainFromEmail = (email: string): string | null => {
    if (typeof email !== 'string' || !email.includes('@')) {
        return null;
    }
    return email.split('@')[1].toLowerCase();
};

const getPrefixFromEmail = (email: string): string | null => {
    if (typeof email !== 'string' || !email.includes('@')) {
        return null;
    }
    return email.split('@')[0].toLowerCase();
}

const checkTypo = (domain: string): string | null => {
    return COMMON_TYPOS[domain] || null;
}

export const validate = async (
    rows: Record<string, any>[], 
    emailColumn: string,
    onProgress: (progress: { good: number, risky: number, bad: number, total: number, data: Record<string, any>[] }) => void
): Promise<{ good: number; risky: number; bad: number; total: number; data: Record<string, any>[] }> => {
    let good = 0;
    let risky = 0;
    let bad = 0;
    const total = rows.length;
    const validatedData: Record<string, any>[] = [];

    // Step 1: Pre-validation checks (syntax, empty, typo) and domain collection
    const validRowsToProcess: { row: Record<string, any>; email: string; domain: string }[] = [];
    const domainsToValidate = new Set<string>();

    for (const row of rows) {
        const email = String(row[emailColumn] || '').trim();
        if (!email) {
            bad++;
            validatedData.push({ ...row, Status: 'Bad', Notes: 'Missing email', Category: 'Invalid' });
            continue;
        }

        if (!EMAIL_REGEX.test(email)) {
            bad++;
            validatedData.push({ ...row, Status: 'Bad', Notes: 'Invalid syntax', Category: 'Invalid' });
            continue;
        }

        const domain = getDomainFromEmail(email);
        if (!domain) {
            bad++;
            validatedData.push({ ...row, Status: 'Bad', Notes: 'Invalid domain', Category: 'Invalid' });
            continue;
        }

        const typoSuggestion = checkTypo(domain);
        if (typoSuggestion) {
            bad++;
            validatedData.push({ ...row, Status: 'Bad', Notes: `Typo, did you mean ${typoSuggestion}?`, Category: 'Invalid' });
            continue;
        }
        
        validRowsToProcess.push({ row, email, domain });
        domainsToValidate.add(domain);
    }
    
    // Step 2: Batch validate domains for MX records and catch-all status
    let domainValidationMap: Record<string, { hasMx: boolean; isCatchAll?: boolean }> = {};
    if (domainsToValidate.size > 0) {
        try {
            const response = await fetch('/api/validate-domains', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domains: Array.from(domainsToValidate) }),
            });
            if (response.ok) {
                const result = await response.json();
                domainValidationMap = result.validationMap;
            } else {
                 throw new Error('Domain validation API failed');
            }
        } catch (error) {
             console.error("MX validation failed for all domains:", error);
             validRowsToProcess.forEach(item => {
                bad++;
                validatedData.push({ ...item.row, Status: 'Bad', Notes: 'Domain check failed', Category: 'Invalid' });
             });
             onProgress({ good, risky, bad, total, data: validatedData });
             return { good, risky, bad, total, data: validatedData };
        }
    }

    // Step 3: Final classification
    for (const { row, email, domain } of validRowsToProcess) {
        let status: 'Good' | 'Risky' | 'Bad' = 'Good';
        let notes = '';
        let category = FREE_DOMAINS.has(domain) ? 'Free' : 'Business';

        const domainInfo = domainValidationMap[domain];

        if (!domainInfo || !domainInfo.hasMx) {
            status = 'Bad';
            notes = 'No MX Record';
            category = 'Invalid';
        } else if (DISPOSABLE_DOMAINS.has(domain)) {
            status = 'Bad';
            notes = 'Disposable domain';
            category = 'Invalid';
        } else {
            const prefix = getPrefixFromEmail(email);
            if (prefix && ROLE_BASED_PREFIXES.has(prefix)) {
                status = 'Risky';
                notes = 'Role-based email';
            }
        }
        
        if (status === 'Good') {
            // This is a simplified catch-all check based on common patterns.
            // A true catch-all check requires an SMTP connection.
            const commonCatchAllPrefixes = ['info', 'contact', 'support', 'sales', 'admin'];
            const prefix = getPrefixFromEmail(email);
            if (prefix && commonCatchAllPrefixes.includes(prefix)) {
                 status = 'Risky';
                 notes = 'Potential catch-all (role-based)';
            }
        }

        if (status === 'Good') good++;
        else if (status === 'Risky') risky++;
        else bad++;

        validatedData.push({ ...row, Status: status, Notes: notes, Category: category });
        
        if ((good + risky + bad) % 10 === 0 || (good + risky + bad) === total) {
            onProgress({ good, risky, bad, total, data: validatedData });
        }
    }

    // Final progress report
    const finalValidatedData = [...validatedData, ...rows.filter(r => !validatedData.some(vr => vr[emailColumn] === r[emailColumn]))];
    onProgress({ good, risky, bad, total, data: finalValidatedData });

    return { good, risky, bad, total, data: finalValidatedData };
};
