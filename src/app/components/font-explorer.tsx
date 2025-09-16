"use client";

import { useState, useMemo, ChangeEvent } from 'react';
import { useToast } from "@/hooks/use-toast"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Copy } from 'lucide-react';

const fancyStyles = [
  { name: 'Cursive', mapping: { a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏', A: '𝒜', B: '𝐵', C: '𝒞', D: '𝒟', E: '𝐸', F: '𝐹', G: '𝒢', H: '𝐻', I: '𝐼', J: '𝒥', K: '𝒦', L: '𝐿', M: '𝑀', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: '𝑅', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵' } },
  { name: 'Gothic', mapping: { a: '𝔞', b: '𝔟', c: '𔠠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷', A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ' } },
  { name: 'Monospace', mapping: { a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝚏', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝚓', k: '𝚔', l: '𝚕', m: '𝚖', n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣', A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼', N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉' } },
  { name: 'Bubbles', mapping: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ', A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ', K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ', W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ' } },
  { name: 'Squares', mapping: { a: '🅰', b: '🅱', c: '🅲', d: '🅳', e: '🅴', f: '🅵', g: '🅶', h: '🅷', i: '🅸', j: '🅹', k: '🅺', l: '🅻', m: '🅼', n: '🅽', o: '🅾', p: '🅿', q: '🆀', r: '🆁', s: '🆂', t: '🆃', u: '🆄', v: '🆅', w: '🆆', x: '🆇', y: '🆈', z: '🆉' } },
  { name: 'Bold', mapping: { a: '𝗮', b: '𝗯', c: '𝗰', d: '𝗱', e: '𝗲', f: '𝗳', g: '𝗴', h: '𝗵', i: '𝗶', j: '𝗷', k: '𝗸', l: '𝗹', m: '𝗺', n: '𝗻', o: '𝗼', p: '𝗽', q: '𝗾', r: '𝗿', s: '𝘀', t: '𝘁', u: '𝘂', v: '𝘃', w: '𝘄', x: '𝘅', y: '𝘆', z: '𝘇', A: '𝗔', B: '𝗕', C: '𝗖', D: '𝗗', E: '𝗘', F: '𝗙', G: '𝗚', H: '𝗛', I: '𝗜', J: '𝗝', K: '𝗞', L: '𝗟', M: '𝗠', N: '𝗡', O: '𝗢', P: '𝗣', Q: '𝗤', R: '𝗥', S: '𝗦', T: '𝗧', U: '𝗨', V: '𝗩', W: '𝗪', X: '𝗫', Y: '𝗬', Z: '𝗭' } },
  { name: 'Upside Down', mapping: { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ı', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z', A: '∀', B: '𐐒', C: 'Ɔ', D: 'ᗡ', E: 'Ǝ', F: 'Ⅎ', G: 'פ', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Q', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z', ' ': ' ' } },
  { name: 'Double Struck', mapping: { a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝕠', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫', A: '𝔸', B: '𝔹', C: 'ℂ', D: '𝔻', E: '𝔼', F: '𝔽', G: '𝔾', H: 'ℍ', I: '𝕀', J: '𝕁', K: '𝕂', L: '𝕃', M: '𝕄', N: 'ℕ', O: '𝕆', P: 'ℙ', Q: 'ℚ', R: 'ℝ', S: '𝕊', T: '𝕋', U: '𝕌', V: '𝕍', W: '𝕎', X: '𝕏', Y: '𝕐', Z: 'ℤ' } },
  { name: 'Old English', mapping: { a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷', A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍', K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗', U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ' } },
  { name: 'Italic', mapping: { a: '𝘢', b: '𝘣', c: '𝘤', d: '𝘥', e: '𝘦', f: '𝘧', g: '𝘨', h: '𝘩', i: '𝘪', j: '𝘫', k: '𝘬', l: '𝘭', m: '𝘮', n: '𝘯', o: '𝘰', p: '𝘱', q: '𝘲', r: '𝘳', s: '𝘴', t: '𝘵', u: '𝘶', v: '𝘷', w: '𝘸', x: '𝘹', y: '𝘺', z: '𝘻', A: '𝘈', B: '𝘉', C: '𝘊', D: '𝘋', E: '𝘌', F: '𝘍', G: '𝘎', H: '𝘏', I: '𝘐', J: '𝘑', K: '𝘒', L: '𝘓', M: '𝘔', N: '𝘕', O: '𝘖', P: '𝘗', Q: '𝘘', R: '𝘙', S: '𝘚', T: '𝘛', U: '𝘜', V: '𝘝', W: '𝘞', X: '𝘟', Y: '𝘠', Z: '𝘡' } },
  { name: 'Bold Italic', mapping: { a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢', n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝙫', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯', A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈', N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕' } },
  { name: 'Bold Cursive', mapping: { a: '𝓪', b: '𝓫', c: '𝓬', d: '𝓭', e: '𝓮', f: '𝓯', g: '𝓰', h: '𝓱', i: '𝓲', j: '𝓳', k: '𝓴', l: '𝓵', m: '𝓶', n: '𝓷', o: '𝓸', p: '𝓹', q: '𝓺', r: '𝓻', s: '𝓼', t: '𝓽', u: '𝓾', v: '𝓿', w: '𝔀', x: '𝔁', y: '𝔂', z: '𝔃', A: '𝓐', B: '𝓑', C: '𝓒', D: '𝓓', E: '𝓔', F: '𝓕', G: '𝓖', H: '𝓗', I: '𝓘', J: '𝓙', K: '𝓚', L: '𝓛', M: '𝓜', N: '𝓝', O: '𝓞', P: '𝓟', Q: '𝓠', R: '𝓡', S: '𝓢', T: '𝓣', U: '𝓤', V: '𝓥', W: '𝓦', X: '𝓧', Y: '𝓨', Z: '𝓩' } },
  { name: 'Bold Gothic', mapping: { a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳', A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙' } },
  { name: 'Luni Bubbles', mapping: { a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ', m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ', y: 'ⓨ', z: 'ⓩ' } },
  { name: 'Inverted Squares', mapping: { a: '🅰', b: '🅱', c: '🅲', d: '🅳', e: '🅴', f: '🅵', g: '🅶', h: '🅷', i: '🅸', j: '🅹', k: '🅺', l: '🅻', m: '🅼', n: '🅽', o: '🅾', p: '🅿', q: '🆀', r: '🆁', s: '🆂', t: '🆃', u: '🆄', v: '🆅', w: '🆆', x: '🆇', y: '🆈', z: '🆉' } },
  { name: 'Fat Text', mapping: { a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳', A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙' } },
  { name: 'Wide Text', mapping: { a: 'ａ', b: 'ｂ', c: 'ｃ', d: 'ｄ', e: 'ｅ', f: 'ｆ', g: 'ｇ', h: 'ｈ', i: 'ｉ', j: 'ｊ', k: 'ｋ', l: 'ｌ', m: 'ｍ', n: 'ｎ', o: 'ｏ', p: 'ｐ', q: 'ｑ', r: 'ｒ', s: 'ｓ', t: 'ｔ', u: 'ｕ', v: 'ｖ', w: 'ｗ', x: 'ｘ', y: 'ｙ', z: 'ｚ', A: 'Ａ', B: 'Ｂ', C: 'Ｃ', D: 'Ｄ', E: 'Ｅ', F: 'Ｆ', G: 'Ｇ', H: 'Ｈ', I: 'Ｉ', J: 'Ｊ', K: 'Ｋ', L: 'Ｌ', M: 'Ｍ', N: 'Ｎ', O: 'Ｏ', P: 'Ｐ', Q: 'Ｑ', R: 'Ｒ', S: 'Ｓ', T: 'Ｔ', U: 'Ｕ', V: 'Ｖ', W: 'Ｗ', X: 'Ｘ', Y: 'Ｙ', Z: 'Ｚ' } },
  { name: 'Currency', mapping: { a: '₳', b: '฿', c: '₵', d: 'Đ', e: 'Ɇ', f: '₣', g: '₲', h: 'Ⱨ', i: 'ł', j: 'J', k: '₭', l: 'Ⱡ', m: '₥', n: '₦', o: 'Ø', p: '₱', q: 'Q', r: 'Ɽ', s: '₴', t: '₮', u: 'Ʉ', v: 'V', w: '₩', x: 'Ӿ', y: 'Ɏ', z: 'Ⱬ', A: '₳', B: '฿', C: '₵', D: 'Đ', E: 'Ɇ', F: '₣', G: '₲', H: 'Ⱨ', I: 'ł', J: 'J', K: '₭', L: 'Ⱡ', M: '₥', N: '₦', O: 'Ø', P: '₱', Q: 'Q', R: 'Ɽ', S: '₴', T: '₮', U: 'Ʉ', V: 'V', W: '₩', X: 'Ӿ', Y: 'Ɏ', Z: 'Ⱬ' } },
  { name: 'Medieval', mapping: { a: '𝔞', b: '𝔟', c: '𝔠', d: '𝔡', e: '𝔢', f: '𝔣', g: '𝔤', h: '𝔥', i: '𝔦', j: '𝔧', k: '𝔨', l: '𝔩', m: '𝔪', n: '𝔫', o: '𝔬', p: '𝔭', q: '𝔮', r: '𝔯', s: '𝔰', t: '𝔱', u: '𝔲', v: '𝔳', w: '𝔴', x: '𝔵', y: '𝔶', z: '𝔷', A: '𝕬', B: '𝕭', C: '𝕮', D: '𝕯', E: '𝕰', F: '𝕱', G: '𝕲', H: '𝕳', I: '𝕴', J: '𝕵', K: '𝕶', L: '𝕷', M: '𝕸', N: '𝕹', O: '𝕺', P: '𝕻', Q: '𝕼', R: '𝕽', S: '𝕾', T: '𝕿', U: '𝖀', V: '𝖁', W: '𝖂', X: '𝖃', Y: '𝖄', Z: '𝖅' } },
  { name: 'Superscript', mapping: { a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ᶦ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: '۹', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ', A: 'ᴬ', B: 'ᴮ', C: 'ᶜ', D: 'ᴰ', E: 'ᴱ', F: 'ᶠ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ', O: 'ᴼ', P: 'ᴾ', Q: 'Q', R: 'ᴿ', S: 'ˢ', T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ', X: 'ˣ', Y: 'ʸ', Z: 'ᶻ' } },
  { name: 'Subscript', mapping: { a: 'ₐ', b: '♭', c: '꜀', d: 'ᑯ', e: 'ₑ', f: 'բ', g: '₉', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', q: '૧', r: 'ᵣ', s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', w: 'ₓ', x: 'ₓ', y: 'ᵧ', z: '₂', A: 'ₐ', B: '♭', C: '꜀', D: 'ᑯ', E: 'ₑ', F: 'բ', G: '₉', H: 'ₕ', I: 'ᵢ', J: 'ⱼ', K: 'ₖ', L: 'ₗ', M: 'ₘ', N: 'ₙ', O: 'ₒ', P: 'ₚ', Q: '૧', R: 'ᵣ', S: 'ₛ', T: 'ₜ', U: 'ᵤ', V: 'ᵥ', W: 'ₓ', X: 'ₓ', Y: 'ᵧ', Z: '₂' } },
  { name: 'Handwriting', mapping: { a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: '𝑒', f: '𝒻', g: '𝑔', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: '𝑜', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏', A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵' } },
  { name: 'Strikethrough', mapping: { a: 'a̶', b: 'b̶', c: 'c̶', d: 'd̶', e: 'e̶', f: 'f̶', g: 'g̶', h: 'h̶', i: 'i̶', j: 'j̶', k: 'k̶', l: 'l̶', m: 'm̶', n: 'n̶', o: 'o̶', p: 'p̶', q: 'q̶', r: 'r̶', s: 's̶', t: 't̶', u: 'u̶', v: 'v̶', w: 'w̶', x: 'x̶', y: 'y̶', z: 'z̶', A: 'A̶', B: 'B̶', C: 'C̶', D: 'D̶', E: 'E̶', F: 'F̶', G: 'G̶', H: 'H̶', I: 'I̶', J: 'J̶', K: 'K̶', L: 'L̶', M: 'M̶', N: 'N̶', O: 'O̶', P: 'P̶', Q: 'Q̶', R: 'R̶', S: 'S̶', T: 'T̶', U: 'U̶', V: 'V̶', W: 'W̶', X: 'X̶', Y: 'Y̶', Z: 'Z̶' } },
  { name: 'Small Caps', mapping: { a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ', A: 'A', B: 'B', C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', H: 'H', I: 'I', J: 'J', K: 'K', L: 'L', M: 'M', N: 'N', O: 'O', P: 'P', Q: 'Q', R: 'R', S: 'S', T: 'T', U: 'U', V: 'V', W: 'W', X: 'X', Y: 'Y', Z: 'Z' } },
  { name: 'Zalgo', mapping: { a: 'a͆', b: 'b͆', c: 'c͆', d: 'd͆', e: 'e͆', f: 'f͆', g: 'g͆', h: 'h͆', i: 'i͆', j: 'j͆', k: 'k͆', l: 'l͆', m: 'm͆', n: 'n͆', o: 'o͆', p: 'p͆', q: 'q͆', r: 'r͆', s: 's͆', t: 't͆', u: 'u͆', v: 'v͆', w: 'w͆', x: 'x͆', y: 'y͆', z: 'z͆' } },
  { name: 'Mirrored', mapping: { a: 'ɒ', b: 'd', c: 'ɔ', d: 'b', e: 'ɘ', f: 'Ꮈ', g: 'ǫ', h: 'ʜ', i: 'i', j: 'ꞁ', k: 'ʞ', l: 'l', m: 'm', n: 'n', o: 'o', p: 'q', q: 'p', r: 'ɿ', s: 'ꙅ', t: 'ƚ', u: 'u', v: 'v', w: 'w', x: 'x', y: 'y', z: 'z' } },
  { name: 'Flipped', mapping: { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z' } },
  { name: 'Rock Dots', mapping: { a: 'ä', b: 'b', c: 'ċ', d: 'd', e: 'ë', f: 'f', g: 'ġ', h: 'h', i: 'ï', j: 'j', k: 'k', l: 'l', m: 'm', n: 'n', o: 'ö', p: 'p', q: 'q', r: 'r', s: 's', t: 'ẗ', u: 'ü', v: 'v', w: 'w', x: 'x', y: 'ÿ', z: 'ż' } },
  { name: 'Kirby', mapping: { a: 'ɑ', b: 'ɓ', c: 'ɔ', d: 'ɖ', e: 'є', f: 'Բ', g: 'ɠ', h: 'ɦ', i: 'ɨ', j: 'ʝ', k: 'ƙ', l: 'ʆ', m: 'ɱ', n: 'ɳ', o: 'o', p: 'ρ', q: 'զ', r: 'ʀ', s: 'ʂ', t: 't', u: 'u', v: 'v', w: 'w', x: 'x', y: 'y', z: 'z' } },
  { name: 'Magic', mapping: { a: 'ค', b: '๒', c: 'ς', d: '๔', e: 'є', f: 'Ŧ', g: 'ﻮ', h: 'ђ', i: 'เ', j: 'ן', k: 'к', l: 'ɭ', m: '๓', n: 'ภ', o: '๏', p: 'ק', q: 'ợ', r: 'г', s: 'ร', t: 't', u: 'ย', v: 'ש', w: 'ฬ', x: 'א', y: 'ץ', z: 'չ' } },
  { name: 'Wavy', mapping: { a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝕠', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫' } },
  { name: 'Vaporwave', mapping: { a: 'ａ', b: 'ｂ', c: 'ｃ', d: 'ｄ', e: 'ｅ', f: 'ｆ', g: 'ｇ', h: 'ｈ', i: 'ｉ', j: 'ｊ', k: 'ｋ', l: 'ｌ', m: 'ｍ', n: 'ｎ', o: 'ｏ', p: 'ｐ', q: 'ｑ', r: 'ｒ', s: 'ｓ', t: 'ｔ', u: 'ｕ', v: 'ｖ', w: 'ｗ', x: 'ｘ', y: 'ｙ', z: 'ｚ' } },
  { name: 'Stinky', mapping: { a: 'ᗩ', b: 'ᗷ', c: 'ᑕ', d: 'ᗪ', e: 'E', f: 'ᖴ', g: 'G', h: 'ᕼ', i: 'I', j: 'ᒍ', k: 'K', l: 'ᒪ', m: 'ᗰ', n: 'ᑎ', o: 'O', p: 'ᑭ', q: 'ᑫ', r: 'ᖇ', s: 'S', t: 'T', u: 'ᑌ', v: 'ᐯ', w: 'ᗯ', x: '᙭', y: 'Y', z: 'ᘔ' } },
  { name: 'Russian', mapping: { a: 'а', b: 'б', c: 'ц', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'х', i: 'и', j: 'й', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', q: 'я', r: 'р', s: 'с', t: 'т', u: 'у', v: 'в', w: 'ш', x: 'х', y: 'у', z: 'з' } },
  { name: 'Hashtag', mapping: { a: '#a', b: '#b', c: '#c', d: '#d', e: '#e', f: '#f', g: '#g', h: '#h', i: '#i', j: '#j', k: '#k', l: '#l', m: '#m', n: '#n', o: '#o', p: '#p', q: '#q', r: '#r', s: '#s', t: '#t', u: '#u', v: '#v', w: '#w', x: '#x', y: '#y', z: '#z' } },
  { name: 'Underline', mapping: { a: 'a̲', b: 'b̲', c: 'c̲', d: 'd̲', e: 'e̲', f: 'f̲', g: 'g̲', h: 'h̲', i: 'i̲', j: 'j̲', k: 'k̲', l: 'l̲', m: 'm̲', n: 'n̲', o: 'o̲', p: 'p̲', q: 'q̲', r: 'r̲', s: 's̲', t: 't̲', u: 'u̲', v: 'v̲', w: 'w̲', x: 'x̲', y: 'y̲', z: 'z̲' } },
  { name: 'Double Underline', mapping: { a: 'a̳', b: 'b̳', c: 'c̳', d: 'd̳', e: 'e̳', f: 'f̳', g: 'g̳', h: 'h̳', i: 'i̳', j: 'j̳', k: 'k̳', l: 'l̳', m: 'm̳', n: 'n̳', o: 'o̳', p: 'p̳', q: 'q̳', r: 'r̳', s: 's̳', t: 't̳', u: 'u̳', v: 'v̳', w: 'w̳', x: 'x̳', y: 'y̳', z: 'z̳' } },
  { name: 'Devilish', mapping: { a: 'a̸', b: 'b̸', c: 'c̸', d: 'd̸', e: 'e̸', f: 'f̸', g: 'g̸', h: 'h̸', i: 'i̸', j: 'j̸', k: 'k̸', l: 'l̸', m: 'm̸', n: 'n̸', o: 'o̸', p: 'p̸', q: 'q̸', r: 'r̸', s: 's̸', t: 't̸', u: 'u̸', v: 'v̸', w: 'w̸', x: 'x̸', y: 'y̸', z: 'z̸' } },
  { name: 'Slash', mapping: { a: 'a̷', b: 'b̷', c: 'c̷', d: 'd̷', e: 'e̷', f: 'f̷', g: 'g̷', h: 'h̷', i: 'i̷', j: 'j̷', k: 'k̷', l: 'l̷', m: 'm̷', n: 'n̷', o: 'o̷', p: 'p̷', q: 'q̷', r: 'r̷', s: 's̷', t: 't̷', u: 'u̷', v: 'v̷', w: 'w̷', x: 'x̷', y: 'y̷', z: 'z̷' } },
  { name: 'Tiny', mapping: { a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ᶦ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ', n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', q: '۹', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ' } },
  { name: 'Lines', mapping: { a: '𝕒', b: '𝕓', c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚', j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝕠', p: '𝕡', q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨', x: '𝕩', y: '𝕪', z: '𝕫' } },
  { name: 'Weird Box', mapping: { a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄶', h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼', n: '🄽', o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄', v: '🅅', w: '🅆', x: '🅇', y: '🅈', z: '🅉' } },
  { name: 'Cute', mapping: { a: 'α', b: 'в', c: '¢', d: '∂', e: 'є', f: 'ƒ', g: 'g', h: 'н', i: 'ι', j: 'נ', k: 'к', l: 'ℓ', m: 'м', n: 'η', o: 'σ', p: 'ρ', q: 'q', r: 'я', s: 'ѕ', t: 'т', u: 'υ', v: 'ν', w: 'ω', x: 'χ', y: 'у', z: 'z' } },
  { name: 'Parenthesis', mapping: { a: '(a)', b: '(b)', c: '(c)', d: '(d)', e: '(e)', f: '(f)', g: '(g)', h: '(h)', i: '(i)', j: '(j)', k: '(k)', l: '(l)', m: '(m)', n: '(n)', o: '(o)', p: '(p)', q: '(q)', r: '(r)', s: '(s)', t: '(t)', u: '(u)', v: '(v)', w: '(w)', x: '(x)', y: '(y)', z: '(z)' } },
  { name: 'Stars', mapping: { a: '✬a✬', b: '✬b✬', c: '✬c✬', d: '✬d✬', e: '✬e✬', f: '✬f✬', g: '✬g✬', h: '✬h✬', i: '✬i✬', j: '✬j✬', k: '✬k✬', l: '✬l✬', m: '✬m✬', n: '✬n✬', o: '✬o✬', p: '✬p✬', q: '✬q✬', r: '✬r✬', s: '✬s✬', t: '✬t✬', u: '✬u✬', v: '✬v✬', w: '✬w✬', x: '✬x✬', y: '✬y✬', z: '✬z✬' } },
  { name: 'Special', mapping: { a: 'Ă', b: 'β', c: 'Č', d: 'Ď', e: 'Ĕ', f: 'Ŧ', g: 'Ğ', h: 'Ĥ', i: 'Ĩ', j: 'Ĵ', k: 'Ķ', l: 'Ĺ', m: 'M', n: 'Ń', o: 'Ő', p: 'Р', q: 'Q', r: 'Ŕ', s: 'Ś', t: 'Ť', u: 'Ú', v: 'V', w: 'Ŵ', x: 'Ж', y: 'Ŷ', z: 'Ż' } },
  { name: 'Neon', mapping: { a: 'ค', b: '๒', c: 'ς', d: '๔', e: 'є', f: 'Ŧ', g: 'ﻮ', h: 'ђ', i: 'เ', j: 'ן', k: 'к', l: 'ɭ', m: '๓', n: 'ภ', o: '๏', p: 'ק', q: 'ợ', r: 'г', s: 'ร', t: 't', u: 'ย', v: 'ש', w: 'ฬ', x: 'א', y: 'ץ', z: 'չ' } },
  { name: 'Luni tool', mapping: { a: '𝔸', b: '𝔹', c: 'ℂ', d: '𝔻', e: '𝔼', f: '𝔽', g: '𝔾', h: 'ℍ', i: '𝕀', j: '𝕁', k: '𝕂', l: '𝕃', m: '𝕄', n: 'ℕ', o: '𝕆', p: 'ℙ', q: 'ℚ', r: 'ℝ', s: '𝕊', t: '𝕋', u: '𝕌', v: '𝕍', w: '𝕎', x: '𝕏', y: '𝕐', z: 'ℤ' } },
];

function convertToFancy(text: string, styleName: string, mapping: Record<string, string>): string {
  if (styleName === 'Upside Down') {
    return text.split('').reverse().map(char => mapping[char.toLowerCase()] || char).join('');
  }
  return text.split('').map(char => mapping[char] || char).join('');
}

export default function FontExplorer() {
  const [fancyText, setFancyText] = useState('Insta Fonts');
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'The text has been copied to your clipboard.',
    });
  };

  const fancyTextResults = useMemo(() => {
    if (!fancyText) return [];
    return fancyStyles.map(style => ({
      style: style.name,
      text: convertToFancy(fancyText, style.name, style.mapping),
    }));
  }, [fancyText]);


  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <header className="flex h-16 items-center border-b bg-card px-4 md:px-6">
        <h1 className="text-xl font-semibold tracking-tight">Fancy Text Generator</h1>
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardContent className="p-4">
              <Textarea
                value={fancyText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFancyText(e.target.value)}
                placeholder="Type your text here..."
                className="w-full resize-y border-2 border-primary text-2xl shadow-inner focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                rows={3}
              />
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="space-y-4 pr-4">
                {fancyTextResults.map((result) => (
                   <div key={result.style} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                   <div className="flex items-center justify-between p-4">
                     <p className="text-xl font-mono bg-muted p-3 rounded-md overflow-x-auto flex-grow">{result.text}</p>
                     <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.text)} className="ml-4">
                       <Copy className="h-5 w-5" />
                       <span className="sr-only">Copy</span>
                     </Button>
                   </div>
                 </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  );
}
