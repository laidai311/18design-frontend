import {css} from "styled-components";

export const FlxCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AbsCenter = css`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const AbsCenterX = css`
  left: 50%;
  transform: translateX(-50%);
`

export const AbsCenterY = css`
  top: 50%;
  transform: translateY(-50%);
`
