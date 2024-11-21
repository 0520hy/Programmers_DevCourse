import { render, screen } from '@testing-library/react';
import React from 'react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import InputText from './InputText';

describe('InputText 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기에 입력' />
      </BookStoreThemeProvider>,
    );
    // 2. 확인
    expect(screen.getByPlaceholderText('여기에 입력')).toBeInTheDocument();
    // 화면상에 제목이라는 text를 가져와서 있는지 확인
  });
  it('forwardRef 테스트', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기에 입력' ref={ref} />
      </BookStoreThemeProvider>,
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
