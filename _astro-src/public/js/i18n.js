(function () {
  const STORAGE_KEY = "zyphero-lang";
  const DEFAULT_ROOT_LANG = "ro";

  function waPhoneDigits() {
    const c = typeof window !== "undefined" && window.ZypheroConfig && window.ZypheroConfig.waPhoneE164;
    return typeof c === "string" && /^\d{8,15}$/.test(c.trim()) ? c.trim() : "40747821384";
  }

  const STRINGS = {
    ro: {
      meta: {
        title: "ZypheroLab | Website-uri premium care aduc clienți",
        description:
          "ZypheroLab construiește website-uri premium, rapide și orientate pe conversie pentru business-uri din România și clienți internaționali. SEO tehnic, UX clar și lead-uri reale.",
        ogTitle: "ZypheroLab | Website-uri premium pentru creștere",
        ogDescription:
          "Design modern, viteză ridicată și structură orientată pe lead-uri. Optimizat pentru Google și căutări asistate de AI.",
        twitterTitle: "ZypheroLab | Website-uri premium pentru business",
        twitterDescription: "Website-uri rapide, SEO-ready și orientate pe conversie."
      },
      skip: "Sari la conținut",
      brand: { aria: "ZypheroLab — Acasă" },
      darkMode: { aria: "Comută dark mode" },
      nav: {
        aria: "Navigare principală",
        home: "Acasă",
        services: "Servicii",
        pricing: "Prețuri",
        portfolio: "Portofoliu",
        simulator: "Simulator",
        contact: "Contact"
      },
      lang: { switchAria: "Limba site-ului", ro: "Română", en: "Engleză" },
      header: { cta: "Cere ofertă" },
      hero: {
        title: "Website-uri premium care transformă vizitatorii în clienți",
        subtitle: "Design modern, structură clară și SEO tehnic. Primești un draft funcțional în 3-5 zile lucrătoare.",
        tagline: "Fără haos tehnic. Cu rezultate măsurabile.",
        cta1: "Cere ofertă",
        cta2: "WhatsApp rapid",
        t1: "Răspuns în max. 24h",
        t2: "Draft în 3-5 zile",
        t3: "Pachete de la 300€",
        lead: "",
        ctaSim: "Încearcă simulatorul live",
        ctaStart: "Începe acum",
        ctaQuote: "Cere ofertă"
      },
      facts: {
        title: "Date rapide pentru Google și motoare AI",
        li1: "ZypheroLab proiectează website-uri orientate pe conversie pentru IMM-uri.",
        li2: "Stack-ul urmărește performanța, accesibilitatea și conținut ușor de citat.",
        li3: "Optimizăm HTML semantic, schema markup, FAQ și claritatea mesajului.",
        li4: "CTA-urile sunt construite pentru contact direct: formular + WhatsApp."
      },
      services: {
        title: "Servicii",
        c1t: "Website rapid",
        c1p: "Structură modernă, încărcare rapidă și experiență impecabilă pe mobil.",
        c2t: "SEO + vizibilitate AI",
        c2p: "Meta, schema, FAQ și conținut clar pentru căutări clasice și asistate de AI.",
        c3t: "Conversie",
        c3p: "CTA-uri testabile, formular orientat pe lead-uri și mesaje care reduc fricțiunea."
      },
      seoLinks: {
        services: {
          lead: "Vezi detalii complete in pagina dedicata de servicii.",
          cta: "Exploreaza servicii"
        },
        pricing: {
          lead: "Compara pachetele in pagina completa de preturi.",
          cta: "Vezi preturi detaliate"
        },
        contact: {
          lead: "Ai nevoie de cerinte mai avansate? Vezi pagina completa de contact comercial.",
          cta: "Pagina de contact"
        }
      },
      offer: {
        title: "Oferta potrivită pentru lansare rapidă",
        lead: "Pachet Start: landing page strategic + formular lead + setup SEO + analytics de bază.",
        li1: "Mesaj comercial clar și orientat pe conversie",
        li2: "Design premium, adaptat mobil-first",
        li3: "Implementare tehnică rapidă și curată",
        li4: "Checklist de optimizare post-lansare",
        cta: "Vreau o ofertă personalizată"
      },
      proof: {
        title: "Transparență înainte de contract",
        lead: "Știi pașii, termenii orientativi și ce primești la schimbul prețului afișat.",
        b1: "Răspuns la solicitări în max. 24h (zile lucrătoare)",
        b2: "Livrare tipică: draft funcțional în 3–5 zile (pachet Start)",
        b3: "Claritate pe scope: brief → structură → build → lansare",
        b4: "După go-live: checklist scurt + suport conform pachetului"
      },
      about: {
        title: "Despre mine",
        intro: "Web designer freelancer. Livrez rapid website-uri pentru afaceri mici și mijlocii din România și pentru clienți internaționali.",
        cta: "Hai să discutăm"
      },
      process: {
        title: "Cum lucrăm",
        step1: "Discuție brief",
        step1desc: "Aflăm obiectivele, publicul țintă și mesajul principal.",
        step2: "Wireframe",
        step2desc: "Aprobăm structura și fluxul înainte de design final.",
        step3: "Build + Test",
        step3desc: "Dezvoltare rapidă, testare pe toate dispozitivele.",
        step4: "Lansare + Suport",
        step4desc: "Publicare, monitorizare și 3 luni suport inclus."
      },
      pricing: {
        title: "Prețuri transparente",
        popular: "Cel mai popular",
        start: {
          title: "Pachet Start",
          price: "300 €",
          f1: "Landing page completă",
          f2: "SEO tehnic de bază",
          f3: "Formular lead + WhatsApp",
          f4: "Lansare în 3-5 zile",
          f5: "Suport email 30 zile",
          cta: "Vreau pachetul Start"
        },
        growth: {
          title: "Pachet Growth",
          price: "600 €",
          f1: "Website multi-pagină",
          f2: "SEO tehnic avansat",
          f3: "Analytics + rapoarte lunare",
          f4: "Lansare în 5-7 zile",
          f5: "Suport prioritar 3 luni",
          cta: "Vreau pachetul Growth"
        },
        custom: {
          title: "Proiect Custom",
          price: "La cerere",
          f1: "Soluție personalizată",
          f2: "E-commerce sau aplicație",
          f3: "Integrări API",
          f4: "Timeline flexibil",
          f5: "Suport dedicat",
          cta: "Cere ofertă"
        },
        subscription: {
          title: "Abonamente lunare",
          subtitle: "Suport continuu pentru creștere",
          maintenance: {
            title: "Mentenanță",
            price: "50 € / lună",
            f1: "Backup zilnic",
            f2: "Actualizări de securitate",
            f3: "Monitorizare uptime",
            f4: "Remedieri minore de buguri",
            cta: "Abonare"
          },
          support: {
            title: "Suport Prioritar",
            price: "100 € / lună",
            f1: "Răspuns în 2 ore",
            f2: "Modificări incluse",
            f3: "Consultanță tehnică",
            f4: "Prioritate la actualizări",
            cta: "Abonare"
          },
          content: {
            title: "Conținut + SEO",
            price: "30 € / lună",
            f1: "Modificări text",
            f2: "Adăugare articole",
            f3: "Actualizare imagini",
            f4: "SEO on-page",
            cta: "Abonare"
          }
        }
      },
      portfolio: {
        title: "Portofoliu — proiecte web design",
        labelChallenge: "Provocare:",
        labelSolution: "Soluție:",
        labelResult: "Rezultat:",
        c1t: "Landing Restaurant",
        c1p: "Design modern pentru restaurant cu sistem de rezervări integrat. Optimizat pentru mobil.",
        c1m: "",
        c2t: "Site Cabinet Avocat",
        c2p: "Prezență online profesională cu formular de programare și SEO local.",
        c2m: "",
        project1: {
          title: "Landing Restaurant",
          desc: "Design modern pentru restaurant cu sistem de rezervări integrat. Optimizat pentru mobil.",
          challenge: "Site vechi, greu pe mobil; rezervările se pierdeau în telefon.",
          solution: "Landing cu meniu clar, CTA rezervare și informații ușor de scanat.",
          result: "Flux de contact unificat; experiență stabilă pe telefon.",
          link: "Detalii la cerere →"
        },
        project2: {
          title: "Site Cabinet Avocat",
          desc: "Prezență online profesională cu formular de programare și SEO local.",
          challenge: "Clienții nu știau cum se programează; lipsă încredere în canalul online.",
          solution: "Structură pentru servicii + formular programare + SEO local de bază.",
          result: "Mesaj profesional și canal clar de înscriere.",
          link: "Detalii la cerere →"
        },
        project3: {
          title: "Redesign E-commerce",
          desc: "Optimizare conversie pentru magazin online. +40% vânzări după redesign.",
          challenge: "Coș abandonat ridicat; mobile slab; mesaj produs neclar.",
          solution: "Redesign flux checkout, ierarhie vizuală și pagini produs orientate pe conversie.",
          result: "Estimare +40% vânzări după lansare (vs. aceeași perioadă anul anterior).",
          link: "Detalii la cerere →"
        },
        project4: {
          title: "Portofoliu Freelancer",
          desc: "Site personal cu galerie de proiecte și formular de contact. Design minimalist.",
          challenge: "Lucrările erau împrăștiate; contactul era greu de găsit rapid.",
          solution: "Site minimalist cu galerie proiecte și un singur CTA principal.",
          result: "Prezentare unitară; mai puține mesaje neclare de la vizitatori.",
          link: "Detalii la cerere →"
        },
        project5: {
          title: "Demo interactiv",
          desc: "Testează simulatorul AI și vezi cum poate arăta website-ul business-ului tău în câteva secunde.",
          challenge: "Greu de imaginat cum ar arăta site-ul înainte de un brief complet.",
          solution: "Tip business + culoare + preview instant în pagină (fără backend).",
          result: "Pornești de la un concept vizibil; apoi refinăm la ofertă personalizată.",
          link: "Încearcă demo →"
        }
      },
      testimonials: {
        title: "Ce spun clienții",
        quote: "„Mesajul e clar, site-ul e rapid, iar lead-urile au crescut în prima lună.”",
        cite: "— Andrei, antreprenor local",
        andrei: {
          text: "„După lansare, cererile calificate au crescut în primele săptămâni. Site-ul comunică exact ce oferim.”",
          author: "Andrei, fondator firmă servicii"
        },
        cristi: {
          text: "„Am trecut de la un site vechi la un flux clar de contact. Acum avem lead-uri constante, fără trafic irosit.”",
          author: "Cristi, owner business local"
        },
        maria: {
          text: "„Proces clar, livrare rapidă și design premium. Clienții au început să ne perceapă mult mai profesionist.”",
          author: "Maria, fondator studio"
        }
      },
      gen: {
        title: "Generator website AI",
        funnelBridge:
          "Etapa dinainte de ofertă: preview direcțional ca punct de plecare (nu e produsul final). După ce îți place direcția, trimiți cererea și aliniem detaliile 1:1.",
        labelName: "Nume business",
        phName: "Introdu numele",
        labelPhone: "Telefon",
        phPhone: "07xx xxx xxx",
        labelAddress: "Adresă",
        phAddress: "Oraș, stradă, nr.",
        labelDescription: "Descriere business",
        phDescription: "Spune pe scurt ce oferi și cui te adresezi.",
        labelServices: "Servicii principale",
        phServices: "Ex: tuns, barbă, styling",
        labelType: "Tip business",
        labelColor: "Culoare principală",
        colorHint: "Alege nuanța culorii accent pentru preview, de la 0 la 360 grade.",
        labelStyle: "Stil",
        btnGenerate: "Generează preview site",
        btnExport: "Exportă HTML",
        previewRegion: "Previzualizare concept site",
        phPreview: "Apasă „Generează preview site” pentru a vedea conceptul.",
        footText: "După preview, completează cererea — folosim ce ai introdus ca referință pentru estimare și următorul pas.",
        footCta: "Continuă la cerere de ofertă",
        errorName: "Te rugăm să introduci numele business-ului.",
        errorNoPreview: "Generează întâi un preview pentru export.",
        opt: {
          restaurant: "Restaurant",
          barber: "Frizerie",
          agency: "Agenție",
          services: "Servicii",
          ecommerce: "E-commerce",
          medical: "Medical",
          fitness: "Fitness",
          legal: "Avocatură",
          education: "Educație",
          consulting: "Consultanță"
        }
      },
      faq: {
        title: "Întrebări frecvente — web design",
        q1: "Cât costă un website?",
        a1: "Landing page de la 300€, site complet 5 pagini de la 600€. Prețul final depinde de funcționalități și complexitate.",
        q2: "Ce include pachetul de bază?",
        a2: "Structură strategică, design responsive, formular lead, setup SEO de bază și analytics.",
        q3: "Cum mă ajută site-ul să obțin mai mulți clienți?",
        a3: "Prin mesaj clar, arhitectură orientată pe conversie și CTA-uri care reduc fricțiunea.",
        q4: "Pot modifica conținutul după?",
        a4: "Da, livrăm codul sursă curat și documentat. Poți modifica textele sau pot face eu modificări la cerere.",
        q5: "Lucrați și cu business-uri în engleză?",
        a5: "Da. Site-ul are variantă RO/EN și putem adapta conținutul pentru audiențe internaționale."
      },
      contact: {
        title: "Solicită o discuție gratuită",
        name: "Nume",
        phName: "Numele tău",
        email: "Email",
        phEmail: "email@firma.ro",
        business: "Business",
        phBusiness: "Numele business-ului",
        goal: "Obiectiv principal",
        phGoal: "Ex: mai multe lead-uri din Google",
        submit: "Trimite cererea"
      },
      form: {
        error: "Completează toate câmpurile obligatorii.",
        errorRequired: "Acest câmp este obligatoriu.",
        errorEmail: "Introdu o adresă de email validă.",
        success: "Cererea a fost trimisă. Revenim rapid cu un răspuns.",
        waLines: "Salut! Vreau o ofertă pentru website.\nNume: {{name}}\nEmail: {{email}}\nBusiness: {{business}}\nObiectiv: {{goal}}"
      },
      footer: {
        line: "Website-uri de creștere pentru business-uri locale.",
        faq: "Întrebări frecvente",
        contact: "Contact"
      },
      float: { wa: "Discuție pe WhatsApp", chat: "Solicită ofertă" },
      wa: { preset: "Bună, vreau o ofertă pentru website." },
      noscript: "Acest website funcționează mai bine cu JavaScript activat.",
      preview: {
        whyTitle: "De ce să ne alegi",
        li1: "Design adaptat pe mobil",
        li2: "Încărcare rapidă",
        li3: "Mesaj clar pentru clienți",
        section: {
          about: "Despre noi",
          services: "Servicii",
          contact: "Contact",
          contactPlaceholder: "Contactați-ne pentru mai multe informații"
        },
        cta: {
          restaurant: "Rezervă o masă",
          barber: "Rezervă servicii",
          agency: "Programează un call",
          services: "Cere ofertă",
          ecommerce: "Vezi produsele",
          default: "Contactează-ne"
        },
        tagline: {
          restaurant: "Experiență urbană, preparate proaspete și atmosferă memorabilă.",
          barber: "Stil, precizie și servicii premium pentru look-ul tău.",
          agency: "Strategie, design și execuție pentru branduri care cresc.",
          services: "Soluții clare, livrare rapidă și suport dedicat.",
          ecommerce: "Magazin rapid, plăți sigure și experiență fluidă pe mobil.",
          default: "Mesaj clar, viteză mare și conversii mai bune."
        },
        cards: {
          restaurant: { a: "Meniu", b: "Rezervări", c: "Livrare" },
          barber: { a: "Tunsoare", b: "Barbă", c: "Programare" },
          agency: { a: "Web design", b: "Dezvoltare", c: "SEO" },
          services: { a: "Consultanță", b: "Implementare", c: "Suport" },
          ecommerce: { a: "Catalog", b: "Livrare", c: "Plăți" },
          default: { a: "Servicii", b: "Portofoliu", c: "Contact" }
        }
      }
    },
    en: {
      meta: {
        title: "ZypheroLab | Premium websites that win clients",
        description:
          "ZypheroLab builds premium, high-performance websites for small and medium businesses in Romania and internationally. Conversion-focused UX, technical SEO, and measurable lead growth.",
        ogTitle: "ZypheroLab | Premium websites for growth",
        ogDescription:
          "Modern design, strong performance, and clear conversion flow. Optimized for Google and AI-assisted search.",
        twitterTitle: "ZypheroLab | Premium websites for business",
        twitterDescription: "Fast, SEO-ready websites designed to generate leads."
      },
      skip: "Skip to content",
      brand: { aria: "ZypheroLab — Home" },
      darkMode: { aria: "Toggle dark mode" },
      nav: { aria: "Main navigation", home: "Home", services: "Services", pricing: "Pricing", portfolio: "Portfolio", simulator: "Simulator", contact: "Contact" },
      lang: { switchAria: "Site language", ro: "Romanian", en: "English" },
      header: { cta: "Get a quote" },
      hero: {
        title: "Premium Websites That Turn Visitors Into Clients",
        subtitle: "Modern design, clear structure, and technical SEO. You get a functional draft in 3-5 business days.",
        tagline: "No technical chaos. Just measurable growth.",
        cta1: "Get a quote",
        cta2: "Quick WhatsApp chat",
        t1: "Response in under 24h",
        t2: "Draft in 3-5 days",
        t3: "Packages from €300",
        lead: "Fast pages, a clear message, and optimization for Google and AI search — so you get steady leads.",
        ctaSim: "Try Live Simulator",
        ctaStart: "Start now",
        ctaQuote: "Get a Quote"
      },
      facts: {
        title: "Quick signals for Google and AI engines",
        li1: "ZypheroLab designs conversion-focused websites for SMBs.",
        li2: "Our stack prioritizes performance, accessibility, and easy-to-quote content.",
        li3: "We optimize semantic HTML, schema markup, FAQs, and message clarity.",
        li4: "CTAs are built for direct contact: form + WhatsApp."
      },
      services: {
        title: "Services",
        c1t: "Fast websites",
        c1p: "Modern structure, quick load times, and a polished mobile experience.",
        c2t: "SEO + AI visibility",
        c2p: "Meta, schema, FAQs, and clear copy for classic and AI-assisted search.",
        c3t: "Conversion",
        c3p: "Testable CTAs, lead-focused forms, and copy that reduces friction."
      },
      seoLinks: {
        services: {
          lead: "See the full service scope on the dedicated page.",
          cta: "Explore services"
        },
        pricing: {
          lead: "Compare all packages on the detailed pricing page.",
          cta: "View detailed pricing"
        },
        contact: {
          lead: "Need a broader scope? Use the dedicated commercial contact page.",
          cta: "Contact page"
        }
      },
      offer: {
        title: "The right offer for a fast launch",
        lead: "Starter pack: strategic landing page + lead form + baseline SEO + basic analytics.",
        li1: "Clear, conversion-focused business messaging",
        li2: "Premium responsive design, mobile-first",
        li3: "Clean technical implementation delivered fast",
        li4: "Post-launch optimization checklist",
        cta: "I want a custom quote"
      },
      proof: {
        title: "Transparency before commitment",
        lead: "You know the steps, typical timelines, and what you get for the listed price.",
        b1: "Replies to requests within 24h on business days",
        b2: "Typical delivery: functional draft in 3–5 days (Starter pack)",
        b3: "Clear scope path: brief → structure → build → launch",
        b4: "After go-live: short checklist + support per package"
      },
      about: {
        title: "About me",
        intro: "Freelance web designer. Fast delivery for small and medium businesses in Romania and abroad.",
        cta: "Let's talk"
      },
      process: {
        title: "How we work",
        step1: "Brief call",
        step1desc: "We learn your goals, target audience, and core message.",
        step2: "Wireframe",
        step2desc: "We approve structure and flow before final design.",
        step3: "Build + Test",
        step3desc: "Rapid development, testing on all devices.",
        step4: "Launch + Support",
        step4desc: "Publication, monitoring, and 3 months included support."
      },
      pricing: {
        title: "Transparent Pricing",
        popular: "Most popular",
        start: {
          title: "Starter Pack",
          price: "300 €",
          f1: "Complete landing page",
          f2: "Baseline technical SEO",
          f3: "Lead form + WhatsApp",
          f4: "Launched in 3-5 days",
          f5: "Email support 30 days",
          cta: "I want the Starter pack"
        },
        growth: {
          title: "Growth Pack",
          price: "600 €",
          f1: "Multi-page website",
          f2: "Advanced technical SEO",
          f3: "Analytics + monthly reports",
          f4: "Launched in 5-7 days",
          f5: "Priority support 3 months",
          cta: "I want the Growth pack"
        },
        custom: {
          title: "Custom Project",
          price: "On request",
          f1: "Custom solution",
          f2: "E-commerce or application",
          f3: "API integrations",
          f4: "Flexible timeline",
          f5: "Dedicated support",
          cta: "Get a quote"
        },
        subscription: {
          title: "Monthly Subscriptions",
          subtitle: "Continuous support for growth",
          maintenance: {
            title: "Maintenance",
            price: "50 € / month",
            f1: "Daily backups",
            f2: "Security updates",
            f3: "Uptime monitoring",
            f4: "Minor bug fixes",
            cta: "Subscribe"
          },
          support: {
            title: "Priority Support",
            price: "100 € / month",
            f1: "2-hour response",
            f2: "Modifications included",
            f3: "Technical consulting",
            f4: "Update priority",
            cta: "Subscribe"
          },
          content: {
            title: "Content Updates",
            price: "30 € / month",
            f1: "Text modifications",
            f2: "Add articles",
            f3: "Update images",
            f4: "On-page SEO",
            cta: "Subscribe"
          }
        }
      },
      portfolio: {
        title: "Portfolio — web design projects",
        labelChallenge: "Challenge:",
        labelSolution: "Solution:",
        labelResult: "Outcome:",
        c1t: "Restaurant Landing",
        c1p: "Modern design for restaurant with integrated reservation system. Mobile optimized.",
        c1m: "",
        c2t: "Law Firm Site",
        c2p: "Professional online presence with appointment form and local SEO.",
        c2m: "",
        project1: {
          title: "Restaurant Landing",
          desc: "Modern design for restaurant with integrated reservation system. Mobile optimized.",
          challenge: "Old site was slow on mobile; reservations were getting lost on the phone.",
          solution: "Landing with clear menu, reservation CTA, and easy-to-scan details.",
          result: "One unified contact flow; a stable phone-first experience.",
          link: "Details on request →"
        },
        project2: {
          title: "Law Firm Site",
          desc: "Professional online presence with appointment form and local SEO.",
          challenge: "Clients did not know how to book; low trust in the online channel.",
          solution: "Services structure + appointment form + baseline local SEO.",
          result: "Professional message and a clear intake path.",
          link: "Details on request →"
        },
        project3: {
          title: "E-commerce Redesign",
          desc: "Conversion optimization for online store. +40% sales after redesign.",
          challenge: "High cart abandonment; weak mobile; unclear product story.",
          solution: "Checkout flow redesign, visual hierarchy, and conversion-led product pages.",
          result: "Estimated +40% sales after launch (vs. same period year before).",
          link: "Details on request →"
        },
        project4: {
          title: "Freelancer Portfolio",
          desc: "Personal site with project gallery and contact form. Minimalist design.",
          challenge: "Work was scattered; contact was hard to find quickly.",
          solution: "Minimal site with a project gallery and one primary CTA.",
          result: "Unified presentation; fewer unclear inbound messages.",
          link: "Details on request →"
        },
        project5: {
          title: "Interactive demo",
          desc: "Try the AI simulator and see how your business site could look in seconds.",
          challenge: "Hard to visualize the site before a full brief is written.",
          solution: "Business type + accent color + instant in-page preview (no backend).",
          result: "Start from a visible concept; then refine into a tailored quote.",
          link: "Try demo →"
        }
      },
      testimonials: {
        title: "What clients say",
        quote: "“The message is clear, the site is fast, and leads grew in the first month.”",
        cite: "— Andrei, local business owner",
        andrei: {
          text: "“After launch, qualified enquiries increased within weeks. The site communicates exactly what we offer.”",
          author: "Andrei, service business founder"
        },
        cristi: {
          text: "“We moved from an outdated site to a clear lead flow. Now requests come in consistently.”",
          author: "Cristi, local business owner"
        },
        maria: {
          text: "“Clear process, fast delivery, premium design. Clients now perceive us as much more credible.”",
          author: "Maria, studio founder"
        }
      },
      gen: {
        title: "AI website generator",
        funnelBridge:
          "Pre-quote step: a directional preview as a starting point (not the final build). When you like the direction, send the request and we align details 1:1.",
        labelName: "Business name",
        phName: "Enter your name",
        labelPhone: "Phone",
        phPhone: "+40 7xx xxx xxx",
        labelAddress: "Address",
        phAddress: "City, street, no.",
        labelDescription: "Business description",
        phDescription: "Briefly describe what you offer and for whom.",
        labelServices: "Main services",
        phServices: "e.g. haircut, beard, styling",
        labelType: "Business type",
        labelColor: "Primary color",
        colorHint: "Pick the accent hue for the preview, from 0 to 360 degrees.",
        labelStyle: "Style",
        btnGenerate: "Generate website preview",
        btnExport: "Export HTML",
        previewRegion: "Live website preview",
        phPreview: "Click “Generate preview” to see the concept.",
        footText: "After the preview, submit the request — we use your inputs as reference for estimation and next steps.",
        footCta: "Continue to quote request",
        errorName: "Please enter your business name.",
        errorNoPreview: "Generate a preview first before exporting.",
        opt: {
          restaurant: "Restaurant",
          barber: "Barber shop",
          agency: "Agency",
          services: "Services",
          ecommerce: "E-commerce",
          medical: "Medical",
          fitness: "Fitness",
          legal: "Legal",
          education: "Education",
          consulting: "Consulting"
        }
      },
      faq: {
        title: "FAQ — web design",
        q1: "How much does a website cost?",
        a1: "Landing page from €300, full 5-page site from €600. Final price depends on features and complexity.",
        q2: "What is included in the starter package?",
        a2: "Strategic page structure, responsive design, lead form, baseline SEO setup, and analytics.",
        q3: "How does the website help me get more clients?",
        a3: "Through clear messaging, conversion-focused structure, and CTA flows that reduce friction.",
        q4: "Can I edit content later?",
        a4: "Yes, we deliver clean, documented source code. You can edit text or I can make changes on request.",
        q5: "Do you work with bilingual audiences?",
        a5: "Yes. The site supports RO/EN and content can be adapted for international clients."
      },
      contact: {
        title: "Book a free call",
        name: "Name",
        phName: "Your name",
        email: "Email",
        phEmail: "you@company.com",
        business: "Business",
        phBusiness: "Business name",
        goal: "Main goal",
        phGoal: "e.g. more leads from Google",
        submit: "Send request"
      },
      form: {
        error: "Please fill in all required fields.",
        errorRequired: "This field is required.",
        errorEmail: "Please enter a valid email address.",
        success: "Your request was sent. We will reply shortly.",
        waLines: "Hi! I’d like a quote for a website.\nName: {{name}}\nEmail: {{email}}\nBusiness: {{business}}\nGoal: {{goal}}"
      },
      footer: {
        line: "Growth websites for local businesses.",
        faq: "FAQ",
        contact: "Contact"
      },
      float: { wa: "Chat on WhatsApp", chat: "Request a quote" },
      wa: { preset: "Hi, I’d like a quote for a website." },
      noscript: "This site works best with JavaScript enabled.",
      preview: {
        whyTitle: "Why choose us",
        li1: "Mobile-friendly design",
        li2: "Fast loading",
        li3: "Clear message for customers",
        section: {
          about: "About us",
          services: "Services",
          contact: "Contact",
          contactPlaceholder: "Contact us for more information"
        },
        cta: {
          restaurant: "Book a table",
          barber: "Book a service",
          agency: "Schedule a call",
          services: "Get a quote",
          ecommerce: "View products",
          default: "Contact us"
        },
        tagline: {
          restaurant: "Urban dining, fresh plates, and a memorable vibe.",
          barber: "Style, precision, and premium care for your look.",
          agency: "Strategy, design, and execution for brands that grow.",
          services: "Clear solutions, fast delivery, and dedicated support.",
          ecommerce: "A fast store, secure payments, and a smooth mobile flow.",
          default: "A clear message, high speed, and stronger conversions."
        },
        cards: {
          restaurant: { a: "Menu", b: "Reservations", c: "Delivery" },
          barber: { a: "Haircut", b: "Beard trim", c: "Book appointment" },
          agency: { a: "Web design", b: "Development", c: "SEO" },
          services: { a: "Consulting", b: "Delivery", c: "Support" },
          ecommerce: { a: "Catalog", b: "Shipping", c: "Checkout" },
          default: { a: "Services", b: "Portfolio", c: "Contact" }
        }
      }
    }
  };

  let currentLang = "ro";

  function get(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
  }

  function t(path) {
    const v = get(STRINGS[currentLang], path);
    if (typeof v === "string") {
      return v;
    }
    const fallback = get(STRINGS.ro, path);
    return typeof fallback === "string" ? fallback : path;
  }

  function interpolate(template, vars) {
    return template.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : ""));
  }

  function normalizePathname(pathname) {
    let p = pathname || "/";
    p = p.replace(/\/index\.html$/i, "");
    if (p.length > 1 && p.endsWith("/")) {
      p = p.slice(0, -1);
    }
    return p || "/";
  }

  function pathImpliesEn() {
    try {
      const p = normalizePathname(window.location.pathname);
      return p === "/en" || p.startsWith("/en/");
    } catch {
      return false;
    }
  }

  function detectInitialLang() {
    let urlLang = null;
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("lang");
      if (q === "en" || q === "ro") {
        urlLang = q;
      }
    } catch {
      /* ignore */
    }
    if (urlLang) {
      return urlLang;
    }
    if (pathImpliesEn()) {
      return "en";
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ro") {
        return stored;
      }
    } catch {
      /* ignore */
    }
    return DEFAULT_ROOT_LANG;
  }

  function setMeta(selector, attr, value) {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute(attr, value);
    }
  }

  function setLinkHref(selector, href) {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute("href", href);
    }
  }

  function applyMeta() {
    document.title = t("meta.title");
    const baseUrl = "https://zypherolab.com";
    const pageUrl = currentLang === "en" ? `${baseUrl}/en/` : `${baseUrl}/`;
    setLinkHref('link[rel="canonical"]', pageUrl);
    setLinkHref('link[rel="alternate"][hreflang="ro"]', `${baseUrl}/`);
    setLinkHref('link[rel="alternate"][hreflang="en"]', `${baseUrl}/en/`);
    setLinkHref('link[rel="alternate"][hreflang="x-default"]', `${baseUrl}/`);
    setMeta('meta[property="og:url"]', "content", pageUrl);
    setMeta('meta[name="description"]', "content", t("meta.description"));
    setMeta('meta[property="og:title"]', "content", t("meta.ogTitle"));
    setMeta('meta[property="og:description"]', "content", t("meta.ogDescription"));
    setMeta('meta[name="twitter:title"]', "content", t("meta.twitterTitle"));
    setMeta('meta[name="twitter:description"]', "content", t("meta.twitterDescription"));
    setMeta('meta[property="og:locale"]', "content", currentLang === "en" ? "en_US" : "ro_RO");
    setMeta('meta[property="og:locale:alternate"]', "content", currentLang === "en" ? "ro_RO" : "en_US");
  }

  function normalizeUrlToPathLang() {
    try {
      const url = new URL(window.location.href);
      const targetPath = currentLang === "en" ? "/en/" : "/";
      const hadLangParam = url.searchParams.has("lang");
      if (hadLangParam) {
        url.searchParams.delete("lang");
      }
      const normalizedCurrentPath = normalizePathname(url.pathname);
      const normalizedTargetPath = normalizePathname(targetPath);
      if (normalizedCurrentPath !== normalizedTargetPath || hadLangParam) {
        const search = url.searchParams.toString();
        const nextUrl = `${targetPath}${search ? `?${search}` : ""}${url.hash || ""}`;
        window.history.replaceState({}, "", nextUrl);
      }
    } catch {
      /* ignore */
    }
  }

  function applyDomStrings() {
    document.documentElement.lang = currentLang === "en" ? "en" : "ro";

    document.querySelectorAll(".lang-switch").forEach((langGroup) => {
      langGroup.setAttribute("aria-label", t("lang.switchAria"));
    });

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key) {
        el.textContent = t(key);
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key && "placeholder" in el) {
        el.placeholder = t(key);
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key) {
        el.setAttribute("aria-label", t(key));
      }
    });

    const waText = t("wa.preset");
    const waHref = `https://wa.me/${waPhoneDigits()}?text=${encodeURIComponent(waText)}`;
    document.querySelectorAll("a[data-wa-link='true']").forEach((waLink) => {
      waLink.setAttribute("href", waHref);
    });

    document.querySelectorAll("select[data-i18n-options] option").forEach((opt) => {
      const key = opt.getAttribute("data-i18n");
      if (key) {
        opt.textContent = t(key);
      }
    });
  }

  function updateLangButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const l = btn.getAttribute("data-lang");
      btn.classList.toggle("is-active", l === currentLang);
      btn.setAttribute("aria-pressed", l === currentLang ? "true" : "false");
    });
  }

  function syncUrl() {
    normalizeUrlToPathLang();
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "ro") {
      return;
    }
    if (currentLang === lang) {
      return;
    }
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    syncUrl();
    applyMeta();
    applyDomStrings();
    updateLangButtons();
    document.dispatchEvent(new CustomEvent("zyphero:langchange", { detail: { lang } }));
  }

  function bindLangSwitch() {
    document.querySelectorAll(".lang-switch .lang-btn").forEach((btn) => {
      const code = btn.getAttribute("data-lang");
      const labelKey = code === "en" ? "lang.en" : "lang.ro";
      btn.setAttribute("aria-label", t(labelKey));
      btn.addEventListener("click", () => setLang(code === "en" ? "en" : "ro"));
    });
  }

  function init() {
    currentLang = detectInitialLang();
    normalizeUrlToPathLang();
    bindLangSwitch();
    applyMeta();
    applyDomStrings();
    updateLangButtons();
  }

  window.ZypheroI18n = {
    init,
    setLang,
    waPhoneDigits,
    get lang() {
      return currentLang;
    },
    t,
    interpolateFormWa(vars) {
      return interpolate(t("form.waLines"), vars);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
