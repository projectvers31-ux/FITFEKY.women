import type { Metadata } from "next";
import { PageShell, PageHeading, PageP, PageList, PageMeta } from "@/components/layout/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service | FitFeky",
  description:
    "The terms and conditions governing your use of FitFeky. By using the site you agree to these terms, including our affiliate disclosure and disclaimer.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <PageShell
      kicker="The fine print, in plain English"
      title="Terms of Service"
      subtitle="By using FitFeky you agree to these terms. We&rsquo;ve written them in plain language — no legalese where we can help it."
    >
      <PageMeta updated="June 2026" />

      <PageHeading id="agreement">1. Agreement to terms</PageHeading>
      <PageP>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
        use of fitfeky.com (the &ldquo;Site&rdquo;) operated by FitFeky
        (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;). By accessing
        or using the Site, you agree to be bound by these Terms. If you
        disagree with any part, you may not access the Site.
      </PageP>

      <PageHeading id="intellectual-property">2. Intellectual property</PageHeading>
      <PageP>
        The Site&rsquo;s content — including original text, graphics, logos,
        the quality-scoring methodology, calculator code and editorial
        reviews — is the property of FitFeky and protected by United States
        and international copyright law. You may not reproduce, republish or
        redistribute our original content without attribution and a link back
        to the source page.
      </PageP>
      <PageP>
        Product titles, images, prices and ratings displayed on the Site are
        the property of their respective manufacturers and Amazon.com. They
        appear on FitFeky under the Amazon Associates Program and are used for
        editorial review and recommendation purposes.
      </PageP>

      <PageHeading id="affiliate-relationship">3. Affiliate relationship &amp; disclosure</PageHeading>
      <PageP>
        FitFeky is a participant in the Amazon Services LLC Associates
        Program. We earn advertising fees by linking to Amazon.com. This does
        not increase the price you pay — the commission is paid by Amazon from
        its own margin. See our full{" "}
        <a href="/affiliate-disclosure">Affiliate Disclosure</a> for details.
      </PageP>

      <PageHeading id="no-professional-advice">4. No professional advice</PageHeading>
      <PageP>
        The content on FitFeky — including product reviews, fitness guides,
        the BMI calculator, body fat calculator, calorie burn estimator,
        recovery calculator and home gym planner — is provided for general
        informational and educational purposes only. It is{" "}
        <strong>not medical, health, nutritional or fitness advice</strong>,
        and it is not a substitute for professional consultation.
      </PageP>
      <PageP>
        Always consult a qualified physician, physical therapist or certified
        trainer before starting any exercise program, especially if you have a
        pre-existing condition, are recovering from injury, or are over 40
        and resuming intense activity. Use our calculators as estimates, not
        diagnoses.
      </PageP>

      <PageHeading id="external-links">5. External links &amp; third-party content</PageHeading>
      <PageP>
        The Site contains links to Amazon.com and other third-party websites
        that we do not control. We are not responsible for the content,
        accuracy, privacy practices or product quality of those external
        sites. When you leave FitFeky, the terms and policies of the
        destination site apply. Any purchase you make on Amazon is governed
        by Amazon&rsquo;s terms of service and return policy.
      </PageP>

      <PageHeading id="price-accuracy">6. Price &amp; availability disclaimer</PageHeading>
      <PageP>
        Product prices, ratings, review counts and availability are accurate
        as of the date and time indicated on each product, and are subject to
        change without notice. FitFeky is not responsible for price changes,
        stock-outs or product discontinuations that occur after publication.
        Any price and availability information displayed on Amazon at the time
        of purchase will govern the sale.
      </PageP>

      <PageHeading id="user-conduct">7. User conduct</PageHeading>
      <PageP>By using the Site, you agree not to:</PageP>
      <PageList
        items={[
          <>Use the Site in any way that violates applicable federal, state or international law.</>,
          <>Attempt to gain unauthorized access to our systems, data or content.</>,
          <>Scrape, copy or redistribute our original editorial content at scale for commercial purposes without permission.</>,
          <>Use automated tools (bots, crawlers) to access the Site in a way that sends more requests than a human reasonably could, except for search engine and AI crawlers following our robots.txt.</>,
          <>Submit false or misleading information through our newsletter form or any contact channel.</>,
          <>Interfere with the proper functioning of the Site, its affiliate links or its calculators.</>,
        ]}
      />

      <PageHeading id="limitation-of-liability">8. Limitation of liability</PageHeading>
      <PageP>
        FitFeky is provided on an &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; basis. To the fullest extent permitted by law,
        FitFeky, its owners and contributors shall not be liable for any
        direct, indirect, incidental, consequential, special or exemplary
        damages arising out of or in connection with your use of (or inability
        to use) the Site, including but not limited to:
      </PageP>
      <PageList
        items={[
          <>Purchasing decisions based on our reviews or recommendations.</>,
          <>Injuries or health issues arising from following our fitness guides or using recommended products.</>,
          <> inaccuracies in prices, ratings or product specifications displayed on the Site.</>,
          <>Disruptions, outages or security breaches affecting the Site.</>,
        ]}
      />

      <PageHeading id="disclaimer-of-warranties">9. Disclaimer of warranties</PageHeading>
      <PageP>
        We do not warrant that the Site will be uninterrupted, error-free or
        free of harmful components. We do not warrant the accuracy,
        completeness or timeliness of product information, prices or ratings.
        All product recommendations are editorial opinions, not guarantees of
        product performance or suitability for your specific needs.
      </PageP>

      <PageHeading id="indemnification">10. Indemnification</PageHeading>
      <PageP>
        You agree to indemnify and hold harmless FitFeky, its owners and
        contributors from any claim, demand, loss or damages — including
        reasonable attorneys&rsquo; fees — arising out of your breach of these
        Terms or your misuse of the Site.
      </PageP>

      <PageHeading id="changes-to-terms">11. Changes to these Terms</PageHeading>
      <PageP>
        We reserve the right to revise these Terms at any time. When we do, we
        will update the &ldquo;Last updated&rdquo; date at the top of this
        page. Your continued use of the Site after changes take effect
        constitutes your acceptance of the revised Terms. We encourage you to
        review this page periodically.
      </PageP>

      <PageHeading id="governing-law">12. Governing law</PageHeading>
      <PageP>
        These Terms shall be governed by and construed in accordance with the
        laws of the State of California, United States of America, without
        regard to its conflict of law provisions. Any disputes arising under
        these Terms shall be resolved in the state or federal courts located
        in California.
      </PageP>

      <PageHeading id="severability">13. Severability</PageHeading>
      <PageP>
        If any provision of these Terms is found to be unenforceable or
        invalid, that provision will be limited or eliminated to the minimum
        extent necessary, and the remaining provisions will remain in full
        force and effect.
      </PageP>

      <PageHeading id="contact">14. Contact</PageHeading>
      <PageP>
        If you have questions about these Terms, please contact us:
      </PageP>
      <PageList
        items={[
          <>By email: <a href="mailto:hello@fitfeky.com">hello@fitfeky.com</a></>,
          <>For privacy requests: <a href="mailto:privacy@fitfeky.com">privacy@fitfeky.com</a></>,
          <>For affiliate or partnership inquiries: <a href="mailto:partners@fitfeky.com">partners@fitfeky.com</a></>,
        ]}
      />

      <div className="mt-12 rounded-2xl bg-secondary/40 p-6">
        <p className="text-sm text-muted-foreground">
          These Terms were last reviewed and updated in June 2026. They were
          written to be readable, not to trick you. If anything is unclear,
          please ask.
        </p>
      </div>
    </PageShell>
  );
}
