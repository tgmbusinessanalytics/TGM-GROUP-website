# Legal review brief — TGM Group website

**For:** the reviewing attorney
**Prepared by:** the site build, for Trevor G. Menyatso
**Date prepared:** 26 September 2026

This brief exists so the review is about judgement rather than fact-finding.
Everything already established is set out below, so it does not need to be
asked for. What remains is a list of specific questions, each attached to the
page and clause it affects.

**Nothing in this brief is legal advice.** It was drafted by a non-lawyer from
the company's own registration documents. Every statutory reference is offered
as a pointer to check, not as a statement of the law.

---

## The three documents

All are live and publicly reachable.

| Page | URL |
|---|---|
| Privacy policy | https://trevorgmenyatsogroup.co.za/privacy/ |
| Terms of use | https://trevorgmenyatsogroup.co.za/terms/ |
| PAIA manual | https://trevorgmenyatsogroup.co.za/paia/ |

Each currently displays a visible banner reading **"Draft: awaiting legal
review."** That banner is removed only on your sign-off.

Source files, if you would rather mark up text than a web page:
`src/pages/privacy.astro`, `src/pages/terms.astro`, `src/pages/paia.astro`.

---

## Established facts — no need to request these

Taken from the CIPC registration certificate (13 August 2025, tracking
9441298770) and the Information Regulator's Information Officer Registration
Certificate (14 August 2025).

| | |
|---|---|
| Registered name | Trevor Goitsemodimo Menyatso Group (Pty) Ltd |
| Trading as | TGM Group |
| Registration number | 2025/628427/07 |
| Date of registration | 13 August 2025 |
| Entity type | Private company |
| Financial year end | February |
| Registered office, postal address and location of records | 260 Surrey Avenue, Ferndale, Randburg, Gauteng, 2194 |
| Directors | Trevor Goitsemodimo Menyatso; Siyabonga Dube (both appointed 13 August 2025) |
| Information officer | Siyabonga Dube, appointed 13 August 2025 |
| Registered with the Information Regulator | Yes. Registration number 2025-060527, registered 13 August 2025 |
| Public contact | info@trevorgmenyatsogroup.co.za / 081 517 1016 |

### Two discrepancies you should know about

1. **A mandate letter dated 13 August 2025 describes Trevor as "the sole
   director".** The CIPC record shows two active directors. The website follows
   CIPC. The letter is also an unfilled template, with its purpose field still
   showing placeholder text. It probably needs withdrawing or correcting.

2. **The information officer is Siyabonga Dube, not Trevor**, who is the public
   face of the business. Worth confirming this is deliberate, since the
   information officer carries personal accountability under POPIA.

### What the business actually does with personal information

- The website is static. No analytics, no advertising trackers, no cookies set
  by us, no third-party scripts.
- One enquiry form. Fields: name, work email, organisation, a problem category,
  an optional message, and an express consent checkbox.
- The form is processed by **Formspree, Inc., which stores submissions in the
  United States** and forwards them to `info@`.
- Email for that address is handled by the mail platform attached to the domain
  registration. **The operating company and its storage location are not yet
  confirmed** (MX points to `mx1.tld-mx.com`).
- Stated retention: enquiries not leading to work, 24 months. Engagement
  records, an unconfirmed period.
- There are no employees beyond the two directors, and no clients named
  publicly.

---

## Questions for review

### Privacy policy

1. **Retention periods.** The policy states 24 months for unsuccessful
   enquiries. That figure was chosen by the business, not derived from any
   requirement. Is it defensible, and what period should apply to engagement
   records given company law and tax record-keeping obligations?

2. **Cross-border transfer.** Formspree stores submissions in the United
   States. The policy relies on the data subject's consent, via the required
   checkbox, as the basis under POPIA section 72. Please confirm that reliance
   is correct and sufficiently expressed, and whether anything further is
   needed.

3. **Point-of-collection notice.** The transfer is disclosed both in the policy
   and on the contact form itself, on the view that section 18 requires
   notification when information is collected. Is the wording adequate?

4. **Operator arrangements.** POPIA section 21 contemplates a written contract
   with an operator. Formspree is engaged on standard online terms. Is that
   sufficient, or is a specific agreement needed?

5. **Email host.** Still unnamed in the policy, pending confirmation of the
   provider and where it stores mail. Flagged as a placeholder.

6. **Security breach.** The policy commits to notifying data subjects and the
   Regulator. Should it say more about timing or method?

### Terms of use

7. **Limitation of liability.** Deliberately left as `[Attorney to draft]`.
   Nothing was drafted, on the view that a copied clause is worse than none.
   Please draft one appropriate to a consulting practice of this size, bearing
   in mind the Consumer Protection Act where clients are juristic persons below
   the threshold.

8. **ECTA section 43 disclosures.** Now complete from the CIPC certificate.
   Please confirm nothing required is missing.

9. **Past results.** The terms state that any published figures name the
   client, sector and period and are not predictions. No figures are published
   yet. Is that framing adequate for when they are?

### PAIA manual

10. **Overall compliance with section 51.** Please compare against the
    Regulator's own
    [PAIA Manual Template for a Private Body](https://inforegulator.org.za/wp-content/uploads/2020/07/PAIA-Manual-Template-Private-Body.pdf)
    and identify anything missing or wrongly stated.

11. **The records schedule (section 4).** The listed categories are indicative
    and have not been confirmed against what the business actually keeps. This
    is the largest remaining gap.

12. **Deputy information officer.** None designated. Is one required at this
    headcount?

13. **Remedies against a private body.** The manual currently points a
    dissatisfied requester to a complaint to the Regulator on Form 5, or to
    court. Please confirm, and confirm whether an internal appeal applies to a
    private body at all.

14. **Fees.** The manual refers to the prescribed fees without reproducing
    them. Should the current schedule be set out in full?

15. **Submission to the Regulator.** The information officer is registered.
    Whether the manual itself must also be submitted, and whether that has been
    done, is unresolved.

16. **Availability.** The manual is on the website. Is anything further needed
    at the registered office, or in additional languages?

---

## What would be most useful back

1. Marked-up text for anything that must change, with the reason.
2. A drafted limitation of liability for the terms.
3. Confirmation of the retention periods, so the placeholders can be filled.
4. A yes or no on whether each page may have its "awaiting legal review" banner
   removed.

Anything you sign off gets its banner removed and the sign-off date recorded on
the page.

## Practical note

The three pages are already live. If anything on them is actively wrong rather
than merely incomplete, say so first and it will be corrected or the page taken
down the same day, ahead of the wider review.
