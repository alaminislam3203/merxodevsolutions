import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    // Project Detail
    projectDetail: {
      back: 'Back',
      mobileView: 'Mobile View',
      macAirView: 'Mac-Air View',
      desktopView: 'Desktop View',
      viewLive: 'View Live',
      client: 'Client',
      duration: 'Duration',
      category: 'Category',
      stack: 'Stack',
      technologies: 'technologies',
      techStack: 'Tech Stack',
      keyFeatures: 'Key Features',
      otherProjects: 'Other Projects',
      likeWhatYouSee: 'Like What You See?',
      buildTogether: "Let's build something amazing together.",
      startProject: 'Start a Project',
    },
    translation: {
      videoShowcase: {
        badge: 'YOUTUBE SHOWCASE',
        titlePrefix: 'Watch Our ',
        titleHighlight: 'Latest Videos',
        titleSuffix: ' & Project Demos',
        subtitle:
          'Explore live product demos, tech tutorials, and software architecture walkthroughs on our official YouTube channel.',
        subscribeBtn: 'Subscribe Channel',
        nowPlaying: 'Now Playing',
        upNext: 'Up Next',
        featuredPlaylistBtn: 'Featured Playlist (3)',
        hidePlaylistBtn: 'Hide Playlist',
        autoPlayInfo: 'Auto-plays next video',
        video1Title: 'Custom Software & E-Commerce Architecture Walkthrough',
        video2Title: 'Full-Stack Web App Development with Next.js & Cloud',
        video3Title: 'Modern UI/UX Design & High Performance Engineering',
      },
      footer: {
        brand: {
          desc: 'We craft modern digital solutions — from sleek web apps to scalable cloud systems — built to last and designed to impress.',
        },
        quickLinks: {
          heading: 'Quick Links',
        },
        navLinks: [
          { label: 'Services', href: '/services' },
          { label: 'Journey', href: '/our-journey' },
          { label: 'About', href: '/about' },
          { label: 'Our Team', href: '/our-team' },
          { label: 'Contact', href: '/contact' },
          { label: 'Projects', href: '/our-projects' },
        ],
        services: {
          heading: 'Services',
          items: [
            { label: 'Web Development', href: '/services-web' },
            { label: 'Web App', href: '/services-web-app' },
            { label: 'E-commerce', href: '/services-ecommerce' },
            { label: 'UI/UX Design', href: '/services-design' },
            { label: 'SEO & Marketing', href: '/services-seo' },
          ],
        },
        contact: {
          heading: 'Contact Us',
          address: 'Rangpur Sadar, Rangpur, Bangladesh',
          phone1: '+880 131 3334279',
          phone2: '+880 969 7634279',
          email: 'merxodevsolutions@gmail.com',
        },
        bottom: {
          copy: '© {{year}} MERXODEV Solutions. All rights reserved.',
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
        },
      },

      webApp: {
        breadcrumb: {
          home: 'Home',
          services: 'Services',
          current: 'Web App Development',
        },
        badge: 'WEB APPLICATION DEVELOPMENT',
        heroTitleStart: 'Build Powerful',
        heroTitleHighlight: 'Web Applications',
        heroDesc:
          'We design and develop fast, scalable, full-stack web applications tailored to your business — from MVPs to enterprise-grade platforms.',
        ctaStartProject: 'Start Your Project',
        ctaViewWork: 'View Our Work',
        stats: [
          { value: '120+', label: 'Web Apps Delivered' },
          { value: '99%', label: 'Client Satisfaction' },
          { value: '4×', label: 'Average Speed Improvement' },
          { value: '24/7', label: 'Post-launch Support' },
        ],
        features: {
          badge: 'WHAT WE BUILD',
          heading: 'Everything Your Web App Needs',
          items: [
            {
              title: 'Custom UI & UX Design',
              desc: 'Pixel-perfect, accessible interfaces designed around your users — built with React and Tailwind CSS for blazing-fast rendering.',
            },
            {
              title: 'Full-Stack Development',
              desc: 'End-to-end development using Next.js, Node.js, and TypeScript so your front end and back end speak the same language.',
            },
            {
              title: 'Cloud-Ready Architecture',
              desc: 'Deployed on AWS, Vercel, or your preferred cloud — auto-scaling, zero-downtime deploys, and CDN-backed assets out of the box.',
            },
            {
              title: 'Authentication & Security',
              desc: 'Role-based access control, OAuth 2.0, JWT sessions, and industry-standard encryption keep your users and data safe.',
            },
            {
              title: 'Performance Optimization',
              desc: 'Lazy loading, server-side rendering, edge caching, and Core Web Vitals tuning so your app feels instant on any device.',
            },
            {
              title: 'Multi-Tenant & Team Support',
              desc: 'Built-in workspace management, invite flows, and granular permissions — perfect for SaaS products with multiple organizations.',
            },
            {
              title: 'Real-Time Features',
              desc: 'Live dashboards, notifications, collaborative editing, and chat — powered by WebSockets and server-sent events.',
            },
            {
              title: 'Analytics & Monitoring',
              desc: "Integrated error tracking, performance dashboards, and user analytics so you always know what's happening in production.",
            },
            {
              title: 'API & Integrations',
              desc: 'RESTful and GraphQL APIs, third-party service integrations, and webhook support to connect with any tool in your stack.',
            },
          ],
        },
        included: {
          badge: 'EVERY PROJECT INCLUDES',
          heading: 'No Hidden Extras',
          items: [
            'Responsive design (mobile, tablet, desktop)',
            'Source code ownership & Git repository',
            'Environment setup (dev, staging, production)',
            'CI/CD pipeline configuration',
            'Database design & schema documentation',
            'API documentation (Swagger / Postman)',
            'Unit & integration test coverage',
            '30-day post-launch bug-fix support',
            'Performance audit & Core Web Vitals report',
            'Admin panel or CMS integration',
            'SEO-ready HTML structure & metadata',
            'Accessibility (WCAG 2.1 AA) compliance',
          ],
        },
        process: {
          badge: 'HOW WE WORK',
          heading: 'From Brief to Launch',
          steps: [
            {
              title: 'Discovery & Requirements',
              desc: 'We map your goals, user flows, and technical constraints in a structured kickoff session — so everyone starts with the same blueprint.',
            },
            {
              title: 'Architecture & Design',
              desc: 'Our team proposes a tech stack, data model, and UI wireframes. You review and approve before a single line of code is written.',
            },
            {
              title: 'Agile Development Sprints',
              desc: 'Two-week sprints with working demos at each milestone. You stay in the loop and can adjust priorities as the product evolves.',
            },
            {
              title: 'QA & Testing',
              desc: 'Automated tests, cross-browser QA, load testing, and a security review before anything ships to production.',
            },
            {
              title: 'Deployment & Launch',
              desc: 'Zero-downtime deployment to your cloud environment with monitoring alerts and rollback procedures ready from day one.',
            },
            {
              title: 'Support & Iteration',
              desc: 'Ongoing maintenance plans, feature additions, and performance optimizations — we stay a long-term partner, not a one-time vendor.',
            },
          ],
        },
        tech: {
          badge: 'OUR TECH STACK',
          heading: 'Modern Tools, Proven Results',
          categories: {
            Frontend: 'Frontend',
            Backend: 'Backend',
            Database: 'Database',
            Hosting: 'Hosting',
            DevOps: 'DevOps',
          },
        },
        faq: {
          badge: 'FAQ',
          heading: 'Frequently Asked Questions',
          items: [
            {
              q: 'How long does it take to build a web application?',
              a: 'A typical MVP takes 6–10 weeks depending on complexity. A full-featured SaaS platform may take 3–6 months. We give you a detailed timeline after the discovery phase.',
            },
            {
              q: 'Do I own the source code after the project?',
              a: 'Yes — 100%. On project completion you receive full ownership of the codebase, assets, and all related intellectual property with no ongoing licensing fees.',
            },
            {
              q: 'Which tech stack do you recommend?',
              a: 'We evaluate your use case, team, and scale targets before recommending a stack. Most projects use Next.js + Node.js + PostgreSQL or MongoDB, but we adapt to your needs.',
            },
            {
              q: 'Can you work with our existing codebase?',
              a: "Absolutely. We do code audits, refactors, and feature additions on existing apps. We'll review your current stack and suggest an integration path before we begin.",
            },
            {
              q: 'What is included in post-launch support?',
              a: 'Every project includes 30 days of free bug-fix support. After that we offer monthly maintenance plans covering updates, monitoring, and priority feature work.',
            },
            {
              q: 'Will my web app be mobile-friendly?',
              a: 'Yes. Every interface we build is fully responsive and tested across popular screen sizes, browsers, and devices before handoff.',
            },
          ],
        },
        related: {
          badge: 'EXPLORE MORE',
          heading: 'Related Services',
          items: [
            { label: 'E-Commerce Development' },
            { label: 'SEO Optimization' },
            { label: 'Dashboard & Analytics' },
          ],
        },
        cta: {
          heading: 'Ready to Build Something Great?',
          desc: "Tell us about your project and we'll send a free proposal within 48 hours.",
          getQuote: 'Get a Free Quote',
          allServices: 'All Services',
        },
      },
      webDev: {
        breadcrumb: {
          home: 'Home',
          services: 'Services',
          current: 'Web Development',
        },
        badge: 'Web Development',
        heroTitleStart: 'Websites & apps built to',
        heroTitleHighlight: 'grow your business.',
        heroDesc:
          'From landing pages to full-stack SaaS apps — we build fast, scalable, and beautiful web products using Next.js, React, and Node.js.',
        ctaPrimary: 'Start Your Project',
        ctaSecondary: 'View Our Work',
        stats: [
          { value: '56+', label: 'Websites Launched' },
          { value: '4.9★', label: 'Average Rating' },
          { value: '< 2s', label: 'Avg Load Time' },
          { value: '100%', label: 'Client Satisfaction' },
        ],
        features: {
          badge: 'What You Get',
          heading: 'Everything your web project needs',
          items: [
            {
              title: 'Blazing Fast Performance',
              desc: 'Server-side rendering, static generation, image optimization — your site loads in under 2 seconds.',
            },
            {
              title: 'Pixel-Perfect UI',
              desc: 'Every design is crafted from scratch in Figma then coded with precision — no templates, no shortcuts.',
            },
            {
              title: 'Mobile-First Responsive',
              desc: 'Looks flawless on every device — phone, tablet, and desktop — built mobile-first from the ground up.',
            },
            {
              title: 'Secure & Scalable',
              desc: 'HTTPS, environment-secured APIs, rate limiting, and clean architecture that scales as you grow.',
            },
            {
              title: 'SEO Optimized',
              desc: 'Schema markup, Open Graph, sitemap, meta tags, Core Web Vitals — built to rank from day one.',
            },
            {
              title: 'Clean Codebase',
              desc: 'Well-structured, documented, and maintainable code your team can take over and build on confidently.',
            },
            {
              title: 'CMS Integration',
              desc: 'Contentful, Sanity, or custom admin panels — manage your content without touching code.',
            },
            {
              title: 'Analytics & Tracking',
              desc: 'Google Analytics, Meta Pixel, custom event tracking — know exactly how users interact with your site.',
            },
            {
              title: 'API & Third-Party Integrations',
              desc: 'Payment gateways, CRMs, email services, maps, social logins — we connect all the tools you need.',
            },
          ],
        },
        tech: {
          badge: 'Tech Stack',
          heading: 'Tools we build with',
          categories: {
            Frontend: 'Frontend',
            Backend: 'Backend',
            Database: 'Database',
            Storage: 'Storage',
            Hosting: 'Hosting',
            DevOps: 'DevOps',
          },
        },
        process: {
          badge: 'How We Work',
          heading: 'From idea to live website',
          steps: [
            {
              title: 'Discovery & Planning',
              desc: 'We understand your goals, audience, and technical requirements — then plan the architecture.',
            },
            {
              title: 'Design in Figma',
              desc: 'Full UI mockup — homepage, inner pages, mobile views — all approved before we write a line of code.',
            },
            {
              title: 'Development',
              desc: 'We build with Next.js & React, writing clean, scalable code connected to your backend and APIs.',
            },
            {
              title: 'Testing & QA',
              desc: 'Cross-browser, cross-device testing. Performance audits. Accessibility checks. Zero compromises.',
            },
            {
              title: 'Launch & Support',
              desc: 'We deploy to Vercel or your preferred host, then stay available for 3 months post-launch.',
            },
          ],
        },
        pricing: {
          badge: 'Pricing',
          heading: 'Simple, transparent pricing',
          subtext:
            'All plans include design, development, and 3 months of free support.',
          plans: [
            {
              name: 'Starter',
              price: 'BDT 3500',
              desc: 'Perfect for landing pages & small business sites',
              cta: 'Get Started',
              features: [
                'Up to 5 pages',
                'Mobile-responsive design',
                'Contact form',
                'Basic SEO setup',
                'Google Analytics',
                '1 revision round',
                '2 weeks delivery',
                '1 month support',
              ],
            },
            {
              name: 'Business',
              price: 'BDT 1500',
              desc: 'For growing businesses that need more power',
              cta: 'Get Started',
              features: [
                'Up to 15 pages',
                'Custom Figma design',
                'CMS integration',
                'Full SEO optimization',
                'API integrations',
                'Admin dashboard',
                '3 revision rounds',
                '4 weeks delivery',
                '3 months support',
              ],
            },
            {
              name: 'SaaS / Custom',
              price: 'Custom',
              desc: 'Full-stack apps, SaaS platforms, complex systems',
              cta: "Let's Talk",
              features: [
                'Unlimited pages & features',
                'Full-stack Next.js + Node.js',
                'Auth system (JWT / OAuth)',
                'Database design & API',
                'Payment integration',
                'Role-based access control',
                'Unlimited revisions',
                'Custom timeline',
                '6 months support',
              ],
            },
          ],
        },
        faq: {
          badge: 'FAQ',
          heading: 'Common questions',
          items: [
            {
              q: 'What tech stack do you use?',
              a: 'We primarily build with Next.js 14, React, Tailwind CSS, Node.js, and MongoDB or PostgreSQL. We choose the best stack for your specific project.',
            },
            {
              q: 'How long does a website take?',
              a: 'A landing page takes 1–2 weeks. A business website takes 3–4 weeks. Full-stack SaaS apps typically take 6–12 weeks depending on complexity.',
            },
            {
              q: 'Do I get the source code?',
              a: 'Yes — you own 100% of the code. We hand over the full codebase, deployment access, and documentation when the project is complete.',
            },
            {
              q: 'Can you redesign my existing site?',
              a: 'Absolutely. We can redesign and rebuild your existing site with modern tech, improved UX, and better performance.',
            },
            {
              q: 'Do you provide hosting?',
              a: 'We deploy to Vercel by default (free for most projects). We can also deploy to AWS, DigitalOcean, or your preferred host.',
            },
            {
              q: 'What if I need changes after launch?',
              a: 'All plans come with 1–6 months of free support. After that, we offer flexible monthly maintenance packages.',
            },
          ],
        },
        related: {
          badge: 'Related Services',
          heading: 'Often paired with',
          items: [
            { label: 'E-commerce Development' },
            { label: 'Admin Dashboard' },
            { label: 'SEO Optimization' },
          ],
        },
        cta: {
          heading: 'Ready to build your website?',
          desc: "Tell us what you need and we'll build it — fast, clean, and exactly how you imagined it.",
          getQuote: 'Get a Free Quote',
          allServices: 'All Services',
        },
      },
      stats: {
        badge: 'Our Track Record',
        headingStart: 'Numbers that',
        headingEnd: 'speak for us',
        subtext:
          "We don't just promise results — here's what we've actually delivered for our clients.",
        items: [
          { value: 56, suffix: '+', label: 'Projects Completed' },
          { value: 47, suffix: '+', label: 'Happy Clients' },
          { value: 3, suffix: '+', label: 'Years Experience' },
          { value: 100, suffix: '%', label: 'Client Satisfaction' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: 'Home',
          services: 'Services',
          current: 'E-commerce',
        },
        badge: 'E-commerce Development',
        heroTitleStart: 'Online stores that',
        heroTitleHighlight: 'actually sell.',
        heroDesc:
          'We build fast, secure, and beautiful e-commerce stores for Bangladeshi and global businesses — with the payment gateways and features your customers expect.',
        ctaStartStore: 'Start Your Store',
        ctaViewWork: 'View Past Work',
        stats: [
          { value: '30+', label: 'Stores Launched' },
          { value: '4.9★', label: 'Average Rating' },
          { value: '3×', label: 'Avg. Conversion Lift' },
          { value: '< 2s', label: 'Page Load Time' },
        ],
        features: {
          badge: 'What You Get',
          heading: 'Everything your store needs',
          items: [
            {
              title: 'Product Management',
              desc: 'Unlimited products, variants (size, color), stock tracking, bulk upload via CSV — all from a clean admin panel.',
            },
            {
              title: 'Payment Gateways',
              desc: 'bKash, Nagad, Rocket, Stripe, SSLCommerz — we integrate the payment methods your customers already trust.',
            },
            {
              title: 'Mobile-First Design',
              desc: 'Over 80% of Bangladeshi shoppers use mobile. Every store we build is pixel-perfect on phones first.',
            },
            {
              title: 'Secure Checkout',
              desc: 'SSL encryption, secure sessions, fraud protection, and PCI-compliant payment flows — zero compromise on security.',
            },
            {
              title: 'Smart Search & Filters',
              desc: 'Instant search, category filters, price range, ratings — customers find what they want in seconds.',
            },
            {
              title: 'Analytics & Reports',
              desc: 'Sales dashboard, revenue trends, best-selling products, customer data — everything you need to grow.',
            },
            {
              title: 'Order & Return Management',
              desc: 'Full order lifecycle — placed, processing, shipped, delivered. Return requests handled cleanly in the dashboard.',
            },
            {
              title: 'SEO Optimized',
              desc: 'Schema markup, sitemap, meta tags, fast Core Web Vitals — built to rank on Google from day one.',
            },
            {
              title: 'Inventory & Stock Control',
              desc: 'Low-stock alerts, auto-disable out-of-stock products, multi-warehouse support for growing businesses.',
            },
          ],
        },
        included: {
          badge: 'Full Package',
          heading: "What's included in every store",
          items: [
            'Custom storefront design (Figma → code)',
            'Product catalog with unlimited categories',
            'Shopping cart & wishlist',
            'Secure checkout with local & global payments',
            'Admin dashboard (orders, products, customers)',
            'Customer accounts & order history',
            'Promo codes & discount system',
            'Email notifications (order, shipping, invoice)',
            'SEO meta tags, sitemap & schema',
            'Google Analytics integration',
            'Mobile-first responsive layout',
            '3 months post-launch support',
          ],
        },
        process: {
          badge: 'How It Works',
          heading: 'From idea to live store',
          steps: [
            {
              title: 'Discovery Call',
              desc: 'We understand your products, target audience, and business goals.',
            },
            {
              title: 'Design in Figma',
              desc: 'Full storefront mockup — homepage, product page, cart, and checkout.',
            },
            {
              title: 'Development',
              desc: 'We build your store with clean Next.js code, hooked up to your chosen payment gateway.',
            },
            {
              title: 'Testing & QA',
              desc: 'Cross-device testing, checkout flow verification, and speed optimization.',
            },
            {
              title: 'Launch & Support',
              desc: 'We deploy, monitor, and stay available for 3 months post-launch.',
            },
          ],
        },
        tech: {
          badge: 'Tech Stack',
          heading: 'Tools we build with',
          categories: {
            Frontend: 'Frontend',
            Backend: 'Backend',
            Database: 'Database',
            Payments: 'Payments',
            Storage: 'Storage',
            Hosting: 'Hosting',
          },
        },
        faq: {
          badge: 'FAQ',
          heading: 'Common questions',
          items: [
            {
              q: 'Can you integrate bKash and Nagad?',
              a: 'Yes — we integrate bKash, Nagad, Rocket, SSLCommerz, and Stripe. We handle the entire API setup and testing.',
            },
            {
              q: 'How long does it take to build an e-commerce store?',
              a: 'A standard store takes 3–6 weeks depending on complexity. Custom features or large catalogs may take longer.',
            },
            {
              q: 'Will I be able to manage my store myself?',
              a: 'Absolutely. We build an easy-to-use admin panel so you can add products, manage orders, and update content without touching code.',
            },
            {
              q: 'Do you offer ongoing maintenance?',
              a: 'Yes — all our stores come with 3 months of free support. After that, we offer flexible maintenance packages.',
            },
            {
              q: 'Is the store mobile-friendly?',
              a: 'Every store we build is mobile-first. We test on real devices across Android and iOS before launch.',
            },
          ],
        },
        related: {
          badge: 'Related Services',
          heading: 'Often paired with',
          items: [
            { label: 'Payment Gateway' },
            { label: 'SEO Optimization' },
            { label: 'Admin Dashboard' },
          ],
        },
        cta: {
          heading: 'Ready to launch your store?',
          desc: "Tell us about your products and we'll build you a store that converts — no fluff, no templates, 100% custom.",
          getQuote: 'Get a Free Quote',
          allServices: 'All Services',
        },
      },

      // Navbar
      home: 'Home',
      services: 'Services',
      journey: 'Journey',
      about: 'About',
      team: 'Our Team',
      contact: 'Contact',
      projects: 'Projects',
      getInTouch: 'Get In Touch',
      callUs: 'Hire Us',
      navigation: 'Navigation',
      darkMode: 'Dark Mode',
      menu: 'Menu',

      // Hero
      hero: {
        badge: 'Available For New Projects',
        headingStart: 'We',
        headingHighlight: 'Build',
        headingMiddle: 'A Digital Products That',
        headingEnd: 'Perform',
        subtext:
          'Custom websites, web apps & digital solutions — crafted with precision for startups and growing businesses.',
        ctaPrimary: 'Start a Project',
        ctaSecondary: 'View Our Work',
        socialProof: 'Trusted by clients across 🇧🇩 Bangladesh & beyond',
      },

      // WhyUs
      whyUs: {
        badge: 'Why Choose Us',
        headingStart: 'Built Different.',
        headingEnd: 'Delivered Better.',
        subtext:
          "We don't just write code — we build digital products that drive real results for your business.",
        cta: 'Start Working With Us →',
        reasons: [
          {
            title: 'Fast Delivery',
            description:
              'We move quickly without cutting corners. Your project ships on time, every time.',
          },
          {
            title: 'Clean Code',
            description:
              'Scalable, maintainable, and well-documented code that your team can build on.',
          },
          {
            title: 'Reliable Support',
            description:
              'We stay with you after launch — bugs, updates, or new features, we have your back.',
          },
          {
            title: 'Modern Tech Stack',
            description:
              'Next.js, React, Node.js, Tailwind — we use the best tools to build the best products.',
          },
          {
            title: 'Client-First',
            description:
              'Your vision drives everything. We listen, understand, and build exactly what you need.',
          },
          {
            title: 'Transparent Pricing',
            description:
              'No hidden fees. Clear quotes, honest timelines, and value that exceeds the cost.',
          },
        ],
      },

      // Stats
      stats: {
        badge: 'Our Numbers',
        headingStart: 'Results That',
        headingEnd: 'Speak Loudly.',
        subtext:
          'Numbers that reflect our commitment to delivering quality and building lasting relationships.',
        items: [
          { value: 56, suffix: '+', label: 'Projects Completed' },
          { value: 47, suffix: '+', label: 'Happy Clients' },
          { value: 3, suffix: '+', label: 'Years Experience' },
          { value: 100, suffix: '%', label: 'Client Satisfaction' },
        ],
      },

      // Process
      process: {
        badge: 'How We Work',
        headingStart: 'Our',
        headingEnd: 'Process.',
        subtext:
          'A clear, proven process from idea to launch — transparent at every step.',
        steps: [
          {
            title: 'Discovery',
            description:
              'We understand your goals, audience, and project requirements in detail.',
          },
          {
            title: 'Design',
            description:
              'We craft beautiful, user-friendly interfaces tailored to your brand.',
          },
          {
            title: 'Build',
            description:
              'We develop your product with clean, scalable, and maintainable code.',
          },
          {
            title: 'Launch',
            description:
              'We deploy, test thoroughly, and launch your product to the world.',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: 'Client Testimonials',
        titlePrefix: 'Trusted by ',
        titleHighlight: 'Innovative Brands',
        titleSuffix: ' Worldwide',
        subtitle:
          'Hear directly from founders, CTOs, and product leaders who scaled their digital presence with MerxoDev Solutions.',
        ratingSummary: '5.0 / 5.0 (100% Satisfaction)',
        writeReview: 'Write a Review',
        verified: 'Verified',
        clientFeedback: 'Client Feedback',

        modalTitleLoggedIn: 'Write a Client Review',
        modalTitleLoggedOut: 'Login / Register to Leave Review',
        modalSubtitleLoggedIn: 'Your feedback will be published after admin verification',
        modalSubtitleLoggedOut: 'Please authenticate to submit your review',
        thankYou: 'Thank You',
        successMsg: 'Your review has been submitted successfully! Our engineering admin team will verify and approve it shortly.',
        doneBtn: 'Done',
        postingAs: 'Posting as:',
        yourRating: 'Your Rating (Stars) *',
        starsLabel: '5 Stars',
        yourRole: 'Your Role / Position',
        rolePlaceholder: 'e.g. Founder, Manager',
        company: 'Company / Business',
        companyPlaceholder: 'e.g. Tech BD Ltd',
        serviceCategory: 'Service Category',
        location: 'Location / City',
        locationPlaceholder: 'e.g. Dhaka, Bangladesh',
        yourFeedback: 'Your Feedback / Review *',
        feedbackPlaceholder: 'Share your experience working with MerxoDev Solutions...',
        submitting: 'Submitting Review...',
        submitBtn: 'Submit Review For Approval',

        signInTab: 'Sign In / Log In',
        createAccountTab: 'Create Account',
        fullName: 'Your Full Name *',
        fullNamePlaceholder: 'e.g. Sarah Johnson',
        profilePhoto: 'Profile Photo (Optional)',
        photoPlaceholder: 'Image URL or upload a photo',
        uploadBtn: 'Upload',
        uploading: 'Uploading...',
        emailAddress: 'Email Address *',
        emailPlaceholder: 'you@example.com',
        password: 'Password *',
        createPassword: 'Create Password (min. 6 characters) *',
        signingIn: 'Signing In...',
        signInBtn: 'Log In & Continue to Review',
        creatingAccount: 'Creating Account...',
        registerBtn: 'Register & Continue to Review',

        catWebDev: 'Web Development',
        catEcommerce: 'E-Commerce Solutions',
        catSaas: 'SaaS Web Application',
        catUiux: 'UI/UX Design',
        catPayment: 'Payment Gateway',
        catSeo: 'SEO & Growth',

        headingStart: 'What Clients',
        headingEnd: 'Say About Us.',
        subtext:
          'Real feedback from real clients who trusted us to build their digital products.',
        items: [
          {
            name: 'Rakibul Islam',
            position: 'CEO, TechStart BD',
            rating: 5,
            review:
              'MerxoDev delivered our platform ahead of schedule. The code quality was exceptional and the team was always responsive. Highly recommended!',
          },
          {
            name: 'Sarah Johnson',
            position: 'Founder, GrowthLab',
            rating: 5,
            review:
              'Working with MerxoDev was a pleasure. They understood our vision perfectly and built exactly what we needed. Professional and reliable.',
          },
          {
            name: 'Tanvir Ahmed',
            position: 'CTO, ShopEasy',
            rating: 5,
            review:
              'The best dev team we have worked with. Clean code, on-time delivery, and excellent post-launch support. Will definitely work again.',
          },
        ],
      },
    },
  },

  bn: {
    translation: {
      projectDetail: {
        back: 'ফিরে যান',
        mobileView: 'মোবাইল ভিউ',
        macAirView: 'ম্যাক-এয়ার ভিউ',
        desktopView: 'ডেস্কটপ ভিউ',
        viewLive: 'লাইভ দেখুন',
        client: 'ক্লায়েন্ট',
        duration: 'সময়কাল',
        category: 'বিভাগ',
        stack: 'স্ট্যাক',
        technologies: 'প্রযুক্তি',
        techStack: 'টেক স্ট্যাক',
        keyFeatures: 'মূল বৈশিষ্ট্য',
        otherProjects: 'অন্যান্য প্রজেক্ট',
        likeWhatYouSee: 'পছন্দ হয়েছে?',
        buildTogether: 'চলুন একসাথে কিছু অসাধারণ তৈরি করি।',
        startProject: 'প্রজেক্ট শুরু করুন',
      },
      videoShowcase: {
        badge: 'ইউটিউব শোকেস',
        titlePrefix: 'আমাদের ',
        titleHighlight: 'লেটেস্ট ভিডিও',
        titleSuffix: ' ও প্রজেক্ট ডেমো দেখুন',
        subtitle:
          'আমাদের অফিশিয়াল ইউটিউব চ্যানেলে লাইভ প্রোডাক্ট ডেমো, টেক টিউটোরিয়াল এবং সফটওয়্যার আর্কিটেকচার ভিডিওগুলো উপভোগ করুন।',
        subscribeBtn: 'চ্যানেল সাবস্ক্রাইব করুন',
        nowPlaying: 'বর্তমানে চলছে',
        upNext: 'পরবর্তী ভিডিও',
        featuredPlaylistBtn: 'ফিচার্ড প্লেলিস্ট (৩)',
        hidePlaylistBtn: 'প্লেলিস্ট বন্ধ করুন',
        autoPlayInfo: 'পরপর ৩টি ভিডিও অটো-প্লে হবে',
        video1Title: 'কাস্টম সফটওয়্যার ও ই-কমার্স আর্কিটেকচার ওয়াকথ্রু',
        video2Title: 'নেক্সট জেএস ও ক্লাউড দিয়ে ফুল-স্ট্যাক ওয়েব অ্যাপ ডেভেলপমেন্ট',
        video3Title: 'মডার্ন ইউআই/ইউএক্স ডিজাইন ও হাই-পারফরম্যান্স ইঞ্জিনিয়ারিং',
      },
      footer: {
        brand: {
          desc: 'আমরা আধুনিক ডিজিটাল সমাধান তৈরি করি — সুন্দর ওয়েব অ্যাপ থেকে শুরু করে স্কেলযোগ্য ক্লাউড সিস্টেম পর্যন্ত — দীর্ঘস্থায়ী এবং চমৎকার ডিজাইনে।',
        },
        quickLinks: {
          heading: 'দ্রুত লিংক',
        },
        navLinks: [
          { label: 'সার্ভিস', href: '/services' },
          { label: 'যাত্রা', href: '/our-journey' },
          { label: 'আমাদের', href: '/about' },
          { label: 'আমাদের টিম', href: '/our-team' },
          { label: 'যোগাযোগ', href: '/contact' },
          { label: 'প্রজেক্ট', href: '/our-projects' },
        ],
        services: {
          heading: 'সার্ভিস',
          items: [
            { label: 'ওয়েব ডেভেলপমেন্ট', href: '/services-web' },
            { label: 'ওয়েব অ্যাপ', href: '/services-web-app' },
            { label: 'ই-কমার্স', href: '/services-ecommerce' },
            { label: 'UI/UX ডিজাইন', href: '/services-design' },
            { label: 'SEO ও মার্কেটিং', href: '/services-seo' },
          ],
        },
        contact: {
          heading: 'যোগাযোগ করুন',
          address: 'রংপুর সদর, রংপুর, বাংলাদেশ',
          phone1: '+৮৮০ ১৩১ ৩৩৩৪২৭৯',
          phone2: '+৮৮০ ৯৬৯ ৭৬৩৪২৭৯',
          email: 'merxodevsolutions@gmail.com',
        },
        bottom: {
          copy: '© {{year}} MERXODEV Solutions. সর্বস্বত্ব সংরক্ষিত।',
          privacy: 'গোপনীয়তা নীতি',
          terms: 'সেবার শর্তাবলী',
        },
      },
      webApp: {
        breadcrumb: {
          home: 'হোম',
          services: 'সার্ভিসেস',
          current: 'ওয়েব অ্যাপ ডেভেলপমেন্ট',
        },

        badge: 'ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট',
        heroTitleStart: 'শক্তিশালী',
        heroTitleHighlight: 'ওয়েব অ্যাপ্লিকেশন',
        heroDesc:
          'আমরা দ্রুত, স্কেলযোগ্য এবং ফুল-স্ট্যাক ওয়েব অ্যাপ তৈরি করি — আপনার ব্যবসার জন্য কাস্টম সমাধান, MVP থেকে শুরু করে এন্টারপ্রাইজ লেভেল পর্যন্ত।',
        ctaStartProject: 'প্রজেক্ট শুরু করুন',
        ctaViewWork: 'আমাদের কাজ দেখুন',

        stats: [
          { value: '120+', label: 'সম্পন্ন ওয়েব অ্যাপ' },
          { value: '99%', label: 'ক্লায়েন্ট সন্তুষ্টি' },
          { value: '4×', label: 'গড় স্পিড উন্নতি' },
          { value: '24/7', label: 'পোস্ট-লঞ্চ সাপোর্ট' },
        ],

        features: {
          badge: 'আমরা যা তৈরি করি',
          heading: 'আপনার ওয়েব অ্যাপের সবকিছু',
          items: [
            {
              title: 'কাস্টম UI & UX ডিজাইন',
              desc: 'ব্যবহারকারীর জন্য সহজ ও পারফেক্ট ডিজাইন, React এবং Tailwind CSS দিয়ে তৈরি।',
            },
            {
              title: 'ফুল-স্ট্যাক ডেভেলপমেন্ট',
              desc: 'Next.js, Node.js এবং TypeScript ব্যবহার করে এন্ড-টু-এন্ড ডেভেলপমেন্ট।',
            },
            {
              title: 'ক্লাউড রেডি আর্কিটেকচার',
              desc: 'AWS বা Vercel-এ অটো স্কেলিং, জিরো ডাউনটাইম ডিপ্লয়মেন্ট।',
            },
            {
              title: 'অথেনটিকেশন ও সিকিউরিটি',
              desc: 'OAuth 2.0, JWT, রোল-বেসড অ্যাক্সেস এবং নিরাপদ ডাটা এনক্রিপশন।',
            },
            {
              title: 'পারফরম্যান্স অপটিমাইজেশন',
              desc: 'SSR, ক্যাশিং, লেজি লোডিং এবং Core Web Vitals অপটিমাইজেশন।',
            },
            {
              title: 'মাল্টি-টেন্যান্ট সাপোর্ট',
              desc: 'SaaS অ্যাপের জন্য ওয়ার্কস্পেস এবং অর্গানাইজেশন ম্যানেজমেন্ট।',
            },
            {
              title: 'রিয়েল-টাইম ফিচার',
              desc: 'লাইভ ড্যাশবোর্ড, চ্যাট এবং নোটিফিকেশন WebSockets দিয়ে।',
            },
            {
              title: 'অ্যানালিটিক্স ও মনিটরিং',
              desc: 'এরর ট্র্যাকিং, পারফরম্যান্স ড্যাশবোর্ড এবং ইউজার ইনসাইট।',
            },
            {
              title: 'API ও ইন্টিগ্রেশন',
              desc: 'REST, GraphQL API এবং থার্ড-পার্টি সার্ভিস ইন্টিগ্রেশন।',
            },
          ],
        },

        included: {
          badge: 'প্রতিটি প্রজেক্টে যা থাকে',
          heading: 'কোনো লুকানো খরচ নেই',
          items: [
            'রেসপনসিভ ডিজাইন (মোবাইল, ট্যাবলেট, ডেস্কটপ)',
            'সোর্স কোড ও গিট রিপোজিটরি মালিকানা',
            'ডেভ, স্টেজিং ও প্রোডাকশন সেটআপ',
            'CI/CD পাইপলাইন কনফিগারেশন',
            'ডাটাবেস ডিজাইন ও ডকুমেন্টেশন',
            'API ডকুমেন্টেশন (Swagger / Postman)',
            'টেস্টিং কাভারেজ',
            '৩০ দিনের বাগ ফিক্স সাপোর্ট',
            'পারফরম্যান্স অডিট রিপোর্ট',
            'অ্যাডমিন প্যানেল বা CMS ইন্টিগ্রেশন',
            'SEO ফ্রেন্ডলি স্ট্রাকচার',
            'অ্যাক্সেসিবিলিটি (WCAG 2.1 AA)',
          ],
        },

        process: {
          badge: 'আমাদের কাজের পদ্ধতি',
          heading: 'আইডিয়া থেকে লঞ্চ পর্যন্ত',
          steps: [
            {
              title: 'ডিসকভারি ও রিকোয়ারমেন্ট',
              desc: 'আপনার লক্ষ্য ও প্রজেক্ট স্কোপ বোঝা হয়।',
            },
            {
              title: 'আর্কিটেকচার ও ডিজাইন',
              desc: 'UI এবং সিস্টেম স্ট্রাকচার ডিজাইন করা হয়।',
            },
            {
              title: 'ডেভেলপমেন্ট',
              desc: 'Agile sprint ভিত্তিক ডেভেলপমেন্ট।',
            },
            {
              title: 'QA ও টেস্টিং',
              desc: 'বাগ ফিক্স ও পারফরম্যান্স টেস্টিং।',
            },
            {
              title: 'ডিপ্লয়মেন্ট',
              desc: 'জিরো ডাউনটাইম প্রোডাকশন লঞ্চ।',
            },
            {
              title: 'সাপোর্ট ও আপডেট',
              desc: 'নিয়মিত মেইনটেনেন্স ও ফিচার আপগ্রেড।',
            },
          ],
        },

        tech: {
          badge: 'আমাদের টেক স্ট্যাক',
          heading: 'আধুনিক টুলস, প্রমাণিত ফলাফল',
          categories: {
            Frontend: 'ফ্রন্টএন্ড',
            Backend: 'ব্যাকএন্ড',
            Database: 'ডাটাবেস',
            Hosting: 'হোস্টিং',
            DevOps: 'ডেভঅপস',
          },
        },

        faq: {
          badge: 'প্রশ্নোত্তর',
          heading: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
          items: [
            {
              q: 'একটি ওয়েব অ্যাপ বানাতে কত সময় লাগে?',
              a: 'MVP সাধারণত ৬–১০ সপ্তাহ লাগে, ফুল SaaS ৩–৬ মাস।',
            },
            {
              q: 'আমি কি সোর্স কোডের মালিক হবো?',
              a: 'হ্যাঁ, প্রজেক্ট শেষ হলে সম্পূর্ণ মালিকানা আপনাকে দেওয়া হবে।',
            },
            {
              q: 'আপনারা কোন টেক স্ট্যাক ব্যবহার করেন?',
              a: 'Next.js, Node.js, PostgreSQL বা MongoDB সাধারণত ব্যবহার করি।',
            },
            {
              q: 'পুরনো প্রজেক্টে কাজ করেন?',
              a: 'হ্যাঁ, আমরা কোড অডিট, রিফ্যাক্টর ও ফিচার অ্যাড করি।',
            },
            {
              q: 'সাপোর্ট কি দেন?',
              a: 'হ্যাঁ, ৩০ দিনের ফ্রি সাপোর্ট থাকে।',
            },
            {
              q: 'মোবাইল ফ্রেন্ডলি হবে?',
              a: 'হ্যাঁ, সব ডিভাইসের জন্য রেসপনসিভ ডিজাইন।',
            },
          ],
        },

        related: {
          badge: 'আরও দেখুন',
          heading: 'সম্পর্কিত সার্ভিস',
          items: [
            { label: 'ই-কমার্স ডেভেলপমেন্ট' },
            { label: 'SEO অপটিমাইজেশন' },
            { label: 'ড্যাশবোর্ড ও অ্যানালিটিক্স' },
          ],
        },

        cta: {
          heading: 'দারুণ কিছু তৈরি করতে প্রস্তুত?',
          desc: 'আপনার প্রজেক্ট সম্পর্কে জানান, আমরা ৪৮ ঘন্টার মধ্যে ফ্রি প্রপোজাল পাঠাবো।',
          getQuote: 'ফ্রি কোটেশন নিন',
          allServices: 'সব সার্ভিস দেখুন',
        },
      },
      webDev: {
        breadcrumb: {
          home: 'হোম',
          services: 'সার্ভিস',
          current: 'ওয়েব ডেভেলপমেন্ট',
        },
        badge: 'ওয়েব ডেভেলপমেন্ট',
        heroTitleStart: 'ওয়েবসাইট ও অ্যাপ যা',
        heroTitleHighlight: 'আপনার ব্যবসা বাড়ায়।',
        heroDesc:
          'ল্যান্ডিং পেজ থেকে শুরু করে ফুল-স্ট্যাক SaaS অ্যাপ — Next.js, React ও Node.js দিয়ে দ্রুত, স্কেলযোগ্য ও সুন্দর ওয়েব পণ্য তৈরি করি।',
        ctaPrimary: 'প্রজেক্ট শুরু করুন',
        ctaSecondary: 'আমাদের কাজ দেখুন',
        stats: [
          { value: '৫৬+', label: 'ওয়েবসাইট লঞ্চ' },
          { value: '৪.৯★', label: 'গড় রেটিং' },
          { value: '< ২s', label: 'গড় লোড টাইম' },
          { value: '১০০%', label: 'ক্লায়েন্ট সন্তুষ্টি' },
        ],
        features: {
          badge: 'আপনি যা পাচ্ছেন',
          heading: 'আপনার ওয়েব প্রজেক্টের জন্য সবকিছু',
          items: [
            {
              title: 'অত্যন্ত দ্রুত পারফরম্যান্স',
              desc: 'সার্ভার-সাইড রেন্ডারিং, স্ট্যাটিক জেনারেশন, ইমেজ অপ্টিমাইজেশন — আপনার সাইট ২ সেকেন্ডের কম সময়ে লোড হয়।',
            },
            {
              title: 'পিক্সেল-পারফেক্ট UI',
              desc: 'প্রতিটি ডিজাইন Figma-তে স্ক্র্যাচ থেকে তৈরি এবং নির্ভুলভাবে কোড করা — কোনো টেমপ্লেট নেই, কোনো শর্টকাট নেই।',
            },
            {
              title: 'মোবাইল-ফার্স্ট রেসপনসিভ',
              desc: 'ফোন, ট্যাবলেট ও ডেস্কটপ — প্রতিটি ডিভাইসে নিখুঁত দেখায়।',
            },
            {
              title: 'নিরাপদ ও স্কেলযোগ্য',
              desc: 'HTTPS, এনভায়রনমেন্ট-সিকিউরড API, রেট লিমিটিং এবং ক্লিন আর্কিটেকচার।',
            },
            {
              title: 'SEO অপ্টিমাইজড',
              desc: 'স্কিমা মার্কআপ, Open Graph, সাইটম্যাপ, মেটা ট্যাগ — প্রথম দিন থেকেই র‍্যাঙ্ক করার জন্য।',
            },
            {
              title: 'পরিষ্কার কোডবেস',
              desc: 'সুগঠিত, ডকুমেন্টেড এবং রক্ষণযোগ্য কোড যা আপনার টিম আত্মবিশ্বাসের সাথে ব্যবহার করতে পারবে।',
            },
            {
              title: 'CMS ইন্টিগ্রেশন',
              desc: 'Contentful, Sanity বা কাস্টম অ্যাডমিন প্যানেল — কোড ছাড়াই কন্টেন্ট ম্যানেজ করুন।',
            },
            {
              title: 'অ্যানালিটিক্স ও ট্র্যাকিং',
              desc: 'Google Analytics, Meta Pixel, কাস্টম ইভেন্ট ট্র্যাকিং — ব্যবহারকারীরা কীভাবে আপনার সাইট ব্যবহার করছে জানুন।',
            },
            {
              title: 'API ও থার্ড-পার্টি ইন্টিগ্রেশন',
              desc: 'পেমেন্ট গেটওয়ে, CRM, ইমেইল সার্ভিস, ম্যাপ, সোশ্যাল লগইন — সব টুল কানেক্ট করি।',
            },
          ],
        },
        tech: {
          badge: 'টেক স্ট্যাক',
          heading: 'আমরা যেসব টুল দিয়ে তৈরি করি',
          categories: {
            Frontend: 'ফ্রন্টএন্ড',
            Backend: 'ব্যাকএন্ড',
            Database: 'ডেটাবেজ',
            Storage: 'স্টোরেজ',
            Hosting: 'হোস্টিং',
            DevOps: 'ডেভঅপস',
          },
        },
        process: {
          badge: 'আমরা কীভাবে কাজ করি',
          heading: 'আইডিয়া থেকে লাইভ ওয়েবসাইট',
          steps: [
            {
              title: 'ডিসকভারি ও প্ল্যানিং',
              desc: 'আপনার লক্ষ্য, অডিয়েন্স ও টেকনিক্যাল রিকোয়ারমেন্ট বুঝে আর্কিটেকচার প্ল্যান করি।',
            },
            {
              title: 'Figma-তে ডিজাইন',
              desc: 'হোমপেজ, ইনার পেজ, মোবাইল ভিউ — কোড লেখার আগেই সব অনুমোদন করা হয়।',
            },
            {
              title: 'ডেভেলপমেন্ট',
              desc: 'Next.js ও React দিয়ে ক্লিন, স্কেলযোগ্য কোড লিখি, ব্যাকএন্ড ও API-এর সাথে সংযুক্ত করি।',
            },
            {
              title: 'টেস্টিং ও QA',
              desc: 'ক্রস-ব্রাউজার, ক্রস-ডিভাইস টেস্টিং। পারফরম্যান্স অডিট। অ্যাক্সেসিবিলিটি চেক।',
            },
            {
              title: 'লঞ্চ ও সাপোর্ট',
              desc: 'Vercel বা পছন্দের হোস্টে ডিপ্লয় করি, তারপর ৩ মাস পাশে থাকি।',
            },
          ],
        },
        pricing: {
          badge: 'মূল্য তালিকা',
          heading: 'সহজ, স্বচ্ছ মূল্য নির্ধারণ',
          subtext:
            'সব প্ল্যানে ডিজাইন, ডেভেলপমেন্ট ও ৩ মাসের ফ্রি সাপোর্ট আছে।',
          plans: [
            {
              name: 'স্টার্টার',
              price: '$২৯৯',
              desc: 'ল্যান্ডিং পেজ ও ছোট ব্যবসার সাইটের জন্য',
              cta: 'শুরু করুন',
              features: [
                'সর্বোচ্চ ৫ পেজ',
                'মোবাইল-রেসপনসিভ ডিজাইন',
                'কন্টাক্ট ফর্ম',
                'বেসিক SEO সেটআপ',
                'Google Analytics',
                '১ রাউন্ড রিভিশন',
                '২ সপ্তাহে ডেলিভারি',
                '১ মাসের সাপোর্ট',
              ],
            },
            {
              name: 'বিজনেস',
              price: '$৭৯৯',
              desc: 'বেড়ে ওঠা ব্যবসার জন্য যাদের বেশি পাওয়ার দরকার',
              cta: 'শুরু করুন',
              features: [
                'সর্বোচ্চ ১৫ পেজ',
                'কাস্টম Figma ডিজাইন',
                'CMS ইন্টিগ্রেশন',
                'ফুল SEO অপ্টিমাইজেশন',
                'API ইন্টিগ্রেশন',
                'অ্যাডমিন ড্যাশবোর্ড',
                '৩ রাউন্ড রিভিশন',
                '৪ সপ্তাহে ডেলিভারি',
                '৩ মাসের সাপোর্ট',
              ],
            },
            {
              name: 'SaaS / কাস্টম',
              price: 'কাস্টম',
              desc: 'ফুল-স্ট্যাক অ্যাপ, SaaS প্ল্যাটফর্ম, জটিল সিস্টেম',
              cta: 'কথা বলি',
              features: [
                'আনলিমিটেড পেজ ও ফিচার',
                'ফুল-স্ট্যাক Next.js + Node.js',
                'অথ সিস্টেম (JWT / OAuth)',
                'ডেটাবেজ ডিজাইন ও API',
                'পেমেন্ট ইন্টিগ্রেশন',
                'রোল-বেসড অ্যাক্সেস কন্ট্রোল',
                'আনলিমিটেড রিভিশন',
                'কাস্টম টাইমলাইন',
                '৬ মাসের সাপোর্ট',
              ],
            },
          ],
        },
        faq: {
          badge: 'FAQ',
          heading: 'সাধারণ প্রশ্ন',
          items: [
            {
              q: 'আপনারা কোন টেক স্ট্যাক ব্যবহার করেন?',
              a: 'আমরা প্রধানত Next.js 14, React, Tailwind CSS, Node.js এবং MongoDB বা PostgreSQL দিয়ে কাজ করি।',
            },
            {
              q: 'একটি ওয়েবসাইট তৈরি করতে কত সময় লাগে?',
              a: 'ল্যান্ডিং পেজ ১–২ সপ্তাহ। বিজনেস ওয়েবসাইট ৩–৪ সপ্তাহ। ফুল-স্ট্যাক SaaS অ্যাপ ৬–১২ সপ্তাহ।',
            },
            {
              q: 'আমি কি সোর্স কোড পাব?',
              a: 'হ্যাঁ — আপনি ১০০% কোডের মালিক। প্রজেক্ট শেষে পুরো কোডবেস, ডিপ্লয়মেন্ট অ্যাক্সেস ও ডকুমেন্টেশন দেওয়া হয়।',
            },
            {
              q: 'আপনারা কি বিদ্যমান সাইট রিডিজাইন করতে পারেন?',
              a: 'অবশ্যই। আধুনিক টেক, উন্নত UX ও বেটার পারফরম্যান্স সহ আপনার সাইট রিডিজাইন ও রিবিল্ড করতে পারি।',
            },
            {
              q: 'আপনারা কি হোস্টিং দেন?',
              a: 'ডিফল্টভাবে Vercel-এ ডিপ্লয় করি (বেশিরভাগ প্রজেক্টে ফ্রি)। AWS, DigitalOcean বা পছন্দের হোস্টেও করতে পারি।',
            },
            {
              q: 'লঞ্চের পরে পরিবর্তন দরকার হলে?',
              a: 'সব প্ল্যানে ১–৬ মাসের ফ্রি সাপোর্ট আছে। এরপর ফ্লেক্সিবল মাসিক মেইনটেনেন্স প্যাকেজ আছে।',
            },
          ],
        },
        related: {
          badge: 'সম্পর্কিত সার্ভিস',
          heading: 'প্রায়ই একসাথে নেওয়া হয়',
          items: [
            { label: 'ই-কমার্স ডেভেলপমেন্ট' },
            { label: 'অ্যাডমিন ড্যাশবোর্ড' },
            { label: 'SEO অপ্টিমাইজেশন' },
          ],
        },
        cta: {
          heading: 'আপনার ওয়েবসাইট তৈরি করতে প্রস্তুত?',
          desc: 'আপনার প্রয়োজন জানান — দ্রুত, পরিষ্কার ও ঠিক যেভাবে চান সেভাবে তৈরি করব।',
          getQuote: 'ফ্রি কোট নিন',
          allServices: 'সব সার্ভিস',
        },
      },
      stats: {
        badge: 'আমাদের অর্জন',
        headingStart: 'সংখ্যাগুলোই',
        headingEnd: 'আমাদের পরিচয়',
        subtext:
          'আমরা শুধু প্রতিশ্রুতি দিই না — এই হলো আমাদের ক্লায়েন্টদের জন্য আমরা প্রকৃতপক্ষে যা ডেলিভার করেছি।',
        items: [
          { value: 56, suffix: '+', label: 'সম্পন্ন প্রজেক্ট' },
          { value: 47, suffix: '+', label: 'সন্তুষ্ট ক্লায়েন্ট' },
          { value: 3, suffix: '+', label: 'বছরের অভিজ্ঞতা' },
          { value: 100, suffix: '%', label: 'ক্লায়েন্ট সন্তুষ্টি' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: 'হোম',
          services: 'সার্ভিসেস',
          current: 'ই-কমার্স',
        },
        badge: 'ই-কমার্স ডেভেলপমেন্ট',
        heroTitleStart: 'এমন অনলাইন স্টোর যা',
        heroTitleHighlight: 'সত্যিই বিক্রি হয়।',
        heroDesc:
          'আমরা বাংলাদেশি ও আন্তর্জাতিক ব্যবসার জন্য দ্রুত, নিরাপদ ও সুন্দর ই-কমার্স স্টোর তৈরি করি — যেসব পেমেন্ট গেটওয়ে ও ফিচার আপনার কাস্টমাররা চায়, সেগুলো নিয়েই।',
        ctaStartStore: 'আপনার স্টোর শুরু করুন',
        ctaViewWork: 'আগের কাজ দেখুন',
        stats: [
          { value: '৩০+', label: 'লঞ্চ করা স্টোর' },
          { value: '৪.৯★', label: 'গড় রেটিং' },
          { value: '৩×', label: 'গড় কনভার্শন বৃদ্ধি' },
          { value: '< ২s', label: 'পেজ লোড টাইম' },
        ],
        features: {
          badge: 'আপনি যা পাচ্ছেন',
          heading: 'আপনার স্টোরের জন্য প্রয়োজনীয় সবকিছু',
          items: [
            {
              title: 'প্রোডাক্ট ম্যানেজমেন্ট',
              desc: 'আনলিমিটেড প্রোডাক্ট, ভ্যারিয়েন্ট (সাইজ, কালার), স্টক ট্র্যাকিং, CSV দিয়ে বাল্ক আপলোড — সবকিছু একটি ক্লিন অ্যাডমিন প্যানেল থেকে।',
            },
            {
              title: 'পেমেন্ট গেটওয়ে',
              desc: 'বিকাশ, নগদ, রকেট, Stripe, SSLCommerz — আপনার কাস্টমাররা যেসব পেমেন্ট মেথড বিশ্বাস করে, আমরা সেগুলোই ইন্টিগ্রেট করি।',
            },
            {
              title: 'মোবাইল-ফার্স্ট ডিজাইন',
              desc: '৮০%-এরও বেশি বাংলাদেশি ক্রেতা মোবাইল ব্যবহার করেন। আমরা যেকোনো স্টোর তৈরি করি প্রথমে মোবাইলের জন্য, পিক্সেল-পারফেক্ট করে।',
            },
            {
              title: 'নিরাপদ চেকআউট',
              desc: 'SSL এনক্রিপশন, সিকিউর সেশন, ফ্রড প্রোটেকশন এবং PCI-কমপ্লায়েন্ট পেমেন্ট ফ্লো — নিরাপত্তায় কোনো আপস নেই।',
            },
            {
              title: 'স্মার্ট সার্চ ও ফিল্টার',
              desc: 'ইনস্ট্যান্ট সার্চ, ক্যাটাগরি ফিল্টার, প্রাইস রেঞ্জ, রেটিং — কাস্টমাররা সেকেন্ডের মধ্যেই তাদের প্রয়োজনীয় জিনিস খুঁজে পায়।',
            },
            {
              title: 'অ্যানালিটিক্স ও রিপোর্ট',
              desc: 'সেলস ড্যাশবোর্ড, রেভিনিউ ট্রেন্ড, সবচেয়ে বেশি বিক্রি হওয়া প্রোডাক্ট, কাস্টমার ডেটা — বৃদ্ধির জন্য প্রয়োজনীয় সবকিছু।',
            },
            {
              title: 'অর্ডার ও রিটার্ন ম্যানেজমেন্ট',
              desc: 'সম্পূর্ণ অর্ডার লাইফসাইকেল — প্লেসড, প্রসেসিং, শিপড, ডেলিভারড। রিটার্ন রিকোয়েস্ট ড্যাশবোর্ড থেকেই সহজে হ্যান্ডেল করা যায়।',
            },
            {
              title: 'SEO অপ্টিমাইজড',
              desc: 'স্কিমা মার্কআপ, সাইটম্যাপ, মেটা ট্যাগ, দ্রুত Core Web Vitals — প্রথম দিন থেকেই গুগলে র‍্যাঙ্ক করার জন্য তৈরি।',
            },
            {
              title: 'ইনভেন্টরি ও স্টক কন্ট্রোল',
              desc: 'লো-স্টক অ্যালার্ট, স্টক শেষ হলে প্রোডাক্ট অটো-ডিজেবল, বাড়ন্ত ব্যবসার জন্য মাল্টি-ওয়্যারহাউজ সাপোর্ট।',
            },
          ],
        },
        included: {
          badge: 'ফুল প্যাকেজ',
          heading: 'প্রতিটি স্টোরে যা যা থাকছে',
          items: [
            'কাস্টম স্টোরফ্রন্ট ডিজাইন (Figma → কোড)',
            'আনলিমিটেড ক্যাটাগরি সহ প্রোডাক্ট ক্যাটালগ',
            'শপিং কার্ট ও উইশলিস্ট',
            'লোকাল ও গ্লোবাল পেমেন্ট সহ নিরাপদ চেকআউট',
            'অ্যাডমিন ড্যাশবোর্ড (অর্ডার, প্রোডাক্ট, কাস্টমার)',
            'কাস্টমার অ্যাকাউন্ট ও অর্ডার হিস্টোরি',
            'প্রোমো কোড ও ডিসকাউন্ট সিস্টেম',
            'ইমেইল নোটিফিকেশন (অর্ডার, শিপিং, ইনভয়েস)',
            'SEO মেটা ট্যাগ, সাইটম্যাপ ও স্কিমা',
            'গুগল অ্যানালিটিক্স ইন্টিগ্রেশন',
            'মোবাইল-ফার্স্ট রেসপনসিভ লেআউট',
            '৩ মাসের পোস্ট-লঞ্চ সাপোর্ট',
          ],
        },
        process: {
          badge: 'কীভাবে কাজ করি',
          heading: 'আইডিয়া থেকে লাইভ স্টোর পর্যন্ত',
          steps: [
            {
              title: 'ডিসকভারি কল',
              desc: 'আমরা আপনার প্রোডাক্ট, টার্গেট অডিয়েন্স এবং বিজনেস গোল বুঝি।',
            },
            {
              title: 'Figma-তে ডিজাইন',
              desc: 'সম্পূর্ণ স্টোরফ্রন্ট মকআপ — হোমপেজ, প্রোডাক্ট পেজ, কার্ট এবং চেকআউট।',
            },
            {
              title: 'ডেভেলপমেন্ট',
              desc: 'আমরা ক্লিন Next.js কোড দিয়ে আপনার স্টোর তৈরি করি, আপনার পছন্দের পেমেন্ট গেটওয়ের সাথে যুক্ত করে।',
            },
            {
              title: 'টেস্টিং ও QA',
              desc: 'ক্রস-ডিভাইস টেস্টিং, চেকআউট ফ্লো ভেরিফিকেশন এবং স্পিড অপ্টিমাইজেশন।',
            },
            {
              title: 'লঞ্চ ও সাপোর্ট',
              desc: 'আমরা ডিপ্লয় করি, মনিটর করি, এবং লঞ্চের পর ৩ মাস পাশে থাকি।',
            },
          ],
        },
        tech: {
          badge: 'টেক স্ট্যাক',
          heading: 'আমরা যেসব টুল দিয়ে তৈরি করি',
          categories: {
            Frontend: 'ফ্রন্টএন্ড',
            Backend: 'ব্যাকএন্ড',
            Database: 'ডেটাবেজ',
            Payments: 'পেমেন্ট',
            Storage: 'স্টোরেজ',
            Hosting: 'হোস্টিং',
          },
        },
        faq: {
          badge: 'FAQ',
          heading: 'সাধারণ প্রশ্ন',
          items: [
            {
              q: 'আপনারা কি বিকাশ ও নগদ ইন্টিগ্রেট করতে পারেন?',
              a: 'হ্যাঁ — আমরা বিকাশ, নগদ, রকেট, SSLCommerz এবং Stripe ইন্টিগ্রেট করি। সম্পূর্ণ API সেটআপ ও টেস্টিং আমরাই করি।',
            },
            {
              q: 'একটি ই-কমার্স স্টোর তৈরি করতে কত সময় লাগে?',
              a: 'একটি স্ট্যান্ডার্ড স্টোর তৈরি করতে কমপ্লেক্সিটি অনুযায়ী ৩–৬ সপ্তাহ লাগে। কাস্টম ফিচার বা বড় ক্যাটালগের ক্ষেত্রে বেশি সময় লাগতে পারে।',
            },
            {
              q: 'আমি কি নিজেই আমার স্টোর ম্যানেজ করতে পারব?',
              a: 'অবশ্যই। আমরা এমন একটি সহজ অ্যাডমিন প্যানেল তৈরি করি যাতে আপনি কোড না ছুঁয়েই প্রোডাক্ট যোগ করতে, অর্ডার ম্যানেজ করতে এবং কন্টেন্ট আপডেট করতে পারেন।',
            },
            {
              q: 'আপনারা কি চলমান মেইনটেনেন্স অফার করেন?',
              a: 'হ্যাঁ — আমাদের সব স্টোরে ৩ মাসের ফ্রি সাপোর্ট থাকে। এরপর আমরা ফ্লেক্সিবল মেইনটেনেন্স প্যাকেজ অফার করি।',
            },
            {
              q: 'স্টোরটি কি মোবাইল-ফ্রেন্ডলি?',
              a: 'আমরা যেকোনো স্টোর তৈরি করি মোবাইল-ফার্স্ট হিসেবে। লঞ্চের আগে Android ও iOS-এ রিয়েল ডিভাইসে আমরা টেস্ট করি।',
            },
          ],
        },
        related: {
          badge: 'সম্পর্কিত সার্ভিস',
          heading: 'প্রায়ই একসাথে নেওয়া হয়',
          items: [
            { label: 'পেমেন্ট গেটওয়ে' },
            { label: 'SEO অপ্টিমাইজেশন' },
            { label: 'অ্যাডমিন ড্যাশবোর্ড' },
          ],
        },
        cta: {
          heading: 'আপনার স্টোর লঞ্চ করার জন্য প্রস্তুত?',
          desc: 'আপনার প্রোডাক্ট সম্পর্কে আমাদের জানান, আমরা এমন একটি স্টোর তৈরি করব যা কনভার্ট করে — কোনো ফ্লাফ নয়, কোনো টেমপ্লেট নয়, ১০০% কাস্টম।',
          getQuote: 'ফ্রি কোট নিন',
          allServices: 'সব সার্ভিস',
        },
      },

      // Navbar
      home: 'হোম',
      services: 'সেবা',
      journey: 'যাত্রা',
      about: 'আমাদের',
      team: 'আমাদের টিম',
      contact: 'যোগাযোগ',
      projects: 'প্রজেক্ট',
      getInTouch: 'যোগাযোগ করুন',
      callUs: 'কল করুন',
      navigation: 'নেভিগেশন',
      darkMode: 'ডার্ক মোড',
      menu: 'মেনু',

      // Hero
      hero: {
        badge: 'নতুন প্রজেক্টের জন্য প্রস্তুত',
        headingStart: 'আমরা',
        headingHighlight: 'তৈরি করি',
        headingMiddle: 'ডিজিটাল পণ্য',
        headingEnd: 'যা কাজ করে',
        subtext:
          'কাস্টম ওয়েবসাইট, ওয়েব অ্যাপ ও ডিজিটাল সমাধান — স্টার্টআপ ও বেড়ে ওঠা ব্যবসার জন্য নির্মিত।',
        ctaPrimary: 'প্রজেক্ট শুরু করুন →',
        ctaSecondary: 'আমাদের কাজ দেখুন',
        socialProof: '🇧🇩 বাংলাদেশ ও বিশ্বজুড়ে ক্লায়েন্টদের বিশ্বাস',
      },

      // WhyUs
      whyUs: {
        badge: 'কেন আমাদের বেছে নেবেন',
        headingStart: 'আলাদাভাবে তৈরি।',
        headingEnd: 'আরও ভালোভাবে ডেলিভারি।',
        subtext:
          'আমরা শুধু কোড লিখি না — আমরা এমন ডিজিটাল পণ্য তৈরি করি যা আপনার ব্যবসায় সত্যিকারের ফলাফল দেয়।',
        cta: 'আমাদের সাথে কাজ শুরু করুন →',
        reasons: [
          {
            title: 'দ্রুত ডেলিভারি',
            description:
              'আমরা দ্রুত কাজ করি কিন্তু মান বজায় রাখি। আপনার প্রজেক্ট সময়মতো ডেলিভারি হবে।',
          },
          {
            title: 'পরিষ্কার কোড',
            description:
              'স্কেলযোগ্য, রক্ষণযোগ্য এবং ভালো ডকুমেন্টেড কোড যা আপনার টিম ব্যবহার করতে পারবে।',
          },
          {
            title: 'নির্ভরযোগ্য সাপোর্ট',
            description:
              'লঞ্চের পরেও আমরা আপনার পাশে থাকি — বাগ, আপডেট বা নতুন ফিচার, সবকিছুতে।',
          },
          {
            title: 'আধুনিক টেক স্ট্যাক',
            description:
              'Next.js, React, Node.js, Tailwind — সেরা টুল দিয়ে সেরা পণ্য তৈরি করি।',
          },
          {
            title: 'ক্লায়েন্ট-প্রথম',
            description:
              'আপনার ভিশনই আমাদের চালিকাশক্তি। আমরা শুনি, বুঝি এবং ঠিক সেটাই তৈরি করি।',
          },
          {
            title: 'স্বচ্ছ মূল্য নির্ধারণ',
            description:
              'কোনো লুকানো চার্জ নেই। পরিষ্কার কোটেশন, সৎ সময়সীমা এবং খরচের চেয়ে বেশি মূল্য।',
          },
        ],
      },

      // Stats
      stats: {
        badge: 'আমাদের সংখ্যা',
        headingStart: 'ফলাফল যা',
        headingEnd: 'জোরে কথা বলে।',
        subtext:
          'সংখ্যাগুলো আমাদের মানসম্পন্ন ডেলিভারি এবং দীর্ঘস্থায়ী সম্পর্ক গড়ার প্রতিশ্রুতি প্রতিফলিত করে।',
        items: [
          { value: 50, suffix: '+', label: 'সম্পন্ন প্রজেক্ট' },
          { value: 30, suffix: '+', label: 'সন্তুষ্ট ক্লায়েন্ট' },
          { value: 2, suffix: '+', label: 'বছরের অভিজ্ঞতা' },
          { value: 100, suffix: '%', label: 'ক্লায়েন্ট সন্তুষ্টি' },
        ],
      },

      // Process
      process: {
        badge: 'আমরা কীভাবে কাজ করি',
        headingStart: 'আমাদের',
        headingEnd: 'প্রক্রিয়া।',
        subtext:
          'ধারণা থেকে লঞ্চ পর্যন্ত একটি স্পষ্ট, প্রমাণিত প্রক্রিয়া — প্রতিটি ধাপে স্বচ্ছ।',
        steps: [
          {
            title: 'আবিষ্কার',
            description:
              'আমরা আপনার লক্ষ্য, দর্শক এবং প্রজেক্টের প্রয়োজনীয়তা বিস্তারিতভাবে বুঝি।',
          },
          {
            title: 'ডিজাইন',
            description:
              'আমরা আপনার ব্র্যান্ডের সাথে মানানসই সুন্দর, ব্যবহারকারী-বান্ধব ইন্টারফেস তৈরি করি।',
          },
          {
            title: 'নির্মাণ',
            description:
              'আমরা পরিষ্কার, স্কেলযোগ্য এবং রক্ষণযোগ্য কোড দিয়ে আপনার পণ্য তৈরি করি।',
          },
          {
            title: 'লঞ্চ',
            description:
              'আমরা ডেপ্লয় করি, পুঙ্খানুপুঙ্খভাবে পরীক্ষা করি এবং আপনার পণ্য বিশ্বে লঞ্চ করি।',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: 'ক্লায়েন্ট প্রশংসাপত্র',
        titlePrefix: 'বিশ্বস্ত অংশীদার ',
        titleHighlight: 'উদ্ভাবনী ব্র্যান্ডগুলোর',
        titleSuffix: ' বিশ্বব্যাপী',
        subtitle:
          'ফাউন্ডার, সিটিও এবং প্রোডাক্ট লিডারদের কাছ থেকে শুনুন যারা MerxoDev Solutions-এর সাথে তাদের ডিজিটাল পণ্য তৈরি ও স্কেল করেছেন।',
        ratingSummary: '৫.০ / ৫.০ (১০০% সন্তুষ্টি)',
        writeReview: 'রিভিউ লিখুন',
        verified: 'ভেরিফাইড',
        clientFeedback: 'ক্লায়েন্ট ফিডব্যাক',

        modalTitleLoggedIn: 'ক্লায়েন্ট রিভিউ লিখুন',
        modalTitleLoggedOut: 'রিভিউ দিতে লগইন বা রেজিস্টার করুন',
        modalSubtitleLoggedIn: 'অ্যাডমিন ভেরিফিকেশনের পর আপনার রিভিউ ওয়েবসাইটে প্রকাশ করা হবে',
        modalSubtitleLoggedOut: 'আপনার রিভিউ জমা দিতে অনুগ্রহ করে অথেন্টিকেট করুন',
        thankYou: 'আপনাকে ধন্যবাদ',
        successMsg: 'আপনার রিভিউ সফলভাবে জমা দেওয়া হয়েছে! আমাদের ইঞ্জিনিয়ারিং টিম যাচাই করে দ্রুত এটি অনুমোদন করবে।',
        doneBtn: 'সম্পন্ন',
        postingAs: 'পোস্ট করছেন:',
        yourRating: 'আপনার রেটিং (স্টার) *',
        starsLabel: 'স্টার',
        yourRole: 'আপনার পদবি / পজিশন',
        rolePlaceholder: 'যেমন: প্রতিষ্ঠাতা, ম্যানেজার',
        company: 'কোম্পানি / প্রতিষ্ঠান',
        companyPlaceholder: 'যেমন: টেক বিডি লিমিটেড',
        serviceCategory: 'সার্ভিস ক্যাটাগরি',
        location: 'লোকেশন / শহর',
        locationPlaceholder: 'যেমন: ঢাকা, বাংলাদেশ',
        yourFeedback: 'আপনার মূল্যবান মতামত / রিভিউ *',
        feedbackPlaceholder: 'MerxoDev Solutions-এর সাথে কাজের অভিজ্ঞতা শেয়ার করুন...',
        submitting: 'রিভিউ জমা হচ্ছে...',
        submitBtn: 'অনুমোদনের জন্য রিভিউ জমা দিন',

        signInTab: 'লগইন করুন',
        createAccountTab: 'অ্যাকাউন্ট তৈরি করুন',
        fullName: 'আপনার পূর্ণ নাম *',
        fullNamePlaceholder: 'যেমন: সারাহ জনসন',
        profilePhoto: 'প্রোফাইল ছবি (ঐচ্ছিক)',
        photoPlaceholder: 'ছবির লিঙ্ক অথবা ফটো আপলোড করুন',
        uploadBtn: 'আপলোড',
        uploading: 'আপলোড হচ্ছে...',
        emailAddress: 'ইমেইল অ্যাড্রেস *',
        emailPlaceholder: 'you@example.com',
        password: 'পাসওয়ার্ড *',
        createPassword: 'পাসওয়ার্ড তৈরি করুন (নূন্যতম ৬ অক্ষর) *',
        signingIn: 'লগইন হচ্ছে...',
        signInBtn: 'লগইন করে রিভিউতে এগিয়ে যান',
        creatingAccount: 'অ্যাকাউন্ট তৈরি হচ্ছে...',
        registerBtn: 'রেজিস্টার করে রিভিউতে এগিয়ে যান',

        catWebDev: 'ওয়েব ডেভেলপমেন্ট',
        catEcommerce: 'ই-কমার্স সল্যুশনস',
        catSaas: 'স্যাস ওয়েব অ্যাপ্লিকেশন',
        catUiux: 'ইউআই/ইউএক্স ডিজাইন',
        catPayment: 'পেমেন্ট গেটওয়ে',
        catSeo: 'এসইও এবং গ্রোথ',

        headingStart: 'ক্লায়েন্টরা',
        headingEnd: 'কী বলেন।',
        subtext:
          'যেসব ক্লায়েন্ট আমাদের উপর আস্থা রেখেছেন তাদের সত্যিকারের মতামত।',
        items: [
          {
            name: 'রাকিবুল ইসলাম',
            position: 'সিইও, টেকস্টার্ট বিডি',
            rating: 5,
            review:
              'MerxoDev নির্ধারিত সময়ের আগেই আমাদের প্ল্যাটফর্ম ডেলিভারি দিয়েছে। কোডের মান ছিল অসাধারণ এবং টিম সবসময় সাড়া দিয়েছে। অত্যন্ত প্রশংসনীয়!',
          },
          {
            name: 'সারাহ জনসন',
            position: 'প্রতিষ্ঠাতা, গ্রোথল্যাব',
            rating: 5,
            review:
              'MerxoDev-এর সাথে কাজ করা আনন্দদায়ক ছিল। তারা আমাদের ভিশন নিখুঁতভাবে বুঝেছে এবং ঠিক যা দরকার তাই তৈরি করেছে।',
          },
          {
            name: 'তানভীর আহমেদ',
            position: 'সিটিও, শপইজি',
            rating: 5,
            review:
              'আমরা যে সেরা ডেভ টিমের সাথে কাজ করেছি। পরিষ্কার কোড, সময়মতো ডেলিভারি এবং চমৎকার পোস্ট-লঞ্চ সাপোর্ট। অবশ্যই আবার কাজ করব।',
          },
        ],
      },
    },
  },

  ar: {
    translation: {
      projectDetail: {
        back: 'رجوع',
        mobileView: 'عرض الجوال',
        macAirView: 'عرض ماك-إير',
        desktopView: 'عرض سطح المكتب',
        viewLive: 'عرض مباشر',
        client: 'العميل',
        duration: 'المدة',
        category: 'الفئة',
        stack: 'التقنيات',
        technologies: 'تقنية',
        techStack: 'مكدس التقنيات',
        keyFeatures: 'الميزات الرئيسية',
        otherProjects: 'مشاريع أخرى',
        likeWhatYouSee: 'أعجبك ما تراه؟',
        buildTogether: 'لنبني شيئاً رائعاً معاً.',
        startProject: 'ابدأ مشروعاً',
      },
      footer: {
        brand: {
          desc: 'نصنع حلولاً رقمية حديثة — من تطبيقات ويب أنيقة إلى أنظمة سحابية قابلة للتوسع — مبنية لتدوم ومصممة لتبهر.',
        },
        quickLinks: {
          heading: 'روابط سريعة',
        },
        navLinks: [
          { label: 'الخدمات', href: '/services' },
          { label: 'رحلتنا', href: '/our-journey' },
          { label: 'من نحن', href: '/about' },
          { label: 'فريقنا', href: '/our-team' },
          { label: 'اتصل بنا', href: '/contact' },
          { label: 'المشاريع', href: '/our-projects' },
        ],
        services: {
          heading: 'الخدمات',
          items: [
            { label: 'تطوير الويب', href: '/services-web' },
            { label: 'تطبيقات الويب', href: '/services-web-app' },
            { label: 'التجارة الإلكترونية', href: '/services-ecommerce' },
            { label: 'تصميم UI/UX', href: '/services-design' },
            { label: 'تحسين محركات البحث', href: '/services-seo' },
          ],
        },
        contact: {
          heading: 'تواصل معنا',
          address: 'رانغبور سادار، رانغبور، بنغلاديش',
          phone1: '+880 131 3334279',
          phone2: '+880 969 7634279',
          email: 'merxodevsolutions@gmail.com',
        },
        bottom: {
          copy: '© {{year}} MERXODEV Solutions. جميع الحقوق محفوظة.',
          privacy: 'سياسة الخصوصية',
          terms: 'شروط الخدمة',
        },
      },
      webApp: {
        breadcrumb: {
          home: 'الرئيسية',
          services: 'الخدمات',
          current: 'تطوير تطبيقات الويب',
        },

        badge: 'تطوير تطبيقات الويب',
        heroTitleStart: 'نبني',
        heroTitleHighlight: 'تطبيقات ويب قوية',
        heroDesc:
          'نقوم بتصميم وتطوير تطبيقات ويب سريعة وقابلة للتوسع تناسب أعمالك من MVP إلى أنظمة متقدمة.',
        ctaStartProject: 'ابدأ مشروعك',
        ctaViewWork: 'عرض أعمالنا',

        stats: [
          { value: '120+', label: 'مشروع مكتمل' },
          { value: '99%', label: 'رضا العملاء' },
          { value: '4×', label: 'تحسين الأداء' },
          { value: '24/7', label: 'دعم مستمر' },
        ],

        features: {
          badge: 'ما نقدمه',
          heading: 'كل ما يحتاجه تطبيقك',
          items: [
            {
              title: 'تصميم واجهات مخصصة',
              desc: 'تصميمات احترافية تركز على تجربة المستخدم.',
            },
            {
              title: 'تطوير متكامل',
              desc: 'باستخدام Next.js و Node.js و TypeScript.',
            },
            {
              title: 'بنية سحابية',
              desc: 'نشر قابل للتوسع على AWS أو Vercel.',
            },
            {
              title: 'الأمان والمصادقة',
              desc: 'OAuth 2.0 و JWT وحماية متقدمة.',
            },
            {
              title: 'تحسين الأداء',
              desc: 'SSR والتخزين المؤقت وتحسين السرعة.',
            },
            {
              title: 'دعم متعدد المستأجرين',
              desc: 'أنظمة SaaS متعددة الشركات.',
            },
            {
              title: 'ميزات لحظية',
              desc: 'الدردشة والإشعارات ولوحات مباشرة.',
            },
            {
              title: 'التحليلات والمراقبة',
              desc: 'تتبع الأداء وتحليل المستخدمين.',
            },
            {
              title: 'واجهات API والتكامل',
              desc: 'REST و GraphQL وربط الخدمات الخارجية.',
            },
          ],
        },

        included: {
          badge: 'يشمل المشروع',
          heading: 'بدون تكاليف مخفية',
          items: [
            'تصميم متجاوب',
            'ملكية كاملة للكود',
            'إعداد CI/CD',
            'تصميم قاعدة البيانات',
            'توثيق API',
            'اختبارات شاملة',
            'دعم 30 يوم',
            'تقرير الأداء',
            'تحسين SEO',
            'توافق الوصول',
          ],
        },

        process: {
          badge: 'طريقة العمل',
          heading: 'من الفكرة إلى الإطلاق',
          steps: [
            { title: 'تحليل المتطلبات', desc: 'فهم أهداف المشروع' },
            { title: 'تصميم النظام', desc: 'بناء الهيكل المعماري' },
            { title: 'التطوير', desc: 'تطوير مرن وسريع' },
            { title: 'الاختبار', desc: 'اختبار الجودة والأداء' },
            { title: 'النشر', desc: 'إطلاق بدون توقف' },
            { title: 'الدعم', desc: 'صيانة وتحديث مستمر' },
          ],
        },

        tech: {
          badge: 'التقنيات',
          heading: 'تقنيات حديثة ونتائج قوية',
          categories: {
            Frontend: 'الواجهة الأمامية',
            Backend: 'الخلفية',
            Database: 'قاعدة البيانات',
            Hosting: 'الاستضافة',
            DevOps: 'عمليات التطوير',
          },
        },

        faq: {
          badge: 'الأسئلة الشائعة',
          heading: 'الأسئلة المتكررة',
          items: [
            {
              q: 'كم يستغرق التطوير؟',
              a: 'MVP من 6 إلى 10 أسابيع، والمشاريع الكبيرة 3–6 أشهر.',
            },
            {
              q: 'هل أمتلك الكود؟',
              a: 'نعم، تحصل على ملكية كاملة بعد الانتهاء.',
            },
            {
              q: 'ما التقنية المستخدمة؟',
              a: 'Next.js و Node.js و PostgreSQL أو MongoDB.',
            },
            {
              q: 'هل تعملون على مشاريع قديمة؟',
              a: 'نعم، نقوم بالمراجعة والتحسين.',
            },
            {
              q: 'هل يوجد دعم؟',
              a: 'نعم، دعم مجاني لمدة 30 يوم.',
            },
            {
              q: 'هل التصميم متجاوب؟',
              a: 'نعم، يعمل على جميع الأجهزة.',
            },
          ],
        },

        related: {
          badge: 'استكشف المزيد',
          heading: 'خدمات ذات صلة',
          items: [
            { label: 'تطوير المتاجر الإلكترونية' },
            { label: 'تحسين محركات البحث' },
            { label: 'لوحات التحكم والتحليلات' },
          ],
        },

        cta: {
          heading: 'هل أنت مستعد لبدء مشروعك؟',
          desc: 'أخبرنا عن فكرتك وسنرسل لك عرضًا خلال 48 ساعة.',
          getQuote: 'احصل على عرض سعر',
          allServices: 'جميع الخدمات',
        },
      },
      webDev: {
        breadcrumb: {
          home: 'الرئيسية',
          services: 'الخدمات',
          current: 'تطوير الويب',
        },
        badge: 'تطوير الويب',
        heroTitleStart: 'مواقع وتطبيقات',
        heroTitleHighlight: 'تنمّي أعمالك.',
        heroDesc:
          'من صفحات الهبوط إلى تطبيقات SaaS متكاملة — نبني منتجات ويب سريعة وقابلة للتوسع وجميلة باستخدام Next.js و React و Node.js.',
        ctaPrimary: 'ابدأ المشروع',
        ctaSecondary: 'شاهد أعمالنا',
        stats: [
          { value: '56+', label: 'مواقع تم إطلاقها' },
          { value: '4.9★', label: 'متوسط التقييم' },
          { value: '< 2ث', label: 'متوسط وقت التحميل' },
          { value: '100%', label: 'رضا العملاء' },
        ],
        features: {
          badge: 'ما الذي ستحصل عليه',
          heading: 'كل ما تحتاجه لمشروعك',
          items: [
            {
              title: 'أداء فائق السرعة',
              desc: 'SSR و SSG وتحسين الصور — موقعك يعمل في أقل من ثانيتين.',
            },
            {
              title: 'واجهة دقيقة التصميم',
              desc: 'كل تصميم يُبنى من الصفر في Figma ويُحوَّل إلى كود بدقة عالية بدون قوالب.',
            },
            {
              title: 'تصميم متجاوب أولاً للهواتف',
              desc: 'تجربة مثالية على الهاتف والتابلت والكمبيوتر.',
            },
            {
              title: 'آمن وقابل للتوسع',
              desc: 'HTTPS وواجهات API آمنة وحدّ للطلبات وبنية نظيفة.',
            },
            {
              title: 'محسّن لمحركات البحث',
              desc: 'Schema و Open Graph و Sitemap — جاهز للترتيب من اليوم الأول.',
            },
            {
              title: 'كود نظيف',
              desc: 'كود منظم وقابل للصيانة مع توثيق واضح.',
            },
            {
              title: 'تكامل CMS',
              desc: 'Contentful أو Sanity أو لوحة تحكم مخصصة لإدارة المحتوى بسهولة.',
            },
            {
              title: 'التحليلات والتتبع',
              desc: 'Google Analytics و Meta Pixel وتتبع الأحداث المخصصة.',
            },
            {
              title: 'تكامل API',
              desc: 'بوابات الدفع و CRM والبريد الإلكتروني والخرائط وتسجيل الدخول الاجتماعي.',
            },
          ],
        },
        tech: {
          badge: 'التقنيات',
          heading: 'الأدوات التي نستخدمها',
          categories: {
            Frontend: 'الواجهة الأمامية',
            Backend: 'الواجهة الخلفية',
            Database: 'قاعدة البيانات',
            Storage: 'التخزين',
            Hosting: 'الاستضافة',
            DevOps: 'عمليات التطوير',
          },
        },
        process: {
          badge: 'كيف نعمل',
          heading: 'من الفكرة إلى موقع حي',
          steps: [
            {
              title: 'تحليل وتخطيط',
              desc: 'فهم الأهداف والجمهور والمتطلبات التقنية.',
            },
            {
              title: 'تصميم في Figma',
              desc: 'تصميم كامل UI/UX قبل بدء التطوير.',
            },
            {
              title: 'التطوير',
              desc: 'بناء المشروع باستخدام Next.js و React وواجهات API.',
            },
            {
              title: 'الاختبار والجودة',
              desc: 'اختبار الأداء والمتصفحات وإمكانية الوصول.',
            },
            {
              title: 'الإطلاق والدعم',
              desc: 'النشر على Vercel أو أي استضافة مع دعم مستمر.',
            },
          ],
        },
        pricing: {
          badge: 'الأسعار',
          heading: 'أسعار بسيطة وواضحة',
          subtext: 'جميع الخطط تشمل التصميم والتطوير ودعم 3 أشهر.',
          plans: [
            {
              name: 'الباقة الأساسية',
              price: 'BDT 3500',
              desc: 'لصفحات الهبوط والمواقع الصغيرة',
              cta: 'ابدأ الآن',
              features: [
                'حتى 5 صفحات',
                'تصميم متجاوب',
                'نموذج تواصل',
                'إعداد SEO أساسي',
                'Google Analytics',
                'تعديل واحد',
                'التسليم خلال أسبوعين',
                'دعم شهر واحد',
              ],
            },
            {
              name: 'باقة الأعمال',
              price: 'BDT 1500',
              desc: 'للشركات النامية',
              cta: 'ابدأ الآن',
              features: [
                'حتى 15 صفحة',
                'تصميم مخصص في Figma',
                'تكامل CMS',
                'تحسين SEO كامل',
                'تكامل API',
                'لوحة تحكم',
                '3 تعديلات',
                'التسليم خلال 4 أسابيع',
                'دعم 3 أشهر',
              ],
            },
            {
              name: 'SaaS / مخصص',
              price: ' حسب الطلب',
              desc: 'تطبيقات كاملة ومنصات SaaS',
              cta: 'تواصل معنا',
              features: [
                'عدد غير محدود من الصفحات',
                'Next.js + Node.js كامل',
                'نظام تسجيل الدخول (JWT / OAuth)',
                'تصميم قاعدة بيانات و API',
                'تكامل الدفع',
                'صلاحيات المستخدمين',
                'تعديلات غير محدودة',
                'جدول زمني مخصص',
                'دعم 6 أشهر',
              ],
            },
          ],
        },
        faq: {
          badge: 'الأسئلة الشائعة',
          heading: 'أسئلة متكررة',
          items: [
            {
              q: 'ما التقنيات التي تستخدمونها؟',
              a: 'Next.js و React و Tailwind CSS و Node.js و MongoDB أو PostgreSQL.',
            },
            {
              q: 'كم يستغرق إنشاء موقع؟',
              a: 'صفحة هبوط: 1–2 أسبوع، موقع أعمال: 3–4 أسابيع، SaaS: 6–12 أسبوع.',
            },
            {
              q: 'هل أحصل على الكود المصدري؟',
              a: 'نعم، تحصل على ملكية كاملة للكود.',
            },
            {
              q: 'هل تعيدون تصميم المواقع؟',
              a: 'نعم، نقوم بتحسين التصميم والأداء وتجربة المستخدم.',
            },
            {
              q: 'هل توفرون استضافة؟',
              a: 'عادةً Vercel، ويمكن AWS أو DigitalOcean حسب الطلب.',
            },
            {
              q: 'ماذا بعد الإطلاق؟',
              a: 'دعم مجاني من 1 إلى 6 أشهر حسب الباقة.',
            },
          ],
        },
        related: {
          badge: 'خدمات ذات صلة',
          heading: 'يتم طلبها غالباً معاً',
          items: [
            { label: 'تطوير المتاجر الإلكترونية' },
            { label: 'لوحة التحكم' },
            { label: 'تحسين SEO' },
          ],
        },
        cta: {
          heading: 'هل أنت جاهز لبناء موقعك؟',
          desc: 'أخبرنا باحتياجاتك وسنقوم بالبناء بسرعة واحترافية.',
          getQuote: 'احصل على عرض مجاني',
          allServices: 'جميع الخدمات',
        },
      },
      stats: {
        badge: 'سجلّنا الحافل',
        headingStart: 'أرقام',
        headingEnd: 'تتحدث عنّا',
        subtext: 'نحن لا نَعِد فقط — هذا ما قدّمناه فعليًا لعملائنا.',
        items: [
          { value: 56, suffix: '+', label: 'مشروع مكتمل' },
          { value: 47, suffix: '+', label: 'عميل سعيد' },
          { value: 3, suffix: '+', label: 'سنوات خبرة' },
          { value: 100, suffix: '%', label: 'رضا العملاء' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: 'الرئيسية',
          services: 'الخدمات',
          current: 'التجارة الإلكترونية',
        },
        badge: 'تطوير التجارة الإلكترونية',
        heroTitleStart: 'متاجر إلكترونية',
        heroTitleHighlight: 'تبيع فعلًا.',
        heroDesc:
          'نبني متاجر إلكترونية سريعة وآمنة وجميلة للشركات في بنغلاديش والعالم — مزوّدة ببوابات الدفع والميزات التي يتوقعها عملاؤك.',
        ctaStartStore: 'ابدأ متجرك',
        ctaViewWork: 'شاهد أعمالنا السابقة',
        stats: [
          { value: '+30', label: 'متجر تم إطلاقه' },
          { value: '4.9★', label: 'متوسط التقييم' },
          { value: '×3', label: 'متوسط ارتفاع التحويل' },
          { value: '< 2s', label: 'زمن تحميل الصفحة' },
        ],
        features: {
          badge: 'ما الذي تحصل عليه',
          heading: 'كل ما يحتاجه متجرك',
          items: [
            {
              title: 'إدارة المنتجات',
              desc: 'منتجات غير محدودة، خيارات متعددة (الحجم، اللون)، تتبع المخزون، رفع جماعي عبر CSV — كل ذلك من لوحة تحكم واضحة.',
            },
            {
              title: 'بوابات الدفع',
              desc: 'bKash وNagad وRocket وStripe وSSLCommerz — ندمج طرق الدفع التي يثق بها عملاؤك بالفعل.',
            },
            {
              title: 'تصميم يراعي الجوال أولًا',
              desc: 'أكثر من 80% من المتسوقين في بنغلاديش يستخدمون الجوال. كل متجر نبنيه مصمم ليكون مثاليًا على الهاتف أولًا.',
            },
            {
              title: 'دفع آمن',
              desc: 'تشفير SSL، جلسات آمنة، حماية من الاحتيال، وتدفقات دفع متوافقة مع PCI — لا تنازل عن الأمان.',
            },
            {
              title: 'بحث وفلاتر ذكية',
              desc: 'بحث فوري، فلاتر للفئات، نطاق الأسعار، التقييمات — يجد العملاء ما يريدون خلال ثوانٍ.',
            },
            {
              title: 'تحليلات وتقارير',
              desc: 'لوحة مبيعات، اتجاهات الإيرادات، أفضل المنتجات مبيعًا، بيانات العملاء — كل ما تحتاجه للنمو.',
            },
            {
              title: 'إدارة الطلبات والإرجاع',
              desc: 'دورة حياة كاملة للطلب — تم الطلب، قيد المعالجة، تم الشحن، تم التسليم. طلبات الإرجاع تُدار بسهولة من لوحة التحكم.',
            },
            {
              title: 'محسّن لمحركات البحث',
              desc: 'بيانات Schema، خريطة الموقع، الوسوم الوصفية، Core Web Vitals سريعة — مبني للترتيب في جوجل من اليوم الأول.',
            },
            {
              title: 'التحكم في المخزون',
              desc: 'تنبيهات انخفاض المخزون، تعطيل تلقائي للمنتجات غير المتوفرة، ودعم لمستودعات متعددة للأعمال المتنامية.',
            },
          ],
        },
        included: {
          badge: 'باقة كاملة',
          heading: 'ما يتضمنه كل متجر',
          items: [
            'تصميم واجهة متجر مخصصة (Figma → كود)',
            'كتالوج منتجات بفئات غير محدودة',
            'سلة تسوق وقائمة أمنيات',
            'دفع آمن بطرق محلية وعالمية',
            'لوحة تحكم إدارية (الطلبات، المنتجات، العملاء)',
            'حسابات العملاء وسجل الطلبات',
            'أكواد ترويجية ونظام خصومات',
            'إشعارات بريد إلكتروني (الطلب، الشحن، الفاتورة)',
            'وسوم SEO وخريطة الموقع وبيانات Schema',
            'دمج مع Google Analytics',
            'تصميم متجاوب يراعي الجوال أولًا',
            'دعم فني لمدة 3 أشهر بعد الإطلاق',
          ],
        },
        process: {
          badge: 'كيف نعمل',
          heading: 'من الفكرة إلى متجر حقيقي',
          steps: [
            {
              title: 'مكالمة استكشافية',
              desc: 'نتعرف على منتجاتك وجمهورك المستهدف وأهداف عملك.',
            },
            {
              title: 'التصميم في Figma',
              desc: 'نموذج كامل لواجهة المتجر — الصفحة الرئيسية، صفحة المنتج، السلة، والدفع.',
            },
            {
              title: 'التطوير',
              desc: 'نبني متجرك بكود Next.js نظيف، مرتبط ببوابة الدفع التي تختارها.',
            },
            {
              title: 'الاختبار وضمان الجودة',
              desc: 'اختبار عبر أجهزة متعددة، التحقق من تدفق الدفع، وتحسين السرعة.',
            },
            {
              title: 'الإطلاق والدعم',
              desc: 'ننشر، نراقب، ونبقى متاحين لمدة 3 أشهر بعد الإطلاق.',
            },
          ],
        },
        tech: {
          badge: 'التقنيات المستخدمة',
          heading: 'الأدوات التي نبني بها',
          categories: {
            Frontend: 'الواجهة الأمامية',
            Backend: 'الخلفية',
            Database: 'قاعدة البيانات',
            Payments: 'الدفع',
            Storage: 'التخزين',
            Hosting: 'الاستضافة',
          },
        },
        faq: {
          badge: 'الأسئلة الشائعة',
          heading: 'أسئلة متكررة',
          items: [
            {
              q: 'هل يمكنكم دمج bKash وNagad؟',
              a: 'نعم — ندمج bKash وNagad وRocket وSSLCommerz وStripe. نتولى إعداد واختبار واجهات البرمجة بالكامل.',
            },
            {
              q: 'كم تستغرق عملية بناء متجر إلكتروني؟',
              a: 'يستغرق المتجر القياسي من 3 إلى 6 أسابيع حسب التعقيد. قد تستغرق الميزات المخصصة أو الكتالوجات الكبيرة وقتًا أطول.',
            },
            {
              q: 'هل سأتمكن من إدارة متجري بنفسي؟',
              a: 'بالتأكيد. نبني لوحة تحكم سهلة الاستخدام تتيح لك إضافة المنتجات وإدارة الطلبات وتحديث المحتوى دون لمس الكود.',
            },
            {
              q: 'هل تقدمون صيانة مستمرة؟',
              a: 'نعم — تأتي جميع متاجرنا مع 3 أشهر من الدعم المجاني. بعد ذلك، نقدم باقات صيانة مرنة.',
            },
            {
              q: 'هل المتجر متوافق مع الجوال؟',
              a: 'كل متجر نبنيه مصمم ليراعي الجوال أولًا. نختبره على أجهزة حقيقية بأنظمة Android وiOS قبل الإطلاق.',
            },
          ],
        },
        related: {
          badge: 'خدمات ذات صلة',
          heading: 'غالبًا ما تُطلب معًا',
          items: [
            { label: 'بوابة الدفع' },
            { label: 'تحسين محركات البحث' },
            { label: 'لوحة التحكم الإدارية' },
          ],
        },
        cta: {
          heading: 'هل أنت جاهز لإطلاق متجرك؟',
          desc: 'أخبرنا عن منتجاتك وسنبني لك متجرًا يحقق التحويلات — بلا حشو، بلا قوالب جاهزة، مخصص بنسبة 100%.',
          getQuote: 'احصل على عرض سعر مجاني',
          allServices: 'كل الخدمات',
        },
      },

      // Navbar
      home: 'الرئيسية',
      services: 'الخدمات',
      journey: 'رحلتنا',
      about: 'من نحن',
      team: 'فريقنا',
      contact: 'اتصل بنا',
      projects: 'المشاريع',
      getInTouch: 'تواصل معنا',
      callUs: 'اتصل بنا',
      navigation: 'التنقل',
      darkMode: 'الوضع الداكن',
      menu: 'القائمة',

      // Hero
      hero: {
        badge: 'متاح لمشاريع جديدة',
        headingStart: 'نحن',
        headingHighlight: 'نبني',
        headingMiddle: 'منتجات رقمية',
        headingEnd: 'تُحقق النتائج',
        subtext:
          'مواقع مخصصة، تطبيقات ويب وحلول رقمية — مصممة بدقة للشركات الناشئة والمتنامية.',
        ctaPrimary: 'ابدأ مشروعك →',
        ctaSecondary: 'شاهد أعمالنا',
        socialProof: 'موثوق به من عملاء حول العالم 🌍',
      },

      // WhyUs
      whyUs: {
        badge: 'لماذا تختارنا',
        headingStart: 'مختلفون في البناء.',
        headingEnd: 'أفضل في التسليم.',
        subtext:
          'لا نكتب الكود فحسب — نبني منتجات رقمية تحقق نتائج حقيقية لعملك.',
        cta: 'ابدأ العمل معنا →',
        reasons: [
          {
            title: 'تسليم سريع',
            description:
              'نعمل بسرعة دون التنازل عن الجودة. مشروعك يُسلَّم في الوقت المحدد دائمًا.',
          },
          {
            title: 'كود نظيف',
            description:
              'كود قابل للتوسع والصيانة وموثق جيدًا يمكن لفريقك البناء عليه.',
          },
          {
            title: 'دعم موثوق',
            description:
              'نبقى معك بعد الإطلاق — أخطاء، تحديثات، أو ميزات جديدة، نحن هنا.',
          },
          {
            title: 'تقنيات حديثة',
            description:
              'Next.js، React، Node.js، Tailwind — نستخدم أفضل الأدوات لبناء أفضل المنتجات.',
          },
          {
            title: 'العميل أولاً',
            description:
              'رؤيتك تقود كل شيء. نستمع ونفهم ونبني بالضبط ما تحتاجه.',
          },
          {
            title: 'أسعار شفافة',
            description:
              'لا رسوم خفية. عروض أسعار واضحة، جداول زمنية صادقة، وقيمة تتجاوز التكلفة.',
          },
        ],
      },

      // Stats
      stats: {
        badge: 'أرقامنا',
        headingStart: 'نتائج',
        headingEnd: 'تتحدث بصوت عالٍ.',
        subtext: 'أرقام تعكس التزامنا بتقديم الجودة وبناء علاقات دائمة.',
        items: [
          { value: 50, suffix: '+', label: 'مشروع مكتمل' },
          { value: 30, suffix: '+', label: 'عميل سعيد' },
          { value: 2, suffix: '+', label: 'سنوات خبرة' },
          { value: 100, suffix: '%', label: 'رضا العملاء' },
        ],
      },

      // Process
      process: {
        badge: 'كيف نعمل',
        headingStart: 'عمليتنا',
        headingEnd: 'المثبتة.',
        subtext: 'عملية واضحة ومثبتة من الفكرة حتى الإطلاق — شفافة في كل خطوة.',
        steps: [
          {
            title: 'الاكتشاف',
            description: 'نفهم أهدافك وجمهورك ومتطلبات مشروعك بالتفصيل.',
          },
          {
            title: 'التصميم',
            description:
              'نصمم واجهات جميلة وسهلة الاستخدام مصممة لعلامتك التجارية.',
          },
          {
            title: 'البناء',
            description: 'نطور منتجك بكود نظيف وقابل للتوسع والصيانة.',
          },
          {
            title: 'الإطلاق',
            description: 'ننشر ونختبر بدقة ونطلق منتجك للعالم.',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: 'آراء العملاء',
        headingStart: 'ماذا يقول',
        headingEnd: 'عملاؤنا.',
        subtext:
          'تقييمات حقيقية من عملاء حقيقيين وثقوا بنا لبناء منتجاتهم الرقمية.',
        items: [
          {
            name: 'رکیب الاسلام',
            position: 'الرئيس التنفيذي، تيك ستارت',
            rating: 5,
            review:
              'سلّم MerxoDev منصتنا قبل الموعد المحدد. كانت جودة الكود استثنائية والفريق كان دائم الاستجابة. أنصح به بشدة!',
          },
          {
            name: 'سارة جونسون',
            position: 'المؤسسة، جروث لاب',
            rating: 5,
            review:
              'كان العمل مع MerxoDev ممتعاً. فهموا رؤيتنا تماماً وبنوا بالضبط ما نحتاجه. احترافي وموثوق.',
          },
          {
            name: 'تنویر احمد',
            position: 'المدير التقني، شوب ايزي',
            rating: 5,
            review:
              'أفضل فريق تطوير عملنا معه. كود نظيف، تسليم في الوقت المحدد، ودعم ممتاز بعد الإطلاق. سنعمل معهم بالتأكيد مجدداً.',
          },
        ],
      },
    },
  },

  zh: {
    translation: {
      projectDetail: {
        back: '返回',
        mobileView: '移动端视图',
        macAirView: 'Mac-Air 视图',
        desktopView: '桌面端视图',
        viewLive: '查看线上版本',
        client: '客户',
        duration: '周期',
        category: '类别',
        stack: '技术栈',
        technologies: '项技术',
        techStack: '技术栈',
        keyFeatures: '核心功能',
        otherProjects: '其他项目',
        likeWhatYouSee: '感兴趣吗？',
        buildTogether: '让我们一起创造精彩。',
        startProject: '开始项目',
      },
      footer: {
        brand: {
          desc: '我们打造现代数字解决方案——从精美的 Web 应用到可扩展的云系统——经久耐用，设计出众。',
        },
        quickLinks: {
          heading: '快速链接',
        },
        navLinks: [
          { label: '服务', href: '/services' },
          { label: '历程', href: '/our-journey' },
          { label: '关于', href: '/about' },
          { label: '团队', href: '/our-team' },
          { label: '联系', href: '/contact' },
          { label: '项目', href: '/our-projects' },
        ],
        services: {
          heading: '服务',
          items: [
            { label: '网站开发', href: '/services-web' },
            { label: 'Web 应用', href: '/services-web-app' },
            { label: '电商开发', href: '/services-ecommerce' },
            { label: 'UI/UX 设计', href: '/services-design' },
            { label: 'SEO 优化', href: '/services-seo' },
          ],
        },
        contact: {
          heading: '联系我们',
          address: '孟加拉国朗普尔市',
          phone1: '+880 131 3334279',
          phone2: '+880 969 7634279',
          email: 'merxodevsolutions@gmail.com',
        },
        bottom: {
          copy: '© {{year}} MERXODEV Solutions. 保留所有权利。',
          privacy: '隐私政策',
          terms: '服务条款',
        },
      },
      webApp: {
        breadcrumb: {
          home: '首页',
          services: '服务',
          current: 'Web 应用开发',
        },

        badge: 'Web 应用开发',
        heroTitleStart: '构建强大的',
        heroTitleHighlight: 'Web 应用',
        heroDesc:
          '我们为您的业务打造快速、可扩展的全栈 Web 应用，从 MVP 到企业级平台。',
        ctaStartProject: '开始项目',
        ctaViewWork: '查看作品',

        stats: [
          { value: '120+', label: '已交付项目' },
          { value: '99%', label: '客户满意度' },
          { value: '4×', label: '性能提升' },
          { value: '24/7', label: '持续支持' },
        ],

        features: {
          badge: '我们提供什么',
          heading: '您的 Web 应用所需的一切',
          items: [
            {
              title: '定制 UI/UX 设计',
              desc: '以用户为中心的高质量界面设计。',
            },
            {
              title: '全栈开发',
              desc: '使用 Next.js、Node.js 和 TypeScript 构建完整系统。',
            },
            {
              title: '云端架构',
              desc: '支持 AWS、Vercel 的自动扩展部署。',
            },
            {
              title: '安全认证',
              desc: 'OAuth 2.0、JWT 和企业级安全控制。',
            },
            {
              title: '性能优化',
              desc: 'SSR、缓存和核心性能优化。',
            },
            {
              title: '多租户支持',
              desc: '适用于 SaaS 的多组织系统。',
            },
            {
              title: '实时功能',
              desc: '聊天、通知和实时仪表盘。',
            },
            {
              title: '分析与监控',
              desc: '性能监控和用户分析。',
            },
            {
              title: 'API 与集成',
              desc: 'REST / GraphQL 和第三方集成。',
            },
          ],
        },

        included: {
          badge: '项目包含内容',
          heading: '无隐藏费用',
          items: [
            '响应式设计',
            '源码所有权',
            'CI/CD 部署',
            '数据库设计',
            'API 文档',
            '测试覆盖',
            '30 天支持',
            '性能审计',
            'SEO 优化',
            '无障碍支持',
          ],
        },

        process: {
          badge: '工作流程',
          heading: '从需求到上线',
          steps: [
            { title: '需求分析', desc: '理解项目目标' },
            { title: '架构设计', desc: '设计系统结构' },
            { title: '开发阶段', desc: '敏捷开发流程' },
            { title: '测试阶段', desc: '质量与性能测试' },
            { title: '部署上线', desc: '零停机发布' },
            { title: '持续支持', desc: '长期维护更新' },
          ],
        },

        tech: {
          badge: '技术栈',
          heading: '现代技术，可靠结果',
          categories: {
            Frontend: '前端',
            Backend: '后端',
            Database: '数据库',
            Hosting: '托管',
            DevOps: '运维',
          },
        },

        faq: {
          badge: '常见问题',
          heading: '常见问题解答',
          items: [
            {
              q: '开发需要多久？',
              a: 'MVP 6–10 周，完整 SaaS 3–6 个月。',
            },
            {
              q: '我拥有代码吗？',
              a: '是的，项目完成后完全归你所有。',
            },
            {
              q: '使用什么技术栈？',
              a: 'Next.js、Node.js、PostgreSQL 或 MongoDB。',
            },
            {
              q: '支持旧项目吗？',
              a: '是的，我们提供审计与重构服务。',
            },
            {
              q: '是否提供支持？',
              a: '提供 30 天免费支持。',
            },
            {
              q: '是否支持移动端？',
              a: '完全响应式设计。',
            },
          ],
        },

        related: {
          badge: '更多服务',
          heading: '相关服务',
          items: [
            { label: '电商开发' },
            { label: 'SEO 优化' },
            { label: '数据分析面板' },
          ],
        },

        cta: {
          heading: '准备开始项目？',
          desc: '告诉我们你的需求，我们将在 48 小时内回复。',
          getQuote: '获取报价',
          allServices: '所有服务',
        },
      },
      webDev: {
        breadcrumb: { home: '首页', services: '服务', current: '网站开发' },
        badge: '网站开发',
        heroTitleStart: '打造能够',
        heroTitleHighlight: '提升你业务的网站与应用',
        heroDesc:
          '从落地页到全栈 SaaS 应用 — 使用 Next.js、React 和 Node.js 构建快速、可扩展且精美的 Web 产品。',
        ctaPrimary: '开始项目',
        ctaSecondary: '查看作品',
        stats: [
          { value: '56+', label: '已上线网站' },
          { value: '4.9★', label: '平均评分' },
          { value: '< 2秒', label: '平均加载时间' },
          { value: '100%', label: '客户满意度' },
        ],
        features: {
          badge: '你将获得',
          heading: '为你的项目提供的一切',
          items: [
            {
              title: '超高性能',
              desc: 'SSR、SSG、图片优化 — 网站加载时间低于 2 秒。',
            },
            { title: '像素级设计', desc: 'Figma 从零设计并精确实现，无模板。' },
            { title: '移动优先响应式', desc: '手机、平板、桌面端完美适配。' },
            { title: '安全可扩展', desc: 'HTTPS、安全 API、限流与清晰架构。' },
            {
              title: 'SEO 优化',
              desc: 'Schema、OG 标签、站点地图，帮助快速排名。',
            },
            { title: '干净代码', desc: '结构清晰、可维护、文档完善。' },
            {
              title: 'CMS 集成',
              desc: 'Contentful、Sanity 或自定义后台管理系统。',
            },
            {
              title: '数据分析',
              desc: 'Google Analytics、Meta Pixel、自定义事件追踪。',
            },
            {
              title: 'API 与集成',
              desc: '支付、CRM、邮件、地图、社交登录等集成。',
            },
          ],
        },
        tech: {
          badge: '技术栈',
          heading: '我们使用的工具',
          categories: {
            Frontend: '前端',
            Backend: '后端',
            Database: '数据库',
            Storage: '存储',
            Hosting: '托管',
            DevOps: '运维',
          },
        },
        process: {
          badge: '工作流程',
          heading: '从想法到上线网站',
          steps: [
            { title: '需求分析', desc: '理解目标、用户与技术需求。' },
            { title: 'Figma 设计', desc: '开发前完成完整 UI/UX 设计。' },
            { title: '开发实现', desc: '使用 Next.js 和 React 构建系统。' },
            { title: '测试与质量保证', desc: '跨浏览器与性能测试。' },
            { title: '上线与支持', desc: '部署上线并提供持续支持。' },
          ],
        },
        pricing: {
          badge: '价格',
          heading: '简单透明的定价',
          subtext: '所有套餐包含设计、开发与 3 个月支持。',
          plans: [
            {
              name: '基础版',
              price: 'BDT 3500',
              desc: '适用于落地页与小型网站',
              cta: '开始',
              features: [
                '最多 5 页',
                '移动端适配',
                '联系表单',
                '基础 SEO',
                'Google Analytics',
                '1 次修改',
                '2 周交付',
                '1 个月支持',
              ],
            },
            {
              name: '商业版',
              price: 'BDT 1500',
              desc: '适用于成长型企业',
              cta: '开始',
              features: [
                '最多 15 页',
                '定制 Figma 设计',
                'CMS 集成',
                '完整 SEO 优化',
                'API 集成',
                '管理后台',
                '3 次修改',
                '4 周交付',
                '3 个月支持',
              ],
            },
            {
              name: 'SaaS / 定制',
              price: '定制',
              desc: '全栈应用与 SaaS 平台',
              cta: '联系咨询',
              features: [
                '无限页面',
                'Next.js + Node.js 全栈',
                '认证系统 (JWT / OAuth)',
                '数据库与 API 设计',
                '支付集成',
                '角色权限管理',
                '无限修改',
                '定制时间线',
                '6 个月支持',
              ],
            },
          ],
        },
        faq: {
          badge: '常见问题',
          heading: '常见问题解答',
          items: [
            {
              q: '你们使用什么技术栈？',
              a: 'Next.js、React、Tailwind CSS、Node.js、MongoDB 或 PostgreSQL。',
            },
            {
              q: '开发一个网站需要多久？',
              a: '落地页 1–2 周，商业网站 3–4 周，SaaS 6–12 周。',
            },
            { q: '我可以拿到源码吗？', a: '可以，100% 源码所有权。' },
            { q: '可以重做旧网站吗？', a: '可以，我们会优化 UI/UX 与性能。' },
            {
              q: '你们提供托管吗？',
              a: '默认 Vercel，也支持 AWS、DO 或其他平台。',
            },
            { q: '上线后还能修改吗？', a: '根据套餐提供 1–6 个月免费支持。' },
          ],
        },
        related: {
          badge: '相关服务',
          heading: '常一起使用',
          items: [
            { label: '电商开发' },
            { label: '管理后台' },
            { label: 'SEO 优化' },
          ],
        },
        cta: {
          heading: '准备好创建你的网站了吗？',
          desc: '告诉我们你的需求，我们快速帮你实现。',
          getQuote: '获取免费报价',
          allServices: '全部服务',
        },
      },

      stats: {
        badge: '我们的成绩',
        headingStart: '用数据',
        headingEnd: '说话',
        subtext: '我们不只是承诺——这是我们为客户实际交付的成果。',
        items: [
          { value: 56, suffix: '+', label: '已完成项目' },
          { value: 47, suffix: '+', label: '满意客户' },
          { value: 3, suffix: '+', label: '年经验' },
          { value: 100, suffix: '%', label: '客户满意度' },
        ],
      },
      ecommerce: {
        breadcrumb: {
          home: '首页',
          services: '服务',
          current: '电子商务',
        },
        badge: '电子商务开发',
        heroTitleStart: '真正能卖货的',
        heroTitleHighlight: '在线商店。',
        heroDesc:
          '我们为孟加拉国及全球企业打造快速、安全、美观的电商网站——配备客户期待的支付方式和功能。',
        ctaStartStore: '开始建店',
        ctaViewWork: '查看过往案例',
        stats: [
          { value: '30+', label: '已上线商店' },
          { value: '4.9★', label: '平均评分' },
          { value: '3×', label: '平均转化提升' },
          { value: '< 2秒', label: '页面加载时间' },
        ],
        features: {
          badge: '您将获得',
          heading: '商店所需的一切',
          items: [
            {
              title: '商品管理',
              desc: '无限商品数量、款式选项（尺寸、颜色）、库存追踪、CSV批量上传——全部通过简洁的后台管理。',
            },
            {
              title: '支付网关',
              desc: 'bKash、Nagad、Rocket、Stripe、SSLCommerz——我们集成客户已经信任的支付方式。',
            },
            {
              title: '移动优先设计',
              desc: '超过80%的孟加拉国消费者使用手机购物。我们打造的每个商店都以手机端为优先，做到像素级精准。',
            },
            {
              title: '安全结账',
              desc: 'SSL加密、安全会话、防欺诈保护，以及符合PCI标准的支付流程——安全绝不妥协。',
            },
            {
              title: '智能搜索与筛选',
              desc: '即时搜索、分类筛选、价格区间、评分——顾客几秒钟内就能找到想要的商品。',
            },
            {
              title: '数据分析与报表',
              desc: '销售仪表盘、收入趋势、畅销商品、客户数据——业务增长所需的一切。',
            },
            {
              title: '订单与退换管理',
              desc: '完整订单生命周期——下单、处理中、已发货、已送达。退换货请求可在后台轻松处理。',
            },
            {
              title: 'SEO优化',
              desc: '结构化数据标记、站点地图、元标签、快速的Core Web Vitals——从第一天起就为谷歌排名而构建。',
            },
            {
              title: '库存管理',
              desc: '低库存提醒、缺货商品自动下架、支持多仓库，助力业务持续增长。',
            },
          ],
        },
        included: {
          badge: '完整套餐',
          heading: '每个商店都包含',
          items: [
            '定制店面设计（Figma → 代码）',
            '不限分类的商品目录',
            '购物车与收藏夹',
            '支持本地与国际支付的安全结账',
            '后台管理面板（订单、商品、客户）',
            '客户账户与订单历史',
            '优惠码与折扣系统',
            '邮件通知（订单、发货、发票）',
            'SEO元标签、站点地图与结构化数据',
            'Google Analytics集成',
            '移动优先的响应式布局',
            '上线后3个月技术支持',
          ],
        },
        process: {
          badge: '我们的流程',
          heading: '从创意到上线',
          steps: [
            {
              title: '需求沟通',
              desc: '了解您的产品、目标客户和业务目标。',
            },
            {
              title: 'Figma设计',
              desc: '完整的店面原型——首页、商品页、购物车与结账页面。',
            },
            {
              title: '开发实现',
              desc: '用简洁的Next.js代码搭建商店，并接入您选择的支付网关。',
            },
            {
              title: '测试与质量保证',
              desc: '跨设备测试、结账流程验证以及速度优化。',
            },
            {
              title: '上线与支持',
              desc: '我们负责部署、监控，并在上线后提供3个月的持续支持。',
            },
          ],
        },
        tech: {
          badge: '技术栈',
          heading: '我们使用的工具',
          categories: {
            Frontend: '前端',
            Backend: '后端',
            Database: '数据库',
            Payments: '支付',
            Storage: '存储',
            Hosting: '托管',
          },
        },
        faq: {
          badge: '常见问题',
          heading: '常见问题解答',
          items: [
            {
              q: '你们能集成bKash和Nagad吗？',
              a: '可以——我们集成bKash、Nagad、Rocket、SSLCommerz和Stripe，并负责全部API配置与测试。',
            },
            {
              q: '搭建一个电商网站需要多长时间？',
              a: '标准商店通常需要3至6周，具体取决于复杂程度。定制功能或大型商品目录可能需要更长时间。',
            },
            {
              q: '我自己能管理商店吗？',
              a: '当然可以。我们会搭建一个易用的后台管理面板，让您无需接触代码即可添加商品、管理订单和更新内容。',
            },
            {
              q: '你们提供持续维护服务吗？',
              a: '是的——所有商店都附带3个月的免费支持。之后我们提供灵活的维护套餐。',
            },
            {
              q: '商店对移动端友好吗？',
              a: '我们打造的每个商店都坚持移动优先。上线前会在真实的Android和iOS设备上进行测试。',
            },
          ],
        },
        related: {
          badge: '相关服务',
          heading: '常与此搭配',
          items: [
            { label: '支付网关' },
            { label: 'SEO优化' },
            { label: '后台管理面板' },
          ],
        },
        cta: {
          heading: '准备好上线您的商店了吗？',
          desc: '告诉我们您的产品，我们将为您打造一个真正能带来转化的商店——拒绝套话，拒绝模板，100%定制。',
          getQuote: '获取免费报价',
          allServices: '查看全部服务',
        },
      },

      // Navbar
      home: '首页',
      services: '服务',
      journey: '历程',
      about: '关于',
      team: '团队',
      contact: '联系',
      projects: '项目',
      getInTouch: '联系我们',
      callUs: '致电我们',
      navigation: '导航',
      darkMode: '深色模式',
      menu: '菜单',

      // Hero
      hero: {
        badge: '开放新项目合作',
        headingStart: '我们',
        headingHighlight: '打造',
        headingMiddle: '数字产品',
        headingEnd: '创造卓越表现',
        subtext:
          '定制网站、网络应用和数字解决方案 — 为初创企业和成长型企业精心打造。',
        ctaPrimary: '开始项目 →',
        ctaSecondary: '查看我们的作品',
        socialProof: '受到全球客户的信赖 🌏',
      },

      // WhyUs
      whyUs: {
        badge: '为什么选择我们',
        headingStart: '与众不同的构建。',
        headingEnd: '更好的交付。',
        subtext:
          '我们不只是写代码 — 我们构建能为您的业务带来真实成果的数字产品。',
        cta: '开始与我们合作 →',
        reasons: [
          {
            title: '快速交付',
            description:
              '我们快速行动，但不以牺牲质量为代价。您的项目始终按时交付。',
          },
          {
            title: '简洁代码',
            description:
              '可扩展、可维护且文档齐全的代码，您的团队可以在此基础上继续构建。',
          },
          {
            title: '可靠支持',
            description:
              '上线后我们依然陪伴您 — 无论是Bug修复、更新还是新功能，我们随时在。',
          },
          {
            title: '现代技术栈',
            description:
              'Next.js、React、Node.js、Tailwind — 我们用最好的工具构建最好的产品。',
          },
          {
            title: '客户至上',
            description:
              '您的愿景驱动一切。我们倾听、理解，并构建您真正需要的产品。',
          },
          {
            title: '透明定价',
            description:
              '没有隐藏费用。清晰的报价、诚实的时间表，价值超越成本。',
          },
        ],
      },

      // Stats
      stats: {
        badge: '我们的数据',
        headingStart: '成果',
        headingEnd: '大声说话。',
        subtext: '这些数字反映了我们对高质量交付和建立持久关系的承诺。',
        items: [
          { value: 50, suffix: '+', label: '完成项目' },
          { value: 30, suffix: '+', label: '满意客户' },
          { value: 2, suffix: '+', label: '年经验' },
          { value: 100, suffix: '%', label: '客户满意度' },
        ],
      },

      // Process
      process: {
        badge: '我们如何工作',
        headingStart: '我们的',
        headingEnd: '流程。',
        subtext: '从创意到发布的清晰、经过验证的流程 — 每一步都透明。',
        steps: [
          {
            title: '发现',
            description: '我们详细了解您的目标、受众和项目需求。',
          },
          {
            title: '设计',
            description: '我们为您的品牌量身定制美观、用户友好的界面。',
          },
          {
            title: '构建',
            description: '我们使用简洁、可扩展且可维护的代码开发您的产品。',
          },
          {
            title: '发布',
            description: '我们部署、彻底测试并向世界发布您的产品。',
          },
        ],
      },

      // Testimonials
      testimonials: {
        badge: '客户评价',
        headingStart: '客户',
        headingEnd: '怎么说。',
        subtext: '来自真实客户的真实反馈，他们信任我们构建他们的数字产品。',
        items: [
          {
            name: 'Rakibul Islam',
            position: '首席执行官，TechStart BD',
            rating: 5,
            review:
              'MerxoDev提前交付了我们的平台。代码质量非常出色，团队始终保持响应。强烈推荐！',
          },
          {
            name: 'Sarah Johnson',
            position: '创始人，GrowthLab',
            rating: 5,
            review:
              '与MerxoDev合作非常愉快。他们完美理解了我们的愿景，构建了我们所需的一切。专业可靠。',
          },
          {
            name: 'Tanvir Ahmed',
            position: '首席技术官，ShopEasy',
            rating: 5,
            review:
              '我们合作过的最好的开发团队。代码简洁，按时交付，发布后支持出色。一定会再次合作。',
          },
        ],
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
