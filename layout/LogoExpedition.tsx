import { ReactElement } from 'react';
import s from './style.module.scss';

type LogoExpedition = {
  color?: string;
  className?: string;
  alt?: string;
};

export const LogoExpedition = ({
  color = 'black',
  className,
  alt,
}: LogoExpedition): ReactElement => {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${567} ${125}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{alt}</title>
      <path
        d="M145.12 20.23L143.76 12.37L85.29 22.51L101.63 7.76L96.28 1.84L75.88 20.25L45.9 1.85L41.73 8.65L68.93 25.34L36.16 31.02L37.52 38.88L71.04 33.07L68.15 52.64L76.04 53.81L79.31 31.71L113.46 52.66L117.63 45.86L91.12 29.59L145.12 20.23ZM372.77 14.51V52.09H382.16V27.81C383.3 24.82 386.29 22.4 389.99 22.4C394.4 22.4 396.68 25.6 396.68 30.51V52.07H406.07V29.22C406.07 19.54 400.66 13.85 392.98 13.85C387.71 13.85 383.8 16.48 382.16 20.18V14.49H372.77V14.51ZM4.03 52.08H31.81V43.61H13.43V30.66H31.82V22.19H13.43V10.73H35.14V2.26H4.03V52.08ZM149.11 69.16H158.5V48.45C160.99 51.3 164.41 52.86 168.61 52.86C177.65 52.86 184.77 45.32 184.77 32.86C184.77 20.55 177.8 13.72 168.9 13.72C164.35 13.72 160.79 15.57 158.51 18.56V14.5H149.12V69.16H149.11ZM166.41 44.54C162.71 44.54 159.93 42.48 158.51 39.98V26.89C159.93 24.26 162.71 22.05 166.69 22.05C171.81 22.05 175.37 25.61 175.37 32.94C175.37 40.27 171.74 44.54 166.41 44.54ZM270.07 52.08H279.46V14.51H270.07V52.08ZM269.85 9.81H279.67V0.419998H269.85V9.81ZM311.05 22.48V14.51H299.45V5.68999H292.33L291.83 9.53C291.4 13.09 289.48 14.51 285.35 14.51H283.57V22.48H290.05V37.64C290.05 46.89 295.32 52.37 304.43 52.37C305.92 52.37 307.13 52.23 308.06 52.09V43.83H305.36C301.66 43.83 299.45 41.84 299.45 37.64V22.48H311.05ZM315.18 52.08H324.57V14.51H315.18V52.08ZM314.97 9.81H324.79V0.419998H314.97V9.81ZM330.06 33.01C330.06 45.25 338.03 52.94 348.85 52.94C359.67 52.94 367.64 45.25 367.64 33.01C367.64 21.2 359.67 13.65 348.85 13.65C338.03 13.65 330.06 21.2 330.06 33.01ZM358.25 33.01C358.25 40.13 354.26 44.54 348.85 44.54C343.44 44.54 339.46 40.13 339.46 33.01C339.46 26.39 343.45 22.05 348.85 22.05C354.26 22.05 358.25 26.39 358.25 33.01ZM222.72 35.28C222.79 34.64 222.93 33.57 222.93 32.43C222.93 21.04 216.6 13.64 206.07 13.64C194.97 13.64 188.35 21.04 188.35 32.78C188.35 45.02 194.23 52.92 205.48 52.92C214.38 52.92 219.83 48.08 221.18 40.68L212.43 39.11C211.65 42.67 209.61 45.02 205.55 45.02C200.43 45.02 198.17 41.53 197.82 35.27H222.72V35.28ZM197.81 28.66C198.52 23.96 201.51 21.54 206.06 21.54C210.4 21.54 212.96 24.03 213.6 28.66H197.81ZM226.68 32.49C226.68 20.37 233.25 13.65 241.59 13.65C246.44 13.65 250.17 15.95 252.31 19.52V0H261.72V52.1H245.86C234.24 52.09 226.68 44.46 226.68 32.49ZM244.15 22.06C239.59 22.06 236.09 25.5 236.09 32.77C236.09 39.76 240.02 44.21 246.51 44.21H252.31V27C250.74 24.22 247.65 22.06 244.15 22.06ZM236.98 83.57H246.37V121.15H236.98V83.57ZM236.77 69.48H246.59V78.87H236.77V69.48ZM263.71 83.57V89.26C265.35 85.56 269.26 82.93 274.53 82.93C282.22 82.93 287.63 88.62 287.63 98.3V121.14H278.24V99.58C278.24 94.67 275.96 91.47 271.55 91.47C267.85 91.47 264.86 93.89 263.72 96.88V121.15H254.33V83.57H263.71V83.57ZM295.38 121.15V69.05H304.77V101.15L318.58 83.57H329.11L313.67 103.23L323.86 121.15H314.13L304.77 104.46V121.15H295.38ZM346.45 122C335.63 122 327.66 114.31 327.66 102.07C327.66 90.26 335.63 82.71 346.45 82.71C357.27 82.71 365.24 90.25 365.24 102.07C365.24 114.32 357.27 122 346.45 122ZM346.45 113.61C351.86 113.61 355.84 109.2 355.84 102.08C355.84 95.46 351.85 91.12 346.45 91.12C341.04 91.12 337.06 95.46 337.06 102.08C337.06 109.19 341.05 113.61 346.45 113.61ZM543.01 83.57V89.26C544.65 85.56 548.56 82.93 553.83 82.93C561.52 82.93 566.92 88.62 566.92 98.3V121.14H557.53V99.58C557.53 94.67 555.25 91.47 550.84 91.47C547.14 91.47 544.15 93.89 543.01 96.88V121.15H533.62V83.57H543.01V83.57ZM24 70.51C9.98 70.51 0 80.04 0 96.13C0 112.14 9.46 122.03 23.41 122.03C32.38 122.03 39.21 117.9 43.19 111.64V93.85H24.4V101.75H33.86V109.51C31.58 111.93 27.95 113.57 23.68 113.57C14.86 113.57 9.38 106.74 9.38 96.14C9.38 85.47 15.38 79.06 23.99 79.06C30.25 79.06 35.61 81.91 37.11 89.31L46.29 87.53C44.59 76.77 35.31 70.51 24 70.51ZM60.5 121.17V99.54C62.21 94.7 65.13 91.86 70.18 91.86H72.81V83.53C72.03 83.46 70.96 83.32 69.89 83.32C64.7 83.32 61.92 86.24 60.5 90.51V83.54H51.11V121.18H60.5V121.17ZM77.54 83.6V106.8C77.54 116.33 83.16 122.03 90.63 122.03C95.26 122.03 99.38 119.54 101.38 115.48V121.17H110.77V83.6H101.38V108.36C99.67 111.42 97.04 113.63 93.62 113.63C89.42 113.63 86.93 110.36 86.93 105.87V83.6H77.54V83.6ZM117.94 83.6V121.17H127.33V96.91C128.47 93.92 131.46 91.5 135.16 91.5C139.57 91.5 141.85 94.7 141.85 99.61V121.17H151.24V98.33C151.24 88.65 145.83 82.96 138.15 82.96C132.88 82.96 128.97 85.59 127.33 89.29V83.6H117.94ZM171.44 82.73C163.1 82.73 156.53 89.45 156.53 101.57C156.53 113.55 164.1 121.18 175.72 121.18H191.58V69.08H182.17V88.59C180.03 85.04 176.29 82.73 171.44 82.73ZM165.95 101.86C165.95 94.59 169.45 91.15 174.02 91.15C177.51 91.15 180.61 93.31 182.17 96.09V113.3H176.37C169.88 113.3 165.95 108.85 165.95 101.86ZM231.13 104.38C231.2 103.74 231.34 102.67 231.34 101.53C231.34 90.14 225.01 82.74 214.48 82.74C203.38 82.74 196.76 90.14 196.76 101.88C196.76 114.12 202.64 122.02 213.89 122.02C222.79 122.02 228.24 117.18 229.59 109.78L220.84 108.21C220.06 111.77 218.02 114.12 213.96 114.12C208.84 114.12 206.58 110.63 206.23 104.37H231.13V104.38ZM206.23 97.76C206.94 93.06 209.93 90.64 214.48 90.64C218.82 90.64 221.38 93.13 222.02 97.76H206.23ZM527.86 101.54C527.86 102.68 527.72 103.75 527.65 104.39H502.74C503.1 110.65 505.35 114.14 510.47 114.14C514.53 114.14 516.57 111.79 517.35 108.23L526.1 109.8C524.75 117.2 519.29 122.04 510.4 122.04C499.16 122.04 493.27 114.14 493.27 101.9C493.27 90.16 499.89 82.76 510.99 82.76C521.53 82.75 527.86 90.15 527.86 101.54ZM510.99 90.65C506.44 90.65 503.45 93.07 502.74 97.77H518.54C517.9 93.14 515.34 90.65 510.99 90.65ZM370.84 125.17L363.97 121.13L377.26 98.53L389.41 103.61L404.52 83.34L421.1 106.5L434.99 79.21L454.53 93.38L469.68 67.94L483.36 85.29L491.97 77.37L497.37 83.24L482.42 96.99L470.6 81.99L456.92 104.96L437.86 91.14L422.25 121.81L404.39 96.85L392.09 113.36L380.61 108.57L370.84 125.17Z"
        fill={color}
      />
    </svg>
  );
};
