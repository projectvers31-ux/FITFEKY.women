import type { Metadata } from "next";
import { PageShell, PageHeading, PageP, PageList, PageMeta } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | FitFeky",
  description:
    "How FitFeky collects, uses and protects your personal information. We collect minimal data, use it only to improve your experience, and never sell it.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <PageShell
      kicker="Your data, your rights"
      title="Privacy Policy"
      subtitle="We collect the minimum data needed to run the site, we use it only to improve your experience, and we never sell it."
    >
      <PageMeta updated="June 2026" />

      <PageP>
        This Privacy Policy explains how FitFeky (&ldquo;we&rdquo;,
        &ldquo;us&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses and
        safeguards your information when you visit fitfeky.com (the
        &ldquo;Site&rdquo;). We are committed to protecting your privacy and
        complying with the California Consumer Privacy Act (CCPA), the
        California Online Privacy Protection Act (CalOPPA) and the EU General
        Data Protection Regulation (GDPR) where applicable.
      </PageP>

      <PageHeading id="information-we-collect">Information we collect</PageHeading>

      <h3>Information you provide directly</h3>
      <PageList>
        <><strong>Email address</strong> — only if you subscribe to our newsletter. We use it solely to send you our weekly editorial email and product picks.</>
        <><strong>Search queries</strong> — the text you type into our search box is processed in your browser to filter products; it is not sent to or stored on our servers.</>
        <><strong>Calculator inputs</strong> — measurements you enter into our BMI, body fat, calorie burn or home gym planner tools are processed entirely in your browser and never transmitted to us.</>
      </PageList>

      <h3>Information collected automatically</h3>
      <PageList>
        <><strong>Cookies and similar technologies</strong> — we use a minimal set of first-party cookies for theme preference (light/dark mode) and basic analytics. We do not use third-party advertising cookies.</>
        <><strong>Log data</strong> — like most websites, our hosting provider records IP addresses, browser type, referring URLs and pages visited. This is used only for security, debugging and aggregate traffic analysis.</>
        <><strong>Affiliate tracking</strong> — when you click a product link, Amazon&rsquo;s affiliate tag (<code>tag=fitfeky-20</code>) is passed so Amazon can attribute any purchase to us. Amazon sets its own cookies on amazon.com; see Amazon&rsquo;s Privacy Notice for details.</>
      </PageList>

      <PageHeading id="how-we-use">How we use your information</PageHeading>
      <PageList>
        <>To operate, maintain and improve the Site and our free tools.</>
        <>To send our weekly newsletter to subscribers who opted in (you can unsubscribe at any time).</>
        <>To analyze how visitors use the Site so we can optimize content and product recommendations.</>
        <>To detect, prevent and address technical issues, fraud or security violations.</>
        <>To comply with our legal obligations under FTC affiliate disclosure rules.</>
      </PageList>

      <PageHeading id="what-we-do-not-do">What we do <em>not</em> do</PageHeading>
      <PageList>
        <><strong>We never sell your personal information.</strong> Not to advertisers, not to brands, not to data brokers. Ever.</>
        <><strong>We do not run third-party ad networks.</strong> You will not see tracking-based ads on FitFeky.</>
        <><strong>We do not profile you for behavioral advertising.</strong> Our product recommendations are editorial, not algorithmically targeted to you.</>
        <><strong>We do not share your email</strong> with any third party. The only emails you receive come from us.</>
      </PageList>

      <PageHeading id="cookies">Cookies</PageHeading>
      <PageP>
        FitFeky uses the following categories of cookies:
      </PageP>
      <PageList>
        <><strong>Essential cookies</strong> — required for the site to function (e.g., remembering your theme preference). These cannot be disabled.</>
        <><strong>Analytics cookies</strong> — we use Google Analytics 4 to understand which pages are popular and how visitors find us. GA sets first-party cookies (<code>_ga</code>, <code>_ga_*</code>) with a 2-year retention for returning-visitor recognition. Data is aggregate and anonymized — we never see individual identities. You can opt out via the Google Analytics opt-out browser add-on or by blocking <code>googletagmanager.com</code>.</>
        <><strong>Affiliate cookies</strong> — set by Amazon when you click a product link, so Amazon can attribute your purchase to us. Governed by Amazon&rsquo;s Privacy Notice.</>
      </PageList>
      <PageP>
        Most browsers allow you to control cookies through their settings. Disabling
        cookies may limit some site features (such as theme persistence).
      </PageP>

      <PageHeading id="third-party-links">Third-party links and services</PageHeading>
      <PageP>
        Our Site contains links to Amazon.com and potentially other external
        sites. We are not responsible for the privacy practices or content of
        those third-party sites. We encourage you to read the privacy policies
        of every website you visit, especially before sharing personal
        information. When you click an Amazon affiliate link, Amazon&rsquo;s
        Privacy Notice applies to any data collected on amazon.com.
      </PageP>

      <PageHeading id="data-retention">Data retention</PageHeading>
      <PageP>
        We retain newsletter subscriber email addresses for as long as you
        remain subscribed. Log data is retained for a maximum of 90 days for
        security and debugging purposes, then automatically deleted. If you
        request deletion of your data, we will remove it within 30 days.
      </PageP>

      <PageHeading id="your-rights">Your rights (CCPA &amp; GDPR)</PageHeading>
      <PageP>
        If you are a California resident or a resident of the EU/EEA/UK, you
        have specific rights regarding your personal information:
      </PageP>
      <PageList>
        <><strong>The right to know</strong> what personal information we have collected about you.</>
        <><strong>The right to delete</strong> your personal information (with certain exceptions).</>
        <><strong>The right to opt out</strong> of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of your personal information. FitFeky does not sell your data, so there is nothing to opt out of — but you can still submit a request.</>
        <><strong>The right to correct</strong> inaccurate personal information we hold about you.</>
        <><strong>The right to access</strong> your data in a portable, machine-readable format.</>
      </PageList>
      <PageP>
        To exercise any of these rights, email us at{" "}
        <a href="mailto:privacy@fitfeky.com">privacy@fitfeky.com</a> with the
        subject line &ldquo;Privacy Request.&rdquo; We will verify your
        identity and respond within 45 days, as required by law.
      </PageP>

      <PageHeading id="children">Children&rsquo;s privacy</PageHeading>
      <PageP>
        FitFeky is intended for adults and is not directed at children under
        13 (or under 16 in the EU). We do not knowingly collect personal
        information from children. If you believe a child has provided us with
        personal information, please contact us and we will delete it
        immediately.
      </PageP>

      <PageHeading id="security">Security</PageHeading>
      <PageP>
        We implement reasonable technical and organizational safeguards to
        protect your information, including HTTPS encryption for all data in
        transit and access controls on our systems. However, no method of
        transmission over the internet is 100% secure, and we cannot guarantee
        absolute security.
      </PageP>

      <PageHeading id="changes">Changes to this policy</PageHeading>
      <PageP>
        We may update this Privacy Policy from time to time. When we do, we
        will revise the &ldquo;Last updated&rdquo; date at the top of this
        page. For material changes, we will also post a prominent notice on
        the homepage for 30 days. We encourage you to review this page
        periodically.
      </PageP>

      <PageHeading id="contact">Contact us</PageHeading>
      <PageP>
        If you have questions or concerns about this Privacy Policy or our
        data practices, please contact us:
      </PageP>
      <PageList>
        <>By email: <a href="mailto:privacy@fitfeky.com">privacy@fitfeky.com</a></>
        <>For general inquiries: <a href="mailto:hello@fitfeky.com">hello@fitfeky.com</a></>
        <>We aim to respond to all privacy requests within 48 hours.</>
      </PageList>
    </PageShell>
  );
}
