#!/bin/bash
# review-checklist.sh — Automated review checks for UWC client sites
# Run: npm run review (or bash scripts/review-checklist.sh)
# Catches ~80% of issues found manually in Carl's Stock Out + Clinker Brewing reviews

set -e
PASS=0
FAIL=0
WARN=0

check() {
  local label="$1"
  local result="$2"
  if [ -z "$result" ]; then
    echo "  ✅ $label"
    PASS=$((PASS + 1))
  else
    echo "  ❌ $label"
    echo "$result" | sed 's/^/     /'
    FAIL=$((FAIL + 1))
  fi
}

warn() {
  local label="$1"
  local result="$2"
  if [ -z "$result" ]; then
    echo "  ✅ $label"
    PASS=$((PASS + 1))
  else
    echo "  ⚠️  $label"
    echo "$result" | sed 's/^/     /'
    WARN=$((WARN + 1))
  fi
}

echo ""
echo "🔍 UWC Review Checklist"
echo "========================"
echo ""

# --- INDEXING ---
echo "📋 Indexing"
# Check if SITE.indexable exists and what it's set to
INDEXABLE=$(grep -r "indexable" src/lib/config.ts 2>/dev/null | grep -v "//" || true)
if [ -n "$INDEXABLE" ]; then
  echo "  ℹ️  SITE.indexable found: $INDEXABLE"
else
  # Fallback: check for noindex in templates
  NOINDEX=$(grep -rn "noindex" src/ --include="*.astro" 2>/dev/null | grep -v "noindex = false" | grep -v "!SITE.indexable" | grep -v "interface\|Props\|//" || true)
  warn "No hardcoded noindex in .astro files" "$NOINDEX"
fi

# --- SECURITY ---
echo ""
echo "🔒 Security"
SECRETS=$(grep -rE "sk_test|sk_live|pk_test|pk_live|re_[a-zA-Z0-9]{20,}|whsec_|sk-ant-" src/ --include="*.ts" --include="*.astro" 2>/dev/null || true)
check "No hardcoded API keys in source" "$SECRETS"

DEBUG=$(grep -rn "console\.log\|debugger" src/ --include="*.ts" --include="*.astro" 2>/dev/null | grep -v "console\.error\|console\.warn\|// console" || true)
warn "No debug code (console.log)" "$DEBUG"

# --- ACCESSIBILITY ---
echo ""
echo "♿ Accessibility"
LOW_CONTRAST=$(grep -rn "white/[0-3][0-9]" src/ --include="*.astro" 2>/dev/null | grep -v "border\|divide\|bg-\|ring-\|shadow" || true)
check "No low-contrast text (white/0-39 on dark bg)" "$LOW_CONTRAST"

BORDERLINE=$(grep -rn "white/4[0-4]" src/ --include="*.astro" 2>/dev/null | grep "text-" || true)
warn "Borderline contrast text (white/40-44)" "$BORDERLINE"

SKIP_LINK=$(grep -rl "skip.*content\|#main-content" src/layouts/ --include="*.astro" 2>/dev/null || true)
if [ -n "$SKIP_LINK" ]; then
  echo "  ✅ Skip-to-content link present"
  PASS=$((PASS + 1))
else
  echo "  ❌ Missing skip-to-content link in layout"
  FAIL=$((FAIL + 1))
fi

ARIA_NAV=$(grep -l "aria-label\|aria-expanded" src/components/Nav*.astro 2>/dev/null || true)
if [ -n "$ARIA_NAV" ]; then
  echo "  ✅ Nav has aria attributes"
  PASS=$((PASS + 1))
else
  echo "  ⚠️  Nav missing aria-label or aria-expanded"
  WARN=$((WARN + 1))
fi

# --- SEO ---
echo ""
echo "🔎 SEO"
SITEMAP_LINK=$(grep -rl "rel=\"sitemap\"\|rel='sitemap'" src/layouts/ --include="*.astro" 2>/dev/null || true)
if [ -n "$SITEMAP_LINK" ]; then
  echo "  ✅ Sitemap link in <head>"
  PASS=$((PASS + 1))
else
  echo "  ❌ Missing <link rel=\"sitemap\"> in layout head"
  FAIL=$((FAIL + 1))
fi

SITEMAP_ROUTE=$(ls src/pages/sitemap.xml.ts 2>/dev/null || true)
if [ -n "$SITEMAP_ROUTE" ]; then
  echo "  ✅ sitemap.xml.ts endpoint exists"
  PASS=$((PASS + 1))
else
  echo "  ❌ Missing src/pages/sitemap.xml.ts"
  FAIL=$((FAIL + 1))
fi

ROBOTS_ROUTE=$(ls src/pages/robots.txt.ts 2>/dev/null || true)
if [ -n "$ROBOTS_ROUTE" ]; then
  echo "  ✅ robots.txt.ts endpoint exists"
  PASS=$((PASS + 1))
else
  echo "  ❌ Missing src/pages/robots.txt.ts"
  FAIL=$((FAIL + 1))
fi

# --- CODE QUALITY ---
echo ""
echo "🧹 Code Quality"
HARDCODED_HEX=$(grep -rn "#[0-9a-fA-F]\{6\}" src/components/ src/pages/ --include="*.astro" 2>/dev/null | grep -v "comment\|CLAUDE\|config\|<!-- " || true)
warn "No hardcoded hex colors in components/pages" "$HARDCODED_HEX"

ANY_TYPE=$(grep -rn ": any\b\|as any" src/ --include="*.ts" --include="*.astro" 2>/dev/null | grep -v "node_modules\|// " || true)
warn "No 'any' types in source" "$ANY_TYPE"

# --- LEGAL ---
echo ""
echo "⚖️  Legal"
FAKE_TESTIMONIALS=$(grep -rn "<blockquote" src/pages/ --include="*.astro" 2>/dev/null || true)
warn "No <blockquote> elements (potential fake testimonials)" "$FAKE_TESTIMONIALS"

FAKE_METRICS=$(grep -rni "[0-9]\+k\+\|[0-9]\+,000\+\|[0-9]\.[0-9] rating\|[0-9]\+ happy\|[0-9]\+ satisfied" src/ --include="*.astro" 2>/dev/null || true)
check "No fabricated metrics or stats" "$FAKE_METRICS"

# --- BUILD ---
echo ""
echo "🏗️  Build"
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "  ✅ npm run build passes"
  PASS=$((PASS + 1))
else
  echo "  ❌ npm run build FAILED"
  FAIL=$((FAIL + 1))
fi

# --- SUMMARY ---
echo ""
echo "========================"
echo "Results: ✅ $PASS passed | ❌ $FAIL failed | ⚠️  $WARN warnings"
if [ $FAIL -gt 0 ]; then
  echo "🚫 REVIEW FAILED — fix $FAIL issue(s) before advancing"
  exit 1
else
  echo "✅ REVIEW PASSED"
fi
