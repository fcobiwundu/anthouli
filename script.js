/* =========================================================
   C. ANTHOULI
   MAIN WEBSITE JAVASCRIPT
   =========================================================

   Current functionality:
   - Mobile navigation
   - Header scroll state
   - Scroll reveal animations
   - FAQ accordion
   - Contact/enquiry form validation
   - Dynamic copyright year
   - Back-to-top button
   - Smooth anchor scrolling
   - Escape key handling
   - Outside-click mobile menu closing
   - Responsive menu handling
   - Lucide icon initialization
   - Reduced-motion accessibility support

   ========================================================= */

(function () {
    "use strict";


    /* =====================================================
       DOM READY
       ===================================================== */

    document.addEventListener("DOMContentLoaded", function () {

        initLucideIcons();
        initMobileNavigation();
        initHeaderScroll();
        initScrollReveal();
        initFaqAccordion();
        initContactForm();
        initCurrentYear();
        initBackToTop();
        initSmoothScrolling();

    });


    /* =====================================================
       1. LUCIDE ICONS
       ===================================================== */

    function initLucideIcons() {

        if (
            typeof window.lucide === "undefined" ||
            typeof window.lucide.createIcons !== "function"
        ) {
            return;
        }

        try {

            window.lucide.createIcons();

        } catch (error) {

            console.warn(
                "C. Anthouli: Unable to initialize Lucide icons.",
                error
            );

        }

    }


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    function initMobileNavigation() {

        const menuToggle =
            document.querySelector(".menu-toggle");

        const mobileMenu =
            document.getElementById("mobile-menu");


        /*
         * If either element does not exist,
         * there is nothing to initialize.
         */

        if (!menuToggle || !mobileMenu) {
            return;
        }


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        /*
         * Initial accessibility state.
         */

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
         * Open mobile menu.
         */

        function openMenu() {

            mobileMenu.classList.add("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "menu-open"
            );

        }


        /*
         * Close mobile menu.
         */

        function closeMenu() {

            mobileMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            mobileMenu.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }


        /*
         * Toggle mobile menu.
         */

        function toggleMenu() {

            const isOpen =
                mobileMenu.classList.contains("open");


            if (isOpen) {

                closeMenu();

            } else {

                openMenu();

            }

        }


        /*
         * Hamburger button.
         */

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                toggleMenu();

            }
        );


        /*
         * Close menu after clicking
         * a navigation link.
         */

        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        });


        /*
         * Close menu when Escape is pressed.
         */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    mobileMenu.classList.contains("open")
                ) {

                    closeMenu();

                    menuToggle.focus();

                }

            }
        );


        /*
         * Close menu when user clicks
         * outside the navigation.
         */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !mobileMenu.classList.contains("open")
                ) {
                    return;
                }


                const clickedInsideMenu =
                    mobileMenu.contains(event.target);

                const clickedToggle =
                    menuToggle.contains(event.target);


                if (
                    !clickedInsideMenu &&
                    !clickedToggle
                ) {

                    closeMenu();

                }

            }
        );


        /*
         * Close mobile navigation when
         * returning to desktop size.
         */

        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 900) {

                    closeMenu();

                }

            }
        );

    }


    /* =====================================================
       3. HEADER SCROLL STATE
       ===================================================== */

    function initHeaderScroll() {

        const header =
            document.getElementById("site-header");


        if (!header) {
            return;
        }


        function updateHeader() {

            const scrollPosition =
                window.scrollY ||
                window.pageYOffset ||
                0;


            if (scrollPosition > 20) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        }


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();

    }


    /* =====================================================
       4. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    function initScrollReveal() {

        const elements =
            document.querySelectorAll(".reveal");


        if (!elements.length) {
            return;
        }


        /*
         * Respect the user's reduced-motion
         * accessibility preference.
         */

        const prefersReducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (prefersReducedMotion) {

            elements.forEach(function (element) {

                element.classList.add(
                    "is-visible"
                );

            });

            return;

        }


        /*
         * Browser does not support
         * IntersectionObserver.
         */

        if (
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(function (element) {

                element.classList.add(
                    "is-visible"
                );

            });

            return;

        }


        /*
         * Create observer.
         */

        const observer =
            new IntersectionObserver(
                function (entries, observerInstance) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        /*
         * Observe all reveal elements.
         */

        elements.forEach(function (element) {

            observer.observe(element);

        });

    }


    /* =====================================================
       5. FAQ ACCORDION
       ===================================================== */

    function initFaqAccordion() {

        const faqList =
            document.querySelector(".faq-list");


        if (!faqList) {
            return;
        }


        const faqItems =
            faqList.querySelectorAll("details");


        if (!faqItems.length) {
            return;
        }


        faqItems.forEach(
            function (item, index) {

                const summary =
                    item.querySelector("summary");

                const answer =
                    item.querySelector(".faq-answer");


                if (!summary || !answer) {
                    return;
                }


                /*
                 * Give each answer a unique ID.
                 */

                const answerId =
                    answer.id ||
                    "faq-answer-" + (index + 1);


                answer.id = answerId;


                summary.setAttribute(
                    "aria-controls",
                    answerId
                );


                /*
                 * Set initial state.
                 */

                function updateFaqState() {

                    const isOpen =
                        item.open;


                    summary.setAttribute(
                        "aria-expanded",
                        isOpen
                            ? "true"
                            : "false"
                    );


                    answer.setAttribute(
                        "aria-hidden",
                        isOpen
                            ? "false"
                            : "true"
                    );

                }


                updateFaqState();


                /*
                 * When one FAQ opens,
                 * close the others.
                 */

                item.addEventListener(
                    "toggle",
                    function () {

                        if (item.open) {

                            faqItems.forEach(
                                function (otherItem) {

                                    if (
                                        otherItem !== item
                                    ) {

                                        otherItem.open =
                                            false;

                                    }

                                }
                            );

                        }


                        updateFaqState();

                    }
                );

            }
        );

    }


    /* =====================================================
       6. CONTACT FORM
       ===================================================== */

    function initContactForm() {

        const form =
            document.getElementById(
                "enquiry-form"
            );


        /*
         * The homepage may not contain
         * the contact form yet.
         *
         * Do nothing if it does not exist.
         */

        if (!form) {
            return;
        }


        const formStatus =
            document.getElementById(
                "form-status"
            );


        const fullName =
            document.getElementById(
                "full-name"
            );


        const company =
            document.getElementById(
                "company"
            );


        const email =
            document.getElementById(
                "email"
            );


        const phone =
            document.getElementById(
                "phone"
            );


        const service =
            document.getElementById(
                "service"
            );


        const message =
            document.getElementById(
                "message"
            );


        /*
         * Display form status.
         */

        function showStatus(
            text,
            type
        ) {

            if (!formStatus) {
                return;
            }


            formStatus.textContent =
                text;


            formStatus.className =
                "form-status";


            if (type) {

                formStatus.classList.add(
                    type
                );

            }


            formStatus.removeAttribute(
                "hidden"
            );

        }


        /*
         * Clear form status.
         */

        function clearStatus() {

            if (!formStatus) {
                return;
            }


            formStatus.textContent =
                "";


            formStatus.className =
                "form-status";


            formStatus.setAttribute(
                "hidden",
                ""
            );

        }


        /*
         * Mark field invalid.
         */

        function markInvalid(field) {

            if (!field) {
                return;
            }


            field.classList.add(
                "invalid"
            );


            field.setAttribute(
                "aria-invalid",
                "true"
            );

        }


        /*
         * Clear field error.
         */

        function clearInvalid(field) {

            if (!field) {
                return;
            }


            field.classList.remove(
                "invalid"
            );


            field.removeAttribute(
                "aria-invalid"
            );

        }


        /*
         * Email validation.
         */

        function validEmail(value) {

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(value);

        }


        /*
         * Phone validation.
         *
         * Allows:
         * +357 99 572563
         * +35799572563
         * 99572563
         * (99) 572563
         */

        function validPhone(value) {

            if (!value.trim()) {

                return true;

            }


            return /^[+()\d\s.-]{7,25}$/
                .test(value);

        }


        /*
         * Clear errors as user edits fields.
         */

        const fields = [
            fullName,
            company,
            email,
            phone,
            service,
            message
        ];


        fields.forEach(function (field) {

            if (!field) {
                return;
            }


            field.addEventListener(
                "input",
                function () {

                    clearInvalid(field);
                    clearStatus();

                }
            );


            field.addEventListener(
                "change",
                function () {

                    clearInvalid(field);
                    clearStatus();

                }
            );

        });


        /*
         * Form submission.
         */

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                clearStatus();


                let hasErrors = false;

                let firstInvalid = null;


                /*
                 * Full name.
                 */

                if (
                    !fullName ||
                    !fullName.value.trim()
                ) {

                    markInvalid(fullName);

                    hasErrors = true;

                    firstInvalid =
                        firstInvalid ||
                        fullName;

                }


                /*
                 * Email.
                 */

                if (
                    !email ||
                    !email.value.trim() ||
                    !validEmail(
                        email.value.trim()
                    )
                ) {

                    markInvalid(email);

                    hasErrors = true;

                    firstInvalid =
                        firstInvalid ||
                        email;

                }


                /*
                 * Phone.
                 */

                if (
                    phone &&
                    !validPhone(
                        phone.value.trim()
                    )
                ) {

                    markInvalid(phone);

                    hasErrors = true;

                    firstInvalid =
                        firstInvalid ||
                        phone;

                }


                /*
                 * Message.
                 */

                if (
                    !message ||
                    !message.value.trim()
                ) {

                    markInvalid(message);

                    hasErrors = true;

                    firstInvalid =
                        firstInvalid ||
                        message;

                }


                /*
                 * Validation failed.
                 */

                if (hasErrors) {

                    showStatus(
                        "Please check the highlighted fields and try again.",
                        "error"
                    );


                    if (
                        firstInvalid &&
                        typeof firstInvalid.focus ===
                            "function"
                    ) {

                        firstInvalid.focus();

                    }


                    return;

                }


                /*
                 * Submit button.
                 */

                const submitButton =
                    form.querySelector(
                        'button[type="submit"], input[type="submit"]'
                    );


                let originalText =
                    "Send Enquiry";


                if (submitButton) {

                    if (
                        submitButton.tagName
                            .toLowerCase() ===
                        "button"
                    ) {

                        originalText =
                            submitButton.textContent.trim();

                    } else {

                        originalText =
                            submitButton.value;

                    }


                    submitButton.disabled =
                        true;


                    submitButton.classList.add(
                        "is-loading"
                    );


                    if (
                        submitButton.tagName
                            .toLowerCase() ===
                        "button"
                    ) {

                        submitButton.textContent =
                            "Sending…";

                    } else {

                        submitButton.value =
                            "Sending…";

                    }

                }


                /*
                 * DEMO SUBMISSION
                 *
                 * This will later be replaced
                 * with the real backend/email system.
                 */

                window.setTimeout(
                    function () {

                        showStatus(
                            "Thank you. Your enquiry has been received. We will be in touch shortly.",
                            "success"
                        );


                        form.reset();


                        /*
                         * Restore button.
                         */

                        if (submitButton) {

                            submitButton.disabled =
                                false;


                            submitButton.classList.remove(
                                "is-loading"
                            );


                            if (
                                submitButton.tagName
                                    .toLowerCase() ===
                                "button"
                            ) {

                                submitButton.textContent =
                                    originalText;

                            } else {

                                submitButton.value =
                                    originalText;

                            }

                        }

                    },
                    650
                );

            }
        );

    }


    /* =====================================================
       7. DYNAMIC COPYRIGHT YEAR
       ===================================================== */

    function initCurrentYear() {

        const yearElement =
            document.getElementById(
                "current-year"
            );


        if (!yearElement) {
            return;
        }


        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       8. BACK TO TOP BUTTON
       ===================================================== */

    function initBackToTop() {

        const backToTop =
            document.getElementById(
                "back-to-top"
            );


        if (!backToTop) {
            return;
        }


        /*
         * Update visibility.
         */

        function updateBackToTop() {

            if (
                window.scrollY > 600
            ) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        }


        /*
         * Button click.
         */

        backToTop.addEventListener(
            "click",
            function () {

                const reducedMotion =
                    window.matchMedia &&
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;


                window.scrollTo({

                    top: 0,

                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"

                });

            }
        );


        /*
         * Scroll listener.
         */

        window.addEventListener(
            "scroll",
            updateBackToTop,
            {
                passive: true
            }
        );


        updateBackToTop();

    }


    /* =====================================================
       9. SMOOTH INTERNAL LINKS
       ===================================================== */

    function initSmoothScrolling() {

        const anchorLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        if (!anchorLinks.length) {
            return;
        }


        anchorLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    /*
                     * Ignore empty hash.
                     */

                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    let target = null;


                    /*
                     * Safely locate target.
                     */

                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch (error) {

                        return;

                    }


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    /*
                     * Header height.
                     */

                    const header =
                        document.getElementById(
                            "site-header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    /*
                     * Calculate target position.
                     */

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        20;


                    /*
                     * Reduced motion.
                     */

                    const reducedMotion =
                        window.matchMedia &&
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches;


                    window.scrollTo({

                        top: Math.max(
                            0,
                            targetPosition
                        ),

                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        });

    }


})();





// calacultor coporate

/* =========================================================
   CYPRUS CORPORATE TAX CALCULATOR
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       LUCIDE
       ===================================================== */

    if (window.lucide) {
        lucide.createIcons();
    }


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const form =
        document.getElementById("corporate-tax-form");

    const taxYear =
        document.getElementById("tax-year");

    const accountingProfit =
        document.getElementById("accounting-profit");

    const nonDeductible =
        document.getElementById("non-deductible");

    const exemptIncome =
        document.getElementById("exempt-income");

    const capitalAllowances =
        document.getElementById("capital-allowances");

    const nid =
        document.getElementById("nid");

    const taxLosses =
        document.getElementById("tax-losses");

    const includeDividends =
        document.getElementById("include-dividends");

    const dividendOptions =
        document.getElementById("dividend-options");

    const distributionPercentage =
        document.getElementById("distribution-percentage");

    const individualShareholder =
        document.getElementById("individual-shareholder");

    const dividendResults =
        document.getElementById("dividend-results");

    const calculatorError =
        document.getElementById("calculator-error");

    const resetButton =
        document.getElementById("reset-calculator");


    /* =====================================================
       RESULT ELEMENTS
       ===================================================== */

    const resultCorporationTax =
        document.getElementById("corporation-tax");

    const resultCorporationRate =
        document.getElementById("corporation-rate");

    const resultAccountingProfit =
        document.getElementById("result-accounting-profit");

    const resultAdjustments =
        document.getElementById("result-adjustments");

    const resultTaxableProfit =
        document.getElementById("result-taxable-profit");

    const resultAfterTax =
        document.getElementById("result-after-tax");

    const resultDividend =
        document.getElementById("result-dividend");

    const resultSdc =
        document.getElementById("result-sdc");

    const resultGhs =
        document.getElementById("result-ghs");

    const resultNetDividend =
        document.getElementById("result-net-dividend");

    const effectiveRate =
        document.getElementById("effective-rate");

    const resultsYear =
        document.querySelector(".results-year");


    /* =====================================================
       CONSTANTS
       ===================================================== */

    const TAX_RATES = {

        2025: 0.125,

        2026: 0.15

    };


    /*
     * 2026 dividend SDC:
     *
     * 5% for qualifying actual dividend distributions
     * from profits earned from 1 January 2026.
     *
     * This calculator only applies this when the user
     * selects "Individual shareholder".
     */

    const DIVIDEND_SDC_RATE_2026 = 0.05;


    /*
     * GHS on dividends:
     *
     * 2.65% subject to the €180,000 annual income ceiling.
     *
     * Because this calculator does not know the shareholder's
     * other GHS-able income, the calculator treats the
     * dividend amount itself as the amount available for the
     * indicative calculation.
     *
     * This is deliberately labelled as an estimate.
     */

    const GHS_RATE = 0.0265;

    const GHS_ANNUAL_LIMIT = 180000;


    /* =====================================================
       HELPERS
       ===================================================== */

    function getNumber(element) {

        const value =
            parseFloat(element.value);

        if (
            Number.isNaN(value) ||
            value < 0
        ) {
            return 0;
        }

        return value;
    }


    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "en-IE",
            {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ).format(value);

    }


    function formatPercentage(value) {

        return `${value.toFixed(2)}%`;

    }


    function showError(message) {

        calculatorError.textContent =
            message;

        calculatorError.hidden =
            false;

    }


    function hideError() {

        calculatorError.textContent =
            "";

        calculatorError.hidden =
            true;

    }


    /* =====================================================
       TAX YEAR
       ===================================================== */

    function getTaxRate() {

        const year =
            taxYear.value;

        return TAX_RATES[year] || TAX_RATES[2026];

    }


    function updateTaxYearUI() {

        const year =
            taxYear.value;

        const rate =
            getTaxRate();

        document.querySelector(
            ".tax-rate-badge strong"
        ).textContent =
            `${rate * 100}%`;


        resultCorporationRate.textContent =
            `At ${rate * 100}%`;


        resultsYear.textContent =
            year;

    }


    /* =====================================================
       DIVIDEND TOGGLE
       ===================================================== */

    includeDividends.addEventListener(
        "change",
        () => {

            dividendOptions.hidden =
                !includeDividends.checked;

            if (!includeDividends.checked) {

                dividendResults.hidden =
                    true;

            }

        }
    );


    /* =====================================================
       INDIVIDUAL SHAREHOLDER TOGGLE
       ===================================================== */

    individualShareholder.addEventListener(
        "change",
        () => {

            /*
             * No separate calculation is performed here.
             * The setting is read when the calculator runs.
             */

        }
    );


    /* =====================================================
       CALCULATE
       ===================================================== */

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            hideError();


            const year =
                taxYear.value;

            const rate =
                getTaxRate();


            /* ---------------------------------------------
               INPUTS
               --------------------------------------------- */

            const profit =
                getNumber(accountingProfit);

            const addBacks =
                getNumber(nonDeductible);

            const exempt =
                getNumber(exemptIncome);

            const capital =
                getNumber(capitalAllowances);

            const nidAmount =
                getNumber(nid);

            const losses =
                getNumber(taxLosses);


            /* ---------------------------------------------
               VALIDATION
               --------------------------------------------- */

            if (profit <= 0) {

                showError(
                    "Please enter your company's accounting profit before tax."
                );

                accountingProfit.focus();

                return;

            }


            if (
                losses >
                (
                    profit +
                    addBacks -
                    exempt -
                    capital -
                    nidAmount
                )
            ) {

                /*
                 * Losses cannot create a negative taxable
                 * profit in this simplified calculator.
                 *
                 * We simply cap the usable amount.
                 */

            }


            /* ---------------------------------------------
               TAXABLE PROFIT
               --------------------------------------------- */

            const preliminaryTaxableProfit =
                profit +
                addBacks -
                exempt -
                capital -
                nidAmount;


            const usableTaxableProfit =
                Math.max(
                    0,
                    preliminaryTaxableProfit
                );


            const usableLosses =
                Math.min(
                    losses,
                    usableTaxableProfit
                );


            const taxableProfit =
                Math.max(
                    0,
                    usableTaxableProfit -
                    usableLosses
                );


            /* ---------------------------------------------
               CORPORATION TAX
               --------------------------------------------- */

            const corporationTax =
                taxableProfit *
                rate;


            /* ---------------------------------------------
               PROFIT AFTER TAX
               --------------------------------------------- */

            const profitAfterTax =
                Math.max(
                    0,
                    profit -
                    corporationTax
                );


            /* ---------------------------------------------
               TAX ADJUSTMENTS
               --------------------------------------------- */

            const totalAdjustments =
                addBacks -
                exempt -
                capital -
                nidAmount -
                usableLosses;


            /* ---------------------------------------------
               EFFECTIVE RATE
               --------------------------------------------- */

            const effectiveTaxRate =
                profit > 0
                    ? (
                        corporationTax /
                        profit
                    ) * 100
                    : 0;


            /* ---------------------------------------------
               UPDATE CORPORATE RESULTS
               --------------------------------------------- */

            resultCorporationTax.textContent =
                formatCurrency(
                    corporationTax
                );


            resultAccountingProfit.textContent =
                formatCurrency(
                    profit
                );


            resultAdjustments.textContent =
                formatCurrency(
                    totalAdjustments
                );


            resultTaxableProfit.textContent =
                formatCurrency(
                    taxableProfit
                );


            resultAfterTax.textContent =
                formatCurrency(
                    profitAfterTax
                );


            effectiveRate.textContent =
                formatPercentage(
                    effectiveTaxRate
                );


            resultCorporationRate.textContent =
                `At ${rate * 100}%`;


            resultsYear.textContent =
                year;


            /* ---------------------------------------------
               DIVIDEND CALCULATION
               --------------------------------------------- */

            if (
                includeDividends.checked
            ) {

                const distribution =
                    Math.min(
                        100,
                        Math.max(
                            0,
                            getNumber(
                                distributionPercentage
                            )
                        )
                    );


                const dividend =
                    profitAfterTax *
                    (
                        distribution /
                        100
                    );


                let sdc =
                    0;

                let ghs =
                    0;


                /*
                 * SDC is only estimated here when:
                 *
                 * - tax year is 2026
                 * - individual shareholder is selected
                 */

                if (
                    year === "2026" &&
                    individualShareholder.checked
                ) {

                    sdc =
                        dividend *
                        DIVIDEND_SDC_RATE_2026;


                    /*
                     * GHS is capped at €180,000.
                     *
                     * This is an indicative calculation because
                     * the calculator does not know the shareholder's
                     * other GHS-able income.
                     */

                    const ghsBase =
                        Math.min(
                            dividend,
                            GHS_ANNUAL_LIMIT
                        );


                    ghs =
                        ghsBase *
                        GHS_RATE;

                }


                const netDividend =
                    Math.max(
                        0,
                        dividend -
                        sdc -
                        ghs
                    );


                resultDividend.textContent =
                    formatCurrency(
                        dividend
                    );


                resultSdc.textContent =
                    formatCurrency(
                        sdc
                    );


                resultGhs.textContent =
                    formatCurrency(
                        ghs
                    );


                resultNetDividend.textContent =
                    formatCurrency(
                        netDividend
                    );


                dividendResults.hidden =
                    false;


                /*
                 * For 2025, the calculator does not apply the
                 * 2026 SDC treatment.
                 */

                if (
                    year !== "2026" ||
                    !individualShareholder.checked
                ) {

                    resultSdc.textContent =
                        "Not included";


                    resultGhs.textContent =
                        "Not included";


                    resultNetDividend.textContent =
                        formatCurrency(
                            dividend
                        );

                }

            } else {

                dividendResults.hidden =
                    true;

            }


            /* ---------------------------------------------
               RESULT VISIBILITY
               --------------------------------------------- */

            const resultsCard =
                document.querySelector(
                    ".results-card"
                );


            if (resultsCard) {

                resultsCard.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });

            }

        }
    );


    /* =====================================================
       RESET
       ===================================================== */

    resetButton.addEventListener(
        "click",
        () => {

            form.reset();

            taxYear.value =
                "2026";

            distributionPercentage.value =
                "100";

            includeDividends.checked =
                false;

            individualShareholder.checked =
                false;

            dividendOptions.hidden =
                true;

            dividendResults.hidden =
                true;

            resultCorporationTax.textContent =
                "€0.00";

            resultAccountingProfit.textContent =
                "€0.00";

            resultAdjustments.textContent =
                "€0.00";

            resultTaxableProfit.textContent =
                "€0.00";

            resultAfterTax.textContent =
                "€0.00";

            resultDividend.textContent =
                "€0.00";

            resultSdc.textContent =
                "€0.00";

            resultGhs.textContent =
                "€0.00";

            resultNetDividend.textContent =
                "€0.00";

            effectiveRate.textContent =
                "0.00%";

            hideError();

            updateTaxYearUI();

        }
    );


    /* =====================================================
       TAX YEAR CHANGE
       ===================================================== */

    taxYear.addEventListener(
        "change",
        updateTaxYearUI
    );


    /* =====================================================
       INPUT VALIDATION
       ===================================================== */

    const numericInputs =
        form.querySelectorAll(
            'input[type="number"]'
        );


    numericInputs.forEach(
        (input) => {

            input.addEventListener(
                "input",
                () => {

                    if (
                        parseFloat(input.value) < 0
                    ) {

                        input.value =
                            0;

                    }

                    if (
                        input ===
                        distributionPercentage &&
                        parseFloat(input.value) > 100
                    ) {

                        input.value =
                            100;

                    }

                }
            );

        }
    );


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobile-menu"
        );


    if (
        menuToggle &&
        mobileMenu
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                const expanded =
                    menuToggle.getAttribute(
                        "aria-expanded"
                    ) === "true";


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(!expanded)
                );


                mobileMenu.setAttribute(
                    "aria-hidden",
                    String(expanded)
                );


                mobileMenu.classList.toggle(
                    "is-open",
                    !expanded
                );


                document.body.classList.toggle(
                    "menu-open",
                    !expanded
                );

            }
        );


        mobileMenu
            .querySelectorAll("a")
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        () => {

                            menuToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                            mobileMenu.setAttribute(
                                "aria-hidden",
                                "true"
                            );

                            mobileMenu.classList.remove(
                                "is-open"
                            );

                            document.body.classList.remove(
                                "menu-open"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    const header =
        document.getElementById(
            "site-header"
        );


    if (header) {

        const updateHeader =
            () => {

                header.classList.toggle(
                    "is-scrolled",
                    window.scrollY > 20
                );

            };


        window.addEventListener(
            "scroll",
            updateHeader,
            {
                passive: true
            }
        );


        updateHeader();

    }


    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:
                        0.12
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById(
            "back-to-top"
        );


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                backToTop.classList.toggle(
                    "is-visible",
                    window.scrollY > 500
                );

            },
            {
                passive: true
            }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const currentYear =
        document.getElementById(
            "current-year"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    updateTaxYearUI();

});