# Opto Diode Corporation Website
# Hosting & Content Management Proposal

**Prepared by:** Engineering Team
**Date:** April 14, 2026
**Status:** Ready for Review

---

## Executive Summary

The new optodiode.com website has been built and is ready to go live. This document explains how the site will be hosted, how content will be updated day-to-day, and what the ongoing costs look like.

**Key takeaways:**

- The site can be live within a single business day
- Non-technical staff can add and edit products, blog posts, and resources without writing any code
- Content changes appear on the live site within seconds of clicking "Publish"
- Hosting and content management costs start at $0/month on free tiers, scaling to ~$35/month if traffic grows significantly
- No server maintenance, security patching, or IT overhead is required

---

## What We Built

The website is a modern, high-performance application that includes:

- **115 product pages** across Detection (photodiodes, IR detectors, APDs) and Emission (LEDs, IR emitters), each with full specifications, datasheet downloads, and related product links
- **Resource center** with blog, application notes, whitepapers, glossary, and compliance documentation
- **Industry-specific pages** for Semiconductor, Aerospace & Defense, Medical, and more
- **Built-in search** (Cmd+K command palette) across all products and resources
- **SEO optimization** with structured data for Google product listings
- **Mobile-responsive design** that works on all devices

---

## How Hosting Works

### The Recommended Approach

We recommend a three-service stack. Each service is an industry leader in its category, used by companies like Nike, Washington Post, Figma, and Sonos.

```
                   CONTENT EDITORS                    DEVELOPERS
                        |                                 |
                        v                                 v
                 +--------------+                  +-----------+
                 | Sanity CMS   |                  |  GitHub   |
                 | (Content)    |                  |  (Code)   |
                 +--------------+                  +-----------+
                        |                                 |
                        |  "Publish" clicked               |  Code pushed
                        |                                 |
                        +----------- both trigger --------+
                                        |
                                        v
                               +-----------------+
                               |     Vercel      |
                               | (Website Host)  |
                               +-----------------+
                                        |
                                        v
                               +-----------------+
                               |  optodiode.com  |
                               |  (Live Website) |
                               +-----------------+
```

### What Each Service Does

**Vercel** hosts the live website.

- Purpose-built for the technology our site uses (Next.js)
- Serves pages from data centers closest to each visitor (global CDN)
- Automatic HTTPS/SSL security certificates
- 99.99% uptime SLA on paid plans
- No servers to manage, patch, or monitor

**Sanity** is the content management system (CMS).

- Where staff log in to add products, edit descriptions, upload datasheets, and write blog posts
- Visual editing interface accessible from any web browser
- Changes publish to the live site in seconds, without waiting for a developer
- Full revision history — every change can be rolled back
- Role-based access control (editor, admin, viewer)

**GitHub** stores the website code.

- Industry-standard version control for the codebase
- Every change is tracked with full history
- Developers push code changes here; Vercel automatically deploys them

---

## Day-to-Day Content Management

### Who Does What

| Task | Who | How | Time |
|------|-----|-----|------|
| Add a new product | Marketing / Engineering | Log into CMS, fill in form, click Publish | 10-15 min |
| Edit product specs or descriptions | Marketing / Engineering | Find product in CMS, edit fields, click Publish | 2-5 min |
| Upload a new datasheet PDF | Marketing / Engineering | Attach file in CMS product entry, click Publish | 1-2 min |
| Write a blog post | Marketing | Create new blog entry in CMS with rich text editor | 30-60 min |
| Add an application note | Engineering | Create entry in CMS, attach PDF, click Publish | 5-10 min |
| Change page layout or design | Developer | Edit code locally, push to GitHub, auto-deploys | Varies |
| Add a new product category | Developer | Code change + CMS schema update | 1-2 hours |

### What Content Editing Looks Like

Staff access the CMS by visiting **optodiode.com/studio** in any web browser. No software installation is required. The interface presents forms tailored to each content type:

**Product editing includes fields for:**
- Product name and part number
- Description (short and long)
- Category and subcategory
- Specifications table (parameter / value / unit)
- Key specs (wavelength range, active area, responsivity, package)
- Features list
- Application areas
- Product image upload
- Datasheet PDF upload
- Related products (cross-linking)
- Featured / New product flags

**Blog posts include:**
- Title, author, publish date
- Rich text body with image embedding
- Tags and categories
- SEO metadata

All content types follow the same pattern: fill in the form, click Publish, and the change appears on the live site within seconds.

---

## How Updates Reach the Live Site

There are two paths for changes to reach the live website:

### Path 1: Content Changes (No Developer Needed)

```
Editor clicks "Publish" in CMS
        |
        v
Sanity sends a notification to Vercel
        |
        v
Vercel regenerates only the affected pages (5-10 seconds)
        |
        v
Visitors see the updated content
```

This process is called **Incremental Static Regeneration (ISR)**. Only the specific pages that changed are rebuilt — not the entire site. This means updates are fast and the site remains performant.

### Path 2: Code Changes (Developer Required)

```
Developer pushes code to GitHub
        |
        v
Vercel automatically builds and deploys the full site (~60 seconds)
        |
        v
New version is live — previous version is kept as backup
```

Every code push also creates a **preview URL** that can be reviewed before merging to production. This means design changes can be approved before going live.

---

## Security & Reliability

| Concern | How It's Handled |
|---------|-----------------|
| **Site goes down** | Vercel runs on AWS infrastructure across multiple regions. If one region fails, traffic routes to another automatically. |
| **Someone publishes bad content** | Sanity keeps full revision history. Any change can be rolled back to a previous version in one click. |
| **Code breaks the site** | Every deployment keeps the previous version. Instant rollback available in the Vercel dashboard. |
| **Unauthorized access** | CMS requires authenticated login. Role-based permissions control who can publish vs. draft. |
| **SSL / HTTPS** | Automatic. Vercel provisions and renews SSL certificates for all domains. |
| **DDoS protection** | Included with Vercel's edge network. No additional configuration needed. |
| **Data backups** | Sanity provides automated daily backups. Code is stored in GitHub with full history. |

---

## Cost Breakdown

### Free Tier (Sufficient for Launch)

| Service | Monthly Cost | What You Get |
|---------|-------------|--------------|
| Vercel (Hobby) | $0 | 100 GB bandwidth, unlimited deployments, SSL |
| Sanity (Free) | $0 | 500K API requests, 20 GB bandwidth, 10 GB asset storage |
| GitHub (Free) | $0 | Unlimited private repositories |
| **Total** | **$0/month** | |

The free tiers are generous and will comfortably support the site at typical B2B traffic levels (thousands of visitors per month).

### Growth Tier (If Traffic Scales)

| Service | Monthly Cost | What You Get |
|---------|-------------|--------------|
| Vercel (Pro) | $20 | 1 TB bandwidth, team collaboration, analytics |
| Sanity (Growth) | $15 | 2.5M API requests, higher bandwidth, advanced roles |
| GitHub (Free) | $0 | No change needed |
| **Total** | **$35/month** | |

### Cost Comparison

For context, traditional hosting approaches for a site of this complexity:

| Approach | Typical Monthly Cost | Maintenance |
|----------|---------------------|-------------|
| **Recommended (Vercel + Sanity)** | **$0 – $35** | **None** |
| Traditional shared hosting + WordPress | $30 – $100 | Plugin updates, security patches, backups |
| AWS/Azure self-managed | $100 – $500 | Server administration, monitoring, scaling |
| Managed enterprise CMS (Contentful, Adobe) | $300 – $3,000+ | Minimal, but expensive |

---

## Timeline to Go Live

| Step | Time Required | Who |
|------|---------------|-----|
| Create accounts (GitHub, Vercel, Sanity) | 15 minutes | Developer |
| Connect services and deploy | 15 minutes | Developer |
| Point domain to new hosting | 10 minutes + DNS propagation (up to 24h) | Developer + IT |
| Verify all pages and functionality | 30 minutes | Developer + Marketing |
| **Total active work** | **~1 hour** | |

The site can be live on a staging URL (e.g., `odc-website.vercel.app`) within the first 30 minutes. Pointing the production domain (`optodiode.com`) requires a DNS change that may take up to 24 hours to propagate globally, though it often completes within 1-2 hours.

---

## What Happens to the Current Website

The transition can be handled with zero downtime:

1. Deploy the new site to a staging URL first
2. Review and verify everything works
3. When ready, update DNS to point `optodiode.com` to the new hosting
4. The old site stays available as a fallback until DNS fully propagates
5. Once confirmed, the old hosting can be decommissioned

---

## Ongoing Maintenance

| Task | Frequency | Effort |
|------|-----------|--------|
| Content updates (products, blog, resources) | As needed | Staff self-service via CMS |
| Framework / dependency updates | Quarterly | 1-2 hours (developer) |
| Security patches | Automatic | Vercel handles infrastructure security |
| SSL certificate renewal | Automatic | Vercel handles this |
| Backups | Automatic | Both Sanity and GitHub handle this |
| Server monitoring | Not applicable | No servers to monitor |

---

## Recommendation

We recommend proceeding with the Vercel + Sanity + GitHub stack because:

1. **It's ready.** The CMS integration, content schemas, and deployment pipeline are already built into the codebase. We only need to create accounts and connect them.

2. **It empowers non-technical staff.** Products, blog posts, application notes, and other content can be managed through a visual editor without developer involvement.

3. **It's cost-effective.** Free tiers cover launch and early growth. Even at scale, costs remain under $35/month — a fraction of traditional hosting.

4. **It eliminates maintenance burden.** No servers to manage, no security patches to apply, no backups to configure. The infrastructure is fully managed.

5. **It's low-risk.** The transition involves zero downtime, every change is reversible, and the previous site remains available as a fallback.

---

*For questions or to authorize proceeding, contact the engineering team.*
