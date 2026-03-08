const QUOTE_STORAGE_KEY = "dawenee_saved_quotes";
const CURRENT_QUOTE_KEY = "dawenee_current_quote";

// Save current quote progress
export const saveCurrentQuote = (formData, currentStep) => {
  try {
    const quoteData = {
      formData,
      currentStep,
      savedAt: new Date().toISOString(),
      id: Date.now(),
    };
    localStorage.setItem(CURRENT_QUOTE_KEY, JSON.stringify(quoteData));
    return true;
  } catch (error) {
    console.error("Error saving quote:", error);
    return false;
  }
};

// Get current quote in progress
export const getCurrentQuote = () => {
  try {
    const data = localStorage.getItem(CURRENT_QUOTE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading quote:", error);
    return null;
  }
};

// Clear current quote
export const clearCurrentQuote = () => {
  try {
    localStorage.removeItem(CURRENT_QUOTE_KEY);
    return true;
  } catch (error) {
    console.error("Error clearing quote:", error);
    return false;
  }
};

// save completed quote to history
export const SaveQuoteToHistory = (formData, quoteRef, subtotal, deposit) => {
  try {
    const savedQuotes = getSavedQuotes();
    const newQuote = {
      id: Date.now(),
      quoteRef,
      formData,
      subtotal,
      deposit,
      savedAt: new Date().toISOString(),
      status: "pending", //pending, paid, cancelled
    };

    savedQuotes.unshift(newQuote); //Add to beginning

    // Keep only 10 last quotes
    const trimmedQuotes = savedQuotes.slice(0, 10);

    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(trimmedQuotes));
    return true;
  } catch (error) {
    console.error("Error saving quote to history:", error);
    return false;
  }
};

// Get all saved quotes
export const getSavedQuotes = () => {
  try {
    const data = localStorage.getItem(QUOTE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading saved quotes:", error);
    return [];
  }
};

// Get quote by reference
export const getQuoteByRef = (quoteRef) => {
  try {
    const quotes = getSavedQuotes();
    return quotes.find((q) => q.quoteRef === quoteRef) || null;
  } catch (error) {
    console.error("Error finding quote:", error);
    return null;
  }
};

// Delete a saved quote
export const deleteSavedQuote = (quoteId) => {
  try {
    const quotes = getSavedQuotes();
    const filtered = quotes.filter((q) => q.id !== quoteId);
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting quote:", error);
    return false;
  }
};

// Update quote status
export const updateQuoteStatus = (quoteRef, status) => {
  try {
    const quotes = getSavedQuotes();
    const updated = quotes.map((q) =>
      q.quoteRef === quoteRef ? { ...q, status } : q,
    );
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error("Error updating quote status:", error);
    return false;
  }
};

// Export quote data as JSON (for sharing)
export const exportQuote = (quoteData) => {
  try {
    const dataStr = JSON.stringify(quoteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dawenee-quote-${quoteData.quoteRef || Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error exporting quote:', error);
    return false;
  }
};
