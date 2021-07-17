import * as vscode from 'vscode';

const GOLDEN_RATIO = 0.618033988749895;

export enum FormatType {
  fillRandomHexColorCode = 'fillRandomHexColorCode',
  fillUniqueRandomHexColorCode = 'fillUniqueRandomHexColorCode',
}

const randomSeed = () => Math.random();

const hsvToRgb = (h: number, s: number, v: number) => {
  const hi = Math.floor(h * 6);
  const f = h * 6 - hi;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 255;
  let g = 255;
  let b = 255;

  switch (hi) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
};

const getSaturation = () => 0.5;

const getValue = () => 0.95;

const padHex = (val: string) => (val.length > 2 ? val : new Array(2 - val.length + 1).join('0') + val);

const getRandomRgb = () => {
  const { hue, saturation, value } = {
    hue: (randomSeed() + GOLDEN_RATIO) % 1,
    saturation: getSaturation(),
    value: getValue(),
  };
  return hsvToRgb(hue, saturation, value);
};

const rgbToHex = (rgb: number[]) => `#${rgb.map((val) => padHex(val.toString(16))).join('')}`;

export const getRandomHex = () => rgbToHex(getRandomRgb());

export const processSelection = (formatType: FormatType) => {
  const e = vscode.window.activeTextEditor;
  if (e) {
    const d = e.document;
    const sel = e.selections;

    e.edit((edit) => {
      const randomHex = getRandomHex();
      for (let x = 0; x < sel.length; x++) {
        let selectedTxt: string = d.getText(new vscode.Range(sel[x].start, sel[x].end));
        selectedTxt = formatType === FormatType.fillUniqueRandomHexColorCode ? getRandomHex() : randomHex;
        edit.insert(sel[x].start, selectedTxt);
      }
    });
  }
};
