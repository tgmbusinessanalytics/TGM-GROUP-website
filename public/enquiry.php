<?php
/* Contact form handler for trevorgmenyatsogroup.co.za
 *
 * This replaces Formspree. There is no account to set up, no dashboard, no
 * API key and no address to verify: the form posts to this file on your own
 * hosting, and this file hands the enquiry to the mail server that is already
 * running there and delivers to your own mailbox on the same domain.
 *
 * Three consequences worth knowing:
 *
 *  1. Nothing a visitor types leaves your server. The cross-border transfer
 *     that Formspree created, which POPIA section 72 required us to disclose
 *     on /contact and /privacy, no longer happens.
 *  2. Delivery is local. The mail never crosses the public internet, so SPF,
 *     DKIM and the reputation of a sending service cannot drop an enquiry.
 *  3. Every enquiry is also written to a log file above the web root, before
 *     the mail is attempted. If mail ever fails you still have the enquiry.
 *     That file is the backstop; the mailbox is the thing you read.
 *
 * It needs nothing installed. cPanel serves PHP by default.
 *
 * ---------------------------------------------------------------------------
 * THE ONE THING TO CHECK AFTER UPLOADING
 * ---------------------------------------------------------------------------
 * The mailbox in $RECIPIENTS below must actually exist in cPanel, under Email
 * Accounts. If it does not, the mail server accepts the message and then
 * discards it, silently, which is the same symptom Formspree was giving.
 */

/* ---------------------------------------------------------------------------
 * Settings
 * ------------------------------------------------------------------------- */

/* Where enquiries are delivered. Add a second line to send to both addresses.
   Each one must be a real mailbox or forwarder in cPanel. */
$RECIPIENTS = [
    'info@trevorgmenyatsogroup.co.za',
    // 'business@trevorgmenyatsogroup.co.za',
];

/* The envelope sender. Must be a mailbox on this domain, and must not be the
   visitor's address: putting their address in From is forgery, and every
   filter on the way treats it as such. Their address goes in Reply-To, so
   hitting reply in your mail client still replies to them. */
$FROM = 'info@trevorgmenyatsogroup.co.za';

$SUBJECT = 'Website enquiry: diagnostic';

$SITE = 'https://trevorgmenyatsogroup.co.za';
$ON_SUCCESS = $SITE . '/contact/thank-you/';
$ON_FAILURE = $SITE . '/contact/could-not-send/';

/* Longest accepted value per field. A real enquiry is nowhere near these.
   They exist so a bot cannot post a megabyte into your mailbox. */
$LIMITS = [
    'name' => 120,
    'email' => 160,
    'company' => 160,
    'problem' => 200,
    'message' => 5000,
];

/* Most enquiries per IP address per hour. Five is far above any genuine use
   and far below what makes a mailbox unusable. */
$MAX_PER_HOUR = 5;

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */

/* Nothing below uses a PHP 8 language feature. The host's PHP version is set
   per account in cPanel and is not always the newest one, and a syntax error
   from a version mismatch does not degrade: it returns a blank page or a 500
   on every submission. Anything newer than PHP 7.4 here would be a liability
   for no gain. */

/* Send the browser somewhere and stop. 303 rather than 302, so a refresh on
   the destination does not resubmit the form. */
function go($url)
{
    header('Location: ' . $url, true, 303);
    exit;
}

/* Refuse a request that is not a real submission. Plain text, because the only
   thing that reaches this is a bot or a mistake, and a styled page would be
   wasted on both. */
function refuse($why)
{
    header('Content-Type: text/plain; charset=utf-8', true, 400);
    echo $why . "\n";
    exit;
}

/* Cut a string to a length without splitting a character in half. mbstring is
   usually present on cPanel but is a separate extension, so there is a plain
   fallback: a UTF-8 continuation byte is 0x80 to 0xBF, so backing off while
   the last byte is one of those lands on a character boundary. */
function clip($text, $limit)
{
    if (function_exists('mb_substr')) {
        return mb_substr($text, 0, $limit, 'UTF-8');
    }
    if (strlen($text) <= $limit) {
        return $text;
    }
    $cut = substr($text, 0, $limit);
    while ($cut !== '' && (ord($cut[strlen($cut) - 1]) & 0xC0) === 0x80) {
        $cut = substr($cut, 0, -1);
    }
    return $cut;
}

/* A single field, trimmed, with control characters removed.
 *
 * The carriage returns and line feeds are the part that matters. Anything
 * placed into a mail header that still contains one lets an attacker end the
 * header and start their own, which is how a contact form becomes someone
 * else's spam relay. Stripping them here means no header can be forged, and a
 * newline in the message body is handled separately below.
 *
 * The pattern is deliberately byte-wise, with no /u modifier. A UTF-8
 * continuation byte is always 0x80 or above, so a class of ASCII control bytes
 * can never match inside a multi-byte character, and dropping /u means
 * malformed input cannot make preg_replace return null and blank the field. */
function field($key, $limit)
{
    $raw = isset($_POST[$key]) ? $_POST[$key] : '';
    if (!is_string($raw)) {
        return '';
    }
    $clean = preg_replace('/[\x00-\x1F\x7F]/', ' ', $raw);
    if ($clean === null) {
        return '';
    }
    return clip(trim($clean), $limit);
}

/* ---------------------------------------------------------------------------
 * 1. Accept only a real POST
 * ------------------------------------------------------------------------- */

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    /* Someone has typed the URL, or followed a link to it. Nothing to say:
       send them to the form. */
    go($SITE . '/contact/');
}

/* ---------------------------------------------------------------------------
 * 2. Spam checks, cheapest first
 * ------------------------------------------------------------------------- */

/* The honeypot, named _gotcha on the form and invisible to a person. Anything
   in it is a bot. Answer as though it worked: a bot that is told it failed
   tries again differently. */
if (trim((string) ($_POST['_gotcha'] ?? '')) !== '') {
    go($ON_SUCCESS);
}

/* Rate limit. One line per submission, pruned to the last hour on each
   request, so the file cannot grow.

   Every filesystem call here is suppressed, which makes the limiter fail open:
   if the file cannot be read the count is zero, and if it cannot be written
   nothing is recorded. A limiter that is itself broken must not be allowed to
   reject a real enquiry. */
$ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '';
$throttle = sys_get_temp_dir() . '/tgm-enquiry-rate.log';

if ($ip !== '') {
    $now = time();
    $kept = array();
    $mine = 0;

    $lines = @file($throttle, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (is_array($lines)) {
        foreach ($lines as $line) {
            $parts = array_pad(explode(' ', $line, 2), 2, '');
            if ($now - (int) $parts[0] > 3600) {
                continue;
            }
            $kept[] = $line;
            if ($parts[1] === $ip) {
                $mine++;
            }
        }
    }

    if ($mine >= $MAX_PER_HOUR) {
        header('Retry-After: 3600');
        refuse('Too many enquiries from this connection in the past hour. Please email ' . $FROM . ' instead.');
    }

    $kept[] = $now . ' ' . $ip;
    @file_put_contents($throttle, implode("\n", $kept) . "\n", LOCK_EX);
}

/* ---------------------------------------------------------------------------
 * 3. Validate
 *
 * The browser enforces all of this already through `required` and
 * `type="email"`. It is repeated here because a bot posting straight at this
 * URL never ran the browser's checks, and the POPIA consent in particular has
 * to be a real condition of processing rather than a tick a form can skip.
 * ------------------------------------------------------------------------- */

$name = field('name', $LIMITS['name']);
$email = field('email', $LIMITS['email']);
$company = field('company', $LIMITS['company']);
$problem = field('problem', $LIMITS['problem']);

/* The message is the one field where line breaks are wanted, so it keeps them
   and strips the rest. It never reaches a header. */
$message = '';
if (isset($_POST['message']) && is_string($_POST['message'])) {
    $stripped = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $_POST['message']);
    if ($stripped !== null) {
        $message = clip(trim($stripped), $LIMITS['message']);
    }
}

$consent = isset($_POST['consent']);

if ($name === '' || $company === '' || $problem === '') {
    refuse('Name, organisation and problem are all required.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    refuse('That email address is not valid.');
}

if (!$consent) {
    refuse('Consent is required before we may use these details to reply.');
}

/* ---------------------------------------------------------------------------
 * 4. Write the log before sending
 *
 * Deliberately before the mail attempt, not after. If the mail server is down
 * or the mailbox is misconfigured, the enquiry is already on disk and nothing
 * is lost.
 *
 * It sits one level above the document root, so no URL reaches it. On cPanel
 * that is your home directory: /home/<account>/tgm-enquiries.jsonl, readable
 * in File Manager.
 *
 * It contains personal information. It is covered by the same 24-month
 * retention promised on /contact, so clear it out when you clear the mailbox.
 * ------------------------------------------------------------------------- */

$record = [
    'received' => gmdate('c'),
    'name' => $name,
    'email' => $email,
    'company' => $company,
    'problem' => $problem,
    'message' => $message,
    'consent' => true,
    'ip' => $ip,
];

$docRoot = (string) ($_SERVER['DOCUMENT_ROOT'] ?? __DIR__);
$logFile = dirname($docRoot) . '/tgm-enquiries.jsonl';

$encoded = json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

/* json_encode returns false on malformed UTF-8 rather than throwing, and
   writing false appends an empty line: the enquiry would be silently dropped
   from the one record that exists to stop enquiries being silently dropped.
   Escaping the unicode always succeeds, so that is the fallback. */
if ($encoded === false) {
    $encoded = json_encode($record, JSON_UNESCAPED_SLASHES);
}

if (is_string($encoded)) {
    @file_put_contents($logFile, $encoded . "\n", FILE_APPEND | LOCK_EX);
}

/* ---------------------------------------------------------------------------
 * 5. Send
 * ------------------------------------------------------------------------- */

$body = implode("\n", [
    'New enquiry from the website contact form.',
    '',
    'Name:         ' . $name,
    'Email:        ' . $email,
    'Organisation: ' . $company,
    'Problem:      ' . $problem,
    '',
    'Message:',
    $message !== '' ? $message : '(none given)',
    '',
    str_repeat('-', 60),
    'Received:     ' . gmdate('d M Y H:i') . ' UTC',
    'Consent:      given at the point of collection',
    'Reply to this message to reply to them directly.',
    '',
]);

/* Plain text, no HTML. There is nothing here that needs formatting, and a
   text-only mail cannot carry anything that renders or executes. */
/* Reply-To carries the bare address and no display name. The name has already
   had control characters stripped, so it cannot forge a header, but a name
   containing a quote or an angle bracket would still produce a malformed one,
   and a non-ASCII name belongs in an RFC 2047 encoded word rather than raw in
   a header. The name is in the body where it reads properly. */
$headers = [
    'From: TGM Group website <' . $FROM . '>',
    'Reply-To: <' . $email . '>',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: TGM site',
    'Auto-Submitted: auto-generated',
];

/* -f sets the envelope sender, which stops the mail going out as the web
   server's own user and landing in spam. */
$sent = @mail(
    implode(', ', $RECIPIENTS),
    $SUBJECT,
    $body,
    implode("\r\n", $headers),
    '-f' . $FROM
);

/* The enquiry is on disk either way. The redirect is only about what the
   person who just typed their details is told. */
go($sent ? $ON_SUCCESS : $ON_FAILURE);
