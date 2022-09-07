import { GlobalThemeOverrides } from "naive-ui"

export const lightThemeOverrides:GlobalThemeOverrides = {
  common: {
    primaryColor: '#A0A5D0',
    primaryColorHover: '#A0A5D0',

    // input背景
    inputColor : 'var(--input-bg-color)',
    // input文字
    textColor2 : 'var(--input-text-color)',

    borderColor : '#A0A5D000',
    borderRadius : '10px',

    popoverColor : 'var(--input-bg-color)',
    hoverColor : 'var(--input-hover-color)',

  },

}

export const darkThemeOverrides:GlobalThemeOverrides = {
  common: {
    primaryColor: 'rgba(117, 117, 122, 1)',
    inputColor : 'var(--input-bg-color)',
    textColor2 : 'var(--input-text-color)',
    borderColor : '#A0A5D000',
    borderRadius : '10px',
    popoverColor : 'var(--input-bg-color)',
    hoverColor : 'var(--input-hover-color)',
  }
}
