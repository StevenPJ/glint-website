# How the GLINT Website Works

A non-technical guide to understanding how the website is built, hosted, and managed.

---

## 1. Where the website lives: GitHub

Think of **GitHub** as a secure online filing cabinet for the website's source code and content. Everything that makes up the GLINT website — the page layouts, the styling, the text content, the team photos — is stored as files in a GitHub **repository** (a project folder).

GitHub does two important things for us:

- **Stores everything safely** with a full history of every change ever made, so nothing is ever lost and any change can be undone
- **Makes the files available** to other services that need them (like our hosting server and our CMS)

Multiple people can work on the website at the same time, and GitHub keeps track of who changed what and when.

---

## 2. How visitors see the website: Domains and hosting

When someone types **glintresearch.co.uk** into their browser, here's what happens:

1. The browser asks the internet "where is glintresearch.co.uk?" — this is handled by a system called **DNS** (like a phone book for websites), which points the domain name to a specific server
2. The browser connects to that server (in our case, **Vercel** — a hosting company)
3. The server sends back the website files (HTML pages, images, styles) and the browser displays them

Our server doesn't do anything complicated — it simply serves pre-built HTML files. The website is **static**, meaning all the pages are generated in advance rather than being built on the fly for each visitor. This makes it fast and reliable.

---

## 3. Our hosting service: Vercel

A **hosting service** is a company that runs the servers your website lives on. Instead of buying and maintaining our own server hardware, we rent space from a hosting provider. They handle all the technical infrastructure — keeping servers running 24/7, dealing with traffic spikes, security updates, and so on.

We use **Vercel** as our hosting service. Here's why it's a good fit for us:

- **Connects directly to GitHub.** Vercel watches our GitHub repository. Every time a change is pushed (whether it's a content update from TinaCMS or a code change from a developer), Vercel automatically detects it, rebuilds the website, and deploys the new version. There's no manual step — it just happens.

- **Free for projects like ours.** Vercel's free tier (called "Hobby") is generous enough for a website of our size. We don't pay anything for hosting unless the site grows to handle enormous traffic.

**Connecting a domain to Vercel.** When you buy a domain name (like glintresearch.co.uk) from a domain registrar (such as GoDaddy, Namecheap, or Google Domains), the domain doesn't know where your website is yet. You need to tell it "when someone types this domain, send them to Vercel." This is done by updating the domain's **DNS settings** — essentially changing a couple of records in the registrar's dashboard to point at Vercel's servers. Vercel provides the exact values to enter, and there are step-by-step guides for each registrar. Once set up, it's a one-time configuration — you don't need to touch it again unless you change hosting providers.

In practice, the only time anyone needs to log into Vercel is to configure the domain name or check deployment logs. Everything else is automated.

---

## 4. What a CMS is and why we use one

**CMS** stands for **Content Management System**. It's a tool that separates the website's **content** (text, images, team members, events) from the website's **design and code** (layouts, colours, fonts).

Without a CMS, changing the text on a page would mean editing code files directly — which requires technical knowledge and risks accidentally breaking something.

With a CMS, non-technical team members can update content through a friendly editing interface, without touching any code. The content is stored separately, and the website loads it automatically.

---

## 5. How TinaCMS works with our website

We use **TinaCMS** as our content management system. Here's what makes it clever:

**GitHub does double duty.** Our GitHub repository stores both:
- The **website code** (layouts, styles, how pages look)
- The **content** (text for each page, team member details, project descriptions, events)

The content is stored as simple text files in GitHub. When the website is built, the code reads these content files and combines them with the page layouts to produce the final HTML pages that visitors see.

**TinaCMS adds an admin interface.** When you go to the website's **/admin** page, TinaCMS provides a visual editing interface. You can click on fields, type new text, add team members, create events — all through a form-based UI that looks nothing like code.

**How content updates flow:**

1. An editor logs into **/admin** (this is **authenticated** — only authorised people can access it)
2. They make changes through the visual interface (e.g. update a team member's bio)
3. TinaCMS saves the change by updating the content file in GitHub
4. The website is automatically rebuilt with the new content
5. Visitors see the updated page

**Two ways to update content:**
- **Via the TinaCMS admin UI** — the recommended way for non-technical users. Visual, safe, hard to break things
- **Via GitHub directly** — for technical users who prefer editing the content files by hand. Same result, just a different way to get there

TinaCMS syncs everything through the **main branch** in GitHub — this is the "live" version of the website. Any change made through the admin UI creates an update to this branch, which triggers a rebuild.

---

## 6. What happens when we change the website itself: CI/CD

The CMS handles **content** changes (updating text, adding events, etc.). But what about **structural** changes — things like:

- Adding a completely new page (e.g. /next-projects)
- Changing the layout or design of a page
- Adding a new field to the CMS (e.g. adding a "LinkedIn" field to team members)
- Updating colours, fonts, or styling

These changes require modifying the website's **code**, not just its content. This is where **CI/CD** comes in.

**CI** stands for **Continuous Integration**. It's an automated process that runs every time someone pushes a code change to GitHub:

1. A developer makes a change to the website code and pushes it to GitHub
2. CI automatically kicks in and **validates the change** — it checks that the website still builds correctly and nothing is broken
3. If everything passes, the change is **deployed** — meaning the updated code is sent to the server (Vercel) and the website is rebuilt
4. Within a minute or two, the live website reflects the change

This means we never manually upload files to a server. The process is: **make a change in code** > **push to GitHub** > **CI validates and deploys automatically** > **live site updates**.

If CI detects a problem (e.g. a typo in the code that breaks the build), it **stops the deployment** so the broken version never reaches the live website. This is a safety net.

---

## 7. How the contact form works: Formspree

The Contact page has a "Join Our Network" form where visitors can submit their name, email, institution, and a message. But our website is static — it can't process form submissions or send emails on its own.

We use a service called **Formspree** to handle this. Here's how it works:

1. A visitor fills in the form and clicks "Submit"
2. The form data is sent directly from their browser to **Formspree's servers** (not our server)
3. Formspree receives the submission and **sends an email** to the GLINT team's email address with all the form details
4. Formspree also keeps a log of all submissions in their dashboard

This means:
- We don't need our own email server
- Form submissions are delivered as emails to **glint.research@gmail.com**
- Formspree's free tier handles up to 50 submissions per month
- We can view all past submissions by logging into Formspree

The form is configured to send to a specific Formspree endpoint. If the receiving email address needs to change, it's done in the Formspree dashboard (not in the website code).

---

## 8. Future maintenance and portability

One of the key advantages of how this website is set up is that **nothing is locked in**.

**Easy to hand over.** The entire website — code, content, images, configuration — lives in a single GitHub repository. If maintenance needs to transfer to a different person or team, they simply need access to the GitHub repo. There's no proprietary system, no hidden database, no special server to gain access to. Everything is in one place.

**No ongoing costs.** Both Vercel (hosting) and TinaCMS (content management) are free at the usage levels we need. The only cost is the domain name renewal (typically around 10-15 per year). There are no monthly hosting fees, no CMS subscription, and no server maintenance bills.

**No vendor lock-in.** Because the website is built with standard, open technologies:

- **Hosting can move anywhere.** If we ever wanted to leave Vercel, the website can be hosted on any platform that serves static sites (Netlify, Cloudflare Pages, AWS, or even a basic web server). The code doesn't depend on Vercel-specific features.
- **The CMS can be swapped.** The content is stored as plain text files in GitHub, not in a proprietary database. If TinaCMS were to shut down or we wanted a different editing experience, the content is still there in readable files. We could switch to a different CMS or even manage content directly through GitHub.
- **The code is standard.** The website uses widely-known technologies (Astro, React, Tailwind CSS). Any web developer would be able to understand and modify it.

In short, the website is designed to be self-sustaining and easy to maintain, regardless of who is looking after it.

---

## Summary

| What | How | Who manages it |
|------|-----|----------------|
| Website code & content | Stored in **GitHub** | Developers (code), editors (content) |
| Hosting & serving pages | **Vercel** builds and serves the site | Automatic |
| Domain (glintresearch.co.uk) | **DNS** points domain to Vercel | Domain registrar settings |
| Content editing | **TinaCMS** admin UI at /admin | Authorised editors |
| Automated deployment | **CI/CD** via Vercel | Automatic on every change |
| Contact form submissions | **Formspree** receives and emails them | Formspree dashboard |
