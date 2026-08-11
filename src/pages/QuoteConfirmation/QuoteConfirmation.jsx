/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
// import Footer from "../../components/Footer/Footer";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaPrint,
} from "react-icons/fa";
import "./QuoteConfirmation.scss";
import { saveQuoteToHistory } from "../../utils/localStorage";
import { FaShareNodes } from "react-icons/fa6";

function QuoteConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const [quoteRef] = useState(`DWN-${Date.now().toString().slice(-6)}`);

  // If no form data, redirect to quote page
  useEffect(() => {
    if (!formData) {
      navigate("/quote");
    }
  }, [formData, navigate]);

  if (!formData) {
    return null;
  }

  // Calculate totals
  const tablesNeeded = Math.ceil(formData.guestCount / 6);

  const chairCost = useMemo(() => {
    if (!formData.chairType || !formData.chairQuantity) return 0;
    const prices = { dressedPlastic: 100, chiavari: 250, luxe: 450 };
    return prices[formData.chairType] * formData.chairQuantity;
  }, [formData.chairType, formData.chairQuantity]);

  const tableCost = useMemo(() => {
    const hasChairs = formData.chairType && formData.chairQuantity > 0;
    const hasTableSettings = Object.values(formData.tableSettings).some(
      (val) => val === true,
    );
    return hasChairs || hasTableSettings ? tablesNeeded * 700 : 0;
  }, [
    formData.chairType,
    formData.chairQuantity,
    formData.tableSettings,
    tablesNeeded,
  ]);

  const tableSettingsCost = useMemo(() => {
    const perGuestSettings = [
      "napkins",
      "wineGlasses",
      "chargerPlates",
      "tableMats",
    ];
    const perTableSettings = ["tableRunners", "candles"];

    if (formData.tableSettings.fullPackage) {
      return 240 * formData.guestCount + 260 * tablesNeeded;
    }

    let cost = 0;
    perGuestSettings.forEach((item) => {
      if (formData.tableSettings[item]) {
        const prices = {
          napkins: 70,
          wineGlasses: 80,
          chargerPlates: 100,
          tableMats: 80,
        };
        cost += prices[item] * formData.guestCount;
      }
    });
    perTableSettings.forEach((item) => {
      if (formData.tableSettings[item]) {
        const prices = { tableRunners: 200, candles: 60 };
        cost += prices[item] * tablesNeeded;
      }
    });
    return cost;
  }, [formData.tableSettings, formData.guestCount, tablesNeeded]);

  const backdropCost = useMemo(() => {
    const prices = {
      basicBalloon: 8500,
      floral: 14000,
      draped: 12000,
      shimmerWall: 15000,
    };
    return formData.backdrops.reduce(
      (sum, backdrop) => sum + (prices[backdrop] || 0),
      0,
    );
  }, [formData.backdrops]);

  const welcomeSignCost = useMemo(() => {
    const prices = { floral: 6500, balloon: 5500 };
    return formData.welcomeSign ? prices[formData.welcomeSign] || 0 : 0;
  }, [formData.welcomeSign]);

  const centerpieceCost = useMemo(() => {
    const prices = { basic: 800, premium: 1500, luxury: 2500 };
    return formData.centerpieceTier
      ? prices[formData.centerpieceTier] * tablesNeeded
      : 0;
  }, [formData.centerpieceTier, tablesNeeded]);

  const extrasCost = useMemo(() => {
    const prices = {
      cakeStand: 1800,
      dessertTable: 5000,
      redCarpet: 5000,
      cardBox: 1500,
      individualCards: 120,
      lightingPackage: 5000,
    };

    let cost = 0;
    Object.keys(formData.extras).forEach((extra) => {
      if (formData.extras[extra] && extra !== "cardQuantity") {
        if (extra === "individualCards") {
          cost += prices[extra] * (formData.extras.cardQuantity || 0);
        } else {
          cost += prices[extra] || 0;
        }
      }
    });
    return cost;
  }, [formData.extras]);

  const hasBackdropsOrSigns = backdropCost > 0 || welcomeSignCost > 0;
  const hasFurniture = chairCost > 0 || tableCost > 0;
  const isBackdropOnly =
    hasBackdropsOrSigns &&
    !hasFurniture &&
    tableSettingsCost === 0 &&
    centerpieceCost === 0 &&
    extrasCost === 0;

  const transport = isBackdropOnly
    ? 1000
    : formData.location === "nairobi"
      ? hasFurniture
        ? 3000
        : 2000
      : hasFurniture
        ? 4000
        : 3000;

  const labour = isBackdropOnly ? 0 : formData.guestCount < 50 ? 3000 : 4500;

  const subtotal =
    chairCost +
    tableCost +
    tableSettingsCost +
    backdropCost +
    welcomeSignCost +
    centerpieceCost +
    extrasCost +
    transport +
    labour;

  const deposit = Math.round(subtotal * 0.5);

  useEffect(() => {
    if (formData && quoteRef) {
      saveQuoteToHistory(formData, quoteRef, subtotal, deposit);
    }
  }, [formData, quoteRef, subtotal, deposit]);

  // Format comprehensive WhatsApp message
  const createWhatsAppMessage = () => {
    let message = `Hi Dawenee Decor! I'd like to book my event.\n\n`;
    message += `QUOTE REFERENCE: ${quoteRef}\n\n`;

    message += `CUSTOMER DETAILS:\n`;
    message += `Name: ${formData.name}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n\n`;

    message += `EVENT DETAILS:\n`;
    message += `Date: ${new Date(formData.eventDate).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    )}\n`;
    message += `Guests: ${formData.guestCount}\n`;
    if (formData.venueName) message += `Venue: ${formData.venueName}\n`;
    message += `Location: ${formData.location === "nairobi" ? "Nairobi" : "Outside Nairobi"}\n`;
    if (formData.themeColors) message += `Theme: ${formData.themeColors}\n`;
    message += `\n`;

    // SEATING & TABLES
    if (chairCost > 0 || tableCost > 0 || tableSettingsCost > 0) {
      message += `SEATING & TABLES:\n`;

      if (chairCost > 0) {
        const chairNames = {
          dressedPlastic: "Dressed Plastic",
          chiavari: "Chiavari",
          luxe: "Luxe",
        };
        message += `• ${formData.chairQuantity}x ${chairNames[formData.chairType]} Chairs - KES ${chairCost.toLocaleString()}\n`;
      }

      if (tableCost > 0) {
        message += `• ${tablesNeeded}x Tables (6-seater) - KES ${tableCost.toLocaleString()}\n`;
      }

      if (tableSettingsCost > 0) {
        message += `• Table Settings - KES ${tableSettingsCost.toLocaleString()}\n`;
        if (formData.tableSettings.fullPackage) {
          message += `  (Full Package)\n`;
        } else {
          if (formData.tableSettings.napkins)
            message += `  - Napkins & Rings\n`;
          if (formData.tableSettings.wineGlasses)
            message += `  - Wine Glasses\n`;
          if (formData.tableSettings.chargerPlates)
            message += `  - Charger Plates\n`;
          if (formData.tableSettings.tableMats) message += `  - Table Mats\n`;
          if (formData.tableSettings.tableRunners)
            message += `  - Table Runners\n`;
          if (formData.tableSettings.candles)
            message += `  - Candles & Holders\n`;
        }
      }
      message += `\n`;
    }

    // BACKDROPS & SIGNAGE
    if (backdropCost > 0 || welcomeSignCost > 0) {
      message += `BACKDROPS & SIGNAGE:\n`;

      if (formData.backdrops.length > 0) {
        const backdropNames = {
          basicBalloon: "Basic Balloon Backdrop",
          floral: "Floral Backdrop",
          draped: "Draped Fabric Backdrop",
          shimmerWall: "Shimmer Wall Backdrop",
        };
        formData.backdrops.forEach((backdrop) => {
          const prices = {
            basicBalloon: 8500,
            floral: 14000,
            draped: 12000,
            shimmerWall: 15000,
          };
          message += `• ${backdropNames[backdrop]} - KES ${prices[backdrop].toLocaleString()}\n`;
        });
      }

      if (welcomeSignCost > 0) {
        const signNames = {
          floral: "Floral Welcome Sign",
          balloon: "Balloon Welcome Sign",
        };
        message += `• ${signNames[formData.welcomeSign]} - KES ${welcomeSignCost.toLocaleString()}\n`;
      }
      message += `\n`;
    }

    // CENTERPIECES
    if (centerpieceCost > 0) {
      const tierNames = {
        basic: "Basic",
        premium: "Premium",
        luxury: "Luxury",
      };
      message += `💐 CENTERPIECES:\n`;
      message += `• ${tierNames[formData.centerpieceTier]} (${tablesNeeded} tables) - KES ${centerpieceCost.toLocaleString()}\n\n`;
    }

    // EXTRAS
    if (extrasCost > 0) {
      message += `✨ EXTRAS:\n`;
      if (formData.extras.cakeStand) message += `• Cake Stand - KES 1,800\n`;
      if (formData.extras.dessertTable)
        message += `• Dessert Table Setup - KES 5,000\n`;
      if (formData.extras.redCarpet)
        message += `• Red Carpet Runner - KES 5,000\n`;
      if (formData.extras.cardBox)
        message += `• Decorative Card Box - KES 1,500\n`;
      if (formData.extras.individualCards) {
        message += `• Individual Cards (${formData.extras.cardQuantity}) - KES ${(120 * formData.extras.cardQuantity).toLocaleString()}\n`;
      }
      if (formData.extras.lightingPackage)
        message += `• Uplighting Package - KES 5,000\n`;
      message += `\n`;
    }

    // LOGISTICS
    message += `LOGISTICS:\n`;
    message += `• Transport - KES ${transport.toLocaleString()}\n`;
    message += `• Labour - KES ${labour.toLocaleString()}\n\n`;

    // SPECIAL REQUESTS
    if (formData.specialRequests) {
      message += `SPECIAL REQUESTS:\n${formData.specialRequests}\n\n`;
    }

    // PRICING
    message += `PRICING SUMMARY:\n`;
    message += `Subtotal: KES ${subtotal.toLocaleString()}\n`;
    message += `50% Deposit: KES ${deposit.toLocaleString()}\n`;
    message += `Balance Due: KES ${(subtotal - deposit).toLocaleString()}\n\n`;

    message += `I'm ready to proceed with the booking and pay the deposit. Please confirm availability for this date!`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppBooking = () => {
    const whatsappMessage = createWhatsAppMessage();
    window.open(`https://wa.me/254715784287?text=${whatsappMessage}`, "_blank");
  };

  const handleEmailQuote = () => {
    const subject = `Quote Request - ${quoteRef}`;
    const body = `Please send me a detailed formal quote for my event.\n\nQuote Reference: ${quoteRef}\nEvent Date: ${formData.eventDate}\n\nThank you!`;
    window.location.href = `mailto:wndecorevents@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEditQuote = () => {
    navigate("/quote", { state: { formData, currentStep: 1 } });
  };

  // const handleDownloadQuote = () => {
  //   const quoteExport = {
  //     quoteRef,
  //     submittedAt: new Date().toISOString(),
  //     customer: {
  //       name: formData.name,
  //       email: formData.email,
  //       phone: formData.phone,
  //     },
  //     event: {
  //       date: formData.eventDate,
  //       guests: formData.guestCount,
  //       venue: formData.venueName,
  //       location: formData.location,
  //       themeColors: formData.themeColors,
  //     },
  //     selections: {
  //       chairs: formData.chairType
  //         ? {
  //             type: formData.chairType,
  //             quantity: formData.chairQuantity,
  //           }
  //         : null,
  //       tableSettings: formData.tableSettings,
  //       backdrops: formData.backdrops,
  //       welcomeSign: formData.welcomeSign,
  //       centerpieces: formData.centerpieceTier,
  //       extras: formData.extras,
  //     },
  //     pricing: {
  //       subtotal: subtotal,
  //       deposit: deposit,
  //       balance: subtotal - deposit,
  //     },
  //     specialRequests: formData.specialRequests,
  //   };

  //   const dataStr = JSON.stringify(quoteExport, null, 2);
  //   const dataBlob = new Blob([dataStr], { type: "application/json" });
  //   const url = URL.createObjectURL(dataBlob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = `dawenee-quote-${quoteRef}.json`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  const handlePrintQuote = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const message = `Hi! I just submitted a quote request on your website (Ref: ${quoteRef}). Event date: ${formData.eventDate}, Guests: ${formData.guestCount}. Looking forward to hearing from you!`;
    const whatsappUrl = `https://wa.me/254715784287?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleNewQuote = () => {
    navigate("/quote");
  };

  return (
    <div className="confirmation-page">
      <Navbar />

      <main className="confirmation">
        <div className="container">
          <div className="confirmation__success">
            <div className="confirmation__success-icon">✓</div>
            <h1 className="confirmation__title">
              Quote Submitted Successfully!
            </h1>
            <p className="confirmation__subtitle">
              Thank you, <strong>{formData.name}</strong>! We've received your
              quote request. Your refernce is: <strong>{quoteRef}</strong>
            </p>
            {/* <div className="confirmation__reference">
              <span className="confirmation__reference-label">
                Quote Reference:
              </span>
              <span className="confirmation__reference-number">{quoteRef}</span>
            </div> */}
          </div>

          {/* Payment option */}
          <div className="booking-options">
            <h2 className="booking-options__title">Ready to Book?</h2>
            {/* <a
              href={`https://wa.me/254715784287?text=${encodeURIComponent(
                `Hi! I'd like to book my event.\n\n` +
                  `Quote Ref: ${quoteRef}\n` +
                  `Event Date: ${formData.eventDate}\n` +
                  `Guests: ${formData.guestCount}\n` +
                  `Total: KES ${subtotal.toLocaleString()}\n` +
                  `Deposit (50%): KES ${deposit.toLocaleString()}\n\n` +
                  `I'm ready to pay the deposit.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="booking-option__button booking-option__button--primary"
            >
              Book on WhatsApp →
            </a> */}

            <div className="booking-cards">
              <div className="booking-card booking-card--primary">
                <div className="booking-card__badge">⚡ Instant Booking</div>
                <h3 className="booking-card__title">Book via WhatsApp</h3>
                <p className="booking-card__description">
                  Send us your complete quote details and pay your deposit via
                  M-Pesa. We'll confirm your booking immediately!
                </p>
                <button
                  onClick={handleWhatsAppBooking}
                  className="booking-card__button booking-card__button--primary"
                >
                  Book on WhatsApp
                </button>
              </div>

              {/* Option 2: Wait for quote */}
              <div className="booking-card">
                <h3 className="booking-card__title">Receive Quote via Email</h3>
                <p className="booking-card__description">
                  We'll send a detailed quote and call you to discuss
                </p>
                <button
                  onClick={handleEmailQuote}
                  className="booking-card__button booking-card__button--secondary"
                >
                  Email Me Quote →
                </button>
              </div>
            </div>
          </div>

          <div className="edit-quote-section">
            <h3 className="edit-quote-section__title">Need to Make Changes?</h3>
            <p className="edit-quote-section__description">
              You can edit your quote details before we process it
            </p>
            <button onClick={handleEditQuote} className="edit-quote-button">
              ✎ Edit Quote Details
            </button>
          </div>

          {/* Event Summary Card */}
          <div className="confirmation__summary">
            <h2 className="confirmation__section-title">Your Event Summary</h2>

            <div className="summary-card">
              <div className="summary-card__row">
                <span className="summary-card__label">Event Date</span>
                <span className="summary-card__value">
                  {formatDate(formData.eventDate)}
                </span>
              </div>

              <div className="summary-card__row">
                <span className="summary-card__label">Number of Guests</span>
                <span className="summary-card__value">
                  {formData.guestCount} guests
                </span>
              </div>

              <div className="summary-card__row">
                <span className="summary-card__label">Venue</span>
                <span className="summary-card__value">
                  {formData.venueName || "Not specified"}
                  {formData.location &&
                    ` (${formData.location === "nairobi" ? "Nairobi" : "Outside Nairobi"})`}
                </span>
              </div>

              {formData.chairType && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Seating</span>
                  <span className="summary-card__value">
                    {formData.chairQuantity}{" "}
                    {formData.chairType === "dressedPlastic"
                      ? "Dressed Plastic"
                      : formData.chairType === "chiavari"
                        ? "Chiavari"
                        : "Luxe"}{" "}
                    chairs + {tablesNeeded} tables
                  </span>
                </div>
              )}

              {formData.backdrops && formData.backdrops.length > 0 && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Backdrops</span>
                  <span className="summary-card__value">
                    {formData.backdrops.length} backdrop(s) selected
                  </span>
                </div>
              )}

              {formData.centerpieceTier && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Centerpieces</span>
                  <span className="summary-card__value">
                    {formData.centerpieceTier.charAt(0).toUpperCase() +
                      formData.centerpieceTier.slice(1)}{" "}
                    tier
                  </span>
                </div>
              )}

              {formData.themeColors && (
                <div className="summary-card__row">
                  <span className="summary-card__label">Theme Colors</span>
                  <span className="summary-card__value">
                    {formData.themeColors}
                  </span>
                </div>
              )}

              {/* Pricing breakdown */}
              <div className="summary-card__pricing">
                <h4 className="summary-card__pricing-title">
                  Pricing Breakdown
                </h4>
                {chairCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Chairs</span>
                    <span className="summary-card__value">
                      KES {chairCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {tableCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Tables</span>
                    <span className="summary-card__value">
                      KES {tableCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {tableSettingsCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Table Settings</span>
                    <span className="summary-card__value">
                      KES {tableSettingsCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {backdropCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Backdrops</span>
                    <span className="summary-card__value">
                      KES {backdropCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {welcomeSignCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Welcome Sign</span>
                    <span className="summary-card__value">
                      KES {welcomeSignCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {centerpieceCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Centerpieces</span>
                    <span className="summary-card__value">
                      KES {centerpieceCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {extrasCost > 0 && (
                  <div className="summary-card__row summary-card__row--price">
                    <span className="summary-card__label">Extras</span>
                    <span className="summary-card__value">
                      KES {extrasCost.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="summary-card__row summary-card__row--price">
                  <span className="summary-card__label">Transport</span>
                  <span className="summary-card__value">
                    KES {transport.toLocaleString()}
                  </span>
                </div>
                <div className="summary-card__row summary-card__row--price">
                  <span className="summary-card__label">Labour</span>
                  <span className="summary-card__value">
                    {labour > 0
                      ? `KES ${labour.toLocaleString()}`
                      : "Included ✓"}
                  </span>
                </div>

                <div className="summary-card__row summary-card__row--total">
                  <span className="summary-card__label">Total</span>
                  <span className="summary-card__value">
                    KES {subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Actions */}
          <div className="confirmation__actions">
            <h2 className="confirmation__section-title">Quick Actions</h2>

            <div className="contact-grid">
              <button
                onClick={handleWhatsApp}
                className="action-card action-card--whatsapp"
              >
                <div className="action-card__icon">
                  <FaWhatsapp />
                </div>
                <h3 className="action-card__title">WhatsApp</h3>
                <p className="action-card__description">
                  Chat with us instantly
                </p>
              </button>

              <a
                href="tel:+254715784287"
                className="action-card action-card--phone"
              >
                <div className="action-card__icon">
                  <FaPhone />
                </div>
                <h3 className="action-card__title">Call Us</h3>
                <p className="action-card__description">0715 784 287</p>
              </a>

              <a
                href="mailto:info@daweneedecor.com"
                className="action-card action-card--email"
              >
                <div className="action-card__icon">
                  <FaEnvelope />
                </div>
                <h3 className="action-card__title">Email</h3>
                <p className="action-card__description">
                  wndecorevents@gmail.com
                </p>
              </a>

              <button onClick={handlePrintQuote} className="action-card">
                <div className="action-card__icon">
                  <FaPrint />
                </div>
                <h3 className="action-card__title">Print Quote</h3>
                <p className="action-card__description">Print or save as PDF</p>
              </button>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="bottom-actions">
            <button
              onClick={() => navigate("/")}
              className="bottom-action bottom-action--secondary"
            >
              ← Back to Homepage
            </button>
            <button
              onClick={handleNewQuote}
              className="bottom-action bottom-action--primary"
            >
              Get Another Quote →
            </button>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default QuoteConfirmation;
