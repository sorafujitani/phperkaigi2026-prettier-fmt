import { defineShikiSetup } from '@slidev/types'
import type { ThemeRegistrationRaw } from 'shiki'

const cyanTheme: ThemeRegistrationRaw = {
  name: 'cyan-mono',
  type: 'dark',
  colors: {
    'editor.background': '#0a1214',
    'editor.foreground': '#d0e8ec',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#4a6a70', fontStyle: 'italic' },
    },
    {
      scope: ['string', 'string.quoted'],
      settings: { foreground: '#5fd7ff' },
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#5fd7ff' },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: { foreground: '#00d7ff' },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#00d7d7' },
    },
    {
      scope: ['variable', 'variable.other', 'variable.parameter'],
      settings: { foreground: '#b0dfe5' },
    },
    {
      scope: ['entity.name.type', 'support.type', 'support.class'],
      settings: { foreground: '#5fd7ff' },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: { foreground: '#6a8a8a' },
    },
    {
      scope: ['keyword.operator', 'keyword.operator.assignment'],
      settings: { foreground: '#7ab0b8' },
    },
    {
      scope: ['meta.tag', 'entity.name.tag'],
      settings: { foreground: '#00d7ff' },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#5fd7ff' },
    },
    {
      scope: ['support.constant', 'constant.other'],
      settings: { foreground: '#5fd7ff' },
    },
    {
      scope: ['meta.property-name', 'support.type.property-name'],
      settings: { foreground: '#00d7d7' },
    },
  ],
}

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: cyanTheme,
      light: cyanTheme,
    },
  }
})
