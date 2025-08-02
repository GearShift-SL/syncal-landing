import { useState } from "react";

const PricingTable = () => {
  const [isYearly, setIsYearly] = useState(true);

  const handleClick = async (plan: string) => {
    // Get the email key from the url
    const emailKey = new URLSearchParams(window.location.search).get("email");
    console.log(emailKey);

    // If there is no email, redirect to the #hero section
    if (!emailKey) {
      window.location.href = "/#hero";
      return;
    }

    // Add user to the purchase waitlist
    const waitlistUrl = "https://waitlist.hlab.es/waitlist/users/";
    // Send the email to the waitlist
    try {
      const response = await fetch("https://waitlist.hlab.es/waitlist/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waitlist_name: "syncal_purchase",
          email: emailKey,
        }),
      });

      if (response.ok) {
        console.log("User added to the waitlist");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding user to the waitlist", error);
    }

    // Redirect the user to /stripe-callback/ with the email as a query parameter
    window.location.href = `/stripe-callback/?email=${emailKey}`;

    // // If plan is basic, redirect to basic page
    // if (plan === "basic") {
    //   if (isYearly) {
    //     const stripeUrl = "#";
    //     window.open(`${stripeUrl}?prefilled_email=${emailKey}`, "_blank");
    //   } else {
    //     const stripeUrl = "#";
    //     window.open(`${stripeUrl}?prefilled_email=${emailKey}`, "_blank");
    //   }
    //   return;
    // }

    // // If plan is investor, redirect to investor page
    // if (plan === "standard") {
    //   if (isYearly) {
    //     const stripeUrl = "#";
    //     window.open(`${stripeUrl}?prefilled_email=${emailKey}`, "_blank");
    //   } else {
    //     const stripeUrl = "#";
    //     window.open(`${stripeUrl}?prefilled_email=${emailKey}`, "_blank");
    //   }
    //   return;
    // }

    // // If plan is power user, redirect to power user page
    // if (plan === "power-user") {
    //   if (isYearly) {
    //     const stripeUrl = "#";
    //     window.open(`${stripeUrl}?prefilled_email=${emailKey}`, "_blank");
    //   } else {
    //     const stripeUrl = "#";
    //     window.open(`${stripeUrl}?prefilled_email=${emailKey}`, "_blank");
    //   }
    // }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-default mb-4">
            Transparent pricing
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center mt-8 mb-8">
            <div className="flex items-center justify-center">
              <span
                className={`mr-3 text-lg font-medium ${!isYearly ? "text-default" : "text-muted"}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative hover:cursor-pointer inline-flex items-center h-8 rounded-full w-16 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  isYearly ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform ${
                    isYearly ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`ml-3 text-lg font-medium ${isYearly ? "text-default" : "text-muted"}`}
              >
                Yearly
              </span>
            </div>
            <div className="mt-3 h-6 flex items-center">
              {isYearly && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  2 months free!
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-default mb-2">Basic</h3>
              <p className="text-muted mb-6">For casual use</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-default">
                  💶 ${isYearly ? "1.5" : "3"}
                </span>
                <span className="text-muted ml-2">/month</span>
              </div>
              {isYearly ? (
                <div className="text-center mb-6">
                  <span className="text-lg text-muted font-medium">
                    $18 billed annually
                  </span>
                  <span className="block text-sm text-green-600 font-medium">
                    You get 6 months free!
                  </span>
                </div>
              ) : (
                <div className="text-center mb-6">
                  <span
                    className="text-lg text-muted hover:cursor-pointer underline decoration-1 decoration-blue-400 hover:text-blue-400"
                    onClick={() => setIsYearly(true)}
                  >
                    or $1.5 per month
                  </span>
                  <span
                    onClick={() => setIsYearly(true)}
                    className="block text-sm text-green-600 font-medium hover:cursor-pointer hover:underline decoration-1 decoration-blue-400 hover:text-blue-400"
                  >
                    Save 6 months by paying yearly!
                  </span>
                </div>
              )}
              <button
                data-umami-event="Basic plan"
                onClick={() => handleClick("basic")}
                className="flex w-full text-center justify-center hover:cursor-pointer bg-gray-100 text-default py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Start syncing →
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Google and Outlook calendars
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">One-directional sync tasks</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Up to 2 sync tasks</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Basic sync task privacy customization
                </span>
              </div>
            </div>
          </div>

          {/* Standard Plan (Popular) */}
          <div className="bg-white border-2 border-primary rounded-2xl p-8 shadow-lg relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                {" "}
                Most popular{" "}
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-default mb-2">Standard</h3>
              <p className="text-muted mb-6">Covers all your needs</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  💶 ${isYearly ? "7,50" : "9"}
                </span>
                <span className="text-muted ml-2">/month</span>
              </div>
              {isYearly ? (
                <div className="text-center mb-6">
                  <span className="text-lg text-muted font-medium">
                    $90 billed annually
                  </span>
                  <span className="block text-sm text-green-600 font-medium">
                    You get 2 months free!
                  </span>
                </div>
              ) : (
                <div className="text-center mb-6">
                  <span
                    className="text-lg text-muted hover:cursor-pointer underline decoration-1 decoration-blue-400 hover:text-blue-400"
                    onClick={() => setIsYearly(true)}
                  >
                    or $7.50/month
                  </span>
                  <span
                    onClick={() => setIsYearly(true)}
                    className="block text-sm text-green-600 font-medium hover:cursor-pointer hover:underline decoration-1 decoration-blue-400 hover:text-blue-400"
                  >
                    Save 2 months by paying yearly!
                  </span>
                </div>
              )}
              <button
                data-umami-event="Standard plan"
                onClick={() => handleClick("standard")}
                className="w-full cta-primary mb-6"
              >
                {isYearly ? "Start yearly plan" : "Start monthly plan"}
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  <strong>Everything in the pay as you go plan plus:</strong>
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Up to 20 sync tasks</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Up to 10 calendar connections
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Advanced sync task customization
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Premium SynCal team support
                </span>
              </div>
            </div>
          </div>

          {/* Power user Plan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-default mb-2">
                Power user
              </h3>
              <p className="text-muted mb-6">Perfect for power users</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-default">
                  💶 ${isYearly ? "19.83" : "24.80"}
                </span>
                <span className="text-muted ml-2">/month</span>
              </div>
              {isYearly ? (
                <div className="text-center mb-6">
                  <span className="text-lg text-muted font-medium">
                    $238 billed annually
                  </span>
                  <span className="block text-sm text-green-600 font-medium">
                    You get 2 months free!
                  </span>
                </div>
              ) : (
                <div className="text-center mb-6">
                  <span
                    className="text-lg text-muted hover:cursor-pointer underline decoration-1 decoration-blue-400 hover:text-blue-400"
                    onClick={() => setIsYearly(true)}
                  >
                    or $19.83 per month
                  </span>
                  <span
                    onClick={() => setIsYearly(true)}
                    className="block text-sm text-green-600 font-medium hover:cursor-pointer hover:underline decoration-1 decoration-blue-400 hover:text-blue-400"
                  >
                    Save 2 months by paying yearly!
                  </span>
                </div>
              )}
              <button
                data-umami-event="Power user plan"
                onClick={() => handleClick("power-user")}
                className="flex w-full text-center justify-center hover:cursor-pointer bg-gray-100 text-default py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Start syncing →
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Everything in the standard plan plus:
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Unlimited sync tasks</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">
                  Unlimited calendar connections
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-default">Team support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          {/* Money Back Guarantee - Prominent */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <svg
                className="w-6 h-6 text-green-600 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="text-lg font-semibold text-green-800">
                30 days money back guarantee
              </span>
            </div>
            <p className="text-green-700">
              If you're not completely satisfied, we'll refund your money, no
              questions asked
            </p>
          </div>

          <p className="text-muted mb-6">
            Have questions?{" "}
            <a href="#faq" className="text-primary hover:underline">
              Check our FAQ
            </a>{" "}
            o{" "}
            <a href="/contact/" className="text-primary hover:underline">
              contact us
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-muted">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              30 days free trial
            </div>
            <div className="flex items-center text-muted">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              No commitment
            </div>
            <div className="flex items-center text-muted">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Instant cancellation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
