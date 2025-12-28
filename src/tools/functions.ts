// import { EXP_K } from './constants.ts';
//
// export function exp0_1(val: number) {
//   val = val / 100;
//   const res = Math.pow(2, 4 * val);
//   return res;
// }

export function exp1_1(val: number, k: number = 2) {
  val = val / 100;
  const res = Math.exp(k * val);
  return res;
}
