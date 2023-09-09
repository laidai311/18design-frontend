/**
 *
 * @param {Number} start Bắt đầu
 * @param {Number} end Kết thúc
 * @returns Array
 */
export function range(start, end) {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
}
