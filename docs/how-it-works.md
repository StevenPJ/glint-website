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

## 3. What a CMS is and why we use one

**CMS** stands for **Content Management System**. It's a tool that separates the website's **content** (text, images, team members, events) from the website's **design and code** (layouts, colours, fonts).

Without a CMS, changing the text on a page would mean editing code files directly — which requires technical knowledge and risks accidentally breaking something.

With a CMS, non-technical team members can update content through a friendly editing interface, without touching any code. The content is stored separately, and the website loads it automatically.

---

## 4. How TinaCMS works with our website

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

## 5. What happens when we change the website itself: CI/CD

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

## 6. How the contact form works: Formspree

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

## Summary

| What | How | Who manages it |
|------|-----|----------------|
| Website code & content | Stored in **GitHub** | Developers (code), editors (content) |
| Hosting & serving pages | **Vercel** builds and serves the site | Automatic |
| Domain (glintresearch.co.uk) | **DNS** points domain to Vercel | Domain registrar settings |
| Content editing | **TinaCMS** admin UI at /admin | Authorised editors |
| Automated deployment | **CI/CD** via Vercel | Automatic on every change |
| Contact form submissions | **Formspree** receives and emails them | Formspree dashboard |
