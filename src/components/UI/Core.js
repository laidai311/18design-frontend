import styled from "styled-components";
import 'lazysizes'
import NextLink from 'next/link'

export const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
  color: currentColor;
`

export const Img = styled.img.attrs(() => ({
    class: 'lazyload',
    src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
}))`
  display: inline-block;
`

export const Link = styled(NextLink)`
  display: inline-block;
`