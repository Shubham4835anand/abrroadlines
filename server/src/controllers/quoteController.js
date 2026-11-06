import QuoteRequest from '../models/QuoteRequest.js';
import { sendQuoteNotification } from '../services/emailService.js';
import { isDbConnected } from '../config/db.js';
import logger from '../config/logger.js';

const inMemoryQuotes = [];

export async function submitQuote(req, res, next) {
  try {
    const quoteData = req.body;
    let savedQuote = null;

    if (isDbConnected()) {
      savedQuote = await QuoteRequest.create(quoteData);
    } else {
      savedQuote = {
        _id: 'q-' + Date.now(),
        referenceId: 'ABR-Q' + Math.floor(100000 + Math.random() * 900000),
        ...quoteData,
        createdAt: new Date().toISOString(),
      };
      inMemoryQuotes.unshift(savedQuote);
    }

    sendQuoteNotification(savedQuote).catch((err) => {
      logger.error('Background quote email notification failed:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Quote request registered successfully.',
      referenceId: savedQuote.referenceId,
      data: savedQuote,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllQuotes(req, res, next) {
  try {
    if (isDbConnected()) {
      const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: quotes.length, data: quotes });
    }
    return res.json({ success: true, count: inMemoryQuotes.length, data: inMemoryQuotes });
  } catch (error) {
    next(error);
  }
}

