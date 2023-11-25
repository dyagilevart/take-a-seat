import { css } from '@emotion/css';
import styled from '@emotion/styled';

export const StyledMap = styled.div`
  width: 100%;
  height: 100%;
`;

export const magicTable = css`
  g[id^='chair'] {
    path:first-child {
      fill-opacity: 0.5;
    }
  }
  g[id^='table'] {
    rect {
      fill-opacity: 0.5;
    }
  }
`;
