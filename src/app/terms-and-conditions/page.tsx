import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms and Conditions of Sale",
  description:
    "Opto Diode Corporation terms and conditions of sale — pricing, delivery, warranties, intellectual property, and governing law.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <section className="py-12 lg:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Terms and Conditions of Sale
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Effective date: August 28, 2019
        </p>

        <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">1. Taxes</h2>
            <p>
              Prices exclude taxes and import duties. Seller will add applicable taxes to the sales
              price where required by law, payable by Buyer unless a proper tax-exemption certificate
              is provided.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">2. Prices and Releases</h2>
            <p>
              Pricing applies if quantities are released within 12 months and shipments are scheduled
              within 18 months from order receipt. Otherwise, seller&rsquo;s current prices apply and
              buyer pays any price difference.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">3. Title and Delivery</h2>
            <p>
              Goods ship ExWorks from seller&rsquo;s plant. Title and liability transfer upon tender
              to carrier. International buyers are responsible for import duties and clearances.
              Seller may deliver in installments and is not liable for delivery delays from
              unavoidable circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">4. Quantities</h2>
            <p>
              Variations up to 3% over or under ordered electronic component quantities constitute
              acceptable compliance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">5. Terms and Method of Payment</h2>
            <p>
              Net 30 days from invoice date where credit is extended. Credit amount or payment terms
              may be changed or credit withdrawn by Seller at any time. Installment purchases require
              payment per installment terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">6. Contingencies</h2>
            <p>
              Seller is excused from performance for delays or nondelivery caused by circumstances
              beyond its control, including war, sabotage, insurrection, act of God, labor disputes,
              or shortage of materials or machinery. Seller may allocate production among customers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">7. Warranties</h2>
            <p>
              Seller warrants goods against faulty workmanship and defective materials, and that goods
              conform to written specifications. Warranty periods are as follows:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>
                <strong className="text-foreground">Processed semiconductor chips/slices:</strong> 60-day
                warranty period from date of shipment.
              </li>
              <li>
                <strong className="text-foreground">All other electronic components:</strong> one-year
                warranty period from date of shipment.
              </li>
            </ul>
            <p className="mt-3">
              Warranties do not apply to goods that are altered, improperly installed, operated,
              repaired, misused, neglected, lack maintenance, or operated outside of specifications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">8. Remedies and Damages</h2>
            <p>
              Seller&rsquo;s sole remedy is repair, replacement, or account credit for nonconforming
              goods returned during the warranty period. Buyer must notify Seller promptly with a
              detailed explanation and return goods ExWorks to Seller&rsquo;s plant.
            </p>
            <p className="mt-3">
              Seller&rsquo;s sole and exclusive maximum liability shall not in any event exceed the
              total contract price less the purchase price for delivered items. Special, incidental,
              or consequential damages are excluded, including removal costs, lost profits, or lost
              goodwill.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">9. Legal Compliance</h2>
            <p>
              Buyer must comply with all applicable laws. Buyer must notify Seller if goods are
              imported to the European Union. RoHS and REACH compliance is determined on a
              case-by-case basis. Products covered by this contract may fall within
              &ldquo;strategic&rdquo; electronic products subject to U.S. export license control.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">10. Ownership of Intellectual Property</h2>
            <p>
              All intellectual property remains Seller&rsquo;s property. Buyer shall have no claim
              to, nor ownership interest in, any intellectual property. Buyer is granted only a
              limited right to use purchased goods.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">11. Confidentiality</h2>
            <p>
              Buyer maintains confidentiality of Seller&rsquo;s non-public information. Buyer agrees
              not to use such information or disclose it to others without Seller&rsquo;s prior
              written consent. Exceptions include publicly available information, information in
              Buyer&rsquo;s prior possession, information independently developed by Buyer, and
              information whose disclosure is legally compelled.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">12. Patent Indemnity</h2>
            <p>
              Seller will defend against patent infringement claims for goods manufactured per
              Seller&rsquo;s specifications. Seller is not liable if infringement arises from
              Buyer&rsquo;s specifications, modifications after delivery, or non-intended use.
            </p>
            <p className="mt-3">
              If goods are held to infringe patents, Seller will procure rights, replace goods, or
              refund the purchase price and transportation costs. The sale by Seller does not grant
              to Buyer a license under any patent rights of Seller.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">13. Termination and Cancellation</h2>
            <p>
              Seller may cancel with 30 days written notice. Buyer may terminate with 30 days
              notice, and will be liable for termination charges including price adjustments and
              committed costs. The minimum termination charge is 10% of terminated sales dollars.
            </p>
            <p className="mt-3">
              All quantities must be released within 12 months and shipments scheduled within
              18 months, or Seller may cancel.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">14. Nonwaiver of Default</h2>
            <p>
              If Buyer defaults, Seller may decline further shipments. Seller&rsquo;s failure to
              enforce terms does not waive defaults or affect legal remedies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">15. Applicable Law</h2>
            <p>
              This contract is governed by federal U.S. law and the law of the State of California.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">16. U.S. Government Contract</h2>
            <p>
              If goods are used in U.S. Government contracts with a contract number on the purchase
              order, applicable mandatory government clauses are incorporated by reference.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">17. Assignment</h2>
            <p>
              This contract is binding on the parties&rsquo; successors and assigns of the business
              used for performance, but is not otherwise assignable by Buyer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">18. Modification</h2>
            <p>
              This contract constitutes the entire agreement between the parties relating to the sale
              of goods described and supersedes all previous communications or agreements.
              Modifications require written signature from a duly authorized Seller representative
              in Newbury Park, California.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-3">19. Severability</h2>
            <p>
              If any provision of this contract is found to be unlawful or unenforceable, the
              remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <div className="pt-6 border-t border-border">
            <Link href="/" className="text-primary hover:underline text-sm">
              ← Return to Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
