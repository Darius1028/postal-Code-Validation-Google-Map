import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from '../modal';

describe('Modal', () => {
  it('should render the modal when isOpen is true', () => {
    const onClose = jest.fn();
    const title = 'Modal Title';
    const subtitle = 'Modal Subtitle';
    const content = ['Paragraph 1', 'Paragraph 2'];
    const acceptBtn = 'Accept';

    const { getByText, queryByText } = render(
      <Modal isOpen={true} onClose={onClose} title={title} subtitle={subtitle} content={content} acceptBtn={acceptBtn} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(subtitle)).toBeInTheDocument();
    expect(getByText('Paragraph 1')).toBeInTheDocument();
    expect(getByText('Paragraph 2')).toBeInTheDocument();
    expect(getByText(acceptBtn)).toBeInTheDocument();
    
  });

  it('should not render the modal when isOpen is false', () => {
    const onClose = jest.fn();

    const { container } = render(
      <Modal isOpen={false} onClose={onClose} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = jest.fn();

    const { getByText } = render(
      <Modal isOpen={true} onClose={onClose} />
    );

    fireEvent.click(getByText('×')); 

    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when accept button is clicked', () => {
    const onClose = jest.fn();

    const { getByText } = render(
      <Modal isOpen={true} onClose={onClose} acceptBtn="Accept" />
    );

    fireEvent.click(getByText('Accept')); 

    expect(onClose).toHaveBeenCalled();
  });
});
