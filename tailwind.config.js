/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    borderWidth: {
      1: '1px',
      2: '2px'
    },
    borderRadius: {
      10: '10px',
      20: '20px',
      30: '30px',
      37: '37px',
      50: '50px',
      64: '64px'
    },
    colors: {
      white: '#FFF',
      black: '#000',
      gray: {
        1: '#292929',
        2: '#727272',
        3: '#F0F0F0',
        4: '#45413C',
        5: '#F8F8F8',
        6: '#808191',
        7: '#F1F1F1',
        8: '#F6F6F6',
        9: '#87898C',
        10: '#EFF2F7',
        11: '#767676'
      },
      indigo: {
        1: '#11142D '
      },
      teal: {
        1: '#31AAB7'
      },
      blue: {
        1: '#DFEBFF'
      }
    },
    fontFamily: {
      sans: ['Urbanist', 'sans-serif']
    },
    fontSize: {
      '14-20-400': [
        '14px',
        {
          fontWeight: '400',
          lineHeight: '20px'
        }
      ],
      '14-24-400': [
        '14px',
        {
          fontWeight: '400',
          lineHeight: '24px'
        }
      ],
      '14-20-500': [
        '14px',
        {
          fontWeight: '500',
          lineHeight: '20px'
        }
      ],
      '16-20-400': [
        '16px',
        {
          fontWeight: '400',
          lineHeight: '20px'
        }
      ],
      '20-24-400': [
        '20px',
        {
          fontWeight: '400',
          lineHeight: '24px'
        }
      ],
      '18-20-600': [
        '18px',
        {
          fontWeight: '600',
          lineHeight: '20px'
        }
      ],
      '30-36-700': [
        '30px',
        {
          fontWeight: '700',
          lineHeight: '36px'
        }
      ],
      '36-43-700': [
        '36px',
        {
          fontWeight: '700',
          lineHeight: '43px'
        }
      ]
    },
    gap: {
      3: '3px',
      5: '5px',
      10: '10px',
      18: '18px',
      20: '20px'
    },
    height: {
      40: '40px',
      46: '46px',
      56: '56px',
      75: '75px',
      120: '120px',
      136: '136px',
      234: '234px',
      274: '274px',
      auto: 'auto',
      screen: '100vh'
    },
    inset: {
      0: '0px',
      36: '36px',
      65: '65px'
    },
    margin: {
      5: '5px',
      10: '10px',
      20: '20px',
      40: '40px',
      49: '49px',
      75: '75px'
    },
    padding: {
      10: '10px',
      12: '12px',
      15: '15px',
      18: '18px',
      20: '20px',
      25: '25px',
      28: '28px',
      38: '38px',
      40: '40px',
      45: '45px',
      100: '100px'
    },
    screens: {
      '2xs': '375px',
      xs: '490px',
      sm: '630px',
      md: '768px',
      xm: '808px',
      '2xm': '930px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px'
    },
    width: {
      46: '46px',
      56: '56px',
      120: '120px',
      210: '210px',
      300: '300px',
      360: '360px',
      auto: 'auto',
      full: '100%'
    },
    extend: {}
  },
  plugins: []
}
