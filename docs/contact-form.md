# The contact form

The form on `/contact/` posts to `enquiry.php`, a single file on your own
hosting. There is no account, no dashboard and no third party. Enquiries arrive
in your mailbox, and a copy is written to a file on the server as a backstop.

This replaced Formspree on 28 October 2026. Formspree needed an account and a
verified recipient address before it would deliver anything, and until that was
done it accepted submissions and dropped them silently.

---

## What to do after uploading

Two checks, both of which take under a minute.

### 1. Does PHP run?

Open `https://trevorgmenyatsogroup.co.za/enquiry.php` in a browser.

You should land on the contact page. That is the handler doing its job: it only
accepts a POST, so anything else gets sent back to the form.

If instead you see a page of code starting with `<?php`, PHP is not enabled for
the account, and every enquiry will be lost. In cPanel, go to **Select PHP
Version** and set it to any 7.4 or newer. If you see a blank page or a 500, look
in cPanel's **Errors** page, which will name the line.

### 2. Does the mailbox exist?

In cPanel, **Email Accounts**. There must be a real mailbox or forwarder for:

```
info@trevorgmenyatsogroup.co.za
```

This is the one that matters. If the address does not exist, the mail server
accepts the message and then discards it, which is exactly the symptom
Formspree was producing. Create it as a full mailbox, or as a forwarder to the
Gmail address you actually read.

---

## Sending a test

Fill the form in on the live site and submit it yourself. That is the whole
test, and it is the only one worth running, because it exercises the same path
a real enquiry takes.

Wait more than three seconds between the page loading and pressing the button.
Submitting faster than that trips the time trap and you will be told to wait,
which is the spam check working rather than a fault.

You should land on `/contact/thank-you/` and have mail within a minute.

If you land on `/contact/could-not-send/`, the handler ran but the mail server
refused the message. The enquiry is still on disk, see below. That is almost
always the mailbox not existing: go back to check 2.

---

## Where enquiries are stored

Every submission is written to a file **before** the mail is attempted, so a
mail problem cannot lose one:

```
/home/<your cPanel account>/tgm-enquiries.jsonl
```

One line of JSON per enquiry. It sits one level above `public_html`, so no URL
reaches it. Open it in cPanel's File Manager, or download it.

**It holds personal information.** The privacy policy promises enquiries are
kept for 24 months and then deleted, and that covers this file as well as the
mailbox. Clear old lines out of it when you clear the mailbox.

---

## Changing things

Everything adjustable is in the first forty lines of `public/enquiry.php`.

**To deliver to a second address**, uncomment the second line of
`$RECIPIENTS`. Both addresses must be real mailboxes or forwarders in cPanel.
Nothing needs verifying anywhere.

```php
$RECIPIENTS = [
    'info@trevorgmenyatsogroup.co.za',
    'business@trevorgmenyatsogroup.co.za',
];
```

Note that `info@` is the only address shown to visitors anywhere on the site.
Delivering to both is fine; publishing both is a decision that was already taken
the other way.

**Do not put the enquirer's address in `$FROM`.** It has to stay a mailbox on
this domain. Mail claiming to come from someone else's address is forgery, and
filters treat it as such. Their address is already in `Reply-To`, so hitting
reply in your mail client replies to them.

---

## What protects it

- **Honeypot.** A field no person can see. Anything in it is a bot, and the bot
  is shown the thank-you page so it does not come back and try differently.
- **Time trap.** Submissions in under three seconds are refused in the browser.
- **Rate limit.** Five enquiries per hour per connection.
- **Server-side validation.** Name, email, organisation, problem and the POPIA
  consent are all checked again by the handler, so a bot posting straight at the
  URL cannot skip the consent tick.
- **No header injection.** Control characters are stripped from everything
  before it goes near a mail header, which is what stops a contact form being
  turned into somebody else's spam relay.
- **Content Security Policy.** `form-action 'self'` in `.htaccess`, so the
  browser will not let any form on this site post anywhere but this domain.

---

## If you ever move off cPanel

Cloudflare Pages and Netlify do not run PHP. The form would post to a file that
is served as text instead of executed, and every enquiry would vanish without an
error. The equivalent there is a Cloudflare Worker or a Netlify Function doing
the same job. Deal with it before the move, not after.
