'use client';

import Script from 'next/script';
import { type FC, useRef } from 'react';

/** eslint-disable @typescript-eslint/no-explicit-any */
declare const SimplybookWidget: any;

export const BookingWidget: FC = () => {
  const widgetContainerRef = useRef(null);

  const handleScriptLoad = () => {
    new SimplybookWidget({
      widget_type: 'iframe',
      url: 'https:\/\/aimu.simplybook.me',
      theme: 'emeri',
      theme_settings: {
        timeline_hide_unavailable: '1',
        hide_past_days: '0',
        timeline_show_end_time: '0',
        timeline_modern_display: 'as_slots',
        sb_base_color: '#6a8772',
        display_item_mode: 'block',
        booking_nav_bg_color: '#ffffff',
        body_bg_color: '#f7f7f7',
        sb_review_image: '2',
        sb_review_image_preview:
          '\/uploads\/aimu\/image_files\/preview\/a4e22bcd8dad7a3f615e092aac4385a3.png',
        dark_font_color: '#6a8772',
        light_font_color: '#6a8772',
        btn_color_1: '#c6baac',
        sb_company_label_color: '#6a8772',
        hide_img_mode: '0',
        sb_busy: '#c7b3b3',
        sb_available: '#e2eaec',
      },
      timeline: 'modern',
      datepicker: 'top_calendar',
      is_rtl: false,
      app_config: {
        clear_session: 0,
        allow_switch_to_ada: 0,
        predefined: [],
      },
      container_id: 'sbw_x5acz3',
    });
  };

  return (
    <>
      <Script
        async
        src="https://widget.simplybook.me/v2/widget/widget.js"
        onLoad={handleScriptLoad}
      />

      <div
        id="sbw_x5acz3"
        className="min-h-screen"
        ref={widgetContainerRef}
      ></div>
    </>
  );
};
