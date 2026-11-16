/**
 * DESTRON LABS — Global Engineering Architecture
 * Core JavaScript Runtime (Chaos Labs Inspired)
 */

(function () {
  'use strict';

  // 1. THEME CONTROLLER (Dark / Light Mode)
  const THEME_KEY = 'destron_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // Default to 'dark' for Chaos Labs institutional developer aesthetic
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update all theme toggle buttons across pages
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const sun = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (sun && moon) {
        if (theme === 'dark') {
          sun.style.display = 'block';
          moon.style.display = 'none';
        } else {
          sun.style.display = 'none';
          moon.style.display = 'block';
        }
      }
    });
  }

  function initTheme() {
    const currentTheme = getPreferredTheme();
    applyTheme(currentTheme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });
  }

  // 2. MOBILE NAVIGATION DRAWER
  function initNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      });

      // Close when clicking nav links
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // 3. SCROLL REVEAL ANIMATIONS
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.svc, .wc, .stb, .res-card, .term-wrap, .stat-card, .node-card, .lifecycle-step');
    if (!revealEls.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
      });
    } else {
      revealEls.forEach(el => el.classList.add('revealed'));
    }
  }

  // 4. INTERACTIVE ARCHITECTURE TERMINAL
  const TERMINAL_SNIPPETS = {
    defi: `// Onex Protocol — Multi-Hop Routing Engine
// Direct Li.Fi & 1inch Atomic Swap Integration
contract OnexRouter is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;
    uint256 public constant PROTOCOL_FEE_BPS = 5; // 0.05%

    function routeOmnichainExecution(
        RouteParams calldata params,
        bytes calldata executionPayload
    ) external payable nonReentrant returns (uint256 outAmount) {
        uint256 fee = (params.amountIn * PROTOCOL_FEE_BPS) / 10000;
        IERC20(params.tokenIn).safeTransferFrom(msg.sender, address(this), params.amountIn);
        
        // Execute atomic multi-hop swap across calibrated paths
        outAmount = IBridgeAdapter(params.bridgeAdapter).execute{value: msg.value}(
            params.tokenIn,
            params.amountIn - fee,
            executionPayload
        );
        require(outAmount >= params.minAmountOut, "SLIPPAGE_EXCEEDED");
        emit RouteExecuted(msg.sender, params.tokenOut, outAmount, fee);
    }
}`,
    ai: `# WeatherEdge — Algorithmic Kelly Criterion Risk Sizing
import numpy as np
from typing import Dict, Any

class PredictionRiskEngine:
    def __init__(self, kelly_fraction: float = 0.25):
        self.fraction = kelly_fraction  # Fractional Kelly for drawdown control

    def calculate_optimal_allocation(self, market_prob: float, model_prob: float, bankroll: float) -> Dict[str, Any]:
        """Calculates optimal bet sizing based on NOAA ensemble vs Polymarket quote."""
        b = (1.0 / market_prob) - 1.0  # Decisive decimal odds
        p = model_prob
        q = 1.0 - p
        
        # Kelly Formula: f* = (bp - q) / b
        raw_kelly = (b * p - q) / b
        if raw_kelly <= 0:
            return {"allocate": False, "stake_usd": 0.0, "edge": 0.0}
            
        optimal_f = raw_kelly * self.fraction
        stake = round(bankroll * min(optimal_f, 0.08), 2)  # Hard risk cap at 8%
        return {
            "allocate": True,
            "stake_usd": stake,
            "edge": round((model_prob - market_prob) * 100, 2),
            "expected_roi": round(((model_prob / market_prob) - 1) * 100, 2)
        }`,
    telegram: `// VoiceEx — High-Concurrency Telegram Remittance Daemon
// Distributed Go runtime running on Railway with multi-node state sync
package main

import (
	"context"
	"log"
	"time"
	"github.com/destron/voiceex/vault"
)

func ProcessRemittanceStream(ctx context.Context, txID string, amountUSD float64) error {
	ctx, cancel := context.WithTimeout(ctx, 3500*time.Millisecond)
	defer cancel()

	// 1. Verify cryptographic escrow receipt
	if err := vault.VerifyMultiSigEscrow(ctx, txID); err != nil {
		return err
	}

	// 2. Query liquidity pool for guaranteed NGN execution quote
	rate, err := vault.GetRealtimePegRate(ctx, "USD", "NGN")
	if err != nil {
		return err
	}

	// 3. Dispatch atomic payout & notify user bot instance
	payoutNGN := amountUSD * rate
	return vault.DispatchInstantPayout(ctx, txID, payoutNGN)
}`
  };

  function initTerminal() {
    const tabs = document.querySelectorAll('.term-tab');
    const codeBlock = document.getElementById('term-code');
    const langLabel = document.getElementById('term-lang');

    if (!tabs.length || !codeBlock) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const key = tab.getAttribute('data-snippet');
        const lang = tab.getAttribute('data-lang');

        if (TERMINAL_SNIPPETS[key]) {
          codeBlock.style.opacity = '0';
          setTimeout(() => {
            codeBlock.textContent = TERMINAL_SNIPPETS[key];
            if (langLabel) langLabel.textContent = lang || 'CODE';
            codeBlock.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // 5. LIVE TELEMETRY TICKER (Simulation Pulse)
  function initTelemetry() {
    const latencyEl = document.getElementById('stat-latency');
    if (!latencyEl) return;

    setInterval(() => {
      // Subtle realistic ping fluctuation between 21ms and 29ms
      const randomPing = Math.floor(Math.random() * 9) + 21;
      latencyEl.textContent = `${randomPing}ms`;
    }, 4500);
  }

  // 6. CATEGORY FILTER (Work & Research Pages)
  function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('[data-category]');

    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        items.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category.includes(filter)) {
            item.style.display = '';
            item.classList.add('filter-match');
          } else {
            item.style.display = 'none';
            item.classList.remove('filter-match');
          }
        });
      });
    });
  }

  // 7. CONTACT / RFP FORM
  function initForm() {
    const form = document.getElementById('rfp-form') || document.querySelector('.cf');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('.bsub');
    const nameInput = document.getElementById('f-name');
    const emailInput = document.getElementById('f-email');
    const msgInput = document.getElementById('f-msg');

    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email) {
          submitBtn.textContent = 'PLEASE FILL IN NAME & EMAIL';
          setTimeout(() => { submitBtn.textContent = "INITIALIZE PROJECT DISCOVERY"; }, 2500);
          return;
        }

        if (!emailRegex.test(email)) {
          submitBtn.textContent = 'PLEASE ENTER A VALID EMAIL';
          setTimeout(() => { submitBtn.textContent = "INITIALIZE PROJECT DISCOVERY"; }, 2500);
          return;
        }

        submitBtn.textContent = 'TRANSMITTING INQUIRY...';
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.textContent = 'INQUIRY LOGGED ✓ TEAM DISPATCHED';
          submitBtn.classList.add('sent');
          if (nameInput) nameInput.value = '';
          if (emailInput) emailInput.value = '';
          if (msgInput) msgInput.value = '';

          setTimeout(() => {
            submitBtn.textContent = "INITIALIZE PROJECT DISCOVERY";
            submitBtn.classList.remove('sent');
            submitBtn.disabled = false;
          }, 4500);
        }, 800);
      });
    }
  }

  // INITIALIZE ALL
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initScrollReveal();
    initTerminal();
    initTelemetry();
    initFilters();
    initForm();
  });
})();
