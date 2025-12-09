// server/config.js
module.exports = {
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret-demo-key-change-me',
  UPLOAD_DIR: 'uploads',
  
// decideByFilename: function (filenameLower) {
//   // === Special name lists (case-insensitive substrings) ===
//   // covid list (from earlier screenshot)
//   const COVID_NAMES = [
//     '6wey','6yhu','6wwn','6vww','8ctk','6z4u',
//     '8aou','6w9c','6xez','6yyt','7lw4','6xdc','7jtl',
//     '7msw','8yax','6wxd','7nng','6vsb','7vph','6m3m',
//     '6wuu','6lu7','6zpe','7egq','7k3g','7ci3'
//   ]

//   // hiv list (first image you provided)
//   const HIV_NAMES = [
//     '1a1t','1aik','1avv','1bi4','1biv','1esx','1etf','1gc1',
//     '1hiw','1hpv','1hys','1ifw','1piz','1qa5','1rtd','1vpu',
//     '2b4c','2x7r','3dcg','3h47','3klf','3os0','4nco','1oke',
//     // include small stems that appear in the list; you can add more
//   ]

//   // dengue list (second image)
//   const DENGUE_NAMES = [
//     '1oke','1r6r','1uzg','2fom','2jlu','2vbc','3c6e','3i2p',
//     '3j27','4o6b','4o6c','4v0q','4v0r','5y6r'
//   ]

//   // ebola list (third image)
//   const EBOLA_NAMES = [
//     '3csy','3fke','3ks8','3l25','4z9p','5jq3','5jq7','5t3t'
//   ]

//   // === defaults ===
//   let timeMs = 2000
//   let probs = { covid: 0.25, aids: 0.25, ebola: 0.25, dengue: 0.25 }
//   let matched = null

//   // keep prior simple timing hints (honored for non-special filenames too)
//   if (filenameLower.includes('fast')) timeMs = 800
//   if (filenameLower.includes('mid')) timeMs = 3000
//   if (filenameLower.includes('slow')) timeMs = 6000

//   // helper: split remaining percent (two-decimal) into three two-decimal parts
//   function splitRemainingTwoDecimals(remaining) {
//     // remaining is a Number like 3.42 (two decimals)
//     // generate 3 random weights and compute proportional split
//     const r1 = Math.random(), r2 = Math.random(), r3 = Math.random()
//     const s = r1 + r2 + r3 || 1
//     let a = Number((remaining * (r1 / s)).toFixed(2))
//     let b = Number((remaining * (r2 / s)).toFixed(2))
//     let c = Number((remaining * (r3 / s)).toFixed(2))

//     // fix rounding drift so a + b + c == remaining (two decimals)
//     const drift = Number((remaining - (a + b + c)).toFixed(2))
//     if (Math.abs(drift) >= 0.01) {
//       // add drift to the largest value
//       if (a >= b && a >= c) a = Number((a + drift).toFixed(2))
//       else if (b >= a && b >= c) b = Number((b + drift).toFixed(2))
//       else c = Number((c + drift).toFixed(2))
//     }

//     // safety clamp if any negative (shouldn't happen)
//     if (a < 0 || b < 0 || c < 0) {
//       const even = Number((remaining / 3).toFixed(2))
//       a = b = c = even
//       const adjust = Number((remaining - (a + b + c)).toFixed(2))
//       a = Number((a + adjust).toFixed(2))
//     }

//     return [a, b, c]
//   }

//   // helper: produce final probs object (fractions with 4 decimals) from percentages
//   function toProbsObject(pctObj) {
//     // pctObj keys: covid,aids,ebola,dengue with values as percentages (two-decimal)
//     return {
//       covid: Number((pctObj.covid / 100).toFixed(4)),
//       aids: Number((pctObj.aids / 100).toFixed(4)),
//       ebola: Number((pctObj.ebola / 100).toFixed(4)),
//       dengue: Number((pctObj.dengue / 100).toFixed(4))
//     }
//   }

//   // === check special groups in priority order (covid,hiv,dengue,ebola) ===
//   // Note: user earlier wanted covid set; now we add hiv,dengue,ebola with provided ranges.
//   // priority: if a filename matches multiple, first matching group above will apply.

//   // 1) COVID group (96.00 - 98.60)
//   if (COVID_NAMES.some(name => filenameLower.includes(name))) {
//     matched = 'covid'
//     // random covid percent between 96.00 and 98.60 (two decimals)
//     const covidPct = Number((Math.random() * (98.6 - 96) + 96).toFixed(2))
//     const remaining = Number((100 - covidPct).toFixed(2))
//     const [a, b, c] = splitRemainingTwoDecimals(remaining)
//     // assign remaining parts to aids, ebola, dengue (order arbitrary)
//     const pctObj = { covid: covidPct, aids: a, ebola: b, dengue: c }
//     // time between 3 and 5 seconds
//     timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
//     probs = toProbsObject(pctObj)
//     return { timeMs, probs, matched }
//   }

//   // 2) HIV group (user said 'hiv' list should map to hiv high; range 94.00 - 97.50)
//   if (HIV_NAMES.some(name => filenameLower.includes(name))) {
//     matched = 'hiv' // using 'hiv' label (maps to 'aids' probability being highest)
//     // hiv corresponds to the 'aids' disease in our probs naming
//     const hivPct = Number((Math.random() * (97.5 - 94) + 94).toFixed(2))
//     const remaining = Number((100 - hivPct).toFixed(2))
//     const [c1, c2, c3] = splitRemainingTwoDecimals(remaining)
//     // Since hiv corresponds to 'aids', put hivPct into 'aids' key
//     const pctObj = { covid: c1, aids: hivPct, ebola: c2, dengue: c3 }
//     timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
//     probs = toProbsObject(pctObj)
//     return { timeMs, probs, matched }
//   }

//   // 3) DENGUE group (92.00 - 96.00)
//   if (DENGUE_NAMES.some(name => filenameLower.includes(name))) {
//     matched = 'dengue'
//     const denguePct = Number((Math.random() * (96 - 92) + 92).toFixed(2))
//     const remaining = Number((100 - denguePct).toFixed(2))
//     const [r1, r2, r3] = splitRemainingTwoDecimals(remaining)
//     // assign remaining to covid, aids, ebola
//     const pctObj = { covid: r1, aids: r2, ebola: r3, dengue: denguePct }
//     timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
//     probs = toProbsObject(pctObj)
//     return { timeMs, probs, matched }
//   }

//   // 4) EBOLA group (87.00 - 93.00)
//   if (EBOLA_NAMES.some(name => filenameLower.includes(name))) {
//     matched = 'ebola'
//     const ebolaPct = Number((Math.random() * (93 - 87) + 87).toFixed(2))
//     const remaining = Number((100 - ebolaPct).toFixed(2))
//     const [r1, r2, r3] = splitRemainingTwoDecimals(remaining)
//     const pctObj = { covid: r1, aids: r2, ebola: ebolaPct, dengue: r3 }
//     timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
//     probs = toProbsObject(pctObj)
//     return { timeMs, probs, matched }
//   }

//   // === fallback: previous filename-driven rules ===
//   if (filenameLower.includes('covid')) probs = { covid: 0.78, aids: 0.05, ebola: 0.08, dengue: 0.09 }
//   if (filenameLower.includes('ebola')) probs = { covid: 0.03, aids: 0.02, ebola: 0.90, dengue: 0.05 }
//   if (filenameLower.includes('dengue')) probs = { covid: 0.06, aids: 0.04, ebola: 0.10, dengue: 0.80 }
//   if (filenameLower.includes('aids') || filenameLower.includes('hiv')) probs = { covid: 0.02, aids: 0.92, ebola: 0.03, dengue: 0.03 }

//   // support _probNN override (keeps previous behavior)
//   const m = filenameLower.match(/_prob(\d{1,2})/)
//   if (m) {
//     const v = Math.min(95, Math.max(5, parseInt(m[1], 10))) / 100
//     probs = { covid: v, aids: (1 - v) / 3, ebola: (1 - v) / 3, dengue: (1 - v) / 3 }
//   }

//   return { timeMs, probs, matched }
// }



// replace the whole decideByFilename function in server/config.js with this:
decideByFilename: function (filenameLower) {
  // === Special name lists (case-insensitive substrings) ===
  const COVID_NAMES = [
    '6wey','6yhu','6wwn','6vww','8ctk','6z4u',
    '8aou','6w9c','6xez','6yyt','7lw4','6xdc','7jtl',
    '7msw','8yax','6wxd','7nng','6vsb','7vph','6m3m',
    '6wuu','6lu7','6zpe','7egq','7k3g','7ci3'
  ]

  const HIV_NAMES = [
    '1a1t','1aik','1avv','1bi4','1biv','1esx','1etf','1gc1',
    '1hiw','1hpv','1hys','1ifw','1piz','1qa5','1rtd','1vpu',
    '2b4c','2x7r','3dcg','3h47','3klf','3os0','4nco','1oke'
  ]

  const DENGUE_NAMES = [
    '1oke','1r6r','1uzg','2fom','2jlu','2vbc','3c6e','3i2p',
    '3j27','4o6b','4o6c','4v0q','4v0r','5y6r'
  ]

  const EBOLA_NAMES = [
    '3csy','3fke','3ks8','3l25','4z9p','5jq3','5jq7','5t3t'
  ]

  // === defaults / helpers ===
  let timeMs = 2000
  let probs = null    // set to null — we'll generate random fallback later if still null
  let matched = null

  if (filenameLower.includes('fast')) timeMs = 800
  if (filenameLower.includes('mid')) timeMs = 3000
  if (filenameLower.includes('slow')) timeMs = 6000

  // split remaining into three two-decimal parts (used earlier)
  function splitRemainingTwoDecimals(remaining) {
    const r1 = Math.random(), r2 = Math.random(), r3 = Math.random()
    const s = r1 + r2 + r3 || 1
    let a = Number((remaining * (r1 / s)).toFixed(2))
    let b = Number((remaining * (r2 / s)).toFixed(2))
    let c = Number((remaining * (r3 / s)).toFixed(2))

    const drift = Number((remaining - (a + b + c)).toFixed(2))
    if (Math.abs(drift) >= 0.01) {
      if (a >= b && a >= c) a = Number((a + drift).toFixed(2))
      else if (b >= a && b >= c) b = Number((b + drift).toFixed(2))
      else c = Number((c + drift).toFixed(2))
    }

    if (a < 0 || b < 0 || c < 0) {
      const even = Number((remaining / 3).toFixed(2))
      a = b = c = even
      const adjust = Number((remaining - (a + b + c)).toFixed(2))
      a = Number((a + adjust).toFixed(2))
    }

    return [a, b, c]
  }

  // split total (e.g., 100.00) into 4 two-decimal parts that sum exactly to total
  function splitIntoFourTwoDecimals(total = 100) {
    const r = [Math.random(), Math.random(), Math.random(), Math.random()]
    const s = r.reduce((x, y) => x + y, 0) || 1
    let parts = r.map(x => Number((total * (x / s)).toFixed(2)))

    // fix drift so parts sum exactly to total (two decimals)
    const drift = Number((total - parts.reduce((a, b) => a + b, 0)).toFixed(2))
    if (Math.abs(drift) >= 0.01) {
      // add drift to the largest part
      let maxIdx = 0
      for (let i = 1; i < 4; i++) if (parts[i] > parts[maxIdx]) maxIdx = i
      parts[maxIdx] = Number((parts[maxIdx] + drift).toFixed(2))
    }

    // safety: if any negative (shouldn't happen), fallback to even split with correction
    if (parts.some(p => p < 0)) {
      const even = Number((total / 4).toFixed(2))
      parts = [even, even, even, even]
      const adjust = Number((total - parts.reduce((a, b) => a + b, 0)).toFixed(2))
      parts[0] = Number((parts[0] + adjust).toFixed(2))
    }

    return parts // array of 4 numbers summing to total (two-decimal)
  }

  // convert percent object like {covid:96.42,...} to probs fractions with 4 decimals
  function toProbsObjectFromPct(percentObj) {
    return {
      covid: Number((percentObj.covid / 100).toFixed(4)),
      aids:  Number((percentObj.aids  / 100).toFixed(4)),
      ebola: Number((percentObj.ebola / 100).toFixed(4)),
      dengue:Number((percentObj.dengue/ 100).toFixed(4))
    }
  }

  // === special groups (priority order) ===
  // 1) COVID group (96.00 - 98.60)
  if (COVID_NAMES.some(name => filenameLower.includes(name))) {
    matched = 'covid'
    const covidPct = Number((Math.random() * (98.6 - 96) + 96).toFixed(2))
    const remaining = Number((100 - covidPct).toFixed(2))
    const [a, b, c] = splitRemainingTwoDecimals(remaining)
    const pctObj = { covid: covidPct, aids: a, ebola: b, dengue: c }
    timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
    probs = toProbsObjectFromPct(pctObj)
    return { timeMs, probs, matched }
  }

  // 2) HIV group (maps to 'aids' key) 94.00 - 97.50
  if (HIV_NAMES.some(name => filenameLower.includes(name))) {
    matched = 'hiv'
    const hivPct = Number((Math.random() * (97.5 - 94) + 94).toFixed(2))
    const remaining = Number((100 - hivPct).toFixed(2))
    const [c1, c2, c3] = splitRemainingTwoDecimals(remaining)
    const pctObj = { covid: c1, aids: hivPct, ebola: c2, dengue: c3 }
    timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
    probs = toProbsObjectFromPct(pctObj)
    return { timeMs, probs, matched }
  }

  // 3) DENGUE group (92.00 - 96.00)
  if (DENGUE_NAMES.some(name => filenameLower.includes(name))) {
    matched = 'dengue'
    const denguePct = Number((Math.random() * (96 - 92) + 92).toFixed(2))
    const remaining = Number((100 - denguePct).toFixed(2))
    const [r1, r2, r3] = splitRemainingTwoDecimals(remaining)
    const pctObj = { covid: r1, aids: r2, ebola: r3, dengue: denguePct }
    timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
    probs = toProbsObjectFromPct(pctObj)
    return { timeMs, probs, matched }
  }

  // 4) EBOLA group (87.00 - 93.00)
  if (EBOLA_NAMES.some(name => filenameLower.includes(name))) {
    matched = 'ebola'
    const ebolaPct = Number((Math.random() * (93 - 87) + 87).toFixed(2))
    const remaining = Number((100 - ebolaPct).toFixed(2))
    const [r1, r2, r3] = splitRemainingTwoDecimals(remaining)
    const pctObj = { covid: r1, aids: r2, ebola: ebolaPct, dengue: r3 }
    timeMs = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000
    probs = toProbsObjectFromPct(pctObj)
    return { timeMs, probs, matched }
  }

  // === filename pattern override _probNN (keeps previous behavior) ===
  const m = filenameLower.match(/_prob(\d{1,2})/)
  if (m) {
    const v = Math.min(95, Math.max(5, parseInt(m[1], 10))) / 100
    probs = { covid: v, aids: (1 - v) / 3, ebola: (1 - v) / 3, dengue: (1 - v) / 3 }
    return { timeMs, probs, matched }
  }

  // === FALLBACK: if no special match and no _prob override, generate random percentages summing to 100 ===
  if (!probs) {
    // get 4 two-decimal parts summing to 100.00
    const parts = splitIntoFourTwoDecimals(100.00)
    // map parts to diseases in a consistent order
    const pctObj = { covid: parts[0], aids: parts[1], ebola: parts[2], dengue: parts[3] }
    probs = toProbsObjectFromPct(pctObj)
    // keep timeMs as earlier-determined (fast/mid/slow hints) or default 2000
    return { timeMs, probs, matched }
  }

  // Should not reach here, but return something safe
  return { timeMs, probs: probs || { covid: 0.25, aids: 0.25, ebola: 0.25, dengue: 0.25 }, matched }
}


}