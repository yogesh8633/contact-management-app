// src/types/amcharts.d.ts

declare module '@amcharts/amcharts4/core' {
    export const create: any;
    export const useTheme: any;
    export const color: any;
    export const Scrollbar: any;
  }
  
  declare module '@amcharts/amcharts4/charts' {
    export const XYChart: any;
    export const DateAxis: any;
    export const ValueAxis: any;
    export const LineSeries: any;
    export const XYCursor: any;
  }
  
  declare module '@amcharts/amcharts4/themes/animated' {
    const content: any;
    export default content;
  }
  